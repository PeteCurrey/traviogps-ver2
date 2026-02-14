import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { Property, statusLabels } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  index?: number;
  variant?: "grid" | "list";
}

export function PropertyCard({ property, index = 0, variant = "grid" }: PropertyCardProps) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    "available": { label: "", className: "" },
    "under-offer": { label: "Under Offer", className: "bg-gold-muted text-background" },
    "sold": { label: "Sold STC", className: "bg-accent text-accent-foreground" },
    "let-agreed": { label: "Let Agreed", className: "bg-gold-muted text-background" },
  };

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <Link
          to={`/property/${property.slug}`}
          className="group flex flex-col md:flex-row gap-6 p-4 bg-card rounded-sm border border-border hover:border-accent/30 card-hover"
        >
          {/* Image */}
          <div className="relative w-full md:w-80 aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm flex-shrink-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {property.status !== "available" && statusConfig[property.status]?.label && (
              <span className={cn(
                "absolute top-3 left-3 px-3 py-1 text-xs uppercase tracking-wider font-medium rounded-sm",
                statusConfig[property.status].className
              )}>
                {statusConfig[property.status].label}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{property.location}</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">
                {property.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                {property.shortDescription}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {property.features.slice(0, 4).map((feature) => (
                  <span 
                    key={feature}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4" />
                  {property.bedrooms} beds
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4" />
                  {property.bathrooms} baths
                </span>
                {property.sqft && (
                  <span className="flex items-center gap-1.5">
                    <Square className="h-4 w-4" />
                    {property.sqft.toLocaleString()} sq ft
                  </span>
                )}
              </div>
              <p className="font-serif text-2xl text-foreground">
                {property.priceFormatted}
                {property.priceLabel && (
                  <span className="text-sm text-muted-foreground ml-1">
                    {property.priceLabel}
                  </span>
                )}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/property/${property.slug}`}
        className="group block card-hover"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status badge */}
          {property.status !== "available" && statusConfig[property.status]?.label && (
            <span className={cn(
              "absolute top-3 left-3 px-3 py-1 text-xs uppercase tracking-wider font-medium rounded-sm",
              statusConfig[property.status].className
            )}>
              {statusConfig[property.status].label}
            </span>
          )}

          {/* Heart icon */}
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            onClick={(e) => { e.preventDefault(); }}
            aria-label="Save property"
          >
            <Heart className="h-4 w-4 text-foreground" />
          </button>

          {/* Price overlay on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-serif text-lg text-primary">
              {property.priceFormatted}
              {property.priceLabel && (
                <span className="text-xs uppercase tracking-wider text-primary/70 ml-2">
                  {property.priceLabel}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{property.location}</span>
          </div>
          <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
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
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              {property.bathrooms}
            </span>
            {property.sqft && (
              <span className="flex items-center gap-1.5">
                <Square className="h-4 w-4" />
                {property.sqft.toLocaleString()} sq ft
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
