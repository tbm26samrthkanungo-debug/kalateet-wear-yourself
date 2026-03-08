import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-earth-deep text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-4">Kalateet</h2>
            <p className="text-white/80 leading-relaxed max-w-md">
              Reimagining Indian wear for everyday life. Rooted in tradition,
              designed for the modern world.
            </p>
            <div className="mt-4 text-sm text-white/60 italic">
              Rooted. Modern. Yours.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-smooth">Home</Link>
              </li>
              <li>
                <Link to="/collection" className="text-white/80 hover:text-white transition-smooth">Collection</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-smooth">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-smooth">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-smooth">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-smooth">Size Guide</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-smooth">Care Instructions</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-smooth">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-smooth">Contact Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-smooth">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">© 2024 Kalateet. All rights reserved.</p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">Made with ❤️ for the modern Indian</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
