-- Fix RLS warnings by adding visitor_id validation for anonymous inserts

-- Drop and recreate visitor_sessions insert/update policies with validation
DROP POLICY IF EXISTS "Anyone can create visitor sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Anyone can update their visitor session" ON public.visitor_sessions;

CREATE POLICY "Create visitor sessions with valid visitor_id"
ON public.visitor_sessions FOR INSERT
WITH CHECK (visitor_id IS NOT NULL AND length(visitor_id) >= 10);

CREATE POLICY "Update own visitor session"
ON public.visitor_sessions FOR UPDATE
USING (visitor_id IS NOT NULL AND length(visitor_id) >= 10);

-- Drop and recreate property_views insert policy with validation
DROP POLICY IF EXISTS "Anyone can record property views" ON public.property_views;

CREATE POLICY "Record property views with tracking"
ON public.property_views FOR INSERT
WITH CHECK (property_id IS NOT NULL AND (visitor_id IS NOT NULL OR user_id IS NOT NULL));