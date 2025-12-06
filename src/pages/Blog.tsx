import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, User, Calendar } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rebirth of Indian Menswear: Why Kurta is Returning to Everyday Life",
    description: "A look at how Indian men are rediscovering cultural identity through comfort, craftsmanship, and modern silhouettes.",
    category: "Indian Menswear",
    author: "Kalateet Editorial",
    readTime: "8 mins",
    date: "December 1, 2024"
  },
  {
    id: 2,
    title: "Kalateet and the Modern Indian Man: Style Rooted in Identity",
    description: "Exploring how everyday clothing becomes a bridge between tradition and contemporary self-expression.",
    category: "Culture",
    author: "Kalateet Editorial",
    readTime: "7 mins",
    date: "November 28, 2024"
  },
  {
    id: 3,
    title: "From Chikankari to Block Print: A Journey Through Indian Textile Heritage",
    description: "Understanding the legacy and artistry behind India's most iconic handwork traditions.",
    category: "Design Philosophy",
    author: "Kalateet Editorial",
    readTime: "9 mins",
    date: "November 22, 2024"
  },
  {
    id: 4,
    title: "Why Fabric Matters More Than Fashion Trends",
    description: "A design philosophy piece explaining why Kalateet prioritizes feel, breathability, and authenticity.",
    category: "Design Philosophy",
    author: "Kalateet Editorial",
    readTime: "6 mins",
    date: "November 15, 2024"
  },
  {
    id: 5,
    title: "What Does It Mean to Dress 'Indian' Today?",
    description: "A cultural commentary on identity, global influence, and the evolving wardrobe of the Indian man.",
    category: "Culture",
    author: "Kalateet Editorial",
    readTime: "10 mins",
    date: "November 8, 2024"
  }
];

const Blog = () => {
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

      {/* Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-medium hover:shadow-large transition-smooth cursor-pointer"
              >
                {/* Blog Cover Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-accent/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-smooth" />
                  {/* Placeholder pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/20">K</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-smooth line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
