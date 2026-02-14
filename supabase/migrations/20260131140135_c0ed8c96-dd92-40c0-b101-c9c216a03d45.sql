-- Create storage bucket for team member photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-photos', 'team-photos', true);

-- Allow public read access to team photos
CREATE POLICY "Team photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

-- Allow staff to upload team photos
CREATE POLICY "Staff can upload team photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'team-photos' AND is_staff(auth.uid()));

-- Allow staff to update team photos
CREATE POLICY "Staff can update team photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'team-photos' AND is_staff(auth.uid()));

-- Allow staff to delete team photos
CREATE POLICY "Staff can delete team photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'team-photos' AND is_staff(auth.uid()));