import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    image: product1,
    name: "Oversize Red",
    price: "₹3,299",
    description: "Deep maroon half kurta with V-neck - timeless elegance meets comfort",
    fabric: "Premium cotton blend with natural breathability. Machine wash cold, tumble dry low."
  },
  {
    id: 2,
    image: product2,
    name: "Olive Green Floral",
    price: "₹3,899",
    description: "Botanical print kurta with mandarin collar - nature's artistry woven in fabric",
    fabric: "Soft cotton with botanical print. Hand wash recommended, dry in shade."
  },
  {
    id: 3,
    image: product3,
    name: "Oversize Off-White",
    price: "₹2,999",
    description: "Textured beige kurta with collared V-neck - understated sophistication",
    fabric: "Textured cotton weave for enhanced comfort. Machine wash cold, iron on low heat."
  },
  {
    id: 4,
    image: product4,
    name: "Light Chinese Blue",
    price: "₹3,199",
    description: "Striped kurta with mandarin collar - classic patterns, modern comfort",
    fabric: "Cotton blend with vertical stripes. Machine washable, dry flat for best results."
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/">
            <Button variant="default">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-gentle mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="bg-muted rounded-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-wide">
                {product.name}
              </h1>
              
              <p className="text-3xl text-accent mb-8 tracking-wide">
                {product.price}
              </p>

              <div className="mb-8">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Description
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Fabric & Care
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {product.fabric}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-border text-foreground hover:bg-muted font-light tracking-wide"
                >
                  Add to Lookbook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
