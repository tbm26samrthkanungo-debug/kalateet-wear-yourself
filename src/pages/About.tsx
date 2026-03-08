import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Palette, Scissors, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import mosaic1 from "@/assets/mosaic-1.jpg";
import mosaic2 from "@/assets/mosaic-2.jpg";
import mosaic3 from "@/assets/mosaic-3.jpg";
import mosaic4 from "@/assets/mosaic-4.jpg";
import mosaic5 from "@/assets/mosaic-5.jpg";
import mosaic6 from "@/assets/mosaic-6.jpg";
import mosaic7 from "@/assets/mosaic-7.jpg";
import mosaic8 from "@/assets/mosaic-8.jpg";
import mosaic9 from "@/assets/mosaic-9.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";

const philosophyPillars = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "Rooted in Indian heritage, each piece tells a story of our rich cultural legacy.",
  },
  {
    icon: User,
    title: "Comfort",
    description: "Designed for all-day wear, bringing ease to your everyday Indian style.",
  },
  {
    icon: Palette,
    title: "Craftsmanship",
    description: "Hand-crafted by skilled artisans, preserving traditional techniques with modern design.",
  },
  {
    icon: Scissors,
    title: "Everyday Wear",
    description: "Breaking barriers between ethnic and casual, perfect for any occasion.",
  },
];

const mosaicImages = [mosaic1, mosaic2, mosaic3, mosaic4, mosaic5, mosaic6, mosaic7, mosaic8, mosaic9];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            About Kalāteet
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're reimagining Indian menswear for everyday life — rooted in tradition, designed for the modern world.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8" />
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                This began with a simple chikankari half kurta found in my father's wardrobe.
                It felt authentic, comfortable, and truly me.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We realized Indian wear had been boxed as 'ethnic' or 'festive.' Our purpose
                is to make kurtas a stylish, comfortable, everyday choice — rooted in identity,
                fused with modern style.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The name <span className="text-foreground font-medium">Kalāteet</span> means "beyond time" — 
                clothing that transcends trends, seasons, and occasions. It's not about looking Indian. 
                It's about feeling authentic.
              </p>
              <div className="p-6 bg-secondary rounded-lg border-l-4 border-primary">
                <p className="text-lg font-medium text-foreground italic">
                  "We are not discarding the West. We are fusing it with our culture.
                  But Indian remains at the core."
                </p>
              </div>
            </div>

            {/* Mosaic */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden shadow-large">
                {mosaicImages.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden">
                    <img src={image} alt={`Kalateet brand mosaic ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-gentle" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">Our Philosophy</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Four pillars that guide everything we create.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {philosophyPillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-smooth p-6 bg-background rounded-2xl shadow-soft">
                  <div className="mb-5">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src={story1} alt="Kalateet artisan at work" className="rounded-2xl shadow-medium w-full aspect-[3/4] object-cover" />
                <img src={story2} alt="Kalateet fabric detail" className="rounded-2xl shadow-medium w-full aspect-[3/4] object-cover mt-8" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">The Craft Behind Every Piece</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every Kalateet kurta passes through the hands of skilled artisans. From hand-embroidered 
                Chikankari from Lucknow to block prints from Rajasthan, we work directly with craft 
                communities to preserve techniques that are centuries old.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our fabrics are sourced from the finest mills — breathable cottons, soft linens, and 
                blended weaves that feel better with every wash. We believe what touches your skin 
                matters more than what catches the eye.
              </p>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-smooth"
              >
                Explore our collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl lg:text-3xl text-cream font-light leading-relaxed italic">
              "Every thread carries tradition. Every stitch speaks of innovation.
              Every kurta is a bridge between who we were and who we're becoming."
            </p>
            <p className="text-cream/70 mt-6 text-sm uppercase tracking-widest">— Kalateet Design Philosophy</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
