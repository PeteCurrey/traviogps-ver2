-- Create storage bucket for development images
INSERT INTO storage.buckets (id, name, public)
VALUES ('development-images', 'development-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access
CREATE POLICY "Development images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'development-images');

-- Create policy for staff to upload images
CREATE POLICY "Staff can upload development images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'development-images' AND is_staff(auth.uid()));

-- Create policy for staff to update images
CREATE POLICY "Staff can update development images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'development-images' AND is_staff(auth.uid()));

-- Create policy for staff to delete images
CREATE POLICY "Staff can delete development images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'development-images' AND is_staff(auth.uid()));