import { useState } from "react";
import { LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { Property, SortOption } from "@/types/property";
import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyGridProps {
  properties: Property[];
  onSortChange?: (sort: SortOption) => void;
  currentSort?: SortOption;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "date-newest", label: "Newest First" },
  { value: "date-oldest", label: "Oldest First" },
  { value: "bedrooms-desc", label: "Bedrooms (High to Low)" },
  { value: "bedrooms-asc", label: "Bedrooms (Low to High)" },
];

export function PropertyGrid({ properties, onSortChange, currentSort = "date-newest" }: PropertyGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSortMenu, setShowSortMenu] = useState(false);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort: {sortOptions.find(s => s.value === currentSort)?.label}
          </Button>

          {showSortMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-52 bg-card border border-border rounded-sm shadow-elevated p-2 z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange?.(option.value);
                      setShowSortMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-sm transition-colors",
                      currentSort === option.value
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-secondary rounded-sm p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-sm transition-colors",
              viewMode === "grid" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-sm transition-colors",
              viewMode === "list" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Property grid/list */}
      {properties.length > 0 ? (
        <div className={cn(
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              variant={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">
            No properties found matching your criteria
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
