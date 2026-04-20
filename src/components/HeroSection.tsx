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
      {/* Banner image */}
      <div className="relative w-full">
        <img
          src={heroBanner}
          alt="Kalateet — A Doorway to Yourself"
          className="w-full h-auto block"
        />
      </div>

      {/* CTAs below banner */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col items-center text-center animate-fade-in">
          <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-6 font-light leading-relaxed tracking-wide">
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

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  );
};

export default HeroSection;
