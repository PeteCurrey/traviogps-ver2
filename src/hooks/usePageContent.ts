import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface PageContentData {
  [key: string]: string | number | boolean | string[] | PageContentData;
}

const defaultContent: Record<string, PageContentData> = {
  home_hero: {
    tagline: "Powering Every Working Day",
    heading: "Fleet Management Solutions for",
    headingAccent: "UK Businesses",
    card1Category: "GPS Tracking",
    card1Title: "Vehicle",
    card1Accent: "Tracking",
    card2Category: "HD Video",
    card2Title: "Connected",
    card2Accent: "Dash Cams",
    card3Category: "Complete Control",
    card3Title: "Fleet",
    card3Accent: "Management",
  },
  home_stats: {
    sectionLabel: "Proven Results",
    sectionHeading: "Trusted by UK Fleets",
    stat1Value: "15",
    stat1Suffix: "%",
    stat1Label: "Average Fuel Savings",
    stat2Value: "22000",
    stat2Suffix: "+",
    stat2Label: "Business Fleets",
    stat3Value: "98",
    stat3Suffix: "%",
    stat3Label: "Customer Retention",
    stat4Value: "200",
    stat4Prefix: "£",
    stat4Suffix: "M+",
    stat4Label: "Calculated Savings",
  },
  home_about: {
    sectionLabel: "Why Travio",
    heading: "Manage Your Fleet with",
    headingAccent: "Confidence",
    feature1: "See every vehicle and job in one place",
    feature2: "Get alerts for delays, maintenance or route deviations",
    feature3: "Make fast decisions that keep teams on schedule",
    feature4: "Access reports and insights instantly",
    ctaText: "Learn How Fleet Tracking Works",
  },
  home_services: {
    sectionLabel: "Key Benefits",
    heading: "Why Choose",
    headingAccent: "Travio",
    service1Title: "Complete More Jobs",
    service1Description: "Fit 2–3 extra jobs into your day with smarter scheduling and live updates.",
    service2Title: "Ongoing Support",
    service2Description: "Our UK-based team helps you get up and running and keeps you moving.",
    service3Title: "Proven Savings",
    service3Description: "Cut waste and reduce running costs with insights into driver behaviour.",
    service4Title: "Stay Compliant",
    service4Description: "Automatic records and digital checks reduce admin and risk.",
  },
  home_cta: {
    sectionLabel: "Get Started Today",
    heading: "Ready to Take Control of",
    headingAccent: "Your Fleet?",
    description: "Join 22,000+ businesses who trust Travio to manage their fleet. Get a quote today or book a free demo.",
    primaryCta: "Get a Quote",
    secondaryCta: "Book a Demo",
  },
};

export function usePageContent(pageKey: string) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["page_content", pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", `page_content_${pageKey}`)
        .maybeSingle();

      if (error) throw error;
      if (data?.value && typeof data.value === "object" && !Array.isArray(data.value)) {
        return data.value as unknown as PageContentData;
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const content = { ...defaultContent[pageKey], ...(data || {}) };

  const updateContent = useMutation({
    mutationFn: async (newContent: PageContentData) => {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", `page_content_${pageKey}`)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: newContent as unknown as Json })
          .eq("key", `page_content_${pageKey}`);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert({ key: `page_content_${pageKey}`, value: newContent as unknown as Json });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_content", pageKey] });
    },
  });

  return { content, isLoading, updateContent, defaults: defaultContent[pageKey] };
}

export { defaultContent };
