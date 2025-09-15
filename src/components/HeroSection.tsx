import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Model wearing Kalateet half kurta with jeans and sneakers in modern street style"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-crimson font-semibold text-foreground leading-tight mb-6">
              Be Yourself.
              <br />
              <span className="text-primary">Wear Yourself.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8 leading-relaxed">
              Half kurtas reimagined as India's everyday alternative to the T-shirt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in">
              <Button variant="hero" size="lg" className="font-medium">
                Shop Now
              </Button>
              <Button variant="minimal" size="lg">
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-hover-float">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;