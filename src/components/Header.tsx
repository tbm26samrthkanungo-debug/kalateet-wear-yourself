import { useState } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
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
            <a href="#home" className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium">
              New In
            </a>
            <a href="#products" className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium">
              Apparel
            </a>
            <a href="#about" className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium">
              Stories
            </a>
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
              <a
                href="#home"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#products"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#philosophy"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Philosophy
              </a>
              <a
                href="#stories"
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Stories
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="hero" size="sm" className="w-full">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;