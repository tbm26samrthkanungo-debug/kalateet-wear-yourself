import { Heart, Palette, Scissors, User } from "lucide-react";

const philosophyPillars = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "Rooted in Indian heritage, each piece tells a story of our rich cultural legacy."
  },
  {
    icon: User,
    title: "Comfort",
    description: "Designed for all-day wear, bringing ease to your everyday Indian style."
  },
  {
    icon: Palette,
    title: "Craftsmanship",
    description: "Hand-crafted by skilled artisans, preserving traditional techniques with modern design."
  },
  {
    icon: Scissors,
    title: "Everyday Wear",
    description: "Breaking barriers between ethnic and casual, perfect for any occasion."
  }
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-crimson font-semibold text-foreground mb-6">
            Our Philosophy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four pillars that guide everything we create, ensuring each kurta embodies 
            our vision of modern Indian wear.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophyPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-smooth"
              >
                <div className="mb-6 relative">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-smooth shadow-soft">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-crimson font-semibold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-background rounded-2xl shadow-medium">
            <p className="text-lg font-medium text-foreground italic leading-relaxed">
              "Every thread carries tradition. Every stitch speaks of innovation. 
              Every kurta is a bridge between who we were and who we're becoming."
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              — Kalateet Design Philosophy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;