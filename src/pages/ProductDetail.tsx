import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Truck, Shield, RotateCcw, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { useProduct, useProductVariants, useProductImages } from "@/hooks/useProducts";
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

// Multiple images per product for carousel
const productImagesMap: Record<string, string[]> = {
  "11111111-1111-1111-1111-111111111111": [product1, product2, product3],
  "22222222-2222-2222-2222-222222222222": [product2, product1, product4],
  "33333333-3333-3333-3333-333333333333": [product3, product4, product1],
  "44444444-4444-4444-4444-444444444444": [product4, product3, product2],
  "55555555-5555-5555-5555-555555555555": [productFormalCollar, productKendrick, productOversizeGrey],
  "66666666-6666-6666-6666-666666666666": [productKendrick, productMastersUnion, productFormalCollar],
  "77777777-7777-7777-7777-777777777777": [productOversizeGrey, productFormalCollar, productMastersUnion],
  "88888888-8888-8888-8888-888888888888": [productMastersUnion, productOversizeGrey, productKendrick],
};

const singleImageMap: Record<string, string> = {
  "11111111-1111-1111-1111-111111111111": product1,
  "22222222-2222-2222-2222-222222222222": product2,
  "33333333-3333-3333-3333-333333333333": product3,
  "44444444-4444-4444-4444-444444444444": product4,
  "55555555-5555-5555-5555-555555555555": productFormalCollar,
  "66666666-6666-6666-6666-666666666666": productKendrick,
  "77777777-7777-7777-7777-777777777777": productOversizeGrey,
  "88888888-8888-8888-8888-888888888888": productMastersUnion,
};

const AUTO_SLIDE_INTERVAL = 3500;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProduct(id || null);
  const { variants, loading: variantsLoading } = useProductVariants(id || null);
  const { images: dbImages } = useProductImages(id || null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Build image list: DB images first, then fallback to local map
  const allImages: string[] = (() => {
    if (dbImages.length > 0) {
      return dbImages.map(img => img.image_url);
    }
    if (product && productImagesMap[product.id]) {
      return productImagesMap[product.id];
    }
    if (product) {
      const single = singleImageMap[product.id] || product.image_url || "/placeholder.svg";
      return [single];
    }
    return ["/placeholder.svg"];
  })();

  // Reset index when product changes
  useEffect(() => {
    setCurrentImageIdx(0);
  }, [id]);

  // Auto-rotate images
  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIdx(prev => (prev + 1) % allImages.length);
        setIsTransitioning(false);
      }, 300);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const goToImage = useCallback((idx: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIdx(idx);
      setIsTransitioning(false);
    }, 200);
  }, []);

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
            {/* Product Image Carousel */}
            <div className="space-y-4">
              <div className="relative bg-muted rounded-2xl overflow-hidden shadow-medium flex items-center justify-center group">
                <img
                  src={allImages[currentImageIdx]}
                  alt={`${product.name} - image ${currentImageIdx + 1}`}
                  className={`w-full max-h-[70vh] object-contain transition-all duration-300 ${
                    isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
                  }`}
                />

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => goToImage((currentImageIdx - 1 + allImages.length) % allImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-background"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={() => goToImage((currentImageIdx + 1) % allImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-background"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-3 py-1 text-xs bg-background/80 backdrop-blur-sm rounded-full text-foreground font-medium shadow-soft">
                    {currentImageIdx + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail dots / progress indicators */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-2">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIdx
                          ? "bg-primary w-8"
                          : "bg-border w-4 hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${
                        idx === currentImageIdx
                          ? "border-primary shadow-soft"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
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

              {product.description && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              {product.fabric && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Fabric & Care</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{product.fabric}</p>
                </div>
              )}

              {product.color && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Color</h2>
                  <p className="text-muted-foreground text-sm capitalize">{product.color}</p>
                </div>
              )}

              {!variantsLoading && variants.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Select Size</h2>
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
