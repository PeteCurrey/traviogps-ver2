-- Create enum types for property management
CREATE TYPE public.property_type AS ENUM (
  'detached', 'semi-detached', 'terraced', 'flat', 'bungalow', 
  'cottage', 'barn-conversion', 'farmhouse', 'new-build', 'land', 'commercial'
);

CREATE TYPE public.listing_type AS ENUM ('sale', 'rent');

CREATE TYPE public.property_status AS ENUM (
  'available', 'under-offer', 'sold', 'let-agreed', 'withdrawn'
);

CREATE TYPE public.epc_rating AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G');

CREATE TYPE public.tenure_type AS ENUM ('freehold', 'leasehold', 'share-of-freehold');

CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'closed');

CREATE TYPE public.lead_type AS ENUM ('enquiry', 'valuation', 'viewing', 'general');

CREATE TYPE public.app_role AS ENUM ('admin', 'agent', 'viewer');

-- =====================
-- USER ROLES TABLE
-- =====================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin or agent
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'agent')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================
-- PROFILES TABLE
-- =====================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  job_title TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly viewable"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================
-- PROPERTIES TABLE
-- =====================
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  price_formatted TEXT NOT NULL,
  price_label TEXT,
  
  -- Address
  street TEXT NOT NULL,
  area TEXT NOT NULL,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  
  -- Property details
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  receptions INTEGER NOT NULL DEFAULT 0,
  sqft INTEGER,
  property_type property_type NOT NULL,
  listing_type listing_type NOT NULL,
  status property_status NOT NULL DEFAULT 'available',
  
  -- Features and description
  features TEXT[] DEFAULT '{}',
  description TEXT,
  short_description TEXT,
  
  -- Media
  images TEXT[] DEFAULT '{}',
  floor_plan TEXT,
  virtual_tour_url TEXT,
  
  -- Additional info
  epc_rating epc_rating,
  council_tax_band TEXT,
  tenure tenure_type,
  available_from DATE,
  
  -- Metadata
  featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Public can view all available properties
CREATE POLICY "Properties are publicly viewable"
  ON public.properties FOR SELECT
  USING (true);

-- Staff can insert properties
CREATE POLICY "Staff can insert properties"
  ON public.properties FOR INSERT
  WITH CHECK (public.is_staff(auth.uid()));

-- Staff can update properties
CREATE POLICY "Staff can update properties"
  ON public.properties FOR UPDATE
  USING (public.is_staff(auth.uid()));

-- Only admins can delete properties
CREATE POLICY "Admins can delete properties"
  ON public.properties FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create index for common queries
CREATE INDEX idx_properties_listing_type ON public.properties(listing_type);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_featured ON public.properties(featured);
CREATE INDEX idx_properties_slug ON public.properties(slug);

-- =====================
-- LEADS TABLE
-- =====================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Lead details
  lead_type lead_type NOT NULL DEFAULT 'enquiry',
  status lead_status NOT NULL DEFAULT 'new',
  message TEXT,
  
  -- Property reference (optional)
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  
  -- Valuation specific fields
  valuation_address TEXT,
  valuation_postcode TEXT,
  valuation_property_type property_type,
  valuation_bedrooms INTEGER,
  
  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Metadata
  source TEXT DEFAULT 'website',
  notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can create a lead (public enquiry form)
CREATE POLICY "Anyone can create leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Only staff can view leads
CREATE POLICY "Staff can view leads"
  ON public.leads FOR SELECT
  USING (public.is_staff(auth.uid()));

-- Only staff can update leads
CREATE POLICY "Staff can update leads"
  ON public.leads FOR UPDATE
  USING (public.is_staff(auth.uid()));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_type ON public.leads(lead_type);
CREATE INDEX idx_leads_property ON public.leads(property_id);

-- =====================
-- AREA GUIDES TABLE
-- =====================
CREATE TABLE public.area_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  headline TEXT,
  description TEXT,
  content TEXT,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  
  -- Location
  latitude NUMERIC,
  longitude NUMERIC,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Stats
  average_price NUMERIC,
  property_count INTEGER DEFAULT 0,
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.area_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Area guides are publicly viewable"
  ON public.area_guides FOR SELECT
  USING (is_published = true OR public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage area guides"
  ON public.area_guides FOR ALL
  USING (public.is_staff(auth.uid()));

CREATE INDEX idx_area_guides_slug ON public.area_guides(slug);

-- =====================
-- TESTIMONIALS TABLE
-- =====================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_location TEXT,
  author_image TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  
  -- Optional property reference
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are publicly viewable"
  ON public.testimonials FOR SELECT
  USING (is_published = true OR public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage testimonials"
  ON public.testimonials FOR ALL
  USING (public.is_staff(auth.uid()));

-- =====================
-- TEAM MEMBERS TABLE
-- =====================
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  full_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  bio TEXT,
  image TEXT,
  
  -- Social links
  linkedin_url TEXT,
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published team members are publicly viewable"
  ON public.team_members FOR SELECT
  USING (is_published = true OR public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage team members"
  ON public.team_members FOR ALL
  USING (public.is_staff(auth.uid()));

-- =====================
-- BLOG POSTS TABLE
-- =====================
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  
  -- Author
  author_id UUID REFERENCES auth.users(id),
  
  -- Categories/Tags
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Status
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are publicly viewable"
  ON public.blog_posts FOR SELECT
  USING (is_published = true OR public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage blog posts"
  ON public.blog_posts FOR ALL
  USING (public.is_staff(auth.uid()));

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at);

-- =====================
-- SITE SETTINGS TABLE
-- =====================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are publicly readable"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update settings"
  ON public.site_settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================
-- UPDATED_AT TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_area_guides_updated_at
  BEFORE UPDATE ON public.area_guides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();