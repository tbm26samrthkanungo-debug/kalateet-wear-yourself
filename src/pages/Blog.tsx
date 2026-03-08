import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MasonryGrid from "@/components/MasonryGrid";
import CardModal from "@/components/CardModal";
import { Clock, User, Calendar } from "lucide-react";

import mosaic1 from "@/assets/mosaic-1.jpg";
import mosaic2 from "@/assets/mosaic-2.jpg";
import mosaic3 from "@/assets/mosaic-3.jpg";
import mosaic4 from "@/assets/mosaic-4.jpg";
import mosaic5 from "@/assets/mosaic-5.jpg";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  height: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rebirth of Indian Menswear: Why Kurta is Returning to Everyday Life",
    description: "A look at how Indian men are rediscovering cultural identity through comfort, craftsmanship, and modern silhouettes.",
    content: "A look at how Indian men are rediscovering cultural identity through comfort, craftsmanship, and modern silhouettes. The half kurta movement isn't nostalgia — it's evolution. From college corridors to corporate corridors, the kurta has quietly reclaimed its place. Young Indian men no longer see it as 'ethnic wear' reserved for festivals. Instead, it's becoming part of a new visual vocabulary — one that speaks of heritage without heaviness, tradition without rigidity.\n\nThe key shift? Design. Modern kurtas have shorter hemlines, slimmer cuts, and fabrics that breathe. They pair effortlessly with jeans, chinos, and sneakers. This isn't your grandfather's kurta — it's yours.",
    category: "Indian Menswear",
    author: "Kalateet Editorial",
    readTime: "8 mins",
    date: "December 1, 2024",
    image: mosaic1,
    height: "aspect-[16/12]",
  },
  {
    id: 2,
    title: "Kalateet and the Modern Indian Man: Style Rooted in Identity",
    description: "Exploring how everyday clothing becomes a bridge between tradition and contemporary self-expression.",
    content: "Exploring how everyday clothing becomes a bridge between tradition and contemporary self-expression. Identity isn't just what you believe — it's what you wear. When a young professional in Bengaluru chooses a Chikankari half kurta over a polo shirt, he's making a statement that goes beyond fashion.\n\nAt Kalateet, we believe clothing should be a conversation. Not a loud one, but a meaningful one. Our designs don't shout 'Indian' — they whisper it. Through fabric choices, embroidery techniques, and silhouettes that honor the past while embracing the present.",
    category: "Culture",
    author: "Kalateet Editorial",
    readTime: "7 mins",
    date: "November 28, 2024",
    image: mosaic2,
    height: "aspect-[16/10]",
  },
  {
    id: 3,
    title: "From Chikankari to Block Print: A Journey Through Indian Textile Heritage",
    description: "Understanding the legacy and artistry behind India's most iconic handwork traditions.",
    content: "Understanding the legacy and artistry behind India's most iconic handwork traditions. India's textile heritage is a library written in thread. Chikankari from Lucknow, block printing from Jaipur, Kalamkari from Andhra — each technique carries centuries of artistic wisdom.\n\nChikankari alone involves 36 distinct stitches, each creating different patterns and textures. A single piece can take weeks to complete. Block printing uses hand-carved wooden blocks, dipped in natural dyes, pressed onto fabric with practiced precision.\n\nThese aren't just techniques — they're living traditions, supported by communities of artisans who have passed their craft through generations.",
    category: "Design Philosophy",
    author: "Kalateet Editorial",
    readTime: "9 mins",
    date: "November 22, 2024",
    image: mosaic3,
    height: "aspect-[16/14]",
  },
  {
    id: 4,
    title: "Why Fabric Matters More Than Fashion Trends",
    description: "A design philosophy piece explaining why Kalateet prioritizes feel, breathability, and authenticity.",
    content: "A design philosophy piece explaining why Kalateet prioritizes feel, breathability, and authenticity. Fashion trends have a half-life of months. Good fabric endures for years.\n\nAt Kalateet, our design process starts not with sketches but with touch. We source fabrics from across India — handloom cotton from Tamil Nadu, linen blends from Bengal, Mul cotton from Rajasthan. Each fabric is tested for breathability, drape, and how it ages with wear and wash.\n\nBecause a kurta you love wearing on day one should feel even better on day hundred.",
    category: "Design Philosophy",
    author: "Kalateet Editorial",
    readTime: "6 mins",
    date: "November 15, 2024",
    image: mosaic4,
    height: "aspect-[16/10]",
  },
  {
    id: 5,
    title: "What Does It Mean to Dress 'Indian' Today?",
    description: "A cultural commentary on identity, global influence, and the evolving wardrobe of the Indian man.",
    content: "A cultural commentary on identity, global influence, and the evolving wardrobe of the Indian man. What does it mean to dress 'Indian' in 2024? Is it about the garment, the fabric, the technique, or the intent?\n\nFor decades, 'Indian wear' was a category — separate from 'Western wear.' But the modern Indian man doesn't live in categories. He codes in JavaScript and speaks Tamil at home. He watches K-dramas and celebrates Pongal. His wardrobe should reflect this multiplicity.\n\nDressing Indian today isn't about looking traditional — it's about feeling authentic. It's choosing a half kurta not because it's 'ethnic' but because it's you.",
    category: "Culture",
    author: "Kalateet Editorial",
    readTime: "10 mins",
    date: "November 8, 2024",
    image: mosaic5,
    height: "aspect-[16/12]",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stories, culture, and conversations shaping the future of Indian menswear.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8" />
        </div>
      </section>

      {/* Masonry Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MasonryGrid columns={3} mobileColumns={1} gap={20}>
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-smooth"
                onClick={() => setSelectedPost(post)}
              >
                {/* Blog Cover Image */}
                <div className={`${post.height} relative overflow-hidden bg-muted`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-gentle"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Category tag */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-wider font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                    {post.category}
                  </span>
                  {/* Bottom text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-white font-semibold text-base leading-tight mb-1 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-white/70 text-xs line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </MasonryGrid>
        </div>
      </section>

      {/* Blog Modal */}
      {selectedPost && (
        <CardModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost.title}
        >
          <div className="overflow-hidden rounded-2xl">
            <div className="relative w-full max-h-[40vh] overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-wider font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                {selectedPost.category}
              </span>
            </div>
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4 leading-tight tracking-wide">
                {selectedPost.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedPost.readTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPost.date}</span>
                </div>
              </div>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>
            </div>
          </div>
        </CardModal>
      )}

      <Footer />
    </div>
  );
};

export default Blog;
