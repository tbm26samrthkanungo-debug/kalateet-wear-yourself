import mosaic1 from "@/assets/mosaic-1.jpg";
import mosaic2 from "@/assets/mosaic-2.jpg";
import mosaic3 from "@/assets/mosaic-3.jpg";
import mosaic4 from "@/assets/mosaic-4.jpg";
import mosaic5 from "@/assets/mosaic-5.jpg";
import mosaic6 from "@/assets/mosaic-6.jpg";
import mosaic7 from "@/assets/mosaic-7.jpg";
import mosaic8 from "@/assets/mosaic-8.jpg";
import mosaic9 from "@/assets/mosaic-9.jpg";

const mosaicImages = [
  mosaic1,
  mosaic2,
  mosaic3,
  mosaic4,
  mosaic5,
  mosaic6,
  mosaic7,
  mosaic8,
  mosaic9,
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
                {mosaicImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden"
                  >
                    <img 
                      src={image} 
                      alt={`Kalateet brand mosaic ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Overlay with subtle dark background for readability */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                  <div className="text-center text-white drop-shadow-lg">
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
