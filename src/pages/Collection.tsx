import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardModal from "@/components/CardModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WaitlistModal from "@/components/WaitlistModal";

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

type FilterStyle = "all" | "chikankari" | "block-print" | "embroidered" | "formal" | "minimal";
type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const filters: { label: string; value: FilterStyle }[] = [
  { label: "All", value: "all" },
  { label: "Chikankari", value: "chikankari" },
  { label: "Block Print", value: "block-print" },
  { label: "Embroidered", value: "embroidered" },
  { label: "Formal", value: "formal" },
  { label: "Minimal", value: "minimal" },
];

const Collection = () => {
  const { products, loading } = useProducts(false);
  const [activeFilter, setActiveFilter] = useState<FilterStyle>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistProductId, setWaitlistProductId] = useState<string | undefined>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styleToFilter = (style: string | null): FilterStyle => {
    if (!style) return "all";
    const lower = style.toLowerCase();
    if (lower.includes("chikankari")) return "chikankari";
    if (lower.includes("block")) return "block-print";
    if (lower.includes("embroid")) return "embroidered";
    if (lower.includes("formal")) return "formal";
    if (lower.includes("minimal")) return "minimal";
    return "all";
  };

  const filteredProducts = useMemo(() => {
    const base = activeFilter === "all"
      ? products
      : products.filter(p => styleToFilter(p.style) === activeFilter);
    const sorted = [...base];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price_inr - b.price_inr);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price_inr - a.price_inr);
        break;
      case "newest":
        // No created_at on Product type — fall back to original order (assumed newest-first from query)
        break;
      case "featured":
      default:
        sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }
    return sorted;
  }, [products, activeFilter, sortBy]);

  const getImage = (p: Product) => imageMap[p.id] || p.image_url || "/placeholder.svg";

  const openWaitlist = (productId: string) => {
    setWaitlistProductId(productId);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Editorial Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-cream/40 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-5 font-sans">
              The Collection
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.05] mb-6">
              Heritage,<br className="hidden sm:block" /> reimagined for everyday.
            </h1>
            {/* Decorative motif */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent" />
              <span className="text-accent text-lg leading-none">✦</span>
              <span className="h-px w-10 bg-accent" />
            </div>
            <p className="font-sans text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
              Each piece is hand-finished by Indian artisans — blending centuries-old craft
              with the silhouettes of a modern wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[64px] z-30 bg-background/95 backdrop-blur border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Pill filters with hover underline */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`relative font-sans text-sm tracking-wide pb-1 transition-colors ${
                      isActive
                        ? "text-primary after:scale-x-100"
                        : "text-foreground/70 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-primary after:origin-left after:transition-transform after:duration-300`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 md:ml-auto">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
                Sort by
              </span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[170px] h-9 rounded-full border-border bg-background font-sans text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image frame — uniform aspect, cream backdrop */}
                  <div className="relative overflow-hidden bg-cream/50 rounded-sm aspect-[3/4] shadow-soft group-hover:shadow-medium transition-shadow duration-500">
                    <img
                      src={getImage(product)}
                      alt={`${product.name} — Kalateet kurta`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Slide-up CTA */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="bg-background/95 backdrop-blur-sm border-t border-border/60 px-4 py-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="flex-1 h-9 rounded-full border-foreground/20 font-sans text-xs tracking-wide hover:border-primary hover:text-primary"
                        >
                          View Product
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                          className="flex-1 h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs tracking-wide"
                        >
                          Quick Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Info BELOW image */}
                  <div className="pt-4 px-1">
                    {product.style && (
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans mb-1.5">
                        {product.style}
                      </p>
                    )}
                    <h3 className="font-serif text-base md:text-lg text-foreground font-normal leading-snug mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-sm text-foreground/80 tracking-wide">
                      ₹{product.price_inr.toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-sans">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick view modal */}
      {selectedProduct && (
        <CardModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
        >
          <div className="overflow-hidden rounded-2xl">
            <div className="relative w-full overflow-hidden bg-cream/40 flex items-center justify-center">
              <img
                src={getImage(selectedProduct)}
                alt={selectedProduct.name}
                className="w-full max-h-[60vh] object-contain"
              />
            </div>
            <div className="p-8 lg:p-10">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-2 tracking-wide">
                {selectedProduct.name}
              </h2>
              <p className="font-sans text-2xl text-accent mb-4 tracking-wide">
                ₹{selectedProduct.price_inr.toLocaleString()}
              </p>
              {selectedProduct.description && (
                <p className="text-muted-foreground leading-relaxed mb-6 font-sans">
                  {selectedProduct.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => addToCart(selectedProduct.id)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-sans tracking-wide"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setSelectedProduct(null);
                    navigate(`/product/${selectedProduct.id}`);
                  }}
                  className="flex-1 font-sans tracking-wide border-border text-foreground hover:bg-muted"
                >
                  View Full Details →
                </Button>
              </div>
              <button
                onClick={() => openWaitlist(selectedProduct.id)}
                className="w-full mt-3 py-3 rounded-sm border border-primary bg-background text-foreground font-sans text-sm tracking-wide hover:bg-secondary transition-smooth"
              >
                Join Waitlist for Next Drop
              </button>
            </div>
          </div>
        </CardModal>
      )}

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        productId={waitlistProductId}
      />

      <Footer />
    </div>
  );
};

export default Collection;
