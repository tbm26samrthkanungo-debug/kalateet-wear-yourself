import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative pt-20 overflow-hidden bg-cream"
    >
      <div className="relative w-full">
        <img
          src={heroBanner}
          alt="Kalateet — A Doorway to Yourself"
          className="w-full h-auto block"
        />

        {/* Bottom gradient scrim for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        {/* Overlay content */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 lg:pb-14">
          <div className="flex flex-col items-center text-center animate-fade-in">
            <p className="text-sm sm:text-base lg:text-lg text-cream max-w-2xl mx-auto mb-5 sm:mb-7 font-light leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Not just clothing. Kalateet is a ritual of self-expression.
              <br className="hidden sm:block" />
              Choose fabric, not trends.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/collection")}
                className="group relative bg-primary text-primary-foreground font-normal px-10 py-5 rounded-sm border border-primary/80 shadow-large transition-all duration-500 hover:shadow-large hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Explore Collection</span>
              </Button>
              <Button
                size="lg"
                onClick={() => setWaitlistOpen(true)}
                className="group relative bg-cream/95 text-primary font-normal px-10 py-5 rounded-sm border border-cream backdrop-blur-sm shadow-medium transition-all duration-500 hover:bg-cream hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Join Waitlist</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
};

export default HeroSection;
