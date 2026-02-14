import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bed, Bath, Square, MapPin, Heart, Share2, ChevronLeft, ChevronRight, 
  X, Phone, Mail, Calendar, Home, Ruler, FileText, Zap, ArrowRight,
  Play, Maximize
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePropertyShowcase } from "@/hooks/useShowcase";
import { ShowcaseCTA } from "@/components/properties/ShowcaseCTA";
import { usePropertyBySlug, useProperties } from "@/hooks/useProperties";

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { property, isLoading, error } = usePropertyBySlug(slug);
  const { properties: allProperties } = useProperties(property?.listingType);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Check if this property has a cinematic showcase
  const { showcase, hasShowcase } = usePropertyShowcase(property?.id);

  // Get similar properties
  const similarProperties = allProperties
    .filter(p => p.id !== property?.id)
    .slice(0, 3);

  // Reset image index when property changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [property?.id]);

  const images = property?.images || [];
  
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageWrapper>
        <section className="relative h-[70vh] lg:h-[80vh] bg-muted animate-pulse" />
        <section className="py-12 lg:py-20 bg-background">
          <div className="container-premium">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
                <div className="h-12 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
                <div className="h-32 bg-muted rounded animate-pulse" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-80 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }

  // Error / not found state
  if (error || !property) {
    return (
      <PageWrapper>
        <section className="py-32 bg-background">
          <div className="container-premium text-center">
            <h1 className="font-serif text-display-3 text-foreground mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/sales">Browse Properties</Link>
            </Button>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero Gallery */}
      <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex] || '/placeholder.svg'}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Gallery navigation */}
        <div className="absolute inset-x-0 bottom-0 top-auto p-6 lg:p-10">
          <div className="container-premium">
            <div className="flex items-end justify-between">
              {/* Thumbnails */}
              <div className="hidden md:flex gap-2">
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "w-20 h-14 rounded-sm overflow-hidden border-2 transition-all",
                      idx === currentImageIndex ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </motion.button>
                ))}
              </div>
              
              {/* Controls */}
              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={prevImage}
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={nextImage}
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsGalleryOpen(true)}
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Maximize className="h-5 w-5" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="absolute top-24 lg:top-32 left-0 right-0">
          <div className="container-premium">
            <Link 
              to={property.listingType === "sale" ? "/sales" : "/lettings"}
              className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to {property.listingType === "sale" ? "Sales" : "Lettings"}
            </Link>
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                    <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-2">
                      {property.title}
                    </h1>
                    <p className="font-serif text-2xl md:text-3xl text-accent">
                      {property.priceFormatted}
                      {property.priceLabel && (
                        <span className="text-lg text-muted-foreground ml-2">{property.priceLabel}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setIsSaved(!isSaved)}
                      className={cn(
                        "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                        isSaved ? "border-accent bg-accent/10 text-accent" : "border-border text-foreground hover:border-accent"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
                    </motion.button>
                    <motion.button
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-4 gap-4 p-6 bg-card rounded-sm border border-border mb-10">
                  <div className="text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-serif text-2xl text-foreground">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-serif text-2xl text-foreground">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Home className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-serif text-2xl text-foreground">{property.receptions}</p>
                    <p className="text-sm text-muted-foreground">Receptions</p>
                  </div>
                  <div className="text-center">
                    <Square className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-serif text-2xl text-foreground">{property.sqft?.toLocaleString() || "—"}</p>
                    <p className="text-sm text-muted-foreground">Sq Ft</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="font-serif text-2xl text-foreground mb-4">
                    About this <span className="italic-accent">property</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <div className="mb-10">
                    <h2 className="font-serif text-2xl text-foreground mb-4">
                      Key <span className="italic-accent">features</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {property.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-secondary rounded-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Property details */}
                <div className="mb-10">
                  <h2 className="font-serif text-2xl text-foreground mb-4">
                    Property <span className="italic-accent">details</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-sm">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="text-foreground capitalize">{property.propertyType.replace("-", " ")}</span>
                    </div>
                    {property.tenure && (
                      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-sm">
                        <span className="text-muted-foreground">Tenure</span>
                        <span className="text-foreground capitalize">{property.tenure}</span>
                      </div>
                    )}
                    {property.epcRating && (
                      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-sm">
                        <span className="text-muted-foreground">EPC Rating</span>
                        <span className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-background",
                          property.epcRating === "A" && "bg-green-500",
                          property.epcRating === "B" && "bg-green-400",
                          property.epcRating === "C" && "bg-yellow-400",
                          property.epcRating === "D" && "bg-yellow-500",
                          property.epcRating === "E" && "bg-orange-400",
                          property.epcRating === "F" && "bg-orange-500",
                          property.epcRating === "G" && "bg-red-500",
                        )}>
                          {property.epcRating}
                        </span>
                      </div>
                    )}
                    {property.councilTaxBand && (
                      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-sm">
                        <span className="text-muted-foreground">Council Tax</span>
                        <span className="text-foreground">Band {property.councilTaxBand}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-32"
              >
                {/* Cinematic Showcase CTA - only shows if showcase exists */}
                {hasShowcase && showcase && (
                  <ShowcaseCTA 
                    showcaseSlug={showcase.slug}
                    tagline={showcase.tagline}
                    heroImage={showcase.hero_image_url}
                    variant="sidebar"
                  />
                )}
                
                {/* Enquiry Form */}
                <div className="bg-card border border-border rounded-sm p-6 mb-6">
                  <h3 className="font-serif text-xl text-foreground mb-4">
                    Enquire about this property
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="First name" className="bg-secondary border-border" />
                      <Input placeholder="Last name" className="bg-secondary border-border" />
                    </div>
                    <Input type="email" placeholder="Email address" className="bg-secondary border-border" />
                    <Input type="tel" placeholder="Phone number" className="bg-secondary border-border" />
                    <Textarea 
                      placeholder="I'm interested in this property..."
                      className="bg-secondary border-border min-h-[100px]"
                    />
                    <Button className="w-full btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                      Send Enquiry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>

                {/* Agent contact */}
                <div className="bg-card border border-border rounded-sm p-6">
                  <p className="text-sm text-muted-foreground mb-4">Need to speak with someone?</p>
                  <div className="space-y-3">
                    <a 
                      href="tel:01246567540"
                      className="flex items-center gap-3 p-3 bg-secondary rounded-sm hover:bg-secondary/80 transition-colors"
                    >
                      <Phone className="h-5 w-5 text-accent" />
                      <span className="text-foreground">01246 567 540</span>
                    </a>
                    <a 
                      href="mailto:info@dalesandpeaks.co.uk"
                      className="flex items-center gap-3 p-3 bg-secondary rounded-sm hover:bg-secondary/80 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-accent" />
                      <span className="text-foreground">info@dalesandpeaks.co.uk</span>
                    </a>
                    <Link 
                      to="/valuation"
                      className="flex items-center gap-3 p-3 bg-secondary rounded-sm hover:bg-secondary/80 transition-colors"
                    >
                      <Calendar className="h-5 w-5 text-accent" />
                      <span className="text-foreground">Book a viewing</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-display-3 text-foreground">
                Similar <span className="italic-accent">properties</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop, idx) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/property/${prop.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                      <img 
                        src={prop.images?.[0] || '/placeholder.svg'} 
                        alt={prop.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">{prop.location}</p>
                    <p className="font-medium text-foreground">{prop.priceFormatted}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {isGalleryOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt=""
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </AnimatePresence>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
