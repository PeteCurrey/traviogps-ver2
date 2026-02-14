-- The leads INSERT policy with USING (true) is intentional for public enquiry forms.
-- However, let's add some protection by requiring basic validation.
-- Drop and recreate the leads INSERT policy with better documentation

DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Recreate with explicit comment that this is for public forms
-- The true check is intentional - enquiry forms need to work without auth
CREATE POLICY "Public can submit enquiries"
  ON public.leads FOR INSERT
  WITH CHECK (
    -- Require minimum valid data
    first_name IS NOT NULL AND 
    last_name IS NOT NULL AND 
    email IS NOT NULL AND 
    length(email) > 5
  );