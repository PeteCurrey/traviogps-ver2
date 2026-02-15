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
  vehicle_tracking_hero: {
    label: "GPS Vehicle Tracking",
    heading: "Know Where Every Vehicle Is,",
    headingAccent: "Right Now",
    description: "Real-time GPS tracking for cars, vans, trucks, and assets. Reduce costs, improve efficiency, and protect your fleet with Travio.",
  },
  vehicle_tracking_features: {
    sectionLabel: "Features",
    heading: "Everything You Need to",
    headingAccent: "Track Your Fleet",
    feature1Title: "Real-Time GPS Tracking",
    feature1Description: "See exactly where every vehicle is, right now. Live map updates every 10 seconds with full route history.",
    feature2Title: "Instant Alerts",
    feature2Description: "Get notified of speeding, idling, unauthorized use, and geofence breaches in real time.",
    feature3Title: "Detailed Reports",
    feature3Description: "Mileage, fuel usage, driver behavior, and trip history — all automatically generated.",
    feature4Title: "Easy Installation",
    feature4Description: "OBD plug-and-play devices or hardwired trackers. Installed in minutes, no downtime.",
    feature5Title: "Theft Recovery",
    feature5Description: "Protect your assets with 24/7 tracking and instant movement alerts when vehicles should be stationary.",
    feature6Title: "Timesheet Automation",
    feature6Description: "Automatically record start/stop times, breaks, and on-site durations for accurate payroll.",
    feature7Title: "Fuel Monitoring",
    feature7Description: "Track fuel consumption patterns and identify wasteful driving habits to reduce costs.",
    feature8Title: "Route Optimization",
    feature8Description: "Plan the most efficient routes and reduce unnecessary mileage across your fleet.",
  },
  vehicle_tracking_steps: {
    sectionLabel: "How It Works",
    heading: "Up and Running in",
    headingAccent: "3 Simple Steps",
    step1Number: "01",
    step1Title: "Choose Your Tracker",
    step1Description: "Select from OBD plug-in, hardwired, or asset trackers to suit your fleet.",
    step2Number: "02",
    step2Title: "Quick Installation",
    step2Description: "Self-install in minutes or book a free professional fitting.",
    step3Number: "03",
    step3Title: "Start Tracking",
    step3Description: "Log in to your dashboard and see your entire fleet in real time.",
  },
  vehicle_tracking_cta: {
    heading: "Ready to Track Your Fleet?",
    description: "Join thousands of businesses saving time and money with Travio GPS tracking.",
    primaryCta: "Get a Quote",
    secondaryCta: "View Pricing",
  },
  dashcams_hero: {
    label: "Connected Dash Cams",
    heading: "See the Road Through",
    headingAccent: "Your Fleet's Eyes",
    description: "HD connected dash cams with live streaming, cloud storage, and AI driver safety alerts. Protect your drivers and your business.",
  },
  dashcams_features: {
    sectionLabel: "Features",
    heading: "More Than Just a",
    headingAccent: "Dash Cam",
    feature1Title: "HD Video Recording",
    feature1Description: "Crystal-clear 1080p front and rear recording with night vision capability.",
    feature2Title: "Connected & Live",
    feature2Description: "Stream live footage from any vehicle directly to your desktop or mobile device.",
    feature3Title: "Incident Protection",
    feature3Description: "Automatic incident detection with G-force triggers and instant footage upload.",
    feature4Title: "Cloud Storage",
    feature4Description: "All footage securely stored in the cloud. No SD cards, no manual downloads.",
    feature5Title: "Driver Monitoring",
    feature5Description: "AI-powered driver distraction and fatigue detection keeps your team safe.",
    feature6Title: "Event Alerts",
    feature6Description: "Instant notifications for harsh braking, speeding, and collision events.",
    feature7Title: "Dual-Facing Cameras",
    feature7Description: "Road-facing and driver-facing cameras for complete evidence coverage.",
    feature8Title: "Remote Access",
    feature8Description: "Review and download footage remotely. No need to visit the vehicle.",
  },
  dashcams_cta: {
    heading: "Protect Your Fleet Today",
    description: "Get connected dash cams fitted across your fleet with zero upfront costs on selected plans.",
    primaryCta: "Get a Quote",
    secondaryCta: "View Pricing",
  },
  fleet_mgmt_hero: {
    label: "Fleet Management",
    heading: "Complete Control of",
    headingAccent: "Your Fleet",
    description: "From vehicle checks to job dispatch, manage every aspect of your fleet operations from a single powerful platform.",
  },
  fleet_mgmt_features: {
    sectionLabel: "Platform Features",
    heading: "One Platform,",
    headingAccent: "Total Visibility",
    feature1Title: "Central Dashboard",
    feature1Description: "One platform to manage your entire fleet — vehicles, drivers, jobs, and costs.",
    feature2Title: "Driver Management",
    feature2Description: "Monitor driver behavior, licence checks, and performance scores in one place.",
    feature3Title: "Vehicle Checks",
    feature3Description: "Digital walk-around checks with photo evidence. Stay compliant effortlessly.",
    feature4Title: "Fuel Management",
    feature4Description: "Track fuel purchases, monitor consumption, and identify cost-saving opportunities.",
    feature5Title: "Job Management",
    feature5Description: "Assign, track, and complete jobs from dispatch to delivery with real-time updates.",
    feature6Title: "Driver App",
    feature6Description: "Give drivers everything they need — navigation, job details, and vehicle checks on mobile.",
    feature7Title: "Fleet Analytics",
    feature7Description: "Actionable insights on utilization, costs, and performance to optimize operations.",
    feature8Title: "Maintenance Alerts",
    feature8Description: "Schedule services, track MOTs, and get reminders before issues become problems.",
  },
  fleet_mgmt_cta: {
    heading: "Take Control of Your Fleet",
    description: "See how Travio fleet management can streamline your operations and reduce costs.",
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
