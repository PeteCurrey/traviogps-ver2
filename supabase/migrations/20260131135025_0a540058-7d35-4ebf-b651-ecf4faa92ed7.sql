-- Marketing Dashboard Schema

-- Content types enum
CREATE TYPE content_type AS ENUM ('blog_post', 'social_facebook', 'social_instagram', 'social_twitter', 'social_linkedin', 'email_campaign');

-- Content status enum
CREATE TYPE content_status AS ENUM ('draft', 'pending_review', 'approved', 'published', 'rejected', 'scheduled');

-- Notification types enum
CREATE TYPE notification_type AS ENUM ('competitor_change', 'market_trend', 'seo_alert', 'content_ready', 'system');

-- Notification priority enum
CREATE TYPE notification_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- AI Content Drafts table
CREATE TABLE public.content_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type content_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  keywords TEXT[],
  target_platform TEXT,
  ai_prompt TEXT,
  ai_model TEXT DEFAULT 'google/gemini-3-flash-preview',
  status content_status NOT NULL DEFAULT 'draft',
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  auto_publish BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT,
  engagement_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Competitors table
CREATE TABLE public.competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  monitoring_enabled BOOLEAN DEFAULT true,
  last_checked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Competitor monitoring logs
CREATE TABLE public.competitor_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id UUID REFERENCES public.competitors(id) ON DELETE CASCADE NOT NULL,
  log_type TEXT NOT NULL, -- 'website_change', 'new_listing', 'price_change', 'social_post'
  title TEXT NOT NULL,
  description TEXT,
  data JSONB,
  importance_score INTEGER DEFAULT 50, -- 0-100
  is_reviewed BOOLEAN DEFAULT false,
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- SEO Analytics table
CREATE TABLE public.seo_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url TEXT NOT NULL,
  keyword TEXT,
  current_rank INTEGER,
  previous_rank INTEGER,
  search_volume INTEGER,
  difficulty_score INTEGER,
  click_through_rate NUMERIC,
  impressions INTEGER,
  clicks INTEGER,
  data_source TEXT DEFAULT 'manual',
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Market Trends table
CREATE TABLE public.market_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_type TEXT NOT NULL, -- 'property_prices', 'demand', 'supply', 'interest_rates', 'market_sentiment'
  title TEXT NOT NULL,
  description TEXT,
  data JSONB,
  area TEXT,
  impact_level TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  source TEXT,
  source_url TEXT,
  ai_analysis TEXT,
  is_actionable BOOLEAN DEFAULT false,
  action_taken BOOLEAN DEFAULT false,
  action_notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Notifications table
CREATE TABLE public.marketing_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type notification_type NOT NULL,
  priority notification_priority NOT NULL DEFAULT 'medium',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  related_id UUID, -- Can reference any related entity
  related_type TEXT, -- 'competitor_log', 'market_trend', 'content_draft', etc.
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id), -- NULL means all staff
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Website Analytics (own analytics)
CREATE TABLE public.website_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  page_title TEXT,
  visitors INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  avg_time_on_page INTEGER, -- in seconds
  bounce_rate NUMERIC,
  conversions INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_path, date)
);

-- Email Campaigns table
CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  preview_text TEXT,
  content TEXT NOT NULL,
  template TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  audience_segment TEXT,
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  unsubscribe_count INTEGER DEFAULT 0,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.content_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content_drafts
CREATE POLICY "Staff can view content drafts" ON public.content_drafts
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage content drafts" ON public.content_drafts
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for competitors
CREATE POLICY "Staff can view competitors" ON public.competitors
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage competitors" ON public.competitors
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for competitor_logs
CREATE POLICY "Staff can view competitor logs" ON public.competitor_logs
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage competitor logs" ON public.competitor_logs
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for seo_analytics
CREATE POLICY "Staff can view SEO analytics" ON public.seo_analytics
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage SEO analytics" ON public.seo_analytics
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for market_trends
CREATE POLICY "Staff can view market trends" ON public.market_trends
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage market trends" ON public.market_trends
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for marketing_notifications
CREATE POLICY "Staff can view their notifications" ON public.marketing_notifications
  FOR SELECT USING (is_staff(auth.uid()) AND (user_id IS NULL OR user_id = auth.uid()));

CREATE POLICY "Staff can manage notifications" ON public.marketing_notifications
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for website_analytics
CREATE POLICY "Staff can view website analytics" ON public.website_analytics
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage website analytics" ON public.website_analytics
  FOR ALL USING (is_staff(auth.uid()));

-- RLS Policies for email_campaigns
CREATE POLICY "Staff can view email campaigns" ON public.email_campaigns
  FOR SELECT USING (is_staff(auth.uid()));

CREATE POLICY "Staff can manage email campaigns" ON public.email_campaigns
  FOR ALL USING (is_staff(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_content_drafts_updated_at
  BEFORE UPDATE ON public.content_drafts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_competitors_updated_at
  BEFORE UPDATE ON public.competitors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at
  BEFORE UPDATE ON public.email_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();