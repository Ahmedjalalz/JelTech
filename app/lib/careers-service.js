import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { getDb } from './db.js';

const RESUMES_DIR = path.join(process.cwd(), 'data', 'resumes');
if (!fs.existsSync(RESUMES_DIR)) {
  fs.mkdirSync(RESUMES_DIR, { recursive: true });
}

// Helper: Check if deadline has passed in Asia/Karachi (UTC+5)
export function isDeadlinePassed(deadlineString) {
  if (!deadlineString) return false;
  try {
    const deadlineTime = new Date(deadlineString).getTime();
    return Date.now() > deadlineTime;
  } catch (err) {
    return false;
  }
}

// Helper: Format date in Asia/Karachi
export function formatKarachiDateTime(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch (err) {
    return isoString;
  }
}

export function formatKarachiDate(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-PK', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'medium',
    }).format(date);
  } catch (err) {
    return isoString;
  }
}

// Safe JSON parser
function safeJsonParse(val, fallback) {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function parseOpeningRow(row) {
  if (!row) return null;
  const expired = isDeadlinePassed(row.application_deadline);
  return {
    ...row,
    is_paid: Boolean(row.is_paid),
    require_cv: Boolean(row.require_cv),
    require_portfolio: Boolean(row.require_portfolio),
    require_github: Boolean(row.require_github),
    additional_benefits: safeJsonParse(row.additional_benefits, []),
    responsibilities: safeJsonParse(row.responsibilities, []),
    required_qualifications: safeJsonParse(row.required_qualifications, []),
    preferred_qualifications: safeJsonParse(row.preferred_qualifications, []),
    candidate_benefits: safeJsonParse(row.candidate_benefits, []),
    kpis: safeJsonParse(row.kpis, []),
    custom_questions: safeJsonParse(row.custom_questions, []),
    is_expired: expired,
    // Active only if published, open, and not expired
    is_active: row.publication_status === 'Published' && row.recruitment_status === 'Open' && !expired,
    formatted_deadline: formatKarachiDateTime(row.application_deadline),
  };
}

// PUBLIC: Get all published, open, non-expired openings
export function getPublishedOpenings() {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM job_openings
    WHERE publication_status = 'Published'
      AND recruitment_status = 'Open'
    ORDER BY created_at DESC
  `).all();

  // Filter out expired openings
  return rows
    .map(parseOpeningRow)
    .filter((job) => !job.is_expired);
}

// PUBLIC & ADMIN: Get opening by ID or Slug
export function getOpeningByIdOrSlug(idOrSlug, isAdmin = false) {
  const db = getDb();
  const row = db.prepare(`
    SELECT * FROM job_openings
    WHERE id = ? OR slug = ?
  `).get(idOrSlug, idOrSlug);

  if (!row) return null;
  const parsed = parseOpeningRow(row);

  // For public visitors, ensure it's published and open
  if (!isAdmin) {
    if (parsed.publication_status !== 'Published' || parsed.recruitment_status !== 'Open' || parsed.is_expired) {
      return null;
    }
  }

  return parsed;
}

// ADMIN: Get all openings with applicant counts
export function getAllOpenings() {
  const db = getDb();
  const rows = db.prepare(`
    SELECT 
      j.*,
      COUNT(a.id) as application_count,
      SUM(CASE WHEN a.status = 'New' THEN 1 ELSE 0 END) as new_application_count
    FROM job_openings j
    LEFT JOIN applications a ON a.job_opening_id = j.id
    GROUP BY j.id
    ORDER BY j.created_at DESC
  `).all();

  return rows.map((r) => ({
    ...parseOpeningRow(r),
    application_count: Number(r.application_count || 0),
    new_application_count: Number(r.new_application_count || 0),
  }));
}

// Helper: Slugify title
function slugify(title) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `${base}-${Date.now().toString().slice(-4)}`;
}

// ADMIN: Create opening
export function createOpening(data) {
  const db = getDb();
  const id = `job-${crypto.randomBytes(6).toString('hex')}`;
  const slug = data.slug || slugify(data.title || 'opening');
  const now = new Date().toISOString();

  // Ensure deadline is stored with timezone if date only was provided
  let deadline = data.application_deadline;
  if (deadline && !deadline.includes('T')) {
    deadline = `${deadline}T23:59:59+05:00`;
  }

  const record = {
    id,
    slug,
    title: data.title?.trim() || 'Untitled Position',
    department: data.department?.trim() || 'General',
    employment_type: data.employment_type || 'Internship',
    work_mode: data.work_mode || 'Hybrid',
    location: data.location?.trim() || 'Karachi, Pakistan / Remote',
    duration: data.duration?.trim() || '3 months',
    working_hours: data.working_hours?.trim() || '4 hours per day',
    working_schedule: data.working_schedule?.trim() || 'Flexible / Rotational',
    reporting_manager: data.reporting_manager?.trim() || null,
    is_paid: data.is_paid ? 1 : 0,
    stipend_amount: data.stipend_amount?.trim() || null,
    compensation_description: data.compensation_description?.trim() || null,
    additional_benefits: JSON.stringify(data.additional_benefits || []),
    short_description: data.short_description?.trim() || '',
    full_description: data.full_description?.trim() || '',
    responsibilities: JSON.stringify(data.responsibilities || []),
    required_qualifications: JSON.stringify(data.required_qualifications || []),
    preferred_qualifications: JSON.stringify(data.preferred_qualifications || []),
    candidate_benefits: JSON.stringify(data.candidate_benefits || []),
    kpis: JSON.stringify(data.kpis || []),
    custom_questions: JSON.stringify(data.custom_questions || []),
    require_cv: data.require_cv ? 1 : 0,
    require_portfolio: data.require_portfolio ? 1 : 0,
    require_github: data.require_github ? 1 : 0,
    application_open_date: data.application_open_date || now,
    application_deadline: deadline || `${new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]}T23:59:59+05:00`,
    recruitment_status: data.recruitment_status || 'Draft',
    publication_status: data.publication_status || 'Unpublished',
    created_at: now,
    updated_at: now,
  };

  db.prepare(`
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
  `).run(record);

  return getOpeningByIdOrSlug(id, true);
}

// ADMIN: Update opening
export function updateOpening(id, data) {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM job_openings WHERE id = ?').get(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  let deadline = data.application_deadline || existing.application_deadline;
  if (deadline && !deadline.includes('T')) {
    deadline = `${deadline}T23:59:59+05:00`;
  }

  const record = {
    id,
    slug: data.slug || existing.slug,
    title: data.title !== undefined ? data.title.trim() : existing.title,
    department: data.department !== undefined ? data.department.trim() : existing.department,
    employment_type: data.employment_type || existing.employment_type,
    work_mode: data.work_mode || existing.work_mode,
    location: data.location !== undefined ? data.location.trim() : existing.location,
    duration: data.duration !== undefined ? data.duration.trim() : existing.duration,
    working_hours: data.working_hours !== undefined ? data.working_hours.trim() : existing.working_hours,
    working_schedule: data.working_schedule !== undefined ? data.working_schedule.trim() : existing.working_schedule,
    reporting_manager: data.reporting_manager !== undefined ? data.reporting_manager?.trim() : existing.reporting_manager,
    is_paid: data.is_paid !== undefined ? (data.is_paid ? 1 : 0) : existing.is_paid,
    stipend_amount: data.stipend_amount !== undefined ? data.stipend_amount?.trim() : existing.stipend_amount,
    compensation_description: data.compensation_description !== undefined ? data.compensation_description?.trim() : existing.compensation_description,
    additional_benefits: data.additional_benefits !== undefined ? JSON.stringify(data.additional_benefits) : existing.additional_benefits,
    short_description: data.short_description !== undefined ? data.short_description.trim() : existing.short_description,
    full_description: data.full_description !== undefined ? data.full_description.trim() : existing.full_description,
    responsibilities: data.responsibilities !== undefined ? JSON.stringify(data.responsibilities) : existing.responsibilities,
    required_qualifications: data.required_qualifications !== undefined ? JSON.stringify(data.required_qualifications) : existing.required_qualifications,
    preferred_qualifications: data.preferred_qualifications !== undefined ? JSON.stringify(data.preferred_qualifications) : existing.preferred_qualifications,
    candidate_benefits: data.candidate_benefits !== undefined ? JSON.stringify(data.candidate_benefits) : existing.candidate_benefits,
    kpis: data.kpis !== undefined ? JSON.stringify(data.kpis) : existing.kpis,
    custom_questions: data.custom_questions !== undefined ? JSON.stringify(data.custom_questions) : existing.custom_questions,
    require_cv: data.require_cv !== undefined ? (data.require_cv ? 1 : 0) : existing.require_cv,
    require_portfolio: data.require_portfolio !== undefined ? (data.require_portfolio ? 1 : 0) : existing.require_portfolio,
    require_github: data.require_github !== undefined ? (data.require_github ? 1 : 0) : existing.require_github,
    application_open_date: data.application_open_date || existing.application_open_date,
    application_deadline: deadline,
    recruitment_status: data.recruitment_status || existing.recruitment_status,
    publication_status: data.publication_status || existing.publication_status,
    updated_at: now,
  };

  db.prepare(`
    UPDATE job_openings SET
      slug = @slug,
      title = @title,
      department = @department,
      employment_type = @employment_type,
      work_mode = @work_mode,
      location = @location,
      duration = @duration,
      working_hours = @working_hours,
      working_schedule = @working_schedule,
      reporting_manager = @reporting_manager,
      is_paid = @is_paid,
      stipend_amount = @stipend_amount,
      compensation_description = @compensation_description,
      additional_benefits = @additional_benefits,
      short_description = @short_description,
      full_description = @full_description,
      responsibilities = @responsibilities,
      required_qualifications = @required_qualifications,
      preferred_qualifications = @preferred_qualifications,
      candidate_benefits = @candidate_benefits,
      kpis = @kpis,
      custom_questions = @custom_questions,
      require_cv = @require_cv,
      require_portfolio = @require_portfolio,
      require_github = @require_github,
      application_open_date = @application_open_date,
      application_deadline = @application_deadline,
      recruitment_status = @recruitment_status,
      publication_status = @publication_status,
      updated_at = @updated_at
    WHERE id = @id
  `).run(record);

  return getOpeningByIdOrSlug(id, true);
}

// ADMIN: Duplicate Opening (Principle 5C)
export function duplicateOpening(id) {
  const db = getDb();
  const original = db.prepare('SELECT * FROM job_openings WHERE id = ?').get(id);
  if (!original) throw new Error('Opening not found');

  const newId = `job-${crypto.randomBytes(6).toString('hex')}`;
  const newTitle = `${original.title} (Copy)`;
  const newSlug = slugify(newTitle);
  const now = new Date();
  const futureDeadline = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const deadlineIso = futureDeadline.toISOString().split('T')[0] + 'T23:59:59+05:00';

  const record = {
    id: newId,
    slug: newSlug,
    title: newTitle,
    department: original.department,
    employment_type: original.employment_type,
    work_mode: original.work_mode,
    location: original.location,
    duration: original.duration,
    working_hours: original.working_hours,
    working_schedule: original.working_schedule,
    reporting_manager: original.reporting_manager,
    is_paid: original.is_paid,
    stipend_amount: original.stipend_amount,
    compensation_description: original.compensation_description,
    additional_benefits: original.additional_benefits,
    short_description: original.short_description,
    full_description: original.full_description,
    responsibilities: original.responsibilities,
    required_qualifications: original.required_qualifications,
    preferred_qualifications: original.preferred_qualifications,
    candidate_benefits: original.candidate_benefits,
    kpis: original.kpis,
    custom_questions: original.custom_questions,
    require_cv: original.require_cv,
    require_portfolio: original.require_portfolio,
    require_github: original.require_github,
    // Reset dates as mandated:
    application_open_date: now.toISOString(),
    application_deadline: deadlineIso,
    // Set to Draft and Unpublished:
    recruitment_status: 'Draft',
    publication_status: 'Unpublished',
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };

  db.prepare(`
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
  `).run(record);

  return getOpeningByIdOrSlug(newId, true);
}

// ADMIN: Change status directly
export function changeOpeningStatus(id, { recruitment_status, publication_status }) {
  const db = getDb();
  const updates = [];
  const params = { id, updated_at: new Date().toISOString() };

  if (recruitment_status) {
    updates.push('recruitment_status = @recruitment_status');
    params.recruitment_status = recruitment_status;
  }
  if (publication_status) {
    updates.push('publication_status = @publication_status');
    params.publication_status = publication_status;
  }
  if (updates.length === 0) return getOpeningByIdOrSlug(id, true);

  updates.push('updated_at = @updated_at');

  db.prepare(`
    UPDATE job_openings
    SET ${updates.join(', ')}
    WHERE id = @id
  `).run(params);

  return getOpeningByIdOrSlug(id, true);
}

// ADMIN: Delete opening
export function deleteOpening(id) {
  const db = getDb();
  db.prepare('DELETE FROM job_openings WHERE id = ?').run(id);
  return { success: true };
}

// TEMPLATES (Principle 5B)
export function getTemplates() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM job_templates ORDER BY created_at DESC').all();
  return rows.map((r) => ({
    ...r,
    responsibilities: safeJsonParse(r.responsibilities, []),
    qualifications: safeJsonParse(r.qualifications, []),
    preferred_qualifications: safeJsonParse(r.preferred_qualifications, []),
    benefits: safeJsonParse(r.benefits, []),
    working_arrangements: safeJsonParse(r.working_arrangements, {}),
    kpis: safeJsonParse(r.kpis, []),
    custom_questions: safeJsonParse(r.custom_questions, []),
  }));
}

export function createTemplate(data) {
  const db = getDb();
  const id = `tmpl-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();

  const record = {
    id,
    name: data.name?.trim() || 'Untitled Template',
    department: data.department?.trim() || 'General',
    role_description: data.role_description || '',
    responsibilities: JSON.stringify(data.responsibilities || []),
    qualifications: JSON.stringify(data.qualifications || []),
    preferred_qualifications: JSON.stringify(data.preferred_qualifications || []),
    benefits: JSON.stringify(data.benefits || []),
    working_arrangements: JSON.stringify(data.working_arrangements || {}),
    kpis: JSON.stringify(data.kpis || []),
    custom_questions: JSON.stringify(data.custom_questions || []),
    created_at: now,
    updated_at: now,
  };

  db.prepare(`
    INSERT INTO job_templates (
      id, name, department, role_description, responsibilities, qualifications,
      preferred_qualifications, benefits, working_arrangements, kpis, custom_questions,
      created_at, updated_at
    ) VALUES (
      @id, @name, @department, @role_description, @responsibilities, @qualifications,
      @preferred_qualifications, @benefits, @working_arrangements, @kpis, @custom_questions,
      @created_at, @updated_at
    )
  `).run(record);

  return { id, ...record };
}

