import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-subtle">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="animate-fade-in mb-12">
            {/* Logo */}
            <div className="mb-8">
              <img
                src={kalateeLogo}
                alt="Kalateet - Premium Men's Half Kurtas"
                className="h-24 sm:h-32 lg:h-40 w-auto mx-auto"
              />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-crimson font-semibold text-foreground leading-tight mb-6">
              Be Yourself.
              <br />
              <span className="text-primary">Wear Yourself.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8 leading-relaxed max-w-3xl">
              Premium men's half kurtas reimagined as India's everyday alternative to the T-shirt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in justify-center">
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