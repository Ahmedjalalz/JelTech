import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { KPI_PRESETS } from './kpi-presets.js';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'jeltech_careers.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let dbInstance = global.__jeltech_db;

export function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    dbInstance.exec('PRAGMA foreign_keys = ON;');
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    initSchema(dbInstance);
    seedInitialDataIfNeeded(dbInstance);
    global.__jeltech_db = dbInstance;
  }
  return dbInstance;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS job_openings (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      employment_type TEXT NOT NULL,
      work_mode TEXT NOT NULL,
      location TEXT NOT NULL,
      duration TEXT,
      working_hours TEXT,
      working_schedule TEXT,
      reporting_manager TEXT,
      is_paid INTEGER NOT NULL DEFAULT 0,
      stipend_amount TEXT,
      compensation_description TEXT,
      additional_benefits TEXT,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      responsibilities TEXT NOT NULL,
      required_qualifications TEXT NOT NULL,
      preferred_qualifications TEXT,
      candidate_benefits TEXT,
      kpis TEXT,
      custom_questions TEXT,
      require_cv INTEGER NOT NULL DEFAULT 0,
      require_portfolio INTEGER NOT NULL DEFAULT 0,
      require_github INTEGER NOT NULL DEFAULT 0,
      application_open_date TEXT,
      application_deadline TEXT NOT NULL,
      recruitment_status TEXT NOT NULL DEFAULT 'Draft',
      publication_status TEXT NOT NULL DEFAULT 'Unpublished',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_openings_status ON job_openings(recruitment_status, publication_status);
    CREATE INDEX IF NOT EXISTS idx_openings_deadline ON job_openings(application_deadline);

    CREATE TABLE IF NOT EXISTS job_templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      role_description TEXT,
      responsibilities TEXT,
      qualifications TEXT,
      preferred_qualifications TEXT,
      benefits TEXT,
      working_arrangements TEXT,
      kpis TEXT,
      custom_questions TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS uploaded_resumes (
      id TEXT PRIMARY KEY,
      original_filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      job_opening_id TEXT NOT NULL REFERENCES job_openings(id) ON DELETE CASCADE,
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
      custom_answers TEXT,
      resume_file_id TEXT REFERENCES uploaded_resumes(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'New',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_opening_id);
    CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(job_opening_id, email);
    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

    CREATE TABLE IF NOT EXISTS application_notes (
      id TEXT PRIMARY KEY,
      application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      note_type TEXT NOT NULL DEFAULT 'internal',
      author TEXT NOT NULL DEFAULT 'Admin',
      content TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS candidate_evaluations (
      id TEXT PRIMARY KEY,
      application_id TEXT UNIQUE NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      score_skills INTEGER NOT NULL DEFAULT 0,
      score_communication INTEGER NOT NULL DEFAULT 0,
      score_creativity INTEGER NOT NULL DEFAULT 0,
      score_learning INTEGER NOT NULL DEFAULT 0,
      score_overall INTEGER NOT NULL DEFAULT 0,
      notes TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS application_activity (
      id TEXT PRIMARY KEY,
      application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      actor TEXT NOT NULL DEFAULT 'Admin',
      details TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

export { KPI_PRESETS };

function seedInitialDataIfNeeded(db) {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM job_openings').get();
  if (countRow && countRow.count > 0) {
    return;
  }

  // Create two realistic openings and templates to demonstrate full capability
  const now = new Date();
  const futureDeadline = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  const deadlineIso = futureDeadline.toISOString().split('T')[0] + 'T23:59:59+05:00';

  const openings = [
    {
      id: 'job-fe-2026',
      slug: 'frontend-engineer-intern',
      title: 'Frontend Engineer Intern',
      department: 'Engineering',
      employment_type: 'Internship',
      work_mode: 'Hybrid',
      location: 'Karachi, Pakistan / Remote',
      duration: '3 months',
      working_hours: '4 hours per day',
      working_schedule: 'Flexible / Rotational',
      reporting_manager: 'Lead Technical Architect',
      is_paid: 1,
      stipend_amount: 'Competitive Performance Stipend',
      compensation_description: 'Monthly stipend with performance bonuses and fast-track transition to full-time junior engineer based on KPI achievement.',
      additional_benefits: JSON.stringify([
        'Hands-on mentorship from senior full-stack engineers',
        'Direct experience building production software for live client brands',
        'Official certificate of internship completion and verified recommendation letter',
        'Flexible working hours compatible with academic or personal commitments'
      ]),
      short_description: 'Join the JelTech engineering team to build high-performance web applications, interactive digital canvases, and AI-powered interfaces.',
      full_description: 'As a Frontend Engineer Intern at JelTech, you will work side-by-side with our technical team building modern, responsive web experiences. You will translate wireframes and Figma prototypes into clean React and Next.js components, optimize web performance, integrate APIs, and learn real-world production development workflows.',
      responsibilities: JSON.stringify([
        'Develop responsive, pixel-accurate web pages and reusable UI components using Next.js, React, and Tailwind CSS.',
        'Collaborate with UI/UX designers to implement interactive animations and intuitive user flows.',
        'Integrate client-side interfaces with backend APIs, microservices, and databases.',
        'Test and optimize web applications for cross-browser compatibility, accessibility, and high Lighthouse scores.',
        'Participate in code reviews, sprint check-ins, and collaborative technical problem solving.'
      ]),
      required_qualifications: JSON.stringify([
        'Demonstrated foundational knowledge of JavaScript (ES6+), HTML5, and CSS3.',
        'Experience building personal, academic, or client projects with React or Next.js.',
        'Understanding of Git workflows (branching, commits, pull requests).',
        'Proactive mindset, eager to learn production-grade software engineering patterns.',
        'Ability to commit 20-25 hours per week on a flexible schedule.'
      ]),
      preferred_qualifications: JSON.stringify([
        'Familiarity with TypeScript, Tailwind CSS, and Framer Motion.',
        'Basic understanding of RESTful APIs, HTTP protocols, and server-side rendering.',
        'Prior open-source contributions or live project portfolio.'
      ]),
      candidate_benefits: JSON.stringify([
        'Practical portfolio items: Ship code to real, live digital platforms.',
        'Industry workflow mastery: Gain hands-on mastery of Git, Next.js App Router, and modern CI/CD.',
        'Mentorship & 1-on-1 feedback: Structured code reviews that accelerate your technical growth.',
        'Pathway to permanent role: Top performers receive junior full-time offers.'
      ]),
      kpis: JSON.stringify(KPI_PRESETS['Web & Software Engineering']),
      custom_questions: JSON.stringify([
        { id: 'q1', question: 'Share a link to your best web project (GitHub or live URL) and describe what you built.', type: 'text', required: true }
      ]),
      require_cv: 0,
      require_portfolio: 0,
      require_github: 0,
      application_open_date: now.toISOString(),
      application_deadline: deadlineIso,
      recruitment_status: 'Open',
      publication_status: 'Published',
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'job-seo-2026',
      slug: 'seo-growth-marketing-intern',
      title: 'SEO & Growth Marketing Intern',
      department: 'Marketing',
      employment_type: 'Internship',
      work_mode: 'Remote',
      location: 'Karachi, Pakistan / Remote',
      duration: '3 months',
      working_hours: '4 hours per day',
      working_schedule: 'Flexible / Rotational',
      reporting_manager: 'Head of Growth',
      is_paid: 1,
      stipend_amount: 'Performance-Based Stipend',
      compensation_description: 'Monthly stipend with performance bonuses based on search visibility gains and content engagement.',
      additional_benefits: JSON.stringify([
        'Access to industry-standard SEO and analytics tools (Ahrefs, Semrush, Google Search Console)',
        'Hands-on experience growing real web properties and organic inbound funnels',
        'Internship certificate and LinkedIn recommendation from JelTech leadership'
      ]),
      short_description: 'Gain real-world experience optimizing websites for search engines, conducting keyword research, and driving organic growth for digital brands.',
      full_description: 'JelTech is looking for an enthusiastic SEO & Growth Marketing Intern to support our digital marketing initiatives. You will conduct keyword research, write optimized meta tags and blog content, analyze competitor search footprints, and learn data-driven SEO techniques that deliver tangible business results.',
      responsibilities: JSON.stringify([
        'Perform keyword research and content gap analysis to uncover high-intent search opportunities.',
        'Assist in writing and optimizing on-page meta tags, headings, image alt texts, and internal links.',
        'Conduct basic technical SEO audits to identify broken links, crawl issues, and indexation gaps.',
        'Help track rankings, search impressions, and organic conversions using Google Analytics & Search Console.',
        'Collaborate with developers to implement structured data (Schema.org) and Core Web Vitals optimizations.'
      ]),
      required_qualifications: JSON.stringify([
        'Strong written English communication skills and attention to detail.',
        'Basic understanding of how search engines discover, crawl, and rank web pages.',
        'Familiarity with Google Workspace, spreadsheets, or Google Search Console.',
        'Curiosity about content marketing, user search intent, and digital trends.'
      ]),
      preferred_qualifications: JSON.stringify([
        'Experience managing a personal blog, social page, or academic marketing project.',
        'Basic knowledge of HTML and CMS platforms.'
      ]),
      candidate_benefits: JSON.stringify([
        'Real-world portfolio: Measurable traffic growth case studies you can feature on your resume.',
        'Tool mastery: Hands-on experience with modern SEO tools.',
        'Direct mentorship from growth professionals.'
      ]),
      kpis: JSON.stringify(KPI_PRESETS['SEO & Growth']),
      custom_questions: JSON.stringify([]),
      require_cv: 0,
      require_portfolio: 0,
      require_github: 0,
      application_open_date: now.toISOString(),
      application_deadline: deadlineIso,
      recruitment_status: 'Open',
      publication_status: 'Published',
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO job_openings (
      id, slug, title, department, employment_type, work_mode, location,
      duration, working_hours, working_schedule, reporting_manager,
      is_paid, stipend_amount, compensation_description, additional_benefits,
      short_description, full_description, responsibilities, required_qualifications,
      preferred_qualifications, candidate_benefits, kpis, custom_questions,
      require_cv, require_portfolio, require_github, application_open_date,
      application_deadline, recruitment_status, publication_status, created_at, updated_at
    ) VALUES (
      @id, @slug, @title, @department, @employment_type, @work_mode, @location,
      @duration, @working_hours, @working_schedule, @reporting_manager,
      @is_paid, @stipend_amount, @compensation_description, @additional_benefits,
      @short_description, @full_description, @responsibilities, @required_qualifications,
      @preferred_qualifications, @candidate_benefits, @kpis, @custom_questions,
      @require_cv, @require_portfolio, @require_github, @application_open_date,
      @application_deadline, @recruitment_status, @publication_status, @created_at, @updated_at
    )
  `);

  for (const job of openings) {
    insertStmt.run(job);
  }

  // Create two templates
  const templateStmt = db.prepare(`
    INSERT INTO job_templates (
      id, name, department, role_description, responsibilities, qualifications,
      preferred_qualifications, benefits, working_arrangements, kpis, custom_questions,
      created_at, updated_at
    ) VALUES (
      @id, @name, @department, @role_description, @responsibilities, @qualifications,
      @preferred_qualifications, @benefits, @working_arrangements, @kpis, @custom_questions,
      @created_at, @updated_at
    )
  `);

  templateStmt.run({
    id: 'tmpl-eng-standard',
    name: 'Standard Software Engineering Internship Template',
    department: 'Engineering',
    role_description: openings[0].full_description,
    responsibilities: openings[0].responsibilities,
    qualifications: openings[0].required_qualifications,
    preferred_qualifications: openings[0].preferred_qualifications,
    benefits: openings[0].candidate_benefits,
    working_arrangements: JSON.stringify({
      employmentType: 'Internship',
      workMode: 'Hybrid',
      location: 'Karachi, Pakistan / Remote',
      duration: '3 months',
      workingHours: '4 hours per day',
      workingSchedule: 'Flexible / Rotational',
      isPaid: true,
      stipendAmount: 'Competitive Performance Stipend'
    }),
    kpis: openings[0].kpis,
    custom_questions: openings[0].custom_questions,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  });

  templateStmt.run({
    id: 'tmpl-seo-standard',
    name: 'Standard SEO & Marketing Template',
    department: 'Marketing',
    role_description: openings[1].full_description,
    responsibilities: openings[1].responsibilities,
    qualifications: openings[1].required_qualifications,
    preferred_qualifications: openings[1].preferred_qualifications,
    benefits: openings[1].candidate_benefits,
    working_arrangements: JSON.stringify({
      employmentType: 'Internship',
      workMode: 'Remote',
      location: 'Karachi, Pakistan / Remote',
      duration: '3 months',
      workingHours: '4 hours per day',
      workingSchedule: 'Flexible / Rotational',
      isPaid: true,
      stipendAmount: 'Performance-Based Stipend'
    }),
    kpis: openings[1].kpis,
    custom_questions: openings[1].custom_questions,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  });
}
