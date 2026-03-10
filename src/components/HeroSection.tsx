import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center gradient-hero pt-20 overflow-hidden">
      {/* Animated ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-white/[0.04] blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-amber-500/[0.06] blur-3xl animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full bg-red-900/[0.08] blur-3xl animate-[pulse_12s_ease-in-out_infinite_4s]" />
      </div>

      {/* Ornamental Doorway SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.12]">
        <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cream">
          <path d="M200 50 C 100 50, 50 150, 50 300 L 50 550 L 350 550 L 350 300 C 350 150, 300 50, 200 50 Z" 
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 80 300 L 80 550" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          <path d="M 320 300 L 320 550" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
          <circle cx="200" cy="200" r="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
          <path d="M 170 200 L 230 200 M 200 170 L 200 230" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        </svg>
      </div>

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in max-w-4xl">
            <div className="mb-16">
              <img
                src={kalateeLogo}
                alt="Kalateet - A Doorway to Yourself"
                className="h-24 sm:h-32 lg:h-40 w-auto mx-auto brightness-0 invert drop-shadow-lg"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-cream leading-relaxed mb-6 tracking-wide drop-shadow-md">
              A Doorway to Yourself.
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-cream/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-sm">
              Not just clothing. Kalateet is a ritual of self-expression.
              <br />
              Choose fabric, not trends.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg" 
                onClick={() => navigate('/collection')}
                className="group relative bg-white text-primary font-normal px-12 py-6 rounded-sm border border-white shadow-medium overflow-hidden transition-all duration-500 hover:shadow-large hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Explore Collection
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setWaitlistOpen(true)}
                className="group relative bg-transparent text-cream font-light px-12 py-6 rounded-sm border border-cream/60 shadow-medium overflow-hidden transition-all duration-500 hover:shadow-large hover:scale-[1.03] active:scale-[0.98] hover:border-cream"
              >
                <span className="absolute inset-0 bg-cream/10 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500">
                  Join Waitlist
                </span>
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

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
};

export default HeroSection;
