interface LifestyleStory {
  id: number;
  scenario: string;
  description: string;
  image?: string; // Will be replaced with actual customer photos
  placeholderStyle: string;
}

const lifestyleStories: LifestyleStory[] = [
  {
    id: 1,
    scenario: "College Campus",
    description: "Paired with jeans and sneakers for that perfect campus look",
    placeholderStyle: "bg-gradient-to-br from-secondary to-accent"
  },
  {
    id: 2,
    scenario: "Coffee Date",
    description: "Effortlessly stylish for casual meetups and conversations",
    placeholderStyle: "bg-gradient-to-br from-accent to-secondary"
  },
  {
    id: 3,
    scenario: "Work from Home",
    description: "Comfortable yet professional for virtual meetings",
    placeholderStyle: "bg-gradient-to-br from-secondary to-primary/30"
  },
  {
    id: 4,
    scenario: "Weekend Concert",
    description: "Stand out in the crowd with authentic Indian street style",
    placeholderStyle: "bg-gradient-to-br from-primary/30 to-accent"
  }
];

const LifestyleGallery = () => {
  return (
    <section id="stories" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Your Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how our community styles Kalateet kurtas in their everyday lives, 
            breaking boundaries and creating new narratives.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyleStories.map((story) => (
            <div
              key={story.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-large transition-smooth">
                <div className={`aspect-[4/5] relative ${story.image ? '' : story.placeholderStyle}`}>
                  {/* Customer photo or placeholder */}
                  {story.image ? (
                    <img 
                      src={story.image} 
                      alt={story.scenario}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-semibold text-xl mb-2">
                      {story.scenario}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Share Your Story
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Tag us @kalateet and show the world how you're redefining everyday Indian wear.
            </p>
            <button className="text-primary hover:text-primary/80 font-medium transition-smooth underline-offset-4 hover:underline">
              #KalaTeetStyle →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
