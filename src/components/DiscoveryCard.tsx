import { useState } from "react";

export type CardType = "product" | "philosophy" | "story" | "blog" | "inspiration";

export interface DiscoveryCardData {
  id: string;
  type: CardType;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  category?: string;
  fabric?: string;
  height?: "short" | "medium" | "tall";
  productId?: string;
}

interface DiscoveryCardProps {
  card: DiscoveryCardData;
  onClick: (card: DiscoveryCardData) => void;
}

const heightMap = {
  short: "aspect-[4/3]",
  medium: "aspect-[3/4]",
  tall: "aspect-[2/3]",
};

const DiscoveryCard = ({ card, onClick }: DiscoveryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const typeLabel: Record<CardType, string> = {
    product: "Shop",
    philosophy: "Philosophy",
    story: "Story",
    blog: "Read",
    inspiration: "Inspiration",
  };

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-smooth relative h-full"
      style={{ transform: "translateZ(0)" }}
      onClick={() => onClick(card)}
    >
      <div className="relative overflow-hidden h-full w-full bg-muted">
        {/* Progressive image loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-[1.02] transition-gentle ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-smooth" />

        {/* Category tag */}
        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-wider font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full">
          {typeLabel[card.type]}
        </span>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="text-white/80 text-xs line-clamp-1">{card.subtitle}</p>
          )}
          {card.price && (
            <p className="text-white/90 text-sm font-medium mt-1">{card.price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCard;
