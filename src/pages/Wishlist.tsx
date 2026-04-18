import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, Trash2 } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import productFormalCollar from "@/assets/product-formal-collar.png";
import productKendrick from "@/assets/product-kendrick.png";
import productOversizeGrey from "@/assets/product-oversize-grey.png";
import productMastersUnion from "@/assets/product-masters-union.png";

const imageMap: Record<string, string> = {
  "11111111-1111-1111-1111-111111111111": product1,
  "22222222-2222-2222-2222-222222222222": product2,
  "33333333-3333-3333-3333-333333333333": product3,
  "44444444-4444-4444-4444-444444444444": product4,
  "55555555-5555-5555-5555-555555555555": productFormalCollar,
  "66666666-6666-6666-6666-666666666666": productKendrick,
  "77777777-7777-7777-7777-777777777777": productOversizeGrey,
  "88888888-8888-8888-8888-888888888888": productMastersUnion,
};

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlistItems, loading, toggleWishlist } = useWishlist();
  const { products } = useProducts(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = useMemo(() => {
    return wishlistItems
      .map((w) => products.find((p) => p.id === w.product_id))
      .filter(Boolean) as typeof products;
  }, [wishlistItems, products]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-cream/40 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-5 font-sans">
            Saved for you
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.05]">
            Your Lookbook
          </h1>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {!user && (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-sans mb-6">
                Sign in to view and save items to your wishlist.
              </p>
              <Link to="/login">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {user && loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {user && !loading && items.length === 0 && (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-sans mb-6">
                Your lookbook is empty. Save pieces you love.
              </p>
              <Link to="/collection">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Collection
                </Button>
              </Link>
            </div>
          )}

          {user && !loading && items.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
              {items.map((product) => (
                <article key={product.id} className="group">
                  <div
                    className="relative overflow-hidden bg-cream/50 rounded-sm aspect-[3/4] shadow-soft group-hover:shadow-medium transition-shadow duration-500 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={imageMap[product.id] || product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      aria-label="Remove from wishlist"
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-background transition"
                    >
                      <Trash2 className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                  <div className="pt-4 px-1 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base md:text-lg text-foreground font-normal leading-snug mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="font-sans text-sm text-foreground/80 tracking-wide">
                        ₹{product.price_inr.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product.id)}
                      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
