import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background pt-20">
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in max-w-5xl">
            {/* Logo */}
            <div className="mb-16">
              <img
                src={kalateeLogo}
                alt="Kalateet - Premium Men's Half Kurtas"
                className="h-32 sm:h-40 lg:h-48 w-auto mx-auto"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-8 tracking-wide">
              Premium men's half kurtas reimagined as
              <br />
              India's everyday alternative to the T-shirt
            </h1>
            
            <div className="mt-12">
              <Button 
                variant="default" 
                size="lg" 
                className="uppercase tracking-wider font-medium px-12 rounded-none"
              >
                Shop All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-hover-float">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Scroll
        </div>
      </div>
    </section>
  );
};

export default HeroSection;