import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

type ProductStyle = "all" | "chikankari" | "block-print" | "embroidered";

const products = [
  {
    id: 1,
    image: product1,
    name: "Oversize Red",
    price: "₹3,299",
    description: "Deep maroon half kurta with V-neck - timeless elegance meets comfort",
    fabric: "Premium cotton blend with natural breathability. Machine wash cold, tumble dry low.",
    style: "chikankari" as ProductStyle
  },
  {
    id: 2,
    image: product2,
    name: "Olive Green Floral",
    price: "₹3,899",
    description: "Botanical print kurta with mandarin collar - nature's artistry woven in fabric",
    fabric: "Soft cotton with botanical print. Hand wash recommended, dry in shade.",
    style: "block-print" as ProductStyle
  },
  {
    id: 3,
    image: product3,
    name: "Oversize Off-White",
    price: "₹2,999",
    description: "Textured beige kurta with collared V-neck - understated sophistication",
    fabric: "Textured cotton weave for enhanced comfort. Machine wash cold, iron on low heat.",
    style: "embroidered" as ProductStyle
  },
  {
    id: 4,
    image: product4,
    name: "Light Chinese Blue",
    price: "₹3,199",
    description: "Striped kurta with mandarin collar - classic patterns, modern comfort",
    fabric: "Cotton blend with vertical stripes. Machine washable, dry flat for best results.",
    style: "chikankari" as ProductStyle
  }
];

const filters: { label: string; value: ProductStyle }[] = [
  { label: "All", value: "all" },
  { label: "Chikankari", value: "chikankari" },
  { label: "Block Print", value: "block-print" },
  { label: "Embroidered", value: "embroidered" },
];

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProductStyle>("all");

  const handleQuickView = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => product.style === activeFilter);

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
              fabric={product.fabric}
              onQuickView={() => handleQuickView(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductQuickView
            isOpen={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
            product={selectedProduct}
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
