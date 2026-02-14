import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PropertyFilters } from "@/types/property";

interface SearchAlert {
  id: string;
  name: string;
  filters: PropertyFilters;
  frequency: "instant" | "daily" | "weekly";
  is_active: boolean;
  last_sent_at: string | null;
  created_at: string;
}

export function useSearchAlerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<SearchAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    if (!user) {
      setAlerts([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("search_alerts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Type cast the filters from JSONB
      const typedData = (data || []).map((alert) => ({
        ...alert,
        filters: (alert.filters || { listingType: "sale" }) as unknown as PropertyFilters,
        frequency: alert.frequency as "instant" | "daily" | "weekly",
      }));
      
      setAlerts(typedData);
    } catch (err) {
      console.error("Error fetching search alerts:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Create alert
  const createAlert = useCallback(
    async (
      name: string,
      filters: PropertyFilters,
      frequency: "instant" | "daily" | "weekly" = "daily"
    ) => {
      if (!user) return { success: false, error: "Not authenticated" };

      try {
        const { error } = await supabase.from("search_alerts").insert({
          user_id: user.id,
          name,
          filters: filters as any,
          frequency,
        });

        if (error) throw error;

        await fetchAlerts();
        return { success: true };
      } catch (err: any) {
        console.error("Error creating search alert:", err);
        return { success: false, error: err.message };
      }
    },
    [user, fetchAlerts]
  );

  // Update alert
  const updateAlert = useCallback(
    async (
      alertId: string,
      updates: Partial<Pick<SearchAlert, "name" | "filters" | "frequency" | "is_active">>
    ) => {
      if (!user) return { success: false, error: "Not authenticated" };

      try {
        const { error } = await supabase
          .from("search_alerts")
          .update({
            ...updates,
            filters: updates.filters as any,
          })
          .eq("id", alertId)
          .eq("user_id", user.id);

        if (error) throw error;

        await fetchAlerts();
        return { success: true };
      } catch (err: any) {
        console.error("Error updating search alert:", err);
        return { success: false, error: err.message };
      }
    },
    [user, fetchAlerts]
  );

  // Delete alert
  const deleteAlert = useCallback(
    async (alertId: string) => {
      if (!user) return { success: false, error: "Not authenticated" };

      try {
        const { error } = await supabase
          .from("search_alerts")
          .delete()
          .eq("id", alertId)
          .eq("user_id", user.id);

        if (error) throw error;

        await fetchAlerts();
        return { success: true };
      } catch (err: any) {
        console.error("Error deleting search alert:", err);
        return { success: false, error: err.message };
      }
    },
    [user, fetchAlerts]
  );

  // Toggle alert active state
  const toggleAlert = useCallback(
    async (alertId: string) => {
      const alert = alerts.find((a) => a.id === alertId);
      if (!alert) return { success: false, error: "Alert not found" };

      return updateAlert(alertId, { is_active: !alert.is_active });
    },
    [alerts, updateAlert]
  );

  return {
    alerts,
    isLoading,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    refetch: fetchAlerts,
  };
}
