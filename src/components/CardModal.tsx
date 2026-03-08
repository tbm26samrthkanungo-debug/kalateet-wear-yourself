import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const CardModal = ({ isOpen, onClose, children, title = "Details" }: CardModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-card rounded-2xl border-0 shadow-large">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-background/90 p-2.5 shadow-medium hover:bg-background transition-smooth"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
