import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  style: string | null;
  fabric: string | null;
  color: string | null;
  price_inr: number;
  image_url: string | null;
  is_featured: boolean | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  stock: number;
}

export const useProducts = (featuredOnly = false) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from("products").select("*");
      
      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [featuredOnly]);

  return { products, loading };
};

export const useProductVariants = (productId: string | null) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setVariants([]);
      setLoading(false);
      return;
    }

    const fetchVariants = async () => {
      const { data, error } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", productId)
        .order("size");

      if (error) {
        console.error("Error fetching variants:", error);
      } else {
        setVariants(data || []);
      }
      setLoading(false);
    };

    fetchVariants();
  }, [productId]);

  return { variants, loading };
};

export const useProduct = (productId: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  return { product, loading };
};
