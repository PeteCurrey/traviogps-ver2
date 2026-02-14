import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface DevelopmentHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface DevelopmentPropertyType {
  name: string;
  bedrooms: string;
  price: string;
  sqft: string;
  available: number;
}

export interface Development {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  location: string;
  developer: string;
  units: string | null;
  price_from: string | null;
  status: string | null;
  description: string | null;
  image: string | null;
  features: string[];
  hero_image: string | null;
  gallery_images: string[];
  overview: string | null;
  highlights: DevelopmentHighlight[];
  property_types: DevelopmentPropertyType[];
  amenities: string[];
  location_description: string | null;
  completion_date: string | null;
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type DevelopmentInsert = Omit<Development, "id" | "created_at" | "updated_at">;
export type DevelopmentUpdate = Partial<DevelopmentInsert>;

// Helper to convert our types to database-compatible JSON
function toDbHighlights(highlights: DevelopmentHighlight[]): Json {
  return highlights as unknown as Json;
}

function toDbPropertyTypes(propertyTypes: DevelopmentPropertyType[]): Json {
  return propertyTypes as unknown as Json;
}

// Helper to parse JSON from database
function parseHighlights(json: Json | null): DevelopmentHighlight[] {
  if (!json || !Array.isArray(json)) return [];
  return json as unknown as DevelopmentHighlight[];
}

function parsePropertyTypes(json: Json | null): DevelopmentPropertyType[] {
  if (!json || !Array.isArray(json)) return [];
  return json as unknown as DevelopmentPropertyType[];
}

export function useDevelopments(publishedOnly = true) {
  return useQuery({
    queryKey: ["developments", publishedOnly],
    queryFn: async () => {
      let query = supabase
        .from("developments")
        .select("*")
        .order("display_order", { ascending: true });

      if (publishedOnly) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((d) => ({
        ...d,
        features: d.features || [],
        gallery_images: d.gallery_images || [],
        amenities: d.amenities || [],
        highlights: parseHighlights(d.highlights),
        property_types: parsePropertyTypes(d.property_types),
      })) as Development[];
    },
  });
}

export function useDevelopment(slug: string | undefined) {
  return useQuery({
    queryKey: ["development", slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from("developments")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        features: data.features || [],
        gallery_images: data.gallery_images || [],
        amenities: data.amenities || [],
        highlights: parseHighlights(data.highlights),
        property_types: parsePropertyTypes(data.property_types),
      } as Development;
    },
    enabled: !!slug,
  });
}

export function useCreateDevelopment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (development: DevelopmentInsert) => {
      const dbData = {
        ...development,
        highlights: toDbHighlights(development.highlights),
        property_types: toDbPropertyTypes(development.property_types),
      };

      const { data, error } = await supabase
        .from("developments")
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["developments"] });
      toast.success("Development created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create development: ${error.message}`);
    },
  });
}

export function useUpdateDevelopment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: DevelopmentUpdate & { id: string }) => {
      const dbUpdates: Record<string, unknown> = { ...updates };
      
      if (updates.highlights) {
        dbUpdates.highlights = toDbHighlights(updates.highlights);
      }
      if (updates.property_types) {
        dbUpdates.property_types = toDbPropertyTypes(updates.property_types);
      }

      const { data, error } = await supabase
        .from("developments")
        .update(dbUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["developments"] });
      queryClient.invalidateQueries({ queryKey: ["development", data.slug] });
      toast.success("Development updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update development: ${error.message}`);
    },
  });
}

export function useDeleteDevelopment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("developments").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["developments"] });
      toast.success("Development deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete development: ${error.message}`);
    },
  });
}
