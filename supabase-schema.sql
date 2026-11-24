-- ==============================================================================
-- JELTECH DIGITAL CANVAS - SUPABASE DATABASE & STORAGE SETUP
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- It creates all required tables, indexes, storage buckets, RLS policies, and seed data.
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. JOB OPENINGS TABLE
CREATE TABLE IF NOT EXISTS public.job_openings (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Internship',
  work_mode TEXT NOT NULL DEFAULT 'Hybrid',
  location TEXT NOT NULL,
  duration TEXT,
  working_hours TEXT,
  working_schedule TEXT,
  reporting_manager TEXT,
  is_paid BOOLEAN NOT NULL DEFAULT false,
  stipend_amount TEXT,
  compensation_description TEXT,
  additional_benefits JSONB DEFAULT '[]'::jsonb,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  required_qualifications JSONB DEFAULT '[]'::jsonb,
  preferred_qualifications JSONB DEFAULT '[]'::jsonb,
  candidate_benefits JSONB DEFAULT '[]'::jsonb,
  kpis JSONB DEFAULT '[]'::jsonb,
  custom_questions JSONB DEFAULT '[]'::jsonb,
  require_cv BOOLEAN NOT NULL DEFAULT false,
  require_portfolio BOOLEAN NOT NULL DEFAULT false,
  require_github BOOLEAN NOT NULL DEFAULT false,
  application_open_date TIMESTAMPTZ DEFAULT now(),
  application_deadline TIMESTAMPTZ NOT NULL,
  recruitment_status TEXT NOT NULL DEFAULT 'Draft',
  publication_status TEXT NOT NULL DEFAULT 'Unpublished',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_openings_pub_rec ON public.job_openings(publication_status, recruitment_status);
CREATE INDEX IF NOT EXISTS idx_openings_deadline ON public.job_openings(application_deadline);
CREATE INDEX IF NOT EXISTS idx_openings_slug ON public.job_openings(slug);

-- 3. JOB TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS public.job_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  role_description TEXT,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  qualifications JSONB DEFAULT '[]'::jsonb,
  preferred_qualifications JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  working_arrangements JSONB DEFAULT '{}'::jsonb,
  kpis JSONB DEFAULT '[]'::jsonb,
  custom_questions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. UPLOADED RESUMES METADATA TABLE
CREATE TABLE IF NOT EXISTS public.uploaded_resumes (
  id TEXT PRIMARY KEY,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_path TEXT NOT NULL,
  storage_type TEXT DEFAULT 'supabase',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CANDIDATE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  job_opening_id TEXT NOT NULL REFERENCES public.job_openings(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  education_status TEXT NOT NULL,
  qualification TEXT,
  institution TEXT,
  relevant_skills TEXT NOT NULL,
  why_interested TEXT NOT NULL,
  why_consider TEXT NOT NULL,
  weekly_availability TEXT NOT NULL,
  linkedin_url TEXT,
  portfolio_url TEXT,
  github_url TEXT,
  additional_info TEXT,
  custom_answers JSONB DEFAULT '[]'::jsonb,
  resume_file_id TEXT REFERENCES public.uploaded_resumes(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON public.applications(job_opening_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(job_opening_id, email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- 6. CANDIDATE EVALUATIONS (ATS SCORECARD)
CREATE TABLE IF NOT EXISTS public.candidate_evaluations (
  id TEXT PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  score_skills INTEGER NOT NULL DEFAULT 0,
  score_communication INTEGER NOT NULL DEFAULT 0,
  score_creativity INTEGER NOT NULL DEFAULT 0,
  score_learning INTEGER NOT NULL DEFAULT 0,
  score_overall INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. APPLICATION RECRUITER NOTES
CREATE TABLE IF NOT EXISTS public.application_notes (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  note_type TEXT NOT NULL DEFAULT 'internal',
  author TEXT NOT NULL DEFAULT 'Admin',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. APPLICATION ACTIVITY AUDIT LOG
CREATE TABLE IF NOT EXISTS public.application_activity (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  actor TEXT NOT NULL DEFAULT 'Admin',
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. ADMIN SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  token TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. SUPABASE STORAGE BUCKET FOR RESUMES
-- Create the private 'resumes' storage bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_activity ENABLE ROW LEVEL SECURITY;
-- Note: admin_sessions has RLS disabled because it is an internal token table accessed solely by our server backend
ALTER TABLE public.admin_sessions DISABLE ROW LEVEL SECURITY;

-- Public can read published openings that are not expired
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

-- Public can insert new applications only for active, unexpired job openings
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

-- Public can insert resume metadata
DROP POLICY IF EXISTS "Public insert uploaded resumes" ON public.uploaded_resumes;
CREATE POLICY "Public insert uploaded resumes"
ON public.uploaded_resumes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Storage bucket access for resume uploads
DROP POLICY IF EXISTS "Public upload resumes to bucket" ON storage.objects;
CREATE POLICY "Public upload resumes to bucket"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'resumes');

-- Storage bucket access for admin resume downloads
DROP POLICY IF EXISTS "Admin read resumes from bucket" ON storage.objects;
CREATE POLICY "Admin read resumes from bucket"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes');

-- Admin full control policies for authenticated users
DROP POLICY IF EXISTS "Admin manage job_openings" ON public.job_openings;
CREATE POLICY "Admin manage job_openings"
ON public.job_openings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage applications" ON public.applications;
CREATE POLICY "Admin manage applications"
ON public.applications
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage uploaded_resumes" ON public.uploaded_resumes;
CREATE POLICY "Admin manage uploaded_resumes"
ON public.uploaded_resumes
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage candidate_evaluations" ON public.candidate_evaluations;
CREATE POLICY "Admin manage candidate_evaluations"
ON public.candidate_evaluations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage application_notes" ON public.application_notes;
CREATE POLICY "Admin manage application_notes"
ON public.application_notes
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage application_activity" ON public.application_activity;
CREATE POLICY "Admin manage application_activity"
ON public.application_activity
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage job_templates" ON public.job_templates;
CREATE POLICY "Admin manage job_templates"
ON public.job_templates
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Service role has full permissions on all tables and storage
-- (Note: service_role key automatically bypasses RLS in Supabase)

-- 12. INITIAL SEED DATA (Frontend Engineer Intern & SEO Marketing Intern)
INSERT INTO public.job_openings (
  id, slug, title, department, employment_type, work_mode, location,
  duration, working_hours, working_schedule, reporting_manager,
  is_paid, stipend_amount, compensation_description,
  additional_benefits, short_description, full_description,
  responsibilities, required_qualifications, preferred_qualifications,
  candidate_benefits, kpis, custom_questions,
  require_cv, require_portfolio, require_github,
  application_open_date, application_deadline,
  recruitment_status, publication_status
) VALUES (
  'job-fe-2026',
  'frontend-engineer-intern',
  'Frontend Engineer Intern',
  'Engineering',
  'Internship',
  'Hybrid',
  'Karachi, Pakistan / Remote',
  '3 months',
  '4 hours per day',
  'Flexible / Rotational',
  'Lead Technical Architect',
  true,
  'Competitive Performance Stipend',
  'Monthly stipend with performance bonuses and fast-track transition to full-time junior engineer based on KPI achievement.',
  '["Hands-on mentorship from senior full-stack engineers", "Direct experience building production software for live client brands", "Official certificate of internship completion and verified recommendation letter", "Flexible working hours compatible with academic or personal commitments"]'::jsonb,
  'Join the JelTech engineering team to build high-performance web applications, interactive digital canvases, and AI-powered interfaces.',
  'As a Frontend Engineer Intern at JelTech, you will work side-by-side with our technical team building modern, responsive web experiences. You will translate wireframes and Figma prototypes into clean React and Next.js components, optimize web performance, integrate APIs, and learn real-world production development workflows.',
  '["Develop responsive, pixel-accurate web pages and reusable UI components using Next.js, React, and Tailwind CSS.", "Collaborate with UI/UX designers to implement interactive animations and intuitive user flows.", "Integrate client-side interfaces with backend APIs, microservices, and databases.", "Test and optimize web applications for cross-browser compatibility, accessibility, and high Lighthouse scores.", "Participate in code reviews, sprint check-ins, and collaborative technical problem solving."]'::jsonb,
  '["Demonstrated foundational knowledge of JavaScript (ES6+), HTML5, and CSS3.", "Experience building personal, academic, or client projects with React or Next.js.", "Understanding of Git workflows (branching, commits, pull requests).", "Proactive mindset, eager to learn production-grade software engineering patterns.", "Ability to commit 20-25 hours per week on a flexible schedule."]'::jsonb,
  '["Familiarity with TypeScript, Tailwind CSS, and Framer Motion.", "Basic understanding of RESTful APIs, HTTP protocols, and server-side rendering.", "Prior open-source contributions or live project portfolio."]'::jsonb,
  '["Practical portfolio items: Ship code to real, live digital platforms.", "Industry workflow mastery: Gain hands-on mastery of Git, Next.js App Router, and modern CI/CD.", "Mentorship & 1-on-1 feedback: Structured code reviews that accelerate your technical growth.", "Pathway to permanent role: Top performers receive junior full-time offers."]'::jsonb,
  '[
    {"title": "Feature Delivery", "explanation": "Shipping assigned components, pages, and API handlers to production specifications.", "target": "100% of sprint deliverables completed", "measurementMethod": "GitHub PR merges", "frequency": "Weekly", "weight": 25},
    {"title": "Code Quality & Clean Architecture", "explanation": "Writing clean, typed, modular code adhering to JelTech design system standards.", "target": "Passes linting and peer code reviews", "measurementMethod": "GitHub code reviews", "frequency": "Weekly", "weight": 25},
    {"title": "UI Responsiveness & Polish", "explanation": "Ensuring fluid layouts, responsive breakpoints, accessible markup, and smooth interactions.", "target": "Zero layout bugs across mobile/tablet/desktop", "measurementMethod": "Cross-browser testing", "frequency": "Weekly", "weight": 20},
    {"title": "Git & Workflow Discipline", "explanation": "Clean commit history, meaningful PR descriptions, and punctual daily asynchronous standups.", "target": "Zero merge conflicts, daily PR activity", "measurementMethod": "Sprint management board", "frequency": "Weekly", "weight": 15},
    {"title": "Learning Agility & Curiosity", "explanation": "Adopting new libraries, incorporating feedback promptly, and exploring modern web APIs.", "target": "Applies review feedback within 24h", "measurementMethod": "Mentor evaluation", "frequency": "Monthly", "weight": 15}
  ]'::jsonb,
  '[]'::jsonb,
  false, false, false,
  now(),
  now() + interval '30 days',
  'Open',
  'Published'
),
(
  'job-seo-2026',
  'seo-growth-marketing-intern',
  'SEO & Growth Marketing Intern',
  'Marketing',
  'Internship',
  'Remote',
  'Karachi, Pakistan / Remote',
  '3 months',
  '4 hours per day',
  'Flexible / Rotational',
  'Head of Growth',
  true,
  'Performance-Based Stipend',
  'Monthly stipend with performance bonuses based on search visibility gains and content engagement.',
  '["Access to industry-standard SEO and analytics tools (Ahrefs, Semrush, Google Search Console)", "Hands-on experience growing real web properties and organic inbound funnels", "Internship certificate and LinkedIn recommendation from JelTech leadership"]'::jsonb,
  'Gain real-world experience optimizing websites for search engines, conducting keyword research, and driving organic growth for digital brands.',
  'JelTech is looking for an enthusiastic SEO & Growth Marketing Intern to support our digital marketing initiatives. You will conduct keyword research, write optimized meta tags and blog content, analyze competitor search footprints, and learn data-driven SEO techniques that deliver tangible business results.',
  '["Perform keyword research and content gap analysis to uncover high-intent search opportunities.", "Assist in writing and optimizing on-page meta tags, headings, image alt texts, and internal links.", "Conduct basic technical SEO audits to identify broken links, crawl issues, and indexation gaps.", "Help track rankings, search impressions, and organic conversions using Google Analytics & Search Console.", "Collaborate with developers to implement structured data (Schema.org) and Core Web Vitals optimizations."]'::jsonb,
  '["Strong written English communication skills and attention to detail.", "Basic understanding of how search engines discover, crawl, and rank web pages.", "Familiarity with Google Workspace, spreadsheets, or Google Search Console.", "Curiosity about content marketing, user search intent, and digital trends."]'::jsonb,
  '["Experience managing a personal blog, social page, or academic marketing project.", "Basic knowledge of HTML and CMS platforms."]'::jsonb,
  '["Real-world portfolio: Measurable traffic growth case studies you can feature on your resume.", "Tool mastery: Hands-on experience with modern SEO tools.", "Direct mentorship from growth professionals."]'::jsonb,
  '[
    {"title": "Task Completion", "explanation": "Execution of assigned weekly SEO audits, keyword clusters, and content refreshes on schedule.", "target": "95% tasks on-time", "measurementMethod": "Weekly sprint board reviews", "frequency": "Weekly", "weight": 20},
    {"title": "Research Quality", "explanation": "Thorough competitor gap analysis and high-intent keyword clustering.", "target": "Zero missed core intent keywords", "measurementMethod": "Peer review and client ranking reports", "frequency": "Bi-weekly", "weight": 20},
    {"title": "On-Page Optimization", "explanation": "Proper meta tags, schema markup, semantic headings, and internal linking structure.", "target": "100% adherence to technical checklist", "measurementMethod": "Lighthouse & ScreamingFrog audits", "frequency": "Weekly", "weight": 20},
    {"title": "Technical SEO Health", "explanation": "Monitoring crawl errors, canonicals, sitemaps, and core web vitals.", "target": "No crawl errors, 90+ mobile CWV", "measurementMethod": "Google Search Console checks", "frequency": "Monthly", "weight": 15},
    {"title": "Reporting & Analytics", "explanation": "Delivering actionable monthly traffic and conversion insight reports.", "target": "Clear insight decks delivered monthly", "measurementMethod": "Client / supervisor review", "frequency": "Monthly", "weight": 15},
    {"title": "Self-Learning & Initiative", "explanation": "Staying current with search algorithm changes and AI search dynamics.", "target": "1 documented case study or insight per month", "measurementMethod": "Team knowledge sharing", "frequency": "Monthly", "weight": 10}
  ]'::jsonb,
  '[]'::jsonb,
  false, false, false,
  now(),
  now() + interval '30 days',
  'Open',
  'Published'
)
ON CONFLICT (id) DO NOTHING;
