import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { getDb } from './db.js';
import { getSupabaseAdmin, getSupabaseClient, isSupabaseConfigured } from './supabase.js';

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

// Safe JSON parser: works for both Postgres JSONB (already parsed) and SQLite TEXT (needs parse)
function safeJsonParse(val, fallback = []) {
  if (val === null || val === undefined) return fallback;
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
    is_active: row.publication_status === 'Published' && row.recruitment_status === 'Open' && !expired,
    formatted_deadline: formatKarachiDateTime(row.application_deadline),
  };
}

function slugify(title) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `${base}-${Date.now().toString().slice(-4)}`;
}

// ==========================================
// JOB OPENINGS
// ==========================================

export async function getPublishedOpenings() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin() || getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('job_openings')
          .select('*')
          .eq('publication_status', 'Published')
          .eq('recruitment_status', 'Open')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data
            .map(parseOpeningRow)
            .filter((job) => !job.is_expired);
        }
      }
    } catch (err) {
      console.warn('Supabase getPublishedOpenings error, falling back to SQLite:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM job_openings
    WHERE publication_status = 'Published'
      AND recruitment_status = 'Open'
    ORDER BY created_at DESC
  `).all();

  return rows
    .map(parseOpeningRow)
    .filter((job) => !job.is_expired);
}

export async function getOpeningByIdOrSlug(idOrSlug, isAdmin = false) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = isAdmin ? getSupabaseAdmin() : (getSupabaseAdmin() || getSupabaseClient());
      if (supabase) {
        const { data, error } = await supabase
          .from('job_openings')
          .select('*')
          .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
          .limit(1);

        const row = data?.[0] || null;
        if (row) {
          const parsed = parseOpeningRow(row);
          if (!isAdmin) {
            if (parsed.publication_status !== 'Published' || parsed.recruitment_status !== 'Open' || parsed.is_expired) {
              return null;
            }
          }
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Supabase getOpeningByIdOrSlug error, falling back to SQLite:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  const row = db.prepare(`
    SELECT * FROM job_openings
    WHERE id = ? OR slug = ?
  `).get(idOrSlug, idOrSlug);

  if (!row) return null;
  const parsed = parseOpeningRow(row);

  if (!isAdmin) {
    if (parsed.publication_status !== 'Published' || parsed.recruitment_status !== 'Open' || parsed.is_expired) {
      return null;
    }
  }

  return parsed;
}

export async function getAllOpenings() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data: openings, error } = await supabase
          .from('job_openings')
          .select('*, applications(id, status)')
          .order('created_at', { ascending: false });

        if (!error && openings) {
          return openings.map((r) => {
            const apps = r.applications || [];
            return {
              ...parseOpeningRow(r),
              application_count: apps.length,
              new_application_count: apps.filter((a) => a.status === 'New').length,
            };
          });
        }
      }
    } catch (err) {
      console.warn('Supabase getAllOpenings error, falling back to SQLite:', err?.message || err);
    }
  }

  // SQLite Fallback
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

export async function createOpening(data) {
  const id = `job-${crypto.randomBytes(6).toString('hex')}`;
  const slug = data.slug || slugify(data.title || 'opening');
  const now = new Date().toISOString();

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
    is_paid: Boolean(data.is_paid),
    stipend_amount: data.stipend_amount?.trim() || null,
    compensation_description: data.compensation_description?.trim() || null,
    additional_benefits: data.additional_benefits || [],
    short_description: data.short_description?.trim() || '',
    full_description: data.full_description?.trim() || '',
    responsibilities: data.responsibilities || [],
    required_qualifications: data.required_qualifications || [],
    preferred_qualifications: data.preferred_qualifications || [],
    candidate_benefits: data.candidate_benefits || [],
    kpis: data.kpis || [],
    custom_questions: data.custom_questions || [],
    require_cv: Boolean(data.require_cv),
    require_portfolio: Boolean(data.require_portfolio),
    require_github: Boolean(data.require_github),
    application_open_date: data.application_open_date || now,
    application_deadline: deadline || `${new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]}T23:59:59+05:00`,
    recruitment_status: data.recruitment_status || 'Draft',
    publication_status: data.publication_status || 'Unpublished',
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from('job_openings').insert(record);
        if (error) throw error;
        return await getOpeningByIdOrSlug(id, true);
      }
    } catch (err) {
      console.warn('Supabase createOpening error, falling back to SQLite:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  const sqliteRecord = {
    ...record,
    is_paid: record.is_paid ? 1 : 0,
    require_cv: record.require_cv ? 1 : 0,
    require_portfolio: record.require_portfolio ? 1 : 0,
    require_github: record.require_github ? 1 : 0,
    additional_benefits: JSON.stringify(record.additional_benefits),
    responsibilities: JSON.stringify(record.responsibilities),
    required_qualifications: JSON.stringify(record.required_qualifications),
    preferred_qualifications: JSON.stringify(record.preferred_qualifications),
    candidate_benefits: JSON.stringify(record.candidate_benefits),
    kpis: JSON.stringify(record.kpis),
    custom_questions: JSON.stringify(record.custom_questions),
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
  `).run(sqliteRecord);

  return await getOpeningByIdOrSlug(id, true);
}

