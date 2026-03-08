import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out with questions, styling advice, or just to say hello.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8" />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card rounded-2xl shadow-soft border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">For orders, collaborations, or general inquiries</p>
                  <a href="mailto:hello@kalateet.com" className="text-accent hover:text-accent/80 font-medium transition-smooth">
                    hello@kalateet.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-card rounded-2xl shadow-soft border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Mon–Sat, 10am–7pm IST</p>
                  <a href="tel:+919876543210" className="text-accent hover:text-accent/80 font-medium transition-smooth">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-card rounded-2xl shadow-soft border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">
                    Kalateet Studio<br />
                    Lucknow, Uttar Pradesh<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-card rounded-2xl shadow-soft border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday – Saturday: 10:00 AM – 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Contact;
