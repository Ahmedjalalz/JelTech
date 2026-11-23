import { NextResponse } from 'next/server';
import { submitApplication, getOpeningByIdOrSlug, isDeadlinePassed } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data = {};
    let resumeFile = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      // Honeypot spam check
      const honeypot = formData.get('website_hp');
      if (honeypot && String(honeypot).trim().length > 0) {
        return NextResponse.json({ ok: false, error: 'Spam detected.' }, { status: 400 });
      }

      data.job_opening_id = formData.get('job_opening_id');
      data.full_name = formData.get('full_name');
      data.email = formData.get('email');
      data.phone = formData.get('phone');
      data.education_status = formData.get('education_status');
      data.qualification = formData.get('qualification');
      data.institution = formData.get('institution');
      data.relevant_skills = formData.get('relevant_skills');
      data.why_interested = formData.get('why_interested');
      data.why_consider = formData.get('why_consider');
      data.weekly_availability = formData.get('weekly_availability');
      data.linkedin_url = formData.get('linkedin_url');
      data.portfolio_url = formData.get('portfolio_url');
      data.github_url = formData.get('github_url');
      data.additional_info = formData.get('additional_info');

      const customAnswersRaw = formData.get('custom_answers');
      if (customAnswersRaw) {
        try {
          data.custom_answers = JSON.parse(customAnswersRaw);
        } catch {
          data.custom_answers = [];
        }
      }

      const file = formData.get('resume');
      if (file && typeof file === 'object' && file.size > 0) {
        resumeFile = file;
      }
    } else {
      data = await request.json();
      if (data.website_hp && String(data.website_hp).trim().length > 0) {
        return NextResponse.json({ ok: false, error: 'Spam detected.' }, { status: 400 });
      }
    }

    // Required fields check
    const required = [
      'job_opening_id',
      'full_name',
      'email',
      'phone',
      'education_status',
      'relevant_skills',
      'why_interested',
      'why_consider',
      'weekly_availability',
    ];

    for (const field of required) {
      if (!data[field] || String(data[field]).trim() === '') {
        return NextResponse.json(
          { ok: false, error: `Missing required field: ${field.replace('_', ' ')}` },
          { status: 400 }
        );
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[+0-9\s\-()]{7,25}$/;
    if (!phoneRegex.test(data.phone.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid phone or WhatsApp number.' },
        { status: 400 }
      );
    }

    // Independent backend check: verify job opening exists and deadline has not passed
    const opening = await getOpeningByIdOrSlug(data.job_opening_id, false);
    if (!opening || opening.is_expired || isDeadlinePassed(opening.application_deadline)) {
      return NextResponse.json(
        { ok: false, error: 'The application deadline for this position has passed. Applications are no longer accepted.' },
        { status: 400 }
      );
    }

    const clientIp = request.headers.get('x-forwarded-for') || 'local';
    data.client_ip = clientIp;

    const result = await submitApplication(data, resumeFile);

    return NextResponse.json({
      ok: true,
      message: 'Your application has been successfully submitted! Our team will review it shortly.',
      data: result,
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to submit application.' },
      { status: 400 }
    );
  }
}
