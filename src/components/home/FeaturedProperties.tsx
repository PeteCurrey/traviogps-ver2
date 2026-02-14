import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFeaturedProperties } from "@/hooks/useProperties";

const statusLabels: Record<string, { label: string; className: string }> = {
  "available": { label: "", className: "" },
  "under-offer": { label: "Under Offer", className: "bg-gold-muted text-background" },
  "sold": { label: "Sold", className: "bg-accent text-accent-foreground" },
  "let-agreed": { label: "Let Agreed", className: "bg-gold-muted text-background" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function FeaturedProperties() {
  const { properties: featuredProperties, isLoading } = useFeaturedProperties();

  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-accent mb-3"
            >
              Featured Properties
            </motion.p>
            <h2 className="font-serif text-display-3 text-foreground">
              Your <span className="italic-accent">Perfect</span> Move
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-3"
          >
            <Button asChild variant="outline" className="border-border hover:bg-secondary hover:scale-105 transition-all duration-300">
              <Link to="/sales">View All Sales</Link>
            </Button>
            <Button asChild variant="outline" className="border-border hover:bg-secondary hover:scale-105 transition-all duration-300">
              <Link to="/lettings">View All Lettings</Link>
            </Button>
          </motion.div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-sm mb-4" />
                <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                <div className="h-5 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-1/2 mb-3" />
                <div className="flex gap-4">
                  <div className="h-4 bg-muted rounded w-12" />
                  <div className="h-4 bg-muted rounded w-12" />
                  <div className="h-4 bg-muted rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No featured properties available</p>
          </div>
        ) : (
          /* Property Grid */
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredProperties.slice(0, 4).map((property) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
              >
                <Link
                  to={`/property/${property.slug}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <motion.img
                      src={property.images?.[0] || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    
                    {/* Status badge */}
                    {property.status && statusLabels[property.status]?.label && (
                      <motion.span 
                        className={cn(
                          "absolute top-3 left-3 px-3 py-1 text-xs uppercase tracking-wider font-medium rounded-sm",
                          statusLabels[property.status].className
                        )}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {statusLabels[property.status].label}
                      </motion.span>
                    )}

                    {/* Heart icon */}
                    <motion.button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110"
                      onClick={(e) => { e.preventDefault(); }}
                      aria-label="Save property"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="h-4 w-4 text-foreground" />
                    </motion.button>

                    {/* Price overlay on hover */}
                    <motion.div 
                      className="absolute bottom-3 left-3 right-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-serif text-lg text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {property.priceLabel && (
                          <span className="text-xs uppercase tracking-wider text-primary/70 mr-2">
                            {property.priceLabel}
                          </span>
                        )}
                        {property.priceFormatted}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{property.location}</span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {property.title}
                    </h3>
                    <p className="font-medium text-foreground mb-3">
                      {property.priceFormatted}
                      {property.priceLabel && (
                        <span className="text-sm text-muted-foreground ml-1">
                          {property.priceLabel}
                        </span>
                      )}
                    </p>
                    
                    {/* Property features */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5 group-hover:text-foreground transition-colors duration-300">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1.5 group-hover:text-foreground transition-colors duration-300">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms}
                      </span>
                      {property.sqft && (
                        <span className="flex items-center gap-1.5 group-hover:text-foreground transition-colors duration-300">
                          <Square className="h-4 w-4" />
                          {property.sqft.toLocaleString()} sq ft
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
