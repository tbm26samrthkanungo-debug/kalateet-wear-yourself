import { useState } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.png";
import { smoothScrollToSection } from "@/lib/scrollUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    smoothScrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={kalateeLogo}
              alt="Kalateet"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
            <button 
              onClick={() => handleNavClick('products')}
              className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
            >
              Collection
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('philosophy')}
              className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
            >
              Craft
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium">
              Search
            </button>
            <button className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium">
              Login
            </button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border shadow-medium">
              <button
                onClick={() => handleNavClick('products')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
              >
                Collection
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('philosophy')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
              >
                Craft
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;