import { useState } from "react";
import MasonryGrid from "./MasonryGrid";
import CardModal from "./CardModal";
import { Button } from "@/components/ui/button";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Loader2 } from "lucide-react";

// Import local images for fallback mapping
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import productFormalCollar from "@/assets/product-formal-collar.png";
import productKendrick from "@/assets/product-kendrick.png";
import productOversizeGrey from "@/assets/product-oversize-grey.png";
import productMastersUnion from "@/assets/product-masters-union.png";

type ProductStyle = "all" | "chikankari" | "block-print" | "embroidered" | "formal" | "minimal";

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

// Varying aspect ratios for masonry effect
const tileHeights = ["aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]", "aspect-[3/5]"];

const filters: { label: string; value: ProductStyle }[] = [
  { label: "All", value: "all" },
  { label: "Chikankari", value: "chikankari" },
  { label: "Block Print", value: "block-print" },
  { label: "Embroidered", value: "embroidered" },
  { label: "Formal", value: "formal" },
  { label: "Minimal", value: "minimal" },
];

const ProductShowcase = () => {
  const { products, loading } = useProducts(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProductStyle>("all");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const styleToFilter = (style: string | null): ProductStyle => {
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
    : products.filter(product => styleToFilter(product.style) === activeFilter);

  const getProductImage = (product: Product): string => {
    if (imageMap[product.id]) return imageMap[product.id];
    return product.image_url || "/placeholder.svg";
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  return (
    <section id="products" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-normal text-foreground mb-6 tracking-wide">
            Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Each piece is thoughtfully crafted to blend traditional Indian artistry
            with modern everyday comfort.
          </p>
          <div className="w-20 h-0.5 bg-accent mx-auto mt-8" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Masonry Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <MasonryGrid columns={4} mobileColumns={2} gap={16}>
            {filteredProducts.map((product, index) => {
              const image = getProductImage(product);
              return (
                <div
                  key={product.id}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-smooth"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className={`relative overflow-hidden ${tileHeights[index % tileHeights.length]} bg-muted`}>
                    <img
                      src={image}
                      alt={`${product.name} - premium half kurta`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-gentle"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm leading-tight mb-0.5">
                        {product.name}
                      </h3>
                      <p className="text-white/80 text-xs">
                        ₹{product.price_inr.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </MasonryGrid>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <CardModal
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            title={selectedProduct.name}
          >
            <div className="overflow-hidden rounded-2xl">
              <div className="relative w-full max-h-[50vh] overflow-hidden bg-muted">
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
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
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                  </div>
                )}
                {selectedProduct.fabric && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">Fabric & Care</h3>
                    <p className="text-muted-foreground text-sm">{selectedProduct.fabric}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    onClick={() => handleAddToCart(selectedProduct.id)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`flex-1 font-light tracking-wide ${
                      isInWishlist(selectedProduct.id)
                        ? "border-accent text-accent hover:bg-accent/10"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {isInWishlist(selectedProduct.id) ? "In Lookbook ♥" : "Add to Lookbook"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(`/product/${selectedProduct.id}`, "_self")}
                    className="flex-1 font-light tracking-wide border-border text-foreground hover:bg-muted"
                  >
                    Full Details →
                  </Button>
                </div>
              </div>
            </div>
          </CardModal>
        )}

        <div className="text-center mt-16">
          <button className="text-accent hover:text-accent/80 font-normal text-base transition-gentle underline-offset-4 hover:underline tracking-wide">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
