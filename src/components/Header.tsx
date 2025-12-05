import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import kalateeLogo from "@/assets/kalateet-logo.png";
import { smoothScrollToSection } from "@/lib/scrollUtils";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    // If not on home page, navigate first then scroll
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => smoothScrollToSection(sectionId), 100);
    } else {
      smoothScrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={kalateeLogo}
                  alt="Kalateet"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
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
                About Us
              </button>
              <Link 
                to="/blog"
                className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
              >
                Blog
              </Link>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
              >
                Contact Us
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-5">
              <Link 
                to="/login"
                className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-smooth font-medium"
              >
                Login
              </Link>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-smooth"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-smooth"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>
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
                  About Us
                </button>
                <Link
                  to="/blog"
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
                >
                  Contact Us
                </button>
                <Link
                  to="/login"
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
