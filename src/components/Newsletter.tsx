import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Instagram, Twitter, Facebook } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-primary-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-crimson font-semibold text-foreground mb-6">
              Join the Movement
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Be part of reimagining everyday Indian wear. Get exclusive access to new collections, 
              styling tips, and stories from our community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background border-border shadow-soft"
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="default">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </form>

          <div className="space-y-6">
            <p className="text-muted-foreground">
              Follow our journey on social media
            </p>
            
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="p-3 bg-background rounded-full shadow-soft hover:shadow-medium transition-smooth hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6 text-primary" />
              </a>
              <a
                href="#"
                className="p-3 bg-background rounded-full shadow-soft hover:shadow-medium transition-smooth hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6 text-primary" />
              </a>
              <a
                href="#"
                className="p-3 bg-background rounded-full shadow-soft hover:shadow-medium transition-smooth hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;