export function createTemplateFromOpening(openingId, templateName) {
  const db = getDb();
  const opening = db.prepare('SELECT * FROM job_openings WHERE id = ?').get(openingId);
  if (!opening) throw new Error('Opening not found');

  return createTemplate({
    name: templateName || `${opening.title} Template`,
    department: opening.department,
    role_description: opening.full_description,
    responsibilities: safeJsonParse(opening.responsibilities, []),
    qualifications: safeJsonParse(opening.required_qualifications, []),
    preferred_qualifications: safeJsonParse(opening.preferred_qualifications, []),
    benefits: safeJsonParse(opening.candidate_benefits, []),
    working_arrangements: {
      employmentType: opening.employment_type,
      workMode: opening.work_mode,
      location: opening.location,
      duration: opening.duration,
      workingHours: opening.working_hours,
      workingSchedule: opening.working_schedule,
      isPaid: Boolean(opening.is_paid),
      stipendAmount: opening.stipend_amount,
    },
    kpis: safeJsonParse(opening.kpis, []),
    custom_questions: safeJsonParse(opening.custom_questions, []),
  });
}

export function deleteTemplate(id) {
  const db = getDb();
  db.prepare('DELETE FROM job_templates WHERE id = ?').run(id);
  return { success: true };
}

// RESUME UPLOAD HANDLER
export async function saveResumeFile(file) {
  if (!file) return null;

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid resume format. Please upload a PDF or Word document (.pdf, .doc, .docx).');
  }

  // 5MB max
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Resume file exceeds the maximum size limit of 5MB.');
  }

  const id = `resume-${crypto.randomBytes(12).toString('hex')}`;
  const ext = path.extname(file.name) || '.pdf';
  const diskFilename = `${id}${ext}`;
  const fullDiskPath = path.join(RESUMES_DIR, diskFilename);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(fullDiskPath, buffer);

  const db = getDb();
  db.prepare(`
    INSERT INTO uploaded_resumes (id, original_filename, mime_type, file_size, file_path, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, file.name, file.type, file.size, diskFilename, new Date().toISOString());

  return id;
}

// ADMIN: Get resume for download
export function getResumeFile(resumeId) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM uploaded_resumes WHERE id = ?').get(resumeId);
  if (!row) return null;

  const fullPath = path.join(RESUMES_DIR, row.file_path);
  if (!fs.existsSync(fullPath)) return null;

  const buffer = fs.readFileSync(fullPath);
  return {
    buffer,
    filename: row.original_filename,
    mimeType: row.mime_type,
    size: row.file_size,
  };
}

// CANDIDATE APPLICATION SUBMISSION
export async function submitApplication(data, resumeFile = null) {
  const db = getDb();

  // Validate opening
  const opening = db.prepare('SELECT * FROM job_openings WHERE id = ?').get(data.job_opening_id);
  if (!opening) {
    throw new Error('The position you are applying for was not found.');
  }

  if (opening.publication_status !== 'Published' || opening.recruitment_status !== 'Open') {
    throw new Error('This position is currently not accepting applications.');
  }

  if (isDeadlinePassed(opening.application_deadline)) {
    throw new Error('The application deadline for this position has passed.');
  }

  // Check required CV if opening requires it
  if (opening.require_cv && !resumeFile) {
    throw new Error('A CV / Resume is required for this position.');
  }

  // Check required portfolio
  if (opening.require_portfolio && !data.portfolio_url?.trim()) {
    throw new Error('A portfolio link is required for this position.');
  }

  // Prevent duplicate application by email
  const normalizedEmail = (data.email || '').trim().toLowerCase();
  const existingApp = db.prepare(`
    SELECT id FROM applications 
    WHERE job_opening_id = ? AND LOWER(email) = ?
  `).get(data.job_opening_id, normalizedEmail);

  if (existingApp) {
    throw new Error('An application with this email address has already been submitted for this position.');
  }

  // Save resume file if attached
  let resumeFileId = null;
  if (resumeFile && resumeFile.size > 0) {
    resumeFileId = await saveResumeFile(resumeFile);
  }

  const appId = `app-${crypto.randomBytes(8).toString('hex')}`;
  const now = new Date().toISOString();

  const appRecord = {
    id: appId,
    job_opening_id: data.job_opening_id,
    full_name: data.full_name?.trim() || '',
    email: normalizedEmail,
    phone: data.phone?.trim() || '',
    education_status: data.education_status || 'Currently Studying',
    qualification: data.qualification?.trim() || null,
    institution: data.institution?.trim() || null,
    relevant_skills: data.relevant_skills?.trim() || '',
    why_interested: data.why_interested?.trim() || '',
    why_consider: data.why_consider?.trim() || '',
    weekly_availability: data.weekly_availability?.trim() || '',
    linkedin_url: data.linkedin_url?.trim() || null,
    portfolio_url: data.portfolio_url?.trim() || null,
    github_url: data.github_url?.trim() || null,
    additional_info: data.additional_info?.trim() || null,
    custom_answers: JSON.stringify(data.custom_answers || []),
    resume_file_id: resumeFileId,
    status: 'New',
    created_at: now,
    updated_at: now,
  };

  db.prepare(`
    INSERT INTO applications (
      id, job_opening_id, full_name, email, phone, education_status,
      qualification, institution, relevant_skills, why_interested, why_consider,
      weekly_availability, linkedin_url, portfolio_url, github_url,
      additional_info, custom_answers, resume_file_id, status, created_at, updated_at
    ) VALUES (
      @id, @job_opening_id, @full_name, @email, @phone, @education_status,
      @qualification, @institution, @relevant_skills, @why_interested, @why_consider,
      @weekly_availability, @linkedin_url, @portfolio_url, @github_url,
      @additional_info, @custom_answers, @resume_file_id, @status, @created_at, @updated_at
    )
  `).run(appRecord);

  // Log activity
  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    appId,
    'Application submitted by candidate',
    'System',
    JSON.stringify({ ip: data.client_ip || 'unknown' }),
    now
  );

  return { id: appId, status: 'New', job_title: opening.title };
}

// ADMIN: Applications list with filters
export function getApplications({ jobId, status, search, sort = 'newest' } = {}) {
  const db = getDb();
  let query = `
    SELECT 
      a.*,
      j.title as job_title,
      j.department as job_department,
      r.original_filename as resume_filename
    FROM applications a
    JOIN job_openings j ON j.id = a.job_opening_id
    LEFT JOIN uploaded_resumes r ON r.id = a.resume_file_id
    WHERE 1=1
  `;
  const params = [];

  if (jobId && jobId !== 'all') {
    query += ' AND a.job_opening_id = ?';
    params.push(jobId);
  }

  if (status && status !== 'all') {
    query += ' AND a.status = ?';
    params.push(status);
  }

  if (search && search.trim()) {
    query += ' AND (a.full_name LIKE ? OR a.email LIKE ? OR a.phone LIKE ?)';
    const s = `%${search.trim()}%`;
    params.push(s, s, s);
  }

  query += sort === 'oldest' ? ' ORDER BY a.created_at ASC' : ' ORDER BY a.created_at DESC';

  const rows = db.prepare(query).all(...params);
  return rows.map((r) => ({
    ...r,
    custom_answers: safeJsonParse(r.custom_answers, []),
    formatted_created_at: formatKarachiDateTime(r.created_at),
  }));
}

// ADMIN: Application complete details
export function getApplicationDetails(id) {
  const db = getDb();
  const app = db.prepare(`
    SELECT 
      a.*,
      j.title as job_title,
      j.department as job_department,
      j.employment_type as job_employment_type,
      j.work_mode as job_work_mode,
      r.original_filename as resume_filename,
      r.file_size as resume_file_size
    FROM applications a
    JOIN job_openings j ON j.id = a.job_opening_id
    LEFT JOIN uploaded_resumes r ON r.id = a.resume_file_id
    WHERE a.id = ?
  `).get(id);

  if (!app) return null;

  // Notes
  const notes = db.prepare(`
    SELECT * FROM application_notes
    WHERE application_id = ?
    ORDER BY created_at DESC
  `).all(id);

  // Evaluation
  const evaluation = db.prepare(`
    SELECT * FROM candidate_evaluations
    WHERE application_id = ?
  `).get(id);

  // Activity History
  const activity = db.prepare(`
    SELECT * FROM application_activity
    WHERE application_id = ?
    ORDER BY created_at DESC
  `).all(id);

  return {
    ...app,
    custom_answers: safeJsonParse(app.custom_answers, []),
    notes: notes.map((n) => ({ ...n, formatted_created_at: formatKarachiDateTime(n.created_at) })),
    evaluation: evaluation || null,
    activity: activity.map((act) => ({
      ...act,
      details: safeJsonParse(act.details, null),
      formatted_created_at: formatKarachiDateTime(act.created_at),
    })),
    formatted_created_at: formatKarachiDateTime(app.created_at),
  };
}

// ADMIN: Update application status
export function updateApplicationStatus(id, newStatus, actor = 'Admin') {
  const db = getDb();
  const current = db.prepare('SELECT status FROM applications WHERE id = ?').get(id);
  if (!current) throw new Error('Application not found');

  const now = new Date().toISOString();
  db.prepare(`
    UPDATE applications
    SET status = ?, updated_at = ?
    WHERE id = ?
  `).run(newStatus, now, id);

  // Log activity
  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    id,
    `Status changed from "${current.status}" to "${newStatus}"`,
    actor,
    JSON.stringify({ previous: current.status, next: newStatus }),
    now
  );

  return { success: true, status: newStatus };
}

// ADMIN: Add note
export function addApplicationNote(id, { note_type = 'internal', content, author = 'Admin' }) {
  if (!content?.trim()) throw new Error('Note content cannot be empty.');
  const db = getDb();
  const noteId = `note-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO application_notes (id, application_id, note_type, author, content, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(noteId, id, note_type, author, content.trim(), now);

  // Log activity
  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    id,
    `Added ${note_type === 'interview' ? 'interview' : 'internal'} note`,
    author,
    JSON.stringify({ note_type }),
    now
  );

  return { id: noteId, note_type, content, author, created_at: now };
}

// ADMIN: Save candidate evaluation
export function saveCandidateEvaluation(id, evaluation, actor = 'Admin') {
  const db = getDb();
  const evalId = `eval-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();

  const record = {
    id: evalId,
    application_id: id,
    score_skills: Number(evaluation.score_skills || 0),
    score_communication: Number(evaluation.score_communication || 0),
    score_creativity: Number(evaluation.score_creativity || 0),
    score_learning: Number(evaluation.score_learning || 0),
    score_overall: Number(evaluation.score_overall || 0),
    notes: evaluation.notes?.trim() || '',
    updated_at: now,
  };

  db.prepare(`
    INSERT INTO candidate_evaluations (
      id, application_id, score_skills, score_communication, score_creativity, score_learning, score_overall, notes, updated_at
    ) VALUES (
      @id, @application_id, @score_skills, @score_communication, @score_creativity, @score_learning, @score_overall, @notes, @updated_at
    )
    ON CONFLICT(application_id) DO UPDATE SET
      score_skills = excluded.score_skills,
      score_communication = excluded.score_communication,
      score_creativity = excluded.score_creativity,
      score_learning = excluded.score_learning,
      score_overall = excluded.score_overall,
      notes = excluded.notes,
      updated_at = excluded.updated_at
  `).run(record);

  // Log activity
  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    id,
    `Candidate evaluation recorded (Overall: ${record.score_overall}/10)`,
    actor,
    JSON.stringify({ score_overall: record.score_overall }),
    now
  );

  return record;
}

// ADMIN: Summary Dashboard Statistics
export function getDashboardStats() {
  const db = getDb();

  const openingsStats = db.prepare(`
    SELECT
      COUNT(*) as total_openings,
      SUM(CASE WHEN recruitment_status = 'Open' AND publication_status = 'Published' THEN 1 ELSE 0 END) as open_positions,
      SUM(CASE WHEN recruitment_status = 'Closed' THEN 1 ELSE 0 END) as closed_positions,
      SUM(CASE WHEN recruitment_status = 'Draft' THEN 1 ELSE 0 END) as draft_positions
    FROM job_openings
  `).get();

  const appsStats = db.prepare(`
    SELECT
      COUNT(*) as total_applications,
      SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as new_applications,
      SUM(CASE WHEN status = 'Under Review' THEN 1 ELSE 0 END) as under_review,
      SUM(CASE WHEN status = 'Shortlisted' THEN 1 ELSE 0 END) as shortlisted,
      SUM(CASE WHEN status = 'Interview Scheduled' THEN 1 ELSE 0 END) as interview_scheduled,
      SUM(CASE WHEN status = 'Selected' THEN 1 ELSE 0 END) as selected,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
    FROM applications
  `).get();

  const recentApplications = db.prepare(`
    SELECT 
      a.id, a.full_name, a.email, a.status, a.created_at,
      j.title as job_title, j.department as job_department
    FROM applications a
    JOIN job_openings j ON j.id = a.job_opening_id
    ORDER BY a.created_at DESC
    LIMIT 6
  `).all().map((r) => ({
    ...r,
    formatted_created_at: formatKarachiDateTime(r.created_at),
  }));

  const recentOpenings = db.prepare(`
    SELECT 
      id, title, department, employment_type, work_mode, recruitment_status, publication_status, application_deadline, created_at,
      (SELECT COUNT(*) FROM applications WHERE job_opening_id = job_openings.id) as application_count
    FROM job_openings
    ORDER BY created_at DESC
    LIMIT 5
  `).all().map((r) => ({
    ...r,
    formatted_deadline: formatKarachiDateTime(r.application_deadline),
  }));

  return {
    openings: {
      total: Number(openingsStats?.total_openings || 0),
      open: Number(openingsStats?.open_positions || 0),
      closed: Number(openingsStats?.closed_positions || 0),
      draft: Number(openingsStats?.draft_positions || 0),
    },
    applications: {
      total: Number(appsStats?.total_applications || 0),
      new: Number(appsStats?.new_applications || 0),
      under_review: Number(appsStats?.under_review || 0),
      shortlisted: Number(appsStats?.shortlisted || 0),
      interview_scheduled: Number(appsStats?.interview_scheduled || 0),
      selected: Number(appsStats?.selected || 0),
      rejected: Number(appsStats?.rejected || 0),
    },
    recentApplications,
    recentOpenings,
  };
}
