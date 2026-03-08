import { ReactNode, useEffect, useRef, useCallback, useState } from "react";
import { X, ChevronDown } from "lucide-react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);

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

  // Swipe-to-close handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollTop = contentRef.current?.scrollTop || 0;
    touchStartY.current = e.touches[0].clientY;
    touchStartScrollTop.current = scrollTop;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    const scrollTop = contentRef.current?.scrollTop || 0;

    // Only allow drag-down when scrolled to top
    if (touchStartScrollTop.current <= 0 && diff > 0) {
      setIsDragging(true);
      setDragY(Math.min(diff * 0.6, 300)); // Damped drag
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      if (dragY > 120) {
        onClose();
      }
      setDragY(0);
      setIsDragging(false);
    }
  }, [isDragging, dragY, onClose]);

  const opacity = isDragging ? Math.max(0.3, 1 - dragY / 400) : 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent
        className="max-w-3xl max-h-[90vh] p-0 gap-0 bg-card rounded-2xl border-0 shadow-large overflow-hidden"
        style={{
          transform: `translate(-50%, calc(-50% + ${dragY}px))`,
          opacity,
          transition: isDragging ? "none" : "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>

        {/* Swipe indicator on mobile */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-background/90 p-2.5 shadow-medium hover:bg-background transition-smooth"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        <div
          ref={contentRef}
          className="overflow-y-auto max-h-[88vh] md:max-h-[90vh]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
