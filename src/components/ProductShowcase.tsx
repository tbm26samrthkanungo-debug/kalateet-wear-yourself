import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { useProducts, Product } from "@/hooks/useProducts";
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

// Map product IDs to local images (for seeded products)
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

const filters: { label: string; value: ProductStyle }[] = [
  { label: "All", value: "all" },
  { label: "Chikankari", value: "chikankari" },
  { label: "Block Print", value: "block-print" },
  { label: "Embroidered", value: "embroidered" },
  { label: "Formal", value: "formal" },
  { label: "Minimal", value: "minimal" },
];

const ProductShowcase = () => {
  const { products, loading } = useProducts(true); // Fetch featured products
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProductStyle>("all");

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Map style names to filter values
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

  // Get product image - use mapped local image or fallback
  const getProductImage = (product: Product): string => {
    if (imageMap[product.id]) {
      return imageMap[product.id];
    }
    return product.image_url || "/placeholder.svg";
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

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={getProductImage(product)}
                name={product.name}
                price={`₹${product.price_inr.toLocaleString()}`}
                description={product.description || ""}
                fabric={product.fabric || ""}
                onQuickView={() => handleQuickView(product)}
              />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductQuickView
            isOpen={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
            product={{
              id: selectedProduct.id,
              image: getProductImage(selectedProduct),
              name: selectedProduct.name,
              price: `₹${selectedProduct.price_inr.toLocaleString()}`,
              description: selectedProduct.description || "",
              fabric: selectedProduct.fabric || "",
            }}
          />
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
