interface MosaicImage {
  id: number;
  placeholder: string; // Will be replaced with actual images later
}

const mosaicImages: MosaicImage[] = [
  { id: 1, placeholder: "bg-gradient-to-br from-secondary to-accent/40" },
  { id: 2, placeholder: "bg-gradient-to-br from-accent/30 to-secondary" },
  { id: 3, placeholder: "bg-gradient-to-br from-secondary to-primary/20" },
  { id: 4, placeholder: "bg-gradient-to-br from-primary/20 to-accent/40" },
  { id: 5, placeholder: "bg-gradient-to-br from-accent/40 to-secondary" },
  { id: 6, placeholder: "bg-gradient-to-br from-secondary to-accent/30" },
  { id: 7, placeholder: "bg-gradient-to-br from-accent/30 to-primary/20" },
  { id: 8, placeholder: "bg-gradient-to-br from-primary/20 to-secondary" },
  { id: 9, placeholder: "bg-gradient-to-br from-secondary to-accent/40" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                This began with a simple chikankari half kurta found in my father's wardrobe. 
                It felt authentic, comfortable, and truly me.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                We realized Indian wear had been boxed as 'ethnic' or 'festive.' Our purpose 
                is to make kurtas a stylish, comfortable, everyday choice—rooted in identity, 
                fused with modern style.
              </p>
              
              <div className="p-6 bg-secondary rounded-lg border-l-4 border-primary">
                <p className="text-lg font-medium text-foreground italic">
                  "We are not discarding the West. We are fusing it with our culture. 
                  But Indian remains at the core."
                </p>
              </div>
            </div>

            {/* Brand Mosaic - 3x3 Grid */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden shadow-large">
                {mosaicImages.map((image) => (
                  <div
                    key={image.id}
                    className={`aspect-square ${image.placeholder}`}
                  >
                    {/* Placeholder for future images */}
                  </div>
                ))}
                
                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-2">K</div>
                    <div className="text-xl font-medium">Kalateet</div>
                    <div className="text-sm opacity-80">Est. 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
