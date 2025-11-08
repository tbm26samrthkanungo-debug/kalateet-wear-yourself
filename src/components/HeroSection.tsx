import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center gradient-hero pt-20 overflow-hidden">
      {/* Ornamental Doorway SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cream">
          <path d="M200 50 C 100 50, 50 150, 50 300 L 50 550 L 350 550 L 350 300 C 350 150, 300 50, 200 50 Z" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none"
                strokeLinecap="round"/>
          <path d="M 80 300 L 80 550" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          <path d="M 320 300 L 320 550" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          <circle cx="200" cy="200" r="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
          <path d="M 170 200 L 230 200 M 200 170 L 200 230" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in max-w-4xl">
            {/* Logo */}
            <div className="mb-16">
              <img
                src={kalateeLogo}
                alt="Kalateet - A Doorway to Yourself"
                className="h-24 sm:h-32 lg:h-40 w-auto mx-auto opacity-90"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-cream leading-relaxed mb-6 tracking-wide">
              A Doorway to Yourself.
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-cream/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Not just clothing. Kalateet is a ritual of self-expression.
              <br />
              Choose fabric, not trends.
            </p>
            
            <div className="mt-12">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-cream text-primary hover:bg-cream/90 font-normal px-12 py-6 rounded-sm transition-gentle shadow-medium hover:shadow-large"
              >
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-hover-float">
        <div className="text-xs uppercase tracking-wider text-cream/60 font-light">
          Scroll
        </div>
      </div>
    </section>
  );
};

export default HeroSection;