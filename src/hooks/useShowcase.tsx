import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ShowcaseData {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  hero_image_url: string | null;
  hero_video_url: string | null;
  is_published: boolean;
}

export function usePropertyShowcase(propertyId: string | undefined) {
  const [showcase, setShowcase] = useState<ShowcaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) {
      setIsLoading(false);
      return;
    }

    const fetchShowcase = async () => {
      try {
        const { data, error } = await supabase
          .from("showcase_properties")
          .select("id, slug, title, tagline, hero_image_url, hero_video_url, is_published")
          .eq("property_id", propertyId)
          .eq("is_published", true)
          .maybeSingle();

        if (error) {
          console.error("Error fetching showcase:", error);
        }

        setShowcase(data);
      } catch (error) {
        console.error("Error fetching showcase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowcase();
  }, [propertyId]);

  return { showcase, isLoading, hasShowcase: !!showcase };
}
