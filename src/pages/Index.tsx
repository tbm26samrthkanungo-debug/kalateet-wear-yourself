import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiscoverySection from "@/components/DiscoverySection";
import AboutSection from "@/components/AboutSection";
import ProductShowcase from "@/components/ProductShowcase";
import PhilosophySection from "@/components/PhilosophySection";
import LifestyleGallery from "@/components/LifestyleGallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiscoverySection />
      <AboutSection />
      <ProductShowcase />
      <PhilosophySection />
      <LifestyleGallery />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;