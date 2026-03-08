import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Truck, Shield, RotateCcw, Ruler } from "lucide-react";
import { useProduct, useProductVariants } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";

// Local image map
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProduct(id || null);
  const { variants, loading: variantsLoading } = useProductVariants(id || null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getImage = () => {
    if (!product) return "/placeholder.svg";
    return imageMap[product.id] || product.image_url || "/placeholder.svg";
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addToCart(product.id);
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
    setIsAdding(false);
  };

  const handleWishlist = async () => {
    if (!product) return;
    await toggleWishlist(product.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center pt-40 pb-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center pt-40 pb-20">
          <h1 className="text-3xl font-semibold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/collection">
            <Button>Browse Collection</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
            <span>/</span>
            <Link to="/collection" className="hover:text-foreground transition-smooth">Collection</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="bg-muted rounded-2xl overflow-hidden shadow-medium flex items-center justify-center">
              <img
                src={getImage()}
                alt={`${product.name} - Kalateet premium kurta`}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              {product.style && (
                <span className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                  {product.style}
                </span>
              )}

              <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 tracking-wide">
                {product.name}
              </h1>

              <p className="text-2xl text-accent mb-6 tracking-wide font-medium">
                ₹{product.price_inr.toLocaleString()}
              </p>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Fabric */}
              {product.fabric && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Fabric & Care
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {product.fabric}
                  </p>
                </div>
              )}

              {/* Color */}
              {product.color && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Color
                  </h2>
                  <p className="text-muted-foreground text-sm capitalize">{product.color}</p>
                </div>
              )}

              {/* Size Selector */}
              {!variantsLoading && variants.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Select Size
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedSize(v.size)}
                        disabled={v.stock === 0}
                        className={`px-5 py-2.5 rounded-sm border text-sm font-medium transition-smooth ${
                          selectedSize === v.size
                            ? "border-primary bg-primary text-primary-foreground"
                            : v.stock === 0
                            ? "border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed line-through"
                            : "border-border bg-background text-foreground hover:border-accent"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide"
                >
                  {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className={`flex-1 font-light tracking-wide ${
                    inWishlist
                      ? "border-accent text-accent hover:bg-accent/10"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {inWishlist ? "In Lookbook ♥" : "Add to Lookbook"}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Free Shipping</p>
                    <p className="text-[11px] text-muted-foreground">On orders above ₹2,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Easy Returns</p>
                    <p className="text-[11px] text-muted-foreground">7-day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Quality Assured</p>
                    <p className="text-[11px] text-muted-foreground">Handcrafted with care</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Size Guide</p>
                    <p className="text-[11px] text-muted-foreground">Find your perfect fit</p>
                  </div>
                </div>
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
