import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Property, ListingType } from "@/types/property";

type DbProperty = Tables<"properties">;

// Transform database property to frontend Property type
const transformProperty = (dbProperty: DbProperty): Property => ({
  id: dbProperty.id,
  title: dbProperty.title,
  slug: dbProperty.slug,
  price: Number(dbProperty.price),
  priceFormatted: dbProperty.price_formatted,
  priceLabel: dbProperty.price_label || undefined,
  address: {
    street: dbProperty.street,
    area: dbProperty.area,
    city: dbProperty.city,
    postcode: dbProperty.postcode,
  },
  location: dbProperty.location,
  coordinates: dbProperty.latitude && dbProperty.longitude 
    ? { lat: Number(dbProperty.latitude), lng: Number(dbProperty.longitude) }
    : undefined,
  bedrooms: dbProperty.bedrooms,
  bathrooms: dbProperty.bathrooms,
  receptions: dbProperty.receptions,
  sqft: dbProperty.sqft || undefined,
  propertyType: dbProperty.property_type as Property["propertyType"],
  listingType: dbProperty.listing_type as ListingType,
  status: dbProperty.status as Property["status"],
  features: dbProperty.features || [],
  description: dbProperty.description || "",
  shortDescription: dbProperty.short_description || "",
  images: dbProperty.images || [],
  floorPlan: dbProperty.floor_plan || undefined,
  virtualTourUrl: dbProperty.virtual_tour_url || undefined,
  epcRating: dbProperty.epc_rating as Property["epcRating"],
  councilTaxBand: dbProperty.council_tax_band || undefined,
  tenure: dbProperty.tenure as Property["tenure"],
  availableFrom: dbProperty.available_from || undefined,
  createdAt: dbProperty.created_at,
  updatedAt: dbProperty.updated_at,
  featured: dbProperty.featured,
});

export function useProperties(listingType?: ListingType) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        let query = supabase
          .from("properties")
          .select("*")
          .order("created_at", { ascending: false });

        if (listingType) {
          query = query.eq("listing_type", listingType);
        }

        const { data, error } = await query;

        if (error) throw error;

        const transformedProperties = (data || []).map(transformProperty);
        setProperties(transformedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [listingType]);

  return { properties, isLoading, error };
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("featured", true)
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;

        const transformedProperties = (data || []).map(transformProperty);
        setProperties(transformedProperties);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { properties, isLoading };
}

export function usePropertyBySlug(slug: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        setProperty(data ? transformProperty(data) : null);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Property not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  return { property, isLoading, error };
}
