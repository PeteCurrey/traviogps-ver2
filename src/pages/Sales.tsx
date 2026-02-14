import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { useProperties } from "@/hooks/useProperties";
import { PropertyFilters as Filters, SortOption } from "@/types/property";

export default function SalesPage() {
  const { properties: allProperties, isLoading } = useProperties("sale");
  
  const [filters, setFilters] = useState<Filters>({
    listingType: "sale",
  });
  
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");

  const filteredProperties = useMemo(() => {
    let result = allProperties;

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.address.area.toLowerCase().includes(query) ||
        p.address.city.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (filters.locations && filters.locations.length > 0) {
      result = result.filter(p => 
        filters.locations!.some(loc => 
          p.location.toLowerCase().includes(loc.toLowerCase()) ||
          p.address.city.toLowerCase().includes(loc.toLowerCase()) ||
          p.address.area.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // Price range
    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    // Bedrooms
    if (filters.minBedrooms !== undefined) {
      result = result.filter(p => p.bedrooms >= filters.minBedrooms!);
    }

    // Property types
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      result = result.filter(p => filters.propertyTypes!.includes(p.propertyType));
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "date-oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "bedrooms-asc":
          return a.bedrooms - b.bedrooms;
        case "bedrooms-desc":
          return b.bedrooms - a.bedrooms;
        default:
          return 0;
      }
    });

    return result;
  }, [allProperties, filters, sortOption]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-12 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Properties for Sale
            </p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Find <span className="italic-accent">your</span> perfect home
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover exceptional properties across the Peak District, Sheffield, 
              Chesterfield, and Nottingham. From countryside retreats to city living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={filteredProperties.length}
      />

      {/* Property Grid */}
      <section className="py-12 bg-background">
        <div className="container-premium">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
            </div>
          ) : (
            <PropertyGrid
              properties={filteredProperties}
              currentSort={sortOption}
              onSortChange={setSortOption}
            />
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