export async function updateOpening(id, data) {
  const existing = await getOpeningByIdOrSlug(id, true);
  if (!existing) return null;

  const now = new Date().toISOString();
  let deadline = data.application_deadline || existing.application_deadline;
  if (deadline && !deadline.includes('T')) {
    deadline = `${deadline}T23:59:59+05:00`;
  }

  const record = {
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
    is_paid: data.is_paid !== undefined ? Boolean(data.is_paid) : existing.is_paid,
    stipend_amount: data.stipend_amount !== undefined ? data.stipend_amount?.trim() : existing.stipend_amount,
    compensation_description: data.compensation_description !== undefined ? data.compensation_description?.trim() : existing.compensation_description,
    additional_benefits: data.additional_benefits !== undefined ? data.additional_benefits : existing.additional_benefits,
    short_description: data.short_description !== undefined ? data.short_description.trim() : existing.short_description,
    full_description: data.full_description !== undefined ? data.full_description.trim() : existing.full_description,
    responsibilities: data.responsibilities !== undefined ? data.responsibilities : existing.responsibilities,
    required_qualifications: data.required_qualifications !== undefined ? data.required_qualifications : existing.required_qualifications,
    preferred_qualifications: data.preferred_qualifications !== undefined ? data.preferred_qualifications : existing.preferred_qualifications,
    candidate_benefits: data.candidate_benefits !== undefined ? data.candidate_benefits : existing.candidate_benefits,
    kpis: data.kpis !== undefined ? data.kpis : existing.kpis,
    custom_questions: data.custom_questions !== undefined ? data.custom_questions : existing.custom_questions,
    require_cv: data.require_cv !== undefined ? Boolean(data.require_cv) : existing.require_cv,
    require_portfolio: data.require_portfolio !== undefined ? Boolean(data.require_portfolio) : existing.require_portfolio,
    require_github: data.require_github !== undefined ? Boolean(data.require_github) : existing.require_github,
    application_open_date: data.application_open_date || existing.application_open_date,
    application_deadline: deadline,
    recruitment_status: data.recruitment_status || existing.recruitment_status,
    publication_status: data.publication_status || existing.publication_status,
    updated_at: now,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from('job_openings').update(record).eq('id', id);
        if (error) throw error;
        return await getOpeningByIdOrSlug(id, true);
      }
    } catch (err) {
      console.warn('Supabase updateOpening error, falling back to SQLite:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  const sqliteRecord = {
    ...record,
    id,
    is_paid: record.is_paid ? 1 : 0,
    require_cv: record.require_cv ? 1 : 0,
    require_portfolio: record.require_portfolio ? 1 : 0,
    require_github: record.require_github ? 1 : 0,
    additional_benefits: JSON.stringify(record.additional_benefits),
    responsibilities: JSON.stringify(record.responsibilities),
    required_qualifications: JSON.stringify(record.required_qualifications),
    preferred_qualifications: JSON.stringify(record.preferred_qualifications),
    candidate_benefits: JSON.stringify(record.candidate_benefits),
    kpis: JSON.stringify(record.kpis),
    custom_questions: JSON.stringify(record.custom_questions),
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
  `).run(sqliteRecord);

  return await getOpeningByIdOrSlug(id, true);
}

export async function duplicateOpening(id) {
  const original = await getOpeningByIdOrSlug(id, true);
  if (!original) return null;

  return await createOpening({
    ...original,
    title: `${original.title} (Copy)`,
    slug: slugify(`${original.title}-copy`),
    recruitment_status: 'Draft',
    publication_status: 'Unpublished',
  });
}

export async function changeOpeningStatus(id, { publication_status, recruitment_status }) {
  const updates = { updated_at: new Date().toISOString() };
  if (publication_status) updates.publication_status = publication_status;
  if (recruitment_status) updates.recruitment_status = recruitment_status;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('job_openings').update(updates).eq('id', id);
        return await getOpeningByIdOrSlug(id, true);
      }
    } catch (err) {
      console.warn('Supabase changeOpeningStatus error, falling back:', err?.message || err);
    }
  }

  const db = getDb();
  if (publication_status && recruitment_status) {
    db.prepare('UPDATE job_openings SET publication_status = ?, recruitment_status = ?, updated_at = ? WHERE id = ?')
      .run(publication_status, recruitment_status, updates.updated_at, id);
  } else if (publication_status) {
    db.prepare('UPDATE job_openings SET publication_status = ?, updated_at = ? WHERE id = ?')
      .run(publication_status, updates.updated_at, id);
  } else if (recruitment_status) {
    db.prepare('UPDATE job_openings SET recruitment_status = ?, updated_at = ? WHERE id = ?')
      .run(recruitment_status, updates.updated_at, id);
  }

  return await getOpeningByIdOrSlug(id, true);
}

export async function deleteOpening(id) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('job_openings').delete().eq('id', id);
        return;
      }
    } catch (err) {
      console.warn('Supabase deleteOpening error, falling back:', err?.message || err);
    }
  }

  const db = getDb();
  db.prepare('DELETE FROM job_openings WHERE id = ?').run(id);
}

// ==========================================
// TEMPLATES
// ==========================================

export async function getTemplates() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data } = await supabase.from('job_templates').select('*').order('created_at', { ascending: false });
        if (data) {
          return data.map((t) => ({
            ...t,
            responsibilities: safeJsonParse(t.responsibilities, []),
            qualifications: safeJsonParse(t.qualifications, []),
            preferred_qualifications: safeJsonParse(t.preferred_qualifications, []),
            benefits: safeJsonParse(t.benefits, []),
            working_arrangements: safeJsonParse(t.working_arrangements, {}),
            kpis: safeJsonParse(t.kpis, []),
            custom_questions: safeJsonParse(t.custom_questions, []),
          }));
        }
      }
    } catch {}
  }

  const db = getDb();
  const rows = db.prepare('SELECT * FROM job_templates ORDER BY created_at DESC').all();
  return rows.map((t) => ({
    ...t,
    responsibilities: safeJsonParse(t.responsibilities, []),
    qualifications: safeJsonParse(t.qualifications, []),
    preferred_qualifications: safeJsonParse(t.preferred_qualifications, []),
    benefits: safeJsonParse(t.benefits, []),
    working_arrangements: safeJsonParse(t.working_arrangements, {}),
    kpis: safeJsonParse(t.kpis, []),
    custom_questions: safeJsonParse(t.custom_questions, []),
  }));
}

export async function createTemplate(data) {
  const id = `tpl-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();

  const record = {
    id,
    name: data.name?.trim() || 'Untitled Template',
    department: data.department?.trim() || 'General',
    role_description: data.role_description || '',
    responsibilities: data.responsibilities || [],
    qualifications: data.qualifications || [],
    preferred_qualifications: data.preferred_qualifications || [],
    benefits: data.benefits || [],
    working_arrangements: data.working_arrangements || {},
    kpis: data.kpis || [],
    custom_questions: data.custom_questions || [],
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('job_templates').insert(record);
        return record;
      }
    } catch {}
  }

  const db = getDb();
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
  `).run({
    ...record,
    responsibilities: JSON.stringify(record.responsibilities),
    qualifications: JSON.stringify(record.qualifications),
    preferred_qualifications: JSON.stringify(record.preferred_qualifications),
    benefits: JSON.stringify(record.benefits),
    working_arrangements: JSON.stringify(record.working_arrangements),
    kpis: JSON.stringify(record.kpis),
    custom_questions: JSON.stringify(record.custom_questions),
  });

  return record;
}

export async function createTemplateFromOpening(openingId, name) {
  const opening = await getOpeningByIdOrSlug(openingId, true);
  if (!opening) return null;

  return await createTemplate({
    name: name?.trim() || `${opening.title} Template`,
    department: opening.department,
    role_description: opening.full_description,
    responsibilities: opening.responsibilities,
    qualifications: opening.required_qualifications,
    preferred_qualifications: opening.preferred_qualifications,
    benefits: opening.candidate_benefits,
    working_arrangements: {
      employment_type: opening.employment_type,
      work_mode: opening.work_mode,
      duration: opening.duration,
      working_hours: opening.working_hours,
      working_schedule: opening.working_schedule,
      is_paid: opening.is_paid,
      stipend_amount: opening.stipend_amount,
    },
    kpis: opening.kpis,
    custom_questions: opening.custom_questions,
  });
}

export async function deleteTemplate(id) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('job_templates').delete().eq('id', id);
        return;
      }
    } catch {}
  }

  const db = getDb();
  db.prepare('DELETE FROM job_templates WHERE id = ?').run(id);
}

// ==========================================
// RESUME STORAGE
// ==========================================

export async function saveResumeFile(file, candidateName) {
  if (!file) return null;

  const fileId = `res-${crypto.randomBytes(8).toString('hex')}`;
  const fileExt = path.extname(file.name || '') || '.pdf';
  const cleanName = (candidateName || 'candidate')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 30);
  const storageFileName = `${fileId}_${cleanName}${fileExt}`;
  const now = new Date().toISOString();

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // If Supabase Storage is available
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(storageFileName, buffer, {
            contentType: file.type || 'application/pdf',
            upsert: true,
          });

        if (!uploadError) {
          await supabase.from('uploaded_resumes').insert({
            id: fileId,
            original_filename: file.name,
            mime_type: file.type || 'application/octet-stream',
            file_size: file.size,
            file_path: storageFileName,
            storage_type: 'supabase',
            created_at: now,
          });

          return { id: fileId, filename: file.name };
        } else {
          console.warn('Supabase storage upload failed, saving to disk:', uploadError.message);
        }
      }
    } catch (err) {
      console.warn('Supabase resume upload error, falling back to local disk:', err?.message || err);
    }
  }

  // Local filesystem fallback
  const filePath = path.join(RESUMES_DIR, storageFileName);
  fs.writeFileSync(filePath, buffer);

  const db = getDb();
  db.prepare(`
    INSERT INTO uploaded_resumes (id, original_filename, mime_type, file_size, file_path, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(fileId, file.name, file.type || 'application/octet-stream', file.size, filePath, now);

  return { id: fileId, filename: file.name };
}

