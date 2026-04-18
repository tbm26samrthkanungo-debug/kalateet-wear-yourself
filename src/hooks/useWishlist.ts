import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  product_id: string;
}

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist_items")
      .select("id, product_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching wishlist:", error);
    } else {
      setWishlistItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to add items to wishlist",
        variant: "destructive"
      });
      return false;
    }

    const existing = wishlistItems.find(item => item.product_id === productId);
    const previous = wishlistItems;

    if (existing) {
      // Optimistic remove
      setWishlistItems(prev => prev.filter(i => i.id !== existing.id));
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("id", existing.id);

      if (error) {
        setWishlistItems(previous);
        toast({ title: "Error", description: "Failed to remove from wishlist", variant: "destructive" });
        return false;
      }
      toast({ title: "Removed", description: "Item removed from wishlist" });
    } else {
      // Optimistic add (temp id)
      const tempId = `temp-${productId}`;
      setWishlistItems(prev => [...prev, { id: tempId, product_id: productId }]);
      const { data, error } = await supabase
        .from("wishlist_items")
        .insert({ user_id: user.id, product_id: productId })
        .select("id, product_id")
        .single();

      if (error) {
        setWishlistItems(previous);
        toast({ title: "Error", description: "Failed to add to wishlist", variant: "destructive" });
        return false;
      }
      setWishlistItems(prev => prev.map(i => (i.id === tempId ? data : i)));
      toast({ title: "Added", description: "Item added to wishlist" });
    }

    return true;
  };

  return {
    wishlistItems,
    loading,
    isInWishlist,
    toggleWishlist,
    refetch: fetchWishlist
  };
};
