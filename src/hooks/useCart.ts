import { useEffect, useState, useCallback } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { storefrontApiRequest, formatCheckoutUrl, LEGACY_ID_TO_HANDLE } from "@/lib/shopify";
import {
  CART_QUERY,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  PRODUCT_BY_HANDLE_QUERY,
} from "@/lib/shopifyQueries";

export interface CartItem {
  id: string;             // Shopify line id
  product_id: string;     // legacy UUID
  variantId: string;      // Shopify variant GID
  size: string;
  quantity: number;
  product: {
    id: string;           // legacy UUID
    name: string;
    price_inr: number;
    image_url: string | null;
    handle: string;
  };
}

interface ShopifyCartLineNode {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    selectedOptions: Array<{ name: string; value: string }>;
    image: { url: string; altText: string | null } | null;
    product: { id: string; title: string; handle: string };
  };
}

function lineToCartItem(line: ShopifyCartLineNode): CartItem | null {
  const handle = line.merchandise.product.handle;
  const legacyId = (Object.entries(LEGACY_ID_TO_HANDLE).find(([, h]) => h === handle)?.[0]) || handle;
  const sizeOpt = line.merchandise.selectedOptions.find((o) => o.name.toLowerCase() === "size");
  return {
    id: line.id,
    product_id: legacyId,
    variantId: line.merchandise.id,
    size: sizeOpt?.value || line.merchandise.title,
    quantity: line.quantity,
    product: {
      id: legacyId,
      name: line.merchandise.product.title,
      price_inr: Math.round(parseFloat(line.merchandise.price.amount)),
      image_url: line.merchandise.image?.url || null,
      handle,
    },
  };
}

// ---- Zustand store (persisted) ----
interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
  totalQuantity: number;
  subtotalInr: number;
  loading: boolean;
  setState: (patch: Partial<CartState>) => void;
  reset: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      checkoutUrl: null,
      items: [],
      totalQuantity: 0,
      subtotalInr: 0,
      loading: false,
      setState: (patch) => set(patch),
      reset: () => set({ cartId: null, checkoutUrl: null, items: [], totalQuantity: 0, subtotalInr: 0 }),
    }),
    {
      name: "kalateet-shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ cartId: s.cartId, checkoutUrl: s.checkoutUrl, items: s.items, totalQuantity: s.totalQuantity, subtotalInr: s.subtotalInr }),
    }
  )
);

function isCartNotFound(userErrors: Array<{ message: string }>): boolean {
  return userErrors.some((e) => /cart not found|does not exist/i.test(e.message));
}

async function refreshCartFromShopify(cartId: string): Promise<void> {
  const res = await storefrontApiRequest(CART_QUERY, { id: cartId });
  const cart = res?.data?.cart;
  if (!cart) {
    useCartStore.getState().reset();
    return;
  }
  const items = (cart.lines.edges as Array<{ node: ShopifyCartLineNode }>)
    .map((e) => lineToCartItem(e.node))
    .filter((x): x is CartItem => x !== null);
  useCartStore.getState().setState({
    items,
    totalQuantity: cart.totalQuantity,
    subtotalInr: Math.round(parseFloat(cart.cost.subtotalAmount.amount)),
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
  });
}

// Resolve legacy UUID + optional size -> Shopify variant GID
async function resolveVariantId(productId: string, size?: string): Promise<{ variantId: string; size: string } | null> {
  const handle = LEGACY_ID_TO_HANDLE[productId];
  if (!handle) return null;
  const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const variants = res?.data?.product?.variants?.edges || [];
  const list = variants.map((e: any) => {
    const sizeOpt = e.node.selectedOptions.find((o: any) => o.name.toLowerCase() === "size");
    return {
      id: e.node.id as string,
      size: (sizeOpt?.value as string) || (e.node.title as string),
      available: e.node.availableForSale as boolean,
    };
  });
  if (list.length === 0) return null;

  if (size) {
    const match = list.find((v) => v.size.toUpperCase() === size.toUpperCase()) || null;
    if (match) return { variantId: match.id, size: match.size };
  }
  // default: prefer M, else first available, else first
  const preferred = list.find((v) => v.size.toUpperCase() === "M" && v.available)
    || list.find((v) => v.available)
    || list[0];
  return { variantId: preferred.id, size: preferred.size };
}

// ---- Hook ----
export const useCart = () => {
  const cartId = useCartStore((s) => s.cartId);
  const checkoutUrl = useCartStore((s) => s.checkoutUrl);
  const items = useCartStore((s) => s.items);
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const subtotalInr = useCartStore((s) => s.subtotalInr);
  const setState = useCartStore((s) => s.setState);
  const reset = useCartStore((s) => s.reset);
  const [loading, setLoading] = useState(false);

  // Sync with Shopify on mount + when tab becomes visible
  useEffect(() => {
    if (cartId) refreshCartFromShopify(cartId);
    const onVis = () => { if (document.visibilityState === "visible" && cartId) refreshCartFromShopify(cartId); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback(async (productId: string, size?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const resolved = await resolveVariantId(productId, size);
      if (!resolved) {
        toast({ title: "Unavailable", description: "Couldn't find this size right now.", variant: "destructive" });
        return false;
      }

      const currentCartId = useCartStore.getState().cartId;
      if (!currentCartId) {
        const res = await storefrontApiRequest(CART_CREATE_MUTATION, {
          input: { lines: [{ quantity: 1, merchandiseId: resolved.variantId }] },
        });
        const errs = res?.data?.cartCreate?.userErrors || [];
        if (errs.length > 0) {
          console.error(errs);
          toast({ title: "Couldn't add", description: errs[0].message, variant: "destructive" });
          return false;
        }
        const cart = res?.data?.cartCreate?.cart;
        if (!cart?.checkoutUrl) return false;
        setState({ cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl) });
        await refreshCartFromShopify(cart.id);
      } else {
        const res = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
          cartId: currentCartId,
          lines: [{ quantity: 1, merchandiseId: resolved.variantId }],
        });
        const errs = res?.data?.cartLinesAdd?.userErrors || [];
        if (isCartNotFound(errs)) {
          reset();
          toast({ title: "Cart expired", description: "Please add the item again.", variant: "destructive" });
          return false;
        }
        if (errs.length > 0) {
          toast({ title: "Couldn't add", description: errs[0].message, variant: "destructive" });
          return false;
        }
        await refreshCartFromShopify(currentCartId);
      }

      toast({ title: "Added to cart", description: `Size ${resolved.size} added.` });
      return true;
    } finally {
      setLoading(false);
    }
  }, [setState, reset]);

  const updateQuantity = useCallback(async (cartItemId: string, delta: number) => {
    const item = useCartStore.getState().items.find((i) => i.id === cartItemId);
    if (!item) return;
    const next = item.quantity + delta;
    if (next < 1) { await removeFromCart(cartItemId); return; }
    const currentCartId = useCartStore.getState().cartId;
    if (!currentCartId) return;

    setLoading(true);
    try {
      const res = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
        cartId: currentCartId,
        lines: [{ id: cartItemId, quantity: next }],
      });
      const errs = res?.data?.cartLinesUpdate?.userErrors || [];
      if (isCartNotFound(errs)) { reset(); return; }
      if (errs.length > 0) {
        toast({ title: "Couldn't update", description: errs[0].message, variant: "destructive" });
        return;
      }
      await refreshCartFromShopify(currentCartId);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  const removeFromCart = useCallback(async (cartItemId: string) => {
    const currentCartId = useCartStore.getState().cartId;
    if (!currentCartId) return;
    setLoading(true);
    try {
      const res = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
        cartId: currentCartId,
        lineIds: [cartItemId],
      });
      const errs = res?.data?.cartLinesRemove?.userErrors || [];
      if (isCartNotFound(errs)) { reset(); return; }
      if (errs.length > 0) {
        toast({ title: "Couldn't remove", description: errs[0].message, variant: "destructive" });
        return;
      }
      await refreshCartFromShopify(currentCartId);
      toast({ title: "Removed", description: "Item removed from cart." });
    } finally {
      setLoading(false);
    }
  }, [reset]);

  const refetch = useCallback(async () => {
    const currentCartId = useCartStore.getState().cartId;
    if (currentCartId) await refreshCartFromShopify(currentCartId);
  }, []);

  return {
    cartItems: items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    refetch,
    checkoutUrl,
    totalQuantity,
    subtotalInr,
  };
};