export async function getResumeFile(id) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data: record } = await supabase
          .from('uploaded_resumes')
          .select('*')
          .eq('id', id)
          .single();

        if (record) {
          if (record.storage_type === 'supabase') {
            const { data: blob, error } = await supabase.storage
              .from('resumes')
              .download(record.file_path);

            if (!error && blob) {
              const buffer = Buffer.from(await blob.arrayBuffer());
              return {
                buffer,
                filename: record.original_filename,
                mimeType: record.mime_type,
                size: record.file_size,
              };
            }
          }
        }
      }
    } catch (err) {
      console.warn('Supabase getResumeFile error, falling back:', err?.message || err);
    }
  }

  // Local file fallback
  const db = getDb();
  const record = db.prepare('SELECT * FROM uploaded_resumes WHERE id = ?').get(id);
  if (!record || !fs.existsSync(record.file_path)) {
    return null;
  }

  const buffer = fs.readFileSync(record.file_path);
  return {
    buffer,
    filename: record.original_filename,
    mimeType: record.mime_type,
    size: record.file_size,
  };
}

// ==========================================
// CANDIDATE APPLICATIONS
// ==========================================

export async function submitApplication(data, resumeFile = null) {
  const opening = await getOpeningByIdOrSlug(data.job_opening_id, false);
  if (!opening) {
    throw new Error('This job opening is no longer active or could not be found.');
  }

  let resumeFileId = null;
  if (resumeFile) {
    const saved = await saveResumeFile(resumeFile, data.full_name);
    if (saved) resumeFileId = saved.id;
  }

  const id = `app-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();

  let customAnswersParsed = [];
  if (typeof data.custom_answers === 'string') {
    try {
      customAnswersParsed = JSON.parse(data.custom_answers);
    } catch {
      customAnswersParsed = [];
    }
  } else if (Array.isArray(data.custom_answers)) {
    customAnswersParsed = data.custom_answers;
  }

  const applicationRecord = {
    id,
    job_opening_id: opening.id,
    full_name: data.full_name?.trim(),
    email: data.email?.trim().toLowerCase(),
    phone: data.phone?.trim(),
    education_status: data.education_status || 'Currently Studying',
    qualification: data.qualification?.trim() || null,
    institution: data.institution?.trim() || null,
    relevant_skills: data.relevant_skills?.trim(),
    why_interested: data.why_interested?.trim(),
    why_consider: data.why_consider?.trim(),
    weekly_availability: data.weekly_availability?.trim(),
    linkedin_url: data.linkedin_url?.trim() || null,
    portfolio_url: data.portfolio_url?.trim() || null,
    github_url: data.github_url?.trim() || null,
    additional_info: data.additional_info?.trim() || null,
    custom_answers: customAnswersParsed,
    resume_file_id: resumeFileId,
    status: 'New',
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error: appErr } = await supabase.from('applications').insert(applicationRecord);
        if (appErr) throw appErr;

        // Log creation activity
        await supabase.from('application_activity').insert({
          id: `act-${crypto.randomBytes(6).toString('hex')}`,
          application_id: id,
          action: 'Application Submitted',
          actor: 'Candidate',
          details: `Application received for ${opening.title}`,
          created_at: now,
        });

        return {
          id,
          full_name: applicationRecord.full_name,
          email: applicationRecord.email,
          job_title: opening.title,
          status: 'New',
          created_at: now,
        };
      }
    } catch (err) {
      console.warn('Supabase submitApplication error, falling back to SQLite:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  db.prepare(`
    INSERT INTO applications (
      id, job_opening_id, full_name, email, phone, education_status,
      qualification, institution, relevant_skills, why_interested, why_consider,
      weekly_availability, linkedin_url, portfolio_url, github_url, additional_info,
      custom_answers, resume_file_id, status, created_at, updated_at
    ) VALUES (
      @id, @job_opening_id, @full_name, @email, @phone, @education_status,
      @qualification, @institution, @relevant_skills, @why_interested, @why_consider,
      @weekly_availability, @linkedin_url, @portfolio_url, @github_url, @additional_info,
      @custom_answers, @resume_file_id, @status, @created_at, @updated_at
    )
  `).run({
    ...applicationRecord,
    custom_answers: JSON.stringify(customAnswersParsed),
  });

  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    id,
    'Application Submitted',
    'Candidate',
    `Application received for ${opening.title}`,
    now
  );

  return {
    id,
    full_name: applicationRecord.full_name,
    email: applicationRecord.email,
    job_title: opening.title,
    status: 'New',
    created_at: now,
  };
}

export async function getApplications({ jobId = null, status = null, search = '', sort = 'newest' } = {}) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        let query = supabase
          .from('applications')
          .select('*, job_openings(id, title, department, employment_type, work_mode), candidate_evaluations(score_overall)');

        if (jobId && jobId !== 'all') {
          query = query.eq('job_opening_id', jobId);
        }
        if (status && status !== 'all') {
          query = query.eq('status', status);
        }
        if (search && search.trim()) {
          const s = search.trim();
          query = query.or(`full_name.ilike.%${s}%,email.ilike.%${s}%,relevant_skills.ilike.%${s}%,institution.ilike.%${s}%`);
        }

        query = query.order('created_at', { ascending: sort === 'oldest' });

        const { data, error } = await query;
        if (!error && data) {
          return data.map((a) => ({
            ...a,
            custom_answers: safeJsonParse(a.custom_answers, []),
            job_title: a.job_openings?.title || 'Unknown',
            department: a.job_openings?.department || 'General',
            overall_score: a.candidate_evaluations?.[0]?.score_overall ?? a.candidate_evaluations?.score_overall ?? null,
            formatted_date: formatKarachiDate(a.created_at),
          }));
        }
      }
    } catch (err) {
      console.warn('Supabase getApplications error, falling back:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  let sql = `
    SELECT 
      a.*,
      j.title as job_title,
      j.department,
      e.score_overall as overall_score
    FROM applications a
    JOIN job_openings j ON a.job_opening_id = j.id
    LEFT JOIN candidate_evaluations e ON e.application_id = a.id
    WHERE 1=1
  `;
  const params = [];

  if (jobId && jobId !== 'all') {
    sql += ' AND a.job_opening_id = ?';
    params.push(jobId);
  }
  if (status && status !== 'all') {
    sql += ' AND a.status = ?';
    params.push(status);
  }
  if (search && search.trim()) {
    const s = `%${search.trim().toLowerCase()}%`;
    sql += ' AND (LOWER(a.full_name) LIKE ? OR LOWER(a.email) LIKE ? OR LOWER(a.relevant_skills) LIKE ? OR LOWER(a.institution) LIKE ?)';
    params.push(s, s, s, s);
  }

  if (sort === 'oldest') {
    sql += ' ORDER BY a.created_at ASC';
  } else {
    sql += ' ORDER BY a.created_at DESC';
  }

  const rows = db.prepare(sql).all(...params);
  return rows.map((a) => ({
    ...a,
    custom_answers: safeJsonParse(a.custom_answers, []),
    formatted_date: formatKarachiDate(a.created_at),
  }));
}

export async function getApplicationDetails(id) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data: app, error } = await supabase
          .from('applications')
          .select('*, job_openings(*), uploaded_resumes(*)')
          .eq('id', id)
          .single();

        if (!error && app) {
          const { data: notes } = await supabase
            .from('application_notes')
            .select('*')
            .eq('application_id', id)
            .order('created_at', { ascending: false });

          const { data: evaluations } = await supabase
            .from('candidate_evaluations')
            .select('*')
            .eq('application_id', id)
            .single();

          const { data: activity } = await supabase
            .from('application_activity')
            .select('*')
            .eq('application_id', id)
            .order('created_at', { ascending: false });

          return {
            ...app,
            custom_answers: safeJsonParse(app.custom_answers, []),
            job: parseOpeningRow(app.job_openings),
            resume: app.uploaded_resumes ? {
              id: app.uploaded_resumes.id,
              filename: app.uploaded_resumes.original_filename,
              size: app.uploaded_resumes.file_size,
              mimeType: app.uploaded_resumes.mime_type,
            } : null,
            notes: (notes || []).map((n) => ({
              ...n,
              formatted_date: formatKarachiDateTime(n.created_at),
            })),
            evaluation: evaluations || null,
            activity: (activity || []).map((act) => ({
              ...act,
              formatted_date: formatKarachiDateTime(act.created_at),
            })),
            formatted_date: formatKarachiDateTime(app.created_at),
          };
        }
      }
    } catch (err) {
      console.warn('Supabase getApplicationDetails error, falling back:', err?.message || err);
    }
  }

  // SQLite Fallback
  const db = getDb();
  const app = db.prepare(`
    SELECT a.*, j.title as job_title, j.department, j.work_mode, j.employment_type
    FROM applications a
    JOIN job_openings j ON a.job_opening_id = j.id
    WHERE a.id = ?
  `).get(id);

  if (!app) return null;

  const opening = await getOpeningByIdOrSlug(app.job_opening_id, true);

  let resume = null;
  if (app.resume_file_id) {
    const r = db.prepare('SELECT * FROM uploaded_resumes WHERE id = ?').get(app.resume_file_id);
    if (r) {
      resume = {
        id: r.id,
        filename: r.original_filename,
        size: r.file_size,
        mimeType: r.mime_type,
      };
    }
  }

  const notes = db.prepare(`
    SELECT * FROM application_notes WHERE application_id = ? ORDER BY created_at DESC
  `).all(id).map((n) => ({
    ...n,
    formatted_date: formatKarachiDateTime(n.created_at),
  }));

  const evaluation = db.prepare(`
    SELECT * FROM candidate_evaluations WHERE application_id = ?
  `).get(id) || null;

  const activity = db.prepare(`
    SELECT * FROM application_activity WHERE application_id = ? ORDER BY created_at DESC
  `).all(id).map((act) => ({
    ...act,
    formatted_date: formatKarachiDateTime(act.created_at),
  }));

  return {
    ...app,
    custom_answers: safeJsonParse(app.custom_answers, []),
    job: opening,
    resume,
    notes,
    evaluation,
    activity,
    formatted_date: formatKarachiDateTime(app.created_at),
  };
}

export async function updateApplicationStatus(id, newStatus, actor = 'Admin') {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('applications').update({ status: newStatus, updated_at: now }).eq('id', id);
        await supabase.from('application_activity').insert({
          id: `act-${crypto.randomBytes(6).toString('hex')}`,
          application_id: id,
          action: 'Status Changed',
          actor,
          details: `Moved to ${newStatus}`,
          created_at: now,
        });
        return await getApplicationDetails(id);
      }
    } catch (err) {
      console.warn('Supabase updateApplicationStatus error, falling back:', err?.message || err);
    }
  }

  const db = getDb();
  db.prepare('UPDATE applications SET status = ?, updated_at = ? WHERE id = ?').run(newStatus, now, id);
  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    id,
    'Status Changed',
    actor,
    `Moved to ${newStatus}`,
    now
  );

  return await getApplicationDetails(id);
}

export async function addApplicationNote(id, { content, note_type = 'internal', author = 'Admin' }) {
  const noteId = `note-${crypto.randomBytes(6).toString('hex')}`;
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('application_notes').insert({
          id: noteId,
          application_id: id,
          note_type,
          author,
          content,
          created_at: now,
        });
        await supabase.from('application_activity').insert({
          id: `act-${crypto.randomBytes(6).toString('hex')}`,
          application_id: id,
          action: 'Note Added',
          actor: author,
          details: `Added ${note_type} note`,
          created_at: now,
        });
        return { id: noteId, content, note_type, author, created_at: now, formatted_date: formatKarachiDateTime(now) };
      }
    } catch {}
  }

  const db = getDb();
  db.prepare(`
    INSERT INTO application_notes (id, application_id, note_type, author, content, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(noteId, id, note_type, author, content, now);

  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    id,
    'Note Added',
    author,
    `Added ${note_type} note`,
    now
  );

  return { id: noteId, content, note_type, author, created_at: now, formatted_date: formatKarachiDateTime(now) };
}

