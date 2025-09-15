const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-crimson font-semibold text-foreground mb-6">
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
              
              <div className="p-6 bg-primary-muted rounded-lg border-l-4 border-primary">
                <p className="text-lg font-medium text-foreground italic">
                  "We are not discarding the West. We are fusing it with our culture. 
                  But Indian remains at the core."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-secondary to-accent rounded-2xl shadow-large overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-foreground">
                    <div className="text-6xl font-crimson font-bold mb-4">K</div>
                    <div className="text-xl font-medium">Kalateet</div>
                    <div className="text-sm text-muted-foreground">Est. 2024</div>
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