import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface SavedProperty {
  id: string;
  property_id: string;
  saved_at: string;
  notes: string | null;
}

export function useSavedProperties() {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch saved properties
  const fetchSavedProperties = useCallback(async () => {
    if (!user) {
      setSavedProperties([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select("*")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });

      if (error) throw error;
      setSavedProperties(data || []);
    } catch (err) {
      console.error("Error fetching saved properties:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSavedProperties();
  }, [fetchSavedProperties]);

  // Save a property
  const saveProperty = useCallback(
    async (propertyId: string, notes?: string) => {
      if (!user) return { success: false, error: "Not authenticated" };

      try {
        const { error } = await supabase.from("saved_properties").insert({
          user_id: user.id,
          property_id: propertyId,
          notes,
        });

        if (error) throw error;

        await fetchSavedProperties();
        return { success: true };
      } catch (err: any) {
        console.error("Error saving property:", err);
        return { success: false, error: err.message };
      }
    },
    [user, fetchSavedProperties]
  );

  // Remove saved property
  const removeSavedProperty = useCallback(
    async (propertyId: string) => {
      if (!user) return { success: false, error: "Not authenticated" };

      try {
        const { error } = await supabase
          .from("saved_properties")
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", propertyId);

        if (error) throw error;

        await fetchSavedProperties();
        return { success: true };
      } catch (err: any) {
        console.error("Error removing saved property:", err);
        return { success: false, error: err.message };
      }
    },
    [user, fetchSavedProperties]
  );

  // Check if property is saved
  const isPropertySaved = useCallback(
    (propertyId: string) => {
      return savedProperties.some((sp) => sp.property_id === propertyId);
    },
    [savedProperties]
  );

  // Toggle save state
  const toggleSaveProperty = useCallback(
    async (propertyId: string) => {
      if (isPropertySaved(propertyId)) {
        return removeSavedProperty(propertyId);
      } else {
        return saveProperty(propertyId);
      }
    },
    [isPropertySaved, saveProperty, removeSavedProperty]
  );

  return {
    savedProperties,
    isLoading,
    saveProperty,
    removeSavedProperty,
    isPropertySaved,
    toggleSaveProperty,
    refetch: fetchSavedProperties,
  };
}
