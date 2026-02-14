import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Expand, Minimize } from "lucide-react";
import { PropertyMap } from "@/components/map/PropertyMap";
import { MapPropertyList } from "@/components/map/MapPropertyList";
import { MapFilters } from "@/components/map/MapFilters";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";
import { Property, PropertyFilters as Filters } from "@/types/property";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MapSearch() {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<Filters>({ listingType: "sale" });
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>();
  const [drawnProperties, setDrawnProperties] = useState<Property[] | null>(null);
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch properties from database based on listing type
  const { properties: allProperties, isLoading } = useProperties(filters.listingType);

  // Filter properties based on all criteria
  const filteredProperties = useMemo(() => {
    let result = allProperties;

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.address.area.toLowerCase().includes(query) ||
          p.address.city.toLowerCase().includes(query) ||
          p.address.postcode.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (filters.locations?.length) {
      result = result.filter((p) =>
        filters.locations!.some(
          (loc) =>
            p.location.toLowerCase().includes(loc.toLowerCase()) ||
            p.address.city.toLowerCase().includes(loc.toLowerCase()) ||
            p.address.area.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // Price range
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Bedrooms
    if (filters.minBedrooms !== undefined) {
      result = result.filter((p) => p.bedrooms >= filters.minBedrooms!);
    }

    // Property types
    if (filters.propertyTypes?.length) {
      result = result.filter((p) => filters.propertyTypes!.includes(p.propertyType));
    }

    return result;
  }, [allProperties, filters]);

  // Properties to display (considering drawn area if any)
  const displayedProperties = drawnProperties ?? filteredProperties;

  const handlePropertySelect = useCallback((property: Property) => {
    setSelectedPropertyId(property.id);
  }, []);

  const handleBoundsChange = useCallback((properties: Property[]) => {
    // Only update visible properties if no drawn area is active
    // This is handled in the map component now
  }, []);

  const handleDrawComplete = useCallback((properties: Property[]) => {
    if (properties.length === filteredProperties.length) {
      // Draw was cleared
      setDrawnProperties(null);
    } else {
      setDrawnProperties(properties);
    }
  }, [filteredProperties.length]);

  // Reset drawn properties when filters change
  useMemo(() => {
    setDrawnProperties(null);
  }, [filters.listingType]);

  return (
    <div
      className={`flex flex-col ${
        isFullscreen ? "fixed inset-0 z-50" : "h-screen"
      } bg-background`}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 py-3 border-b border-border bg-background z-10"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to={filters.listingType === "sale" ? "/sales" : "/lettings"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to list
            </Link>
          </Button>
          <div className="hidden md:block">
            <h1 className="font-serif text-xl text-foreground">Map Search</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {drawnProperties && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm text-accent font-medium"
            >
              {drawnProperties.length} properties in drawn area
            </motion.div>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Expand className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.header>

      {/* Filters */}
      <MapFilters
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={displayedProperties.length}
      />

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Property list sidebar */}
        {!isMobile && (
          <MapPropertyList
            properties={displayedProperties}
            selectedPropertyId={selectedPropertyId}
            onPropertySelect={handlePropertySelect}
            isCollapsed={isListCollapsed}
            onToggleCollapse={() => setIsListCollapsed(!isListCollapsed)}
          />
        )}

        {/* Map */}
        <div className="flex-1 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
            </div>
          ) : (
            <PropertyMap
              properties={filteredProperties}
              onPropertySelect={handlePropertySelect}
              onBoundsChange={handleBoundsChange}
              onDrawComplete={handleDrawComplete}
              selectedPropertyId={selectedPropertyId}
            />
          )}

          {/* Draw instructions */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg"
            >
              <p className="text-sm text-muted-foreground">
                Use the <span className="font-medium text-foreground">draw tools</span> on the left to search within a custom area
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile property drawer */}
      {isMobile && selectedPropertyId && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="absolute bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-xl shadow-2xl max-h-[60vh] overflow-auto"
        >
          <div className="p-4">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
            <MapPropertyList
              properties={displayedProperties.filter((p) => p.id === selectedPropertyId)}
              selectedPropertyId={selectedPropertyId}
              onPropertySelect={handlePropertySelect}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
