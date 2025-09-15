import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    image: product1,
    name: "Chikankari Elegance",
    price: "₹2,999",
    description: "Hand-embroidered blood red kurta with traditional chikankari work"
  },
  {
    id: 2,
    image: product2,
    name: "Pastel Dreams",
    price: "₹2,599",
    description: "Soft pink kurta with delicate floral embroidery"
  },
  {
    id: 3,
    image: product3,
    name: "Earthy Essence",
    price: "₹2,799",
    description: "Handwoven beige kurta with geometric patterns"
  },
  {
    id: 4,
    image: product4,
    name: "Midnight Navy",
    price: "₹2,699",
    description: "Deep navy kurta with minimal contemporary embroidery"
  }
];

const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-crimson font-semibold text-foreground mb-6">
            Our Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each piece is thoughtfully crafted to blend traditional Indian artistry 
            with modern everyday comfort.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-6 py-2 rounded-full border border-primary bg-primary text-primary-foreground shadow-soft transition-smooth">
            All
          </button>
          <button className="px-6 py-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-smooth">
            Chikankari
          </button>
          <button className="px-6 py-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-smooth">
            Block Print
          </button>
          <button className="px-6 py-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-smooth">
            Embroidered
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary/80 font-medium text-lg transition-smooth underline-offset-4 hover:underline">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;