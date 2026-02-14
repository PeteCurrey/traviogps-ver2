-- Phase 1-4 Database Tables for Premium Enhancement Plan

-- Saved properties for authenticated users
CREATE TABLE public.saved_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(user_id, property_id)
);

ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their saved properties"
ON public.saved_properties FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
ON public.saved_properties FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved properties"
ON public.saved_properties FOR DELETE
USING (auth.uid() = user_id);

-- Search alerts for property notifications
CREATE TABLE public.search_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  filters JSONB NOT NULL DEFAULT '{}'::jsonb,
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.search_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their search alerts"
ON public.search_alerts FOR ALL
USING (auth.uid() = user_id);

CREATE TRIGGER update_search_alerts_updated_at
BEFORE UPDATE ON public.search_alerts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Visitor sessions for anonymous tracking and personalisation
CREATE TABLE public.visitor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  user_id UUID,
  session_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_end TIMESTAMP WITH TIME ZONE,
  pages_viewed JSONB NOT NULL DEFAULT '[]'::jsonb,
  properties_viewed JSONB NOT NULL DEFAULT '[]'::jsonb,
  search_queries JSONB NOT NULL DEFAULT '[]'::jsonb,
  device_type TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view visitor sessions"
ON public.visitor_sessions FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Anyone can create visitor sessions"
ON public.visitor_sessions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update their visitor session"
ON public.visitor_sessions FOR UPDATE
USING (true);

-- Campaign analytics for marketing attribution
CREATE TABLE public.campaign_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  visitor_id TEXT,
  user_id UUID,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view campaign analytics"
ON public.campaign_analytics FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage campaign analytics"
ON public.campaign_analytics FOR ALL
USING (is_staff(auth.uid()));

-- Social media posts for scheduling and publishing
CREATE TABLE public.social_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram', 'twitter', 'linkedin')),
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  external_post_id TEXT,
  engagement_data JSONB DEFAULT '{}'::jsonb,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view social posts"
ON public.social_posts FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage social posts"
ON public.social_posts FOR ALL
USING (is_staff(auth.uid()));

CREATE TRIGGER update_social_posts_updated_at
BEFORE UPDATE ON public.social_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Lead scoring and behavioural tracking
CREATE TABLE public.lead_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  score_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  urgency_level TEXT DEFAULT 'normal' CHECK (urgency_level IN ('low', 'normal', 'high', 'hot')),
  last_activity_at TIMESTAMP WITH TIME ZONE,
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(lead_id)
);

ALTER TABLE public.lead_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view lead scores"
ON public.lead_scores FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage lead scores"
ON public.lead_scores FOR ALL
USING (is_staff(auth.uid()));

-- Property view tracking for analytics
CREATE TABLE public.property_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  visitor_id TEXT,
  user_id UUID,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_on_page INTEGER,
  scroll_depth INTEGER,
  referrer TEXT
);

ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view property analytics"
ON public.property_views FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Anyone can record property views"
ON public.property_views FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_saved_properties_user ON public.saved_properties(user_id);
CREATE INDEX idx_saved_properties_property ON public.saved_properties(property_id);
CREATE INDEX idx_search_alerts_user ON public.search_alerts(user_id);
CREATE INDEX idx_visitor_sessions_visitor ON public.visitor_sessions(visitor_id);
CREATE INDEX idx_campaign_analytics_campaign ON public.campaign_analytics(campaign_id);
CREATE INDEX idx_campaign_analytics_lead ON public.campaign_analytics(lead_id);
CREATE INDEX idx_social_posts_status ON public.social_posts(status);
CREATE INDEX idx_social_posts_scheduled ON public.social_posts(scheduled_for);
CREATE INDEX idx_property_views_property ON public.property_views(property_id);
CREATE INDEX idx_property_views_date ON public.property_views(viewed_at);