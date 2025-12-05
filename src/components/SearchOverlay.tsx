import { useState } from "react";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const recommendedProducts = [
  { id: 1, image: product1, name: "Oversize Red", price: "₹3,299" },
  { id: 2, image: product2, name: "Olive Green Floral", price: "₹3,899" },
  { id: 3, image: product3, name: "Oversize Off-White", price: "₹2,999" },
  { id: 4, image: product4, name: "Light Chinese Blue", price: "₹3,199" },
];

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Panel */}
      <div className="absolute top-0 left-0 right-0 bg-background shadow-large animate-fade-in">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Search</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-smooth"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for kurtas…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 text-lg rounded-xl border-border focus:border-primary bg-muted"
              autoFocus
            />
          </div>

          {/* Recommended Products */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Recommended for you
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                  onClick={onClose}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-secondary mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {product.name}
                  </h4>
                  <p className="text-sm text-accent">{product.price}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
