import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { X, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
});

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

const WaitlistModal = ({ isOpen, onClose, productId }: WaitlistModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = waitlistSchema.safeParse({ name, email, phone: phone || undefined });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("waitlist").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      product_id: productId || null,
    });

    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-md p-0 gap-0 bg-card rounded-2xl border border-border shadow-large overflow-hidden">
        <DialogTitle className="sr-only">Join Waitlist</DialogTitle>

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-background/90 p-2 shadow-soft hover:bg-background transition-smooth"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>

        <div className="p-8 lg:p-10">
          {submitted ? (
            <div className="text-center py-6 animate-fade-in">
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2 font-sanchez">
                You're on the list.
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We'll notify you when the next drop opens.
              </p>
              <Button
                onClick={handleClose}
                variant="outline"
                className="mt-6 border-border text-foreground hover:bg-muted font-light tracking-wide"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-foreground mb-2 font-sanchez tracking-wide">
                Join the Waitlist
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Be the first to know when our next drop goes live.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="wl-name" className="text-xs uppercase tracking-wider font-medium text-foreground">
                    Name
                  </Label>
                  <Input
                    id="wl-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1 bg-background border-border focus:border-primary"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="wl-email" className="text-xs uppercase tracking-wider font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="wl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 bg-background border-border focus:border-primary"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="wl-phone" className="text-xs uppercase tracking-wider font-medium text-foreground">
                    Phone <span className="text-muted-foreground font-normal normal-case">(optional)</span>
                  </Label>
                  <Input
                    id="wl-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-1 bg-background border-border focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal tracking-wide mt-2 border border-primary"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Join Waitlist
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
