import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  images: string[];
  alt?: string;
  className?: string;
  thumbnailClassName?: string;
  showZoomIcon?: boolean;
}

export function GalleryLightbox({
  images,
  alt = "Gallery image",
  className,
  thumbnailClassName,
  showZoomIcon = true,
}: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={cn("grid gap-4", className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={cn(
              "relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
              thumbnailClassName
            )}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {showZoomIcon && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-50 text-white/70 text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Navigation - Previous */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
            )}

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Navigation - Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={cn(
                      "flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all duration-200",
                      index === currentIndex
                        ? "ring-2 ring-accent opacity-100"
                        : "opacity-50 hover:opacity-80"
                    )}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
