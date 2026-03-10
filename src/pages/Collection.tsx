import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MasonryGrid from "@/components/MasonryGrid";
import CardModal from "@/components/CardModal";
import { Button } from "@/components/ui/button";
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

const filters: { label: string; value: FilterStyle }[] = [
  { label: "All", value: "all" },
  { label: "Chikankari", value: "chikankari" },
  { label: "Block Print", value: "block-print" },
  { label: "Embroidered", value: "embroidered" },
  { label: "Formal", value: "formal" },
  { label: "Minimal", value: "minimal" },
];

const tileHeights = ["aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]", "aspect-[3/5]"];

const Collection = () => {
  const { products, loading } = useProducts(false);
  const [activeFilter, setActiveFilter] = useState<FilterStyle>("all");
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

  const filteredProducts = activeFilter === "all"
    ? products
    : products.filter(p => styleToFilter(p.style) === activeFilter);

  const getImage = (p: Product) => imageMap[p.id] || p.image_url || "/placeholder.svg";

  const openWaitlist = (productId: string) => {
    setWaitlistProductId(productId);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every piece is crafted to blend traditional Indian artistry with modern everyday comfort.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8" />
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-8 py-2.5 rounded-sm border transition-gentle font-light tracking-wide ${
                  activeFilter === filter.value
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-background text-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <MasonryGrid columns={4} mobileColumns={2} gap={16}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-large hover:-translate-y-1 transition-all duration-500 ease-out"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className={`relative overflow-hidden ${tileHeights[index % tileHeights.length]} bg-muted`}>
                    <img
                      src={getImage(product)}
                      alt={`${product.name} - Kalateet kurta`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm leading-tight mb-0.5">
                        {product.name}
                      </h3>
                      <p className="text-white/80 text-xs">₹{product.price_inr.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </MasonryGrid>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Quick Modal */}
      {selectedProduct && (
        <CardModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
        >
          <div className="overflow-hidden rounded-2xl">
            <div className="relative w-full overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={getImage(selectedProduct)}
                alt={selectedProduct.name}
                className="w-full max-h-[60vh] object-contain"
              />
            </div>
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2 tracking-wide">
                {selectedProduct.name}
              </h2>
              <p className="text-2xl text-accent mb-4 font-medium tracking-wide">
                ₹{selectedProduct.price_inr.toLocaleString()}
              </p>
              {selectedProduct.description && (
                <p className="text-muted-foreground leading-relaxed mb-6">{selectedProduct.description}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => addToCart(selectedProduct.id)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide"
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
                  className="flex-1 font-light tracking-wide border-border text-foreground hover:bg-muted"
                >
                  View Full Details →
                </Button>
              </div>
              <button
                onClick={() => openWaitlist(selectedProduct.id)}
                className="w-full mt-3 py-3 rounded-sm border border-primary bg-background text-foreground font-sanchez text-sm tracking-wide hover:bg-secondary transition-smooth"
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
