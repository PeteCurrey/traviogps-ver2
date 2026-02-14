import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Bed, Bath, Square, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface MapPropertyListProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertySelect: (property: Property) => void;
  onPropertyHover?: (property: Property | null) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function MapPropertyList({
  properties,
  selectedPropertyId,
  onPropertySelect,
  onPropertyHover,
  isCollapsed = false,
  onToggleCollapse,
  className,
}: MapPropertyListProps) {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 48 : 400 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative h-full bg-background border-r border-border flex flex-col overflow-hidden",
        className
      )}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="absolute top-4 right-0 translate-x-1/2 z-10 rounded-full bg-background border border-border shadow-md"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {!isCollapsed && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h2 className="font-serif text-xl text-foreground">
              {properties.length} {properties.length === 1 ? "Property" : "Properties"}
            </h2>
            <p className="text-sm text-muted-foreground">
              in current view
            </p>
          </div>

          {/* Property list */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {properties.map((property, index) => (
                  <PropertyListCard
                    key={property.id}
                    property={property}
                    isSelected={property.id === selectedPropertyId}
                    onClick={() => onPropertySelect(property)}
                    onMouseEnter={() => onPropertyHover?.(property)}
                    onMouseLeave={() => onPropertyHover?.(null)}
                    index={index}
                  />
                ))}
              </AnimatePresence>

              {properties.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-serif text-lg text-foreground mb-2">No properties in view</h3>
                  <p className="text-sm text-muted-foreground">
                    Zoom out or pan the map to see more properties
                  </p>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </>
      )}
    </motion.div>
  );
}

interface PropertyListCardProps {
  property: Property;
  isSelected?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  index: number;
}

function PropertyListCard({
  property,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  index,
}: PropertyListCardProps) {
  const statusBadge = () => {
    if (property.status === "under-offer") return <Badge variant="secondary">Under Offer</Badge>;
    if (property.status === "sold") return <Badge variant="destructive">Sold</Badge>;
    if (property.status === "let-agreed") return <Badge variant="secondary">Let Agreed</Badge>;
    return null;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "group relative rounded-lg overflow-hidden border transition-all cursor-pointer",
        isSelected
          ? "border-accent ring-2 ring-accent/20"
          : "border-border hover:border-accent/50"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {statusBadge()}
          {property.listingType === "rent" && (
            <Badge className="bg-blue-600">To Let</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-base text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>
        </div>
        
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {property.location}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-accent">
            {property.priceFormatted}
            {property.priceLabel && (
              <span className="text-xs font-normal text-muted-foreground ml-1">
                {property.priceLabel}
              </span>
            )}
          </span>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3 w-3" />
              {property.bathrooms}
            </span>
            {property.sqft && (
              <span className="flex items-center gap-1">
                <Square className="h-3 w-3" />
                {property.sqft.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* View link */}
      <Link
        to={`/property/${property.slug}`}
        className="absolute inset-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="sr-only">View {property.title}</span>
      </Link>
    </motion.div>
  );
}
