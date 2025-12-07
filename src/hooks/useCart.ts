import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price_inr: number;
    image_url: string | null;
  };
}

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        product_id,
        quantity,
        product:products(id, name, price_inr, image_url)
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
    } else {
      setCartItems(data as unknown as CartItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return false;
    }

    // Check if item already in cart
    const existing = cartItems.find(item => item.product_id === productId);
    
    if (existing) {
      // Update quantity
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);
      
      if (error) {
        toast({ title: "Error", description: "Failed to update cart", variant: "destructive" });
        return false;
      }
    } else {
      // Insert new item
      const { error } = await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: productId, quantity: 1 });
      
      if (error) {
        toast({ title: "Error", description: "Failed to add to cart", variant: "destructive" });
        return false;
      }
    }

    toast({ title: "Added to cart", description: "Item added to your cart" });
    await fetchCart();
    return true;
  };

  const updateQuantity = async (cartItemId: string, delta: number) => {
    const item = cartItems.find(i => i.id === cartItemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    
    if (newQuantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", cartItemId);

    if (error) {
      toast({ title: "Error", description: "Failed to update quantity", variant: "destructive" });
    } else {
      await fetchCart();
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      toast({ title: "Error", description: "Failed to remove item", variant: "destructive" });
    } else {
      toast({ title: "Removed", description: "Item removed from cart" });
      await fetchCart();
    }
  };

  return {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    refetch: fetchCart
  };
};
