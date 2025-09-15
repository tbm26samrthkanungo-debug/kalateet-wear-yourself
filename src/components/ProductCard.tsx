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
      <div className="relative overflow-hidden rounded-2xl bg-background shadow-soft hover:shadow-large transition-smooth">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={`${name} - premium half kurta for everyday wear`}
            className={`w-full h-full object-cover transition-smooth ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-crimson font-medium text-foreground mb-2">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-primary">
              {price}
            </span>
            <Button
              variant={isHovered ? "hero" : "minimal"}
              size="sm"
              className="transition-smooth"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-primary/5 transition-smooth ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ProductCard;