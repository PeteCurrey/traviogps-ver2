import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PropertyFilters as Filters,
  PropertyType,
  ListingType,
  propertyTypeLabels,
  locationOptions,
  salePriceRanges,
  rentPriceRanges,
  bedroomOptions,
} from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  resultCount: number;
}

export function PropertyFilters({ filters, onFiltersChange, resultCount }: PropertyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const priceRanges = filters.listingType === "sale" ? salePriceRanges : rentPriceRanges;

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const togglePropertyType = (type: PropertyType) => {
    const current = filters.propertyTypes || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    updateFilter("propertyTypes", updated.length > 0 ? updated : undefined);
  };

  const toggleLocation = (location: string) => {
    const current = filters.locations || [];
    const updated = current.includes(location)
      ? current.filter(l => l !== location)
      : [...current, location];
    updateFilter("locations", updated.length > 0 ? updated : undefined);
  };

  const clearFilters = () => {
    onFiltersChange({
      listingType: filters.listingType,
    });
  };

  const hasActiveFilters = 
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minBedrooms !== undefined ||
    (filters.propertyTypes && filters.propertyTypes.length > 0) ||
    (filters.locations && filters.locations.length > 0) ||
    filters.searchQuery;

  const getPriceLabel = () => {
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const range = priceRanges.find(
        r => r.min === filters.minPrice && r.max === filters.maxPrice
      );
      return range?.label || "Price Range";
    }
    return "Price Range";
  };

  return (
    <div className="bg-card border-b border-border sticky top-20 lg:top-[104px] z-30">
      <div className="container-premium py-3 md:py-4">
        {/* Main filter bar */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-3">
          {/* Search - full width on mobile */}
          <div className="relative w-full md:flex-1 md:min-w-[200px] md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by location..."
              value={filters.searchQuery || ""}
              onChange={(e) => updateFilter("searchQuery", e.target.value || undefined)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          {/* Filter buttons row - scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {/* Location Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              className={cn(
                "flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm border rounded-sm transition-colors whitespace-nowrap",
                filters.locations?.length
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-secondary text-foreground hover:border-accent/50"
              )}
            >
              <span>
                {filters.locations?.length 
                  ? `${filters.locations.length} area${filters.locations.length > 1 ? 's' : ''}`
                  : "Location"
                }
              </span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openDropdown === "location" && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {openDropdown === "location" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-sm shadow-elevated p-3 z-50"
                >
                  <div className="space-y-2">
                    {locationOptions.map((location) => (
                      <label
                        key={location}
                        className="flex items-center gap-3 p-2 rounded-sm hover:bg-secondary cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.locations?.includes(location) || false}
                          onChange={() => toggleLocation(location)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{location}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
              className={cn(
                "flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm border rounded-sm transition-colors whitespace-nowrap",
                (filters.minPrice !== undefined || filters.maxPrice !== undefined)
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-secondary text-foreground hover:border-accent/50"
              )}
            >
              <span>{getPriceLabel()}</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openDropdown === "price" && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {openDropdown === "price" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-sm shadow-elevated p-2 z-50"
                >
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        updateFilter("minPrice", range.min);
                        updateFilter("maxPrice", range.max);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-sm transition-colors",
                        filters.minPrice === range.min && filters.maxPrice === range.max
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      updateFilter("minPrice", undefined);
                      updateFilter("maxPrice", undefined);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-secondary text-muted-foreground"
                  >
                    Any Price
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bedrooms Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setOpenDropdown(openDropdown === "bedrooms" ? null : "bedrooms")}
              className={cn(
                "flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm border rounded-sm transition-colors whitespace-nowrap",
                filters.minBedrooms
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-secondary text-foreground hover:border-accent/50"
              )}
            >
              <span>
                {filters.minBedrooms ? `${filters.minBedrooms}+ beds` : "Beds"}
              </span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openDropdown === "bedrooms" && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {openDropdown === "bedrooms" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-40 bg-card border border-border rounded-sm shadow-elevated p-2 z-50"
                >
                  {bedroomOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateFilter("minBedrooms", option.value);
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-sm transition-colors",
                        filters.minBedrooms === option.value
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {option.label}+ beds
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      updateFilter("minBedrooms", undefined);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-secondary text-muted-foreground"
                  >
                    Any
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map search button */}
          <Button
            variant="outline"
            asChild
            className="gap-2 flex-shrink-0"
          >
            <Link to="/map-search">
              <Map className="h-4 w-4" />
              <span className="hidden md:inline">Map View</span>
            </Link>
          </Button>

          {/* More filters toggle - hidden on mobile */}
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "gap-2 hidden md:flex flex-shrink-0",
              isExpanded && "border-accent"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            More
          </Button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
          </div>

          {/* Results count - separate row on mobile */}
          <div className="text-sm text-muted-foreground md:ml-auto pt-2 md:pt-0">
            {resultCount} {resultCount === 1 ? "property" : "properties"} found
          </div>
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-border mt-4">
                <h4 className="text-sm font-medium text-foreground mb-3">Property Type</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(propertyTypeLabels).map(([type, label]) => (
                    <button
                      key={type}
                      onClick={() => togglePropertyType(type as PropertyType)}
                      className={cn(
                        "px-3 py-1.5 text-sm border rounded-sm transition-colors",
                        filters.propertyTypes?.includes(type as PropertyType)
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-accent/50"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}
