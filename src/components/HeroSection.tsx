import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Kalateet brand heritage with traditional Indian architectural elements"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-crimson font-semibold text-white leading-tight mb-6">
              Be Yourself.
              <br />
              <span className="text-white/90">Wear Yourself.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 font-light mb-8 leading-relaxed">
              Premium men's half kurtas reimagined as India's everyday alternative to the T-shirt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in">
              <Button variant="hero" size="lg" className="font-medium">
                Shop Now
              </Button>
              <Button variant="minimal" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
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