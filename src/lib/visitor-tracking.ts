import { supabase } from "@/integrations/supabase/client";

// Generate or retrieve visitor ID
export function getVisitorId(): string {
  let id = localStorage.getItem("dp_visitor_id");
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("dp_visitor_id", id);
  }
  return id;
}

// Track a property view
export async function trackPropertyView(
  propertyId: string,
  options?: {
    timeOnPage?: number;
    scrollDepth?: number;
    referrer?: string;
  }
) {
  const visitorId = getVisitorId();
  
  try {
    const { error } = await supabase.from("property_views").insert({
      property_id: propertyId,
      visitor_id: visitorId,
      time_on_page: options?.timeOnPage,
      scroll_depth: options?.scrollDepth,
      referrer: options?.referrer || document.referrer,
    });

    if (error) {
      console.error("Error tracking property view:", error);
    }
  } catch (err) {
    console.error("Error tracking property view:", err);
  }
}

// Start or update a visitor session
export async function startVisitorSession() {
  const visitorId = getVisitorId();
  
  // Get UTM parameters from URL
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  // Detect device type
  const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

  try {
    const { data, error } = await supabase
      .from("visitor_sessions")
      .insert({
        visitor_id: visitorId,
        device_type: deviceType,
        referrer: document.referrer || null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        pages_viewed: [{ path: window.location.pathname, timestamp: new Date().toISOString() }],
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error starting visitor session:", error);
      return null;
    }

    // Store session ID for updates
    if (data) {
      sessionStorage.setItem("dp_session_id", data.id);
    }

    return data?.id;
  } catch (err) {
    console.error("Error starting visitor session:", err);
    return null;
  }
}

// Track page view within session
export async function trackPageView(path: string) {
  const sessionId = sessionStorage.getItem("dp_session_id");
  const visitorId = getVisitorId();
  
  if (!sessionId) {
    // Start a new session if none exists
    await startVisitorSession();
    return;
  }

  try {
    // Get current pages_viewed
    const { data: session } = await supabase
      .from("visitor_sessions")
      .select("pages_viewed")
      .eq("id", sessionId)
      .single();

    if (session) {
      const pagesViewed = (session.pages_viewed as any[]) || [];
      pagesViewed.push({ path, timestamp: new Date().toISOString() });

      await supabase
        .from("visitor_sessions")
        .update({ pages_viewed: pagesViewed })
        .eq("id", sessionId);
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
  }
}

// Track property viewed within session
export async function trackPropertyViewed(propertySlug: string) {
  const sessionId = sessionStorage.getItem("dp_session_id");
  
  if (!sessionId) return;

  try {
    const { data: session } = await supabase
      .from("visitor_sessions")
      .select("properties_viewed")
      .eq("id", sessionId)
      .single();

    if (session) {
      const propertiesViewed = (session.properties_viewed as any[]) || [];
      propertiesViewed.push({ slug: propertySlug, timestamp: new Date().toISOString() });

      await supabase
        .from("visitor_sessions")
        .update({ properties_viewed: propertiesViewed })
        .eq("id", sessionId);
    }
  } catch (err) {
    console.error("Error tracking property viewed:", err);
  }

  // Also update localStorage for recently viewed
  updateRecentlyViewed(propertySlug);
}

// Update recently viewed in localStorage
function updateRecentlyViewed(propertySlug: string) {
  const stored = localStorage.getItem("dp_recently_viewed");
  let recentlyViewed: string[] = [];
  
  try {
    recentlyViewed = stored ? JSON.parse(stored) : [];
  } catch {
    recentlyViewed = [];
  }

  // Add to front, remove duplicates, limit to 6
  const filtered = recentlyViewed.filter((slug) => slug !== propertySlug);
  const updated = [propertySlug, ...filtered].slice(0, 6);
  localStorage.setItem("dp_recently_viewed", JSON.stringify(updated));
}

// Get recently viewed property slugs
export function getRecentlyViewed(): string[] {
  const stored = localStorage.getItem("dp_recently_viewed");
  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Track search query
export async function trackSearchQuery(query: string, filters: Record<string, any>) {
  const sessionId = sessionStorage.getItem("dp_session_id");
  
  if (!sessionId) return;

  try {
    const { data: session } = await supabase
      .from("visitor_sessions")
      .select("search_queries")
      .eq("id", sessionId)
      .single();

    if (session) {
      const searchQueries = (session.search_queries as any[]) || [];
      searchQueries.push({
        query,
        filters,
        timestamp: new Date().toISOString(),
      });

      await supabase
        .from("visitor_sessions")
        .update({ search_queries: searchQueries })
        .eq("id", sessionId);
    }
  } catch (err) {
    console.error("Error tracking search query:", err);
  }
}
