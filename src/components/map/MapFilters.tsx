import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Home, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PropertyFilters, propertyTypeLabels, PropertyType, ListingType } from "@/types/property";
import { cn } from "@/lib/utils";

interface MapFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  resultCount: number;
  className?: string;
}

const propertyTypes: PropertyType[] = [
  "detached",
  "semi-detached",
  "terraced",
  "flat",
  "bungalow",
  "cottage",
  "barn-conversion",
  "farmhouse",
];

const locations = [
  "Peak District",
  "Sheffield",
  "Chesterfield",
  "Nottingham",
  "Bakewell",
  "Matlock",
  "Dronfield",
  "Hathersage",
];

export function MapFilters({
  filters,
  onFiltersChange,
  resultCount,
  className,
}: MapFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, searchQuery });
  };

  const handleListingTypeChange = (type: ListingType) => {
    onFiltersChange({ ...filters, listingType: type });
  };

  const handlePropertyTypeToggle = (type: PropertyType) => {
    const current = filters.propertyTypes || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onFiltersChange({ ...filters, propertyTypes: updated.length ? updated : undefined });
  };

  const handleLocationToggle = (location: string) => {
    const current = filters.locations || [];
    const updated = current.includes(location)
      ? current.filter((l) => l !== location)
      : [...current, location];
    onFiltersChange({ ...filters, locations: updated.length ? updated : undefined });
  };

  const handleBedroomsChange = (value: number[]) => {
    onFiltersChange({ ...filters, minBedrooms: value[0] });
  };

  const handlePriceChange = (value: number[]) => {
    const isRent = filters.listingType === "rent";
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const clearFilters = () => {
    onFiltersChange({ listingType: filters.listingType });
    setSearchQuery("");
  };

  const activeFilterCount =
    (filters.propertyTypes?.length || 0) +
    (filters.locations?.length || 0) +
    (filters.minBedrooms ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  const isRent = filters.listingType === "rent";
  const maxPrice = isRent ? 5000 : 2000000;
  const priceStep = isRent ? 100 : 50000;
  const formatPrice = (value: number) =>
    isRent ? `£${value.toLocaleString()}` : `£${(value / 1000).toFixed(0)}k`;

  return (
    <div
      className={cn(
        "bg-background/95 backdrop-blur-sm border-b border-border",
        className
      )}
    >
      <div className="p-4">
        {/* Main filter bar */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search location, postcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </form>

          {/* Listing type toggle */}
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={filters.listingType === "sale" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleListingTypeChange("sale")}
              className="h-8"
            >
              <Home className="h-4 w-4 mr-1" />
              Buy
            </Button>
            <Button
              variant={filters.listingType === "rent" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleListingTypeChange("rent")}
              className="h-8"
            >
              <Building className="h-4 w-4 mr-1" />
              Rent
            </Button>
          </div>

          {/* Filters button */}
          <Button
            variant={isExpanded ? "default" : "outline"}
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-10"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {/* Result count */}
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {resultCount} {resultCount === 1 ? "property" : "properties"}
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Property Types */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Property Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={filters.propertyTypes?.includes(type) ? "default" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => handlePropertyTypeToggle(type)}
                      >
                        {propertyTypeLabels[type]}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Bedrooms: {filters.minBedrooms || 0}+
                  </Label>
                  <Slider
                    value={[filters.minBedrooms || 0]}
                    onValueChange={handleBedroomsChange}
                    min={0}
                    max={6}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Price: {formatPrice(filters.minPrice || 0)} - {formatPrice(filters.maxPrice || maxPrice)}
                  </Label>
                  <Slider
                    value={[filters.minPrice || 0, filters.maxPrice || maxPrice]}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={maxPrice}
                    step={priceStep}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Locations */}
              <div className="pt-4">
                <Label className="text-sm font-medium mb-3 block">Areas</Label>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Badge
                      key={location}
                      variant={filters.locations?.includes(location) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => handleLocationToggle(location)}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