export async function saveCandidateEvaluation(applicationId, scores, actor = 'Admin') {
  const now = new Date().toISOString();
  const evalId = `eval-${crypto.randomBytes(6).toString('hex')}`;

  const payload = {
    application_id: applicationId,
    score_skills: Number(scores.score_skills) || 0,
    score_communication: Number(scores.score_communication) || 0,
    score_creativity: Number(scores.score_creativity) || 0,
    score_learning: Number(scores.score_learning) || 0,
    score_overall: Number(scores.score_overall) || 0,
    notes: scores.notes || '',
    updated_at: now,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from('candidate_evaluations').upsert({
          id: evalId,
          ...payload,
        }, { onConflict: 'application_id' });

        if (!error) {
          await supabase.from('application_activity').insert({
            id: `act-${crypto.randomBytes(6).toString('hex')}`,
            application_id: applicationId,
            action: 'Scorecard Updated',
            actor,
            details: `Overall Score: ${payload.score_overall}/100`,
            created_at: now,
          });
          return payload;
        }
      }
    } catch {}
  }

  const db = getDb();
  db.prepare(`
    INSERT INTO candidate_evaluations (
      id, application_id, score_skills, score_communication, score_creativity,
      score_learning, score_overall, notes, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(application_id) DO UPDATE SET
      score_skills = excluded.score_skills,
      score_communication = excluded.score_communication,
      score_creativity = excluded.score_creativity,
      score_learning = excluded.score_learning,
      score_overall = excluded.score_overall,
      notes = excluded.notes,
      updated_at = excluded.updated_at
  `).run(
    evalId,
    applicationId,
    payload.score_skills,
    payload.score_communication,
    payload.score_creativity,
    payload.score_learning,
    payload.score_overall,
    payload.notes,
    now
  );

  db.prepare(`
    INSERT INTO application_activity (id, application_id, action, actor, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `act-${crypto.randomBytes(6).toString('hex')}`,
    applicationId,
    'Scorecard Updated',
    actor,
    `Overall Score: ${payload.score_overall}/100`,
    now
  );

  return payload;
}

// ==========================================
// DASHBOARD STATS
// ==========================================

export async function getDashboardStats() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { count: totalOpenings } = await supabase.from('job_openings').select('*', { count: 'exact', head: true });
        const { count: publishedOpenings } = await supabase.from('job_openings').select('*', { count: 'exact', head: true }).eq('publication_status', 'Published');
        const { count: totalApplications } = await supabase.from('applications').select('*', { count: 'exact', head: true });
        const { count: newApplications } = await supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'New');
        const { count: shortlisted } = await supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'Shortlisted');
        const { count: offered } = await supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'Offered');

        const { data: deptCounts } = await supabase.from('job_openings').select('department');
        const byDept = {};
        (deptCounts || []).forEach((row) => {
          byDept[row.department] = (byDept[row.department] || 0) + 1;
        });

        return {
          total_openings: totalOpenings || 0,
          published_openings: publishedOpenings || 0,
          draft_openings: (totalOpenings || 0) - (publishedOpenings || 0),
          total_applications: totalApplications || 0,
          new_applications: newApplications || 0,
          shortlisted_candidates: shortlisted || 0,
          offered_candidates: offered || 0,
          conversion_rate: totalApplications ? Math.round(((offered || 0) / totalApplications) * 100) : 0,
          by_department: Object.entries(byDept).map(([department, count]) => ({ department, count })),
        };
      }
    } catch {}
  }

  // SQLite Fallback
  const db = getDb();
  const totalOpenings = db.prepare('SELECT COUNT(*) as count FROM job_openings').get()?.count || 0;
  const publishedOpenings = db.prepare("SELECT COUNT(*) as count FROM job_openings WHERE publication_status = 'Published'").get()?.count || 0;
  const totalApps = db.prepare('SELECT COUNT(*) as count FROM applications').get()?.count || 0;
  const newApps = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'New'").get()?.count || 0;
  const shortlisted = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'Shortlisted'").get()?.count || 0;
  const offered = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'Offered'").get()?.count || 0;

  const byDept = db.prepare(`
    SELECT department, COUNT(*) as count FROM job_openings GROUP BY department
  `).all();

  return {
    total_openings: totalOpenings,
    published_openings: publishedOpenings,
    draft_openings: totalOpenings - publishedOpenings,
    total_applications: totalApps,
    new_applications: newApps,
    shortlisted_candidates: shortlisted,
    offered_candidates: offered,
    conversion_rate: totalApps ? Math.round((offered / totalApps) * 100) : 0,
    by_department: byDept,
  };
}
