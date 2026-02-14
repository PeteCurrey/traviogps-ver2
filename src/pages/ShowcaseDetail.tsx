import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ChevronDown, X, ArrowLeft, MapPin, Maximize2, Grid3X3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShowcaseProperty {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  price_formatted: string | null;
  hero_video_url: string | null;
  hero_image_url: string | null;
  gallery_images: string[];
  virtual_tour_url: string | null;
  virtual_tour_type: string;
  slug: string;
}

export default function ShowcaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [showcase, setShowcase] = useState<ShowcaseProperty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    const fetchShowcase = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from("showcase_properties")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (error) throw error;
        setShowcase(data);
      } catch (error) {
        console.error("Error fetching showcase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowcase();
  }, [slug]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  if (!showcase) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Showcase not found</h1>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Full Screen Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Media */}
        <motion.div className="absolute inset-0" style={{ scale }}>
          {showcase.hero_video_url ? (
            <video
              ref={videoRef}
              src={showcase.hero_video_url}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
          ) : showcase.hero_image_url ? (
            <img
              src={showcase.hero_image_url}
              alt={showcase.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal to-background" />
          )}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />

        {/* Navigation */}
        <motion.div 
          className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between"
          style={{ opacity }}
        >
          <Button
            variant="ghost"
            asChild
            className="text-primary/80 hover:text-primary hover:bg-primary/10"
          >
            <Link to="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {showcase.gallery_images?.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => setShowGallery(true)}
                className="text-primary/80 hover:text-primary hover:bg-primary/10"
              >
                <Grid3X3 className="h-5 w-5 mr-2" />
                Gallery
              </Button>
            )}
            {showcase.virtual_tour_url && (
              <Button
                onClick={() => setShowTour(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Play className="h-4 w-4 mr-2" />
                Virtual Tour
              </Button>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20"
          style={{ opacity }}
        >
          <div className="max-w-4xl">
            {showcase.location && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-primary/70 mb-4"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm uppercase tracking-[0.2em]">{showcase.location}</span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary mb-4 leading-tight"
            >
              {showcase.title}
            </motion.h1>

            {showcase.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-xl md:text-2xl text-primary/70 italic mb-6"
              >
                {showcase.tagline}
              </motion.p>
            )}

            {showcase.price_formatted && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl md:text-3xl font-medium text-accent"
              >
                {showcase.price_formatted}
              </motion.p>
            )}
          </div>

          {/* Video Controls */}
          {showcase.hero_video_url && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 right-6 flex items-center gap-2"
            >
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToContent}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary/50 mb-2">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-primary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Description Section */}
      {showcase.description && (
        <section className="min-h-screen bg-background flex items-center">
          <div className="container-premium py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6">The Property</p>
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed">
                {showcase.description}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {showcase.gallery_images?.length > 0 && (
        <section className="bg-card py-20">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Gallery</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Discover every <span className="italic">detail</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {showcase.gallery_images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative overflow-hidden rounded-sm cursor-pointer group",
                    idx === 0 && "col-span-2 row-span-2"
                  )}
                  onClick={() => {
                    setActiveGalleryIndex(idx);
                    setShowGallery(true);
                  }}
                >
                  <div className={cn("aspect-square", idx === 0 && "aspect-[4/3]")}>
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors flex items-center justify-center">
                    <Maximize2 className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-accent">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-accent-foreground mb-6">
              Interested in this property?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/contact">Arrange a Viewing</Link>
              </Button>
              {showcase.virtual_tour_url && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowTour(true)}
                  className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Take Virtual Tour
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Tour Modal */}
      <AnimatePresence>
        {showTour && showcase.virtual_tour_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <button
              onClick={() => setShowTour(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={showcase.virtual_tour_url}
              className="w-full h-full"
              allowFullScreen
              title="Virtual Tour"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {showGallery && showcase.gallery_images?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="w-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={activeGalleryIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={showcase.gallery_images[activeGalleryIndex]}
                alt={`Gallery ${activeGalleryIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
              />
              
              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                {showcase.gallery_images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={cn(
                      "w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 transition-opacity",
                      idx === activeGalleryIndex ? "ring-2 ring-accent" : "opacity-50 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
