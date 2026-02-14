-- Create developments table for new build developments
CREATE TABLE public.developments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  location TEXT NOT NULL,
  developer TEXT NOT NULL,
  units TEXT,
  price_from TEXT,
  status TEXT DEFAULT 'Coming Soon',
  description TEXT,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  hero_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  overview TEXT,
  highlights JSONB DEFAULT '[]',
  property_types JSONB DEFAULT '[]',
  amenities TEXT[] DEFAULT '{}',
  location_description TEXT,
  completion_date TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.developments ENABLE ROW LEVEL SECURITY;

-- Public can view published developments
CREATE POLICY "Published developments are publicly viewable"
ON public.developments
FOR SELECT
USING (is_published = true);

-- Staff can view all developments
CREATE POLICY "Staff can view all developments"
ON public.developments
FOR SELECT
USING (is_staff(auth.uid()));

-- Staff can insert developments
CREATE POLICY "Staff can insert developments"
ON public.developments
FOR INSERT
WITH CHECK (is_staff(auth.uid()));

-- Staff can update developments
CREATE POLICY "Staff can update developments"
ON public.developments
FOR UPDATE
USING (is_staff(auth.uid()));

-- Staff can delete developments
CREATE POLICY "Staff can delete developments"
ON public.developments
FOR DELETE
USING (is_staff(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_developments_updated_at
BEFORE UPDATE ON public.developments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial development data
INSERT INTO public.developments (slug, name, tagline, location, developer, units, price_from, status, description, image, features, hero_image, gallery_images, overview, highlights, property_types, amenities, location_description, completion_date, is_published, display_order)
VALUES 
(
  'the-millhouse-collection',
  'The Millhouse Collection',
  'Traditional craftsmanship meets modern luxury',
  'Bakewell, Peak District',
  'Heritage Homes',
  '12 luxury homes',
  '£595,000',
  'Now Selling',
  'An exclusive collection of stone-built homes in the heart of Bakewell, featuring traditional craftsmanship with modern luxury.',
  '/properties/bakewell-cottage-rental.webp',
  ARRAY['4-5 Bedrooms', 'Private Gardens', 'Double Garages'],
  '/properties/bakewell-cottage-rental.webp',
  ARRAY['/properties/bakewell-cottage-rental.webp', '/properties/old-vicarage-baslow.webp', '/properties/georgian-townhouse-brampton.webp', '/properties/millstone-cottage-hathersage.webp'],
  'The Millhouse Collection represents the pinnacle of new home living in Bakewell. Each residence has been thoughtfully designed to complement the stunning Peak District landscape while providing all the conveniences of contemporary living.',
  '[{"icon": "stone", "title": "Derbyshire Stone", "description": "Locally quarried stone facades that blend seamlessly with the historic market town"}, {"icon": "interior", "title": "Designer Interiors", "description": "Handcrafted kitchens, oak flooring, and premium fixtures throughout"}, {"icon": "garden", "title": "Landscaped Gardens", "description": "Mature planting schemes designed by award-winning landscape architects"}, {"icon": "warranty", "title": "10-Year Warranty", "description": "Comprehensive NHBC warranty for complete peace of mind"}]'::jsonb,
  '[{"name": "The Wye", "bedrooms": "4 Bed Detached", "price": "£595,000", "sqft": "1,850", "available": 3}, {"name": "The Derwent", "bedrooms": "5 Bed Detached", "price": "£725,000", "sqft": "2,400", "available": 2}, {"name": "The Monsal", "bedrooms": "5 Bed Executive", "price": "£895,000", "sqft": "3,100", "available": 1}]'::jsonb,
  ARRAY['Underfloor heating throughout', 'Air source heat pump', 'EV charging point', 'Integrated smart home system', 'Bespoke fitted wardrobes', 'Landscaped front and rear gardens', 'Double garage with electric doors', 'High-speed fibre broadband'],
  'Nestled on the edge of Bakewell, the collection enjoys easy access to the town''s renowned Monday market, boutique shops, and riverside walks.',
  'Phase 1 complete, Phase 2 Spring 2026',
  true,
  1
),
(
  'chatsworth-view',
  'Chatsworth View',
  'Premium residences with iconic estate views',
  'Baslow, Derbyshire',
  'Peak Developments',
  '8 detached homes',
  '£750,000',
  'Coming Soon',
  'Premium detached residences with stunning views towards Chatsworth Estate, designed for discerning buyers.',
  '/properties/chatsworth-view-bakewell.webp',
  ARRAY['5 Bedrooms', 'Landscaped Gardens', 'Home Office'],
  '/properties/chatsworth-view-bakewell.webp',
  ARRAY['/properties/chatsworth-view-bakewell.webp', '/properties/old-vicarage-baslow.webp', '/properties/peak-view-barn-matlock.webp', '/properties/mapperley-park-villa.webp'],
  'Chatsworth View offers an unparalleled opportunity to own a brand new home with direct views across to one of England''s finest stately homes.',
  '[{"icon": "view", "title": "Estate Views", "description": "Uninterrupted vistas towards Chatsworth House and parkland"}, {"icon": "space", "title": "Generous Plots", "description": "Each home set within a quarter-acre of private grounds"}, {"icon": "office", "title": "Dedicated Home Office", "description": "Purpose-built garden studios available as an option"}, {"icon": "sustainability", "title": "EPC Rating A", "description": "Future-proofed with the latest sustainable technologies"}]'::jsonb,
  '[{"name": "The Cavendish", "bedrooms": "5 Bed Detached", "price": "£750,000", "sqft": "2,600", "available": 4}, {"name": "The Devonshire", "bedrooms": "6 Bed Executive", "price": "£950,000", "sqft": "3,400", "available": 2}]'::jsonb,
  ARRAY['Triple glazed windows throughout', 'Ground source heat pump', 'Solar PV panels', 'Rainwater harvesting system', 'Oak staircase and internal doors', 'Porcelanosa bathroom suites', 'Integrated Sonos speakers', 'Electric gated entrance'],
  'Baslow sits at the gateway to the Chatsworth Estate, offering a quintessentially English village lifestyle.',
  'Launching Summer 2026',
  true,
  2
),
(
  'the-old-quarry',
  'The Old Quarry',
  'Contemporary living in a sought-after location',
  'Matlock, Derbyshire',
  'Dales Living',
  '18 mixed homes',
  '£425,000',
  'Phase 2 Launching',
  'A carefully designed development offering a range of contemporary homes in a sought-after location.',
  '/properties/peak-view-barn-matlock.webp',
  ARRAY['3-4 Bedrooms', 'EV Charging', 'Solar Panels'],
  '/properties/peak-view-barn-matlock.webp',
  ARRAY['/properties/peak-view-barn-matlock.webp', '/properties/dronfield-family-home.webp', '/properties/contemporary-city-apartment.webp', '/properties/lace-market-loft.webp'],
  'The Old Quarry breathes new life into a former industrial site, creating a vibrant community of contemporary homes.',
  '[{"icon": "heritage", "title": "Heritage Design", "description": "Architectural details that honour the site''s quarrying history"}, {"icon": "community", "title": "Community Focus", "description": "Shared green spaces and pedestrian-friendly layout"}, {"icon": "green", "title": "Net Zero Ready", "description": "Designed to achieve net zero carbon with minimal upgrades"}, {"icon": "value", "title": "Help to Buy", "description": "Eligible for government-backed purchase schemes"}]'::jsonb,
  '[{"name": "The Limestone", "bedrooms": "3 Bed Semi", "price": "£425,000", "sqft": "1,200", "available": 5}, {"name": "The Gritstone", "bedrooms": "3 Bed Detached", "price": "£495,000", "sqft": "1,450", "available": 4}, {"name": "The Millstone", "bedrooms": "4 Bed Detached", "price": "£575,000", "sqft": "1,750", "available": 3}]'::jsonb,
  ARRAY['Solar PV panels as standard', 'EV charging point included', 'A-rated energy efficiency', 'Mechanical ventilation with heat recovery', 'Contemporary fitted kitchen', 'Turfed rear garden', 'Allocated parking spaces', 'Cycle storage'],
  'Matlock offers the best of both worlds – stunning Peak District scenery on the doorstep with excellent amenities in the town centre.',
  'Phase 2 available from Q2 2026',
  true,
  3
),
(
  'stanage-edge-manor',
  'Stanage Edge Manor',
  'Ultra-premium Peak District living',
  'Hathersage, Peak District',
  'Heritage Homes',
  '6 exclusive residences',
  '£895,000',
  'Register Interest',
  'Ultra-premium homes with panoramic Peak District views, featuring the finest materials and specifications.',
  '/properties/millstone-cottage-hathersage.webp',
  ARRAY['5-6 Bedrooms', 'Wine Cellars', 'Smart Home'],
  '/properties/millstone-cottage-hathersage.webp',
  ARRAY['/properties/millstone-cottage-hathersage.webp', '/properties/old-vicarage-baslow.webp', '/properties/mapperley-park-villa.webp', '/properties/georgian-townhouse-brampton.webp'],
  'Stanage Edge Manor represents the apex of new home development in the Peak District. This ultra-exclusive collection of just six residences has been conceived for those who demand the very finest.',
  '[{"icon": "luxury", "title": "Bespoke Finishes", "description": "Work with our interior design team to personalise every detail"}, {"icon": "cellar", "title": "Wine Cellars", "description": "Temperature-controlled wine storage with tasting area"}, {"icon": "smart", "title": "Full Automation", "description": "Crestron whole-home automation including lighting, climate, and security"}, {"icon": "exclusive", "title": "Private Estate", "description": "Gated community with 24/7 security monitoring"}]'::jsonb,
  '[{"name": "The Burbage", "bedrooms": "5 Bed Manor House", "price": "£895,000", "sqft": "3,500", "available": 3}, {"name": "The Higger", "bedrooms": "6 Bed Estate Home", "price": "£1,250,000", "sqft": "4,500", "available": 2}]'::jsonb,
  ARRAY['Bespoke designer kitchen', 'Temperature-controlled wine cellar', 'Cinema room pre-wired', 'Crestron smart home system', 'Heated driveway', 'Triple garage with workshop', 'Outdoor kitchen and pizza oven', 'Swimming pool option available'],
  'Hathersage is one of the Peak District''s most desirable villages, famous for its connection to Charlotte Brontë and its outdoor lifestyle.',
  'First completions Summer 2027',
  true,
  4
);