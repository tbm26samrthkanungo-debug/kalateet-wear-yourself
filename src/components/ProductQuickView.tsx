import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    image: string;
    name: string;
    price: string;
    description: string;
    fabric: string;
  };
}

const ProductQuickView = ({ isOpen, onClose, product }: ProductQuickViewProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async () => {
    await addToCart(product.id.toString());
  };

  const handleToggleWishlist = async () => {
    await toggleWishlist(product.id.toString());
  };

  const inWishlist = isInWishlist(product.id.toString());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent className="max-w-4xl p-0 gap-0 bg-background rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 shadow-soft hover:bg-background transition-gentle"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-wide">
              {product.name}
            </h2>
            
            <p className="text-2xl text-accent mb-6 tracking-wide">
              {product.price}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                Fabric & Care
              </h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                {product.fabric}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className={`flex-1 font-light tracking-wide ${
                  inWishlist 
                    ? "border-accent text-accent hover:bg-accent/10" 
                    : "border-border text-foreground hover:bg-muted"
                }`}
              >
                {inWishlist ? "In Lookbook ♥" : "Add to Lookbook"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
