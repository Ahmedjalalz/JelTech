-- ====================================================================
-- JELTECH CAREERS ATS - SUPABASE INCREMENTAL UPDATE SCRIPT
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- to fix the Admin Dashboard, Application Visibility, and RLS Permissions.
-- ====================================================================

-- 1. DISABLE RLS ON ADMIN_SESSIONS
-- admin_sessions is an internal token table accessed solely by our server backend.
-- Disabling RLS prevents 42501 permission errors on admin login and session checks.
ALTER TABLE public.admin_sessions DISABLE ROW LEVEL SECURITY;

-- 2. UPDATE PUBLIC READ OPENINGS POLICY
-- Enforces application_deadline > now() so expired jobs are hidden automatically.
DROP POLICY IF EXISTS "Public read published job openings" ON public.job_openings;
CREATE POLICY "Public read published job openings"
ON public.job_openings
FOR SELECT
TO anon, authenticated
USING (
  publication_status = 'Published'
  AND recruitment_status = 'Open'
  AND application_deadline > now()
);

-- 3. UPDATE PUBLIC INSERT APPLICATIONS POLICY
-- Candidates can only apply to active, unexpired job openings.
DROP POLICY IF EXISTS "Public insert applications" ON public.applications;
CREATE POLICY "Public insert applications"
ON public.applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.job_openings j
    WHERE j.id = job_opening_id
      AND j.publication_status = 'Published'
      AND j.recruitment_status = 'Open'
      AND j.application_deadline > now()
  )
);

-- 4. GRANT ADMIN FULL PERMISSIONS ACROSS ALL ATS TABLES
-- Allows authenticated admin users full CRUD access to all tables.

-- Job Openings (Admin Full Control)
DROP POLICY IF EXISTS "Admin manage job_openings" ON public.job_openings;
CREATE POLICY "Admin manage job_openings"
ON public.job_openings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Applications (Admin Full Control - View & Edit Candidates)
DROP POLICY IF EXISTS "Admin manage applications" ON public.applications;
CREATE POLICY "Admin manage applications"
ON public.applications
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Uploaded Resumes Metadata (Admin Full Control)
DROP POLICY IF EXISTS "Admin manage uploaded_resumes" ON public.uploaded_resumes;
CREATE POLICY "Admin manage uploaded_resumes"
ON public.uploaded_resumes
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Candidate ATS Scorecards & Evaluations
DROP POLICY IF EXISTS "Admin manage candidate_evaluations" ON public.candidate_evaluations;
CREATE POLICY "Admin manage candidate_evaluations"
ON public.candidate_evaluations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Application Recruiter Notes
DROP POLICY IF EXISTS "Admin manage application_notes" ON public.application_notes;
CREATE POLICY "Admin manage application_notes"
ON public.application_notes
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Application Activity Audit Logs
DROP POLICY IF EXISTS "Admin manage application_activity" ON public.application_activity;
CREATE POLICY "Admin manage application_activity"
ON public.application_activity
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Job Reusable Templates
DROP POLICY IF EXISTS "Admin manage job_templates" ON public.job_templates;
CREATE POLICY "Admin manage job_templates"
ON public.job_templates
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. STORAGE BUCKET POLICIES FOR RESUMES
-- Allow authenticated admins to view and download candidate resumes.
DROP POLICY IF EXISTS "Admin read resumes from bucket" ON storage.objects;
CREATE POLICY "Admin read resumes from bucket"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');
