import { Button } from "@/components/ui/button";
import kalateetBanner from "@/assets/kalateet-logo.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-cream"
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in max-w-4xl flex flex-col items-center">
            {/* Banner image with mix-blend-multiply removes the cream background visually */}
            <img
              src={kalateetBanner}
              alt="Kalateet — A Doorway to Yourself"
              className="w-[280px] sm:w-[400px] lg:w-[520px] h-auto mx-auto mb-6 mix-blend-multiply drop-shadow-sm"
            />

            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
              Not just clothing. Kalateet is a ritual of self-expression.
              <br />
              Choose fabric, not trends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/collection")}
                className="group relative bg-primary text-primary-foreground font-normal px-12 py-6 rounded-sm border border-primary shadow-medium overflow-hidden transition-all duration-500 hover:shadow-large hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Explore Collection</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setWaitlistOpen(true)}
                className="group relative bg-transparent text-primary font-light px-12 py-6 rounded-sm border border-primary/40 overflow-hidden transition-all duration-500 hover:bg-primary/5 hover:border-primary hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Join Waitlist</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-hover-float">
        <div className="text-xs uppercase tracking-wider text-foreground/50 font-light">
          Scroll
        </div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
};

export default HeroSection;
