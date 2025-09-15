const Footer = () => {
  return (
    <footer className="bg-earth-deep text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-crimson font-semibold mb-4">
              Kalateet
            </h2>
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
                <a href="#home" className="text-white/80 hover:text-white transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-smooth">
                  About
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/80 hover:text-white transition-smooth">
                  Shop
                </a>
              </li>
              <li>
                <a href="#philosophy" className="text-white/80 hover:text-white transition-smooth">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#stories" className="text-white/80 hover:text-white transition-smooth">
                  Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-smooth">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-smooth">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-smooth">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-smooth">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-smooth">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 Kalateet. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Made with ❤️ for the modern Indian
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;