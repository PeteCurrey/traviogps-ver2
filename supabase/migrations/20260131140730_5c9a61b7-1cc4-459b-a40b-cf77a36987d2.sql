-- Create showcase_properties table for immersive property showcases
CREATE TABLE public.showcase_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  
  -- Basic info (can be standalone or linked to property)
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  location TEXT,
  price_formatted TEXT,
  
  -- Media assets
  hero_video_url TEXT,
  hero_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  
  -- Virtual tour
  virtual_tour_url TEXT,
  virtual_tour_type TEXT DEFAULT 'iframe', -- 'iframe', 'matterport', 'custom'
  
  -- Cinematic content
  video_sections JSONB DEFAULT '[]', -- Array of {title, description, video_url, order}
  
  -- Display settings
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- SEO
  slug TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.showcase_properties ENABLE ROW LEVEL SECURITY;

-- Public can view published showcases
CREATE POLICY "Published showcases are publicly viewable"
ON public.showcase_properties
FOR SELECT
USING (is_published = true);

-- Staff can manage all showcases
CREATE POLICY "Staff can view all showcases"
ON public.showcase_properties
FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can insert showcases"
ON public.showcase_properties
FOR INSERT
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update showcases"
ON public.showcase_properties
FOR UPDATE
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete showcases"
ON public.showcase_properties
FOR DELETE
USING (is_staff(auth.uid()));

-- Create storage bucket for showcase media
INSERT INTO storage.buckets (id, name, public)
VALUES ('showcase-media', 'showcase-media', true);

-- Storage policies for showcase media
CREATE POLICY "Showcase media is publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'showcase-media');

CREATE POLICY "Staff can upload showcase media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'showcase-media' AND is_staff(auth.uid()));

CREATE POLICY "Staff can update showcase media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'showcase-media' AND is_staff(auth.uid()));

CREATE POLICY "Staff can delete showcase media"
ON storage.objects FOR DELETE
USING (bucket_id = 'showcase-media' AND is_staff(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_showcase_properties_updated_at
BEFORE UPDATE ON public.showcase_properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();