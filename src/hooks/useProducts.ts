import { useState, useEffect } from "react";
import { storefrontApiRequest, HANDLE_TO_LEGACY_ID, LEGACY_ID_TO_HANDLE, STYLE_BY_HANDLE } from "@/lib/shopify";
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopifyQueries";

export interface Product {
  id: string;                 // legacy UUID (stable across UI)
  name: string;
  description: string | null;
  style: string | null;
  fabric: string | null;
  color: string | null;
  price_inr: number;
  image_url: string | null;
  is_featured: boolean | null;
  shopify_handle: string;
  shopify_product_id: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
}

export interface ProductVariant {
  id: string;                 // Shopify variant GID (gid://shopify/ProductVariant/...)
  product_id: string;         // legacy UUID
  size: string;
  stock: number;              // 0 = sold out (we map availableForSale -> 1/0 if quantity unknown)
  price_inr: number;
  available: boolean;
}

interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  tags: string[];
  vendor: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number | null;
        price: { amount: string; currencyCode: string };
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
}

function mapNodeToProduct(node: ShopifyProductNode): Product | null {
  const legacyId = HANDLE_TO_LEGACY_ID[node.handle];
  if (!legacyId) return null; // ignore products we don't have a legacy mapping for

  return {
    id: legacyId,
    name: node.title,
    description: node.description || null,
    style: STYLE_BY_HANDLE[node.handle] || node.productType || null,
    fabric: null, // baked into description
    color: null,
    price_inr: Math.round(parseFloat(node.priceRange.minVariantPrice.amount)),
    image_url: node.images.edges[0]?.node?.url || null,
    is_featured: false,
    shopify_handle: node.handle,
    shopify_product_id: node.id,
  };
}

export const useProducts = (featuredOnly = false) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      const res = await storefrontApiRequest<{ products: { edges: Array<{ node: ShopifyProductNode }> } }>(
        PRODUCTS_QUERY,
        { first: 50 }
      );
      if (cancelled) return;
      const edges = res?.data?.products?.edges || [];
      const mapped = edges.map((e) => mapNodeToProduct(e.node)).filter((p): p is Product => p !== null);
      // featuredOnly: keep first 4 (mirrors prior behaviour visually)
      setProducts(featuredOnly ? mapped.slice(0, 4) : mapped);
      setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [featuredOnly]);

  return { products, loading };
};

export const useProduct = (productId: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!productId) { setProduct(null); setLoading(false); return; }
    const handle = LEGACY_ID_TO_HANDLE[productId];
    if (!handle) { setProduct(null); setLoading(false); return; }

    const run = async () => {
      setLoading(true);
      const res = await storefrontApiRequest<{ product: ShopifyProductNode }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle }
      );
      if (cancelled) return;
      const node = res?.data?.product;
      setProduct(node ? mapNodeToProduct(node) : null);
      setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [productId]);

  return { product, loading };
};

export const useProductVariants = (productId: string | null) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!productId) { setVariants([]); setLoading(false); return; }
    const handle = LEGACY_ID_TO_HANDLE[productId];
    if (!handle) { setVariants([]); setLoading(false); return; }

    const run = async () => {
      setLoading(true);
      const res = await storefrontApiRequest<{ product: ShopifyProductNode }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle }
      );
      if (cancelled) return;
      const edges = res?.data?.product?.variants?.edges || [];
      const mapped: ProductVariant[] = edges.map((e) => {
        const sizeOption = e.node.selectedOptions.find((o) => o.name.toLowerCase() === "size");
        const size = sizeOption?.value || e.node.title;
        const qty = e.node.quantityAvailable;
        const stock = qty != null ? qty : (e.node.availableForSale ? 1 : 0);
        return {
          id: e.node.id,
          product_id: productId,
          size,
          stock,
          price_inr: Math.round(parseFloat(e.node.price.amount)),
          available: e.node.availableForSale,
        };
      });
      // sort S, M, L, XL
      const order = ["XS", "S", "M", "L", "XL", "XXL"];
      mapped.sort((a, b) => order.indexOf(a.size) - order.indexOf(b.size));
      setVariants(mapped);
      setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [productId]);

  return { variants, loading };
};

// Returns Shopify-hosted images. The app already has a local image asset map
// keyed by legacy UUID, so this is mainly used as a fallback/extra.
export const useProductImages = (productId: string | null) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!productId) { setImages([]); setLoading(false); return; }
    const handle = LEGACY_ID_TO_HANDLE[productId];
    if (!handle) { setImages([]); setLoading(false); return; }

    const run = async () => {
      setLoading(true);
      const res = await storefrontApiRequest<{ product: ShopifyProductNode }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle }
      );
      if (cancelled) return;
      const edges = res?.data?.product?.images?.edges || [];
      setImages(
        edges.map((e, idx) => ({
          id: `${productId}-${idx}`,
          product_id: productId,
          image_url: e.node.url,
          display_order: idx,
        }))
      );
      setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [productId]);

  return { images, loading };
};
