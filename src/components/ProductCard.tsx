import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description: string;
}

const ProductCard = ({ image, name, price, description }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm bg-card shadow-soft hover:shadow-medium transition-gentle">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={`${name} - premium half kurta for everyday wear`}
            className={`w-full h-full object-cover transition-gentle ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        </div>

        {/* Product Info */}
        <div className="p-6 bg-card">
          <h3 className="text-xl font-normal text-foreground mb-2 tracking-wide">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-light">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-normal text-accent tracking-wide">
              {price}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={`transition-gentle border font-light tracking-wide ${
                isHovered ? "border-accent text-accent" : "border-border text-foreground"
              }`}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;