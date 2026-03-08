import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import MasonryGrid from "./MasonryGrid";
import DiscoveryCard, { DiscoveryCardData } from "./DiscoveryCard";
import CardModal from "./CardModal";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Local images
import mosaic1 from "@/assets/mosaic-1.jpg";
import mosaic2 from "@/assets/mosaic-2.jpg";
import mosaic3 from "@/assets/mosaic-3.jpg";
import mosaic4 from "@/assets/mosaic-4.jpg";
import mosaic5 from "@/assets/mosaic-5.jpg";
import mosaic6 from "@/assets/mosaic-6.jpg";
import mosaic7 from "@/assets/mosaic-7.jpg";
import mosaic8 from "@/assets/mosaic-8.jpg";
import mosaic9 from "@/assets/mosaic-9.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
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

const BATCH_SIZE = 6;

// Static editorial/philosophy/inspiration cards
const editorialCards: DiscoveryCardData[] = [
  {
    id: "phil-1",
    type: "philosophy",
    image: mosaic1,
    title: "Every thread carries tradition",
    subtitle: "Kalateet Design Philosophy",
    description: "Every thread carries tradition. Every stitch speaks of innovation. Every kurta is a bridge between who we were and who we're becoming. We believe in clothing that doesn't just drape — it speaks.",
    height: "tall",
  },
  {
    id: "insp-1",
    type: "inspiration",
    image: mosaic2,
    title: "The Art of Chikankari",
    subtitle: "Centuries of hand embroidery",
    description: "Chikankari is a centuries-old embroidery technique from Lucknow. Each piece takes weeks to complete by hand, creating delicate floral patterns that tell stories of Mughal courts and Indian artistry.",
    height: "short",
  },
  {
    id: "story-1",
    type: "story",
    image: story1,
    title: "Campus Style Reimagined",
    subtitle: "Paired with jeans and sneakers",
    description: "Young India is rewriting the rules. From college campuses to startup offices, the half kurta paired with jeans has become a statement of cultural confidence.",
    height: "medium",
  },
  {
    id: "insp-2",
    type: "inspiration",
    image: mosaic4,
    title: "Block Print Heritage",
    subtitle: "Rajasthan's living art form",
    description: "Hand block printing from Rajasthan uses carved wooden blocks dipped in natural dyes. Each print is unique — slightly imperfect, entirely human, completely beautiful.",
    height: "tall",
  },
  {
    id: "blog-1",
    type: "blog",
    image: mosaic5,
    title: "The Rebirth of Indian Menswear",
    subtitle: "Why Kurta is Returning to Everyday Life",
    description: "A look at how Indian men are rediscovering cultural identity through comfort, craftsmanship, and modern silhouettes. The half kurta movement isn't nostalgia — it's evolution.",
    category: "Indian Menswear",
    height: "medium",
  },
  {
    id: "story-2",
    type: "story",
    image: story2,
    title: "Coffee Date Ready",
    subtitle: "Effortlessly stylish for casual meetups",
    description: "The perfect intersection of comfort and culture. Our customers share how Kalateet kurtas have become their go-to for casual outings and conversations over coffee.",
    height: "short",
  },
  {
    id: "phil-2",
    type: "philosophy",
    image: mosaic7,
    title: "Comfort Without Compromise",
    subtitle: "Designed for all-day wear",
    description: "We don't believe you should choose between looking good and feeling good. Every Kalateet kurta is designed to move with you — breathable fabrics, thoughtful cuts, effortless style.",
    height: "medium",
  },
  {
    id: "insp-3",
    type: "inspiration",
    image: mosaic3,
    title: "Fabric First, Always",
    subtitle: "Why we obsess over materials",
    description: "Fashion trends come and go. Good fabric endures. We source the finest cotton, linen, and blended fabrics because what touches your skin matters more than what catches the eye.",
    height: "tall",
  },
  {
    id: "story-3",
    type: "story",
    image: story3,
    title: "Work From Home, Elevated",
    subtitle: "Comfortable yet professional",
    description: "The remote work revolution demanded a new kind of wardrobe — one that's camera-ready and couch-comfortable. The Kalateet half kurta became the answer.",
    height: "short",
  },
  {
    id: "blog-2",
    type: "blog",
    image: mosaic6,
    title: "What Does It Mean to Dress 'Indian' Today?",
    subtitle: "Identity, influence, and the evolving wardrobe",
    description: "A cultural commentary on identity, global influence, and the evolving wardrobe of the Indian man. Dressing Indian isn't about looking traditional — it's about feeling authentic.",
    category: "Culture",
    height: "medium",
  },
  {
    id: "story-4",
    type: "story",
    image: story4,
    title: "Weekend Concert Vibes",
    subtitle: "Stand out with authentic style",
    description: "When the crowd wears the same, stand apart. Our community shows how Indian street style meets global culture at weekend concerts and festivals.",
    height: "tall",
  },
  {
    id: "insp-4",
    type: "inspiration",
    image: mosaic8,
    title: "The Everyday Revolution",
    subtitle: "Breaking ethnic-casual barriers",
    description: "The half kurta was once reserved for festivals. Today it's for Monday meetings, Saturday brunch, and Sunday adventures. We're part of a quiet revolution in Indian menswear.",
    height: "short",
  },
  // Additional cards for infinite-scroll feel
  {
    id: "phil-3",
    type: "philosophy",
    image: mosaic9,
    title: "Craftsmanship Over Mass Production",
    subtitle: "Handmade with intention",
    description: "In a world of fast fashion, we choose slow craft. Every Kalateet piece passes through the hands of skilled artisans who bring decades of tradition to each stitch.",
    height: "medium",
  },
  {
    id: "insp-5",
    type: "inspiration",
    image: story4,
    title: "Street Style Meets Heritage",
    subtitle: "The new Indian aesthetic",
    description: "From Mumbai locals to Delhi metros, a new generation is blending global streetwear with Indian sensibility. The result? A style that's unmistakably ours.",
    height: "tall",
  },
  {
    id: "story-5",
    type: "story",
    image: mosaic1,
    title: "Festival Season, Redefined",
    subtitle: "Beyond the heavy sherwani",
    description: "Festivals don't need heavy embroidery. A well-cut half kurta with subtle detailing can be just as festive — and far more comfortable for the celebrations that matter.",
    height: "short",
  },
  {
    id: "insp-6",
    type: "inspiration",
    image: mosaic5,
    title: "The Color of Confidence",
    subtitle: "Earth tones and beyond",
    description: "Our palette draws from the Indian landscape — sandstone ochres, monsoon greens, terracotta reds. Colors that feel grounded, authentic, and distinctly Indian.",
    height: "medium",
  },
];

const DiscoverySection = () => {
  const { products } = useProducts(true);
  const { addToCart } = useCart();
  const [selectedCard, setSelectedCard] = useState<DiscoveryCardData | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Merge product cards with editorial cards
  const allCards = useMemo(() => {
    const productCards: DiscoveryCardData[] = products.slice(0, 4).map((p, i) => ({
      id: `prod-${p.id}`,
      type: "product" as const,
      image: imageMap[p.id] || p.image_url || "/placeholder.svg",
      title: p.name,
      subtitle: p.style || undefined,
      description: p.description || "",
      price: `₹${p.price_inr.toLocaleString()}`,
      fabric: p.fabric || "",
      height: (["medium", "tall", "short", "medium"] as const)[i % 4],
      productId: p.id,
    }));

    const merged: DiscoveryCardData[] = [];
    let prodIdx = 0;
    editorialCards.forEach((card, i) => {
      merged.push(card);
      if ((i + 1) % 3 === 0 && prodIdx < productCards.length) {
        merged.push(productCards[prodIdx]);
        prodIdx++;
      }
    });
    while (prodIdx < productCards.length) {
      merged.push(productCards[prodIdx]);
      prodIdx++;
    }
    return merged;
  }, [products]);

  const visibleCards = allCards.slice(0, visibleCount);
  const hasMore = visibleCount < allCards.length;

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setLoadingMore(true);
          // Simulate a small delay for smooth loading feel
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, allCards.length));
            setLoadingMore(false);
          }, 400);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, allCards.length]);

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-normal text-foreground mb-6 tracking-wide">
            Discover Kalāteet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Explore our world of modern Indian identity — clothing, craft, culture, and stories.
          </p>
          <div className="w-20 h-0.5 bg-accent mx-auto mt-8" />
        </div>

        <MasonryGrid columns={4} mobileColumns={1} gap={16}>
          {visibleCards.map((card) => (
            <DiscoveryCard
              key={card.id}
              card={card}
              onClick={setSelectedCard}
            />
          ))}
        </MasonryGrid>

        {/* Infinite scroll sentinel */}
        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-12">
            {loadingMore && (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          title={selectedCard.title}
        >
          <div className="overflow-hidden rounded-2xl">
            {/* Image — use object-contain for products to avoid cropping */}
            <div className={`relative w-full overflow-hidden ${
              selectedCard.type === "product" ? "bg-muted flex items-center justify-center" : ""
            }`}>
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className={`w-full ${
                  selectedCard.type === "product"
                    ? "max-h-[60vh] object-contain"
                    : "max-h-[50vh] object-cover"
                }`}
              />
              {selectedCard.category && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-wider font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                  {selectedCard.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2 tracking-wide">
                {selectedCard.title}
              </h2>
              {selectedCard.subtitle && (
                <p className="text-accent text-sm mb-4">{selectedCard.subtitle}</p>
              )}
              {selectedCard.price && (
                <p className="text-2xl text-accent mb-4 font-medium tracking-wide">
                  {selectedCard.price}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedCard.description}
              </p>
              {selectedCard.fabric && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Fabric & Care
                  </h3>
                  <p className="text-muted-foreground text-sm">{selectedCard.fabric}</p>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                {selectedCard.type === "product" && selectedCard.productId && (
                  <>
                    <Button
                      size="lg"
                      onClick={() => handleAddToCart(selectedCard.productId!)}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.open(`/product/${selectedCard.productId}`, "_self")}
                      className="flex-1 font-light tracking-wide border-border text-foreground hover:bg-muted"
                    >
                      View Details
                    </Button>
                  </>
                )}
                {selectedCard.type === "blog" && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open("/blog", "_self")}
                    className="font-light tracking-wide border-border text-foreground hover:bg-muted"
                  >
                    Read More on Blog →
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardModal>
      )}
    </section>
  );
};

export default DiscoverySection;
