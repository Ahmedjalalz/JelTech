import { Resend } from 'resend';

const requiredFields = ['name', 'email', 'projectType', 'budget', 'timeline', 'description'];

const normalizeBudget = (budget) => {
  return String(budget || '').trim().replace(/^\$+\s*/, '');
};

const formatText = (data) => {
  const budgetValue = normalizeBudget(data.budget);
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || 'N/A'}`,
    `Project Type: ${data.projectType}`,
    `Budget: $${budgetValue}`,
    `Timeline: ${data.timeline}`,
    '',
    'Project Description:',
    data.description,
  ].join('\n');
};

const formatHtml = (data) => {
  const budgetValue = normalizeBudget(data.budget);
  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a;">
      <h2 style="margin: 0 0 12px;">New Project Inquiry</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tr><td style="padding: 6px 0; font-weight: 600;">Name</td><td style="padding: 6px 0;">${data.name}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: 600;">Email</td><td style="padding: 6px 0;">${data.email}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: 600;">Company</td><td style="padding: 6px 0;">${data.company || 'N/A'}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: 600;">Project Type</td><td style="padding: 6px 0;">${data.projectType}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: 600;">Budget</td><td style="padding: 6px 0;">$${budgetValue}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: 600;">Timeline</td><td style="padding: 6px 0;">${data.timeline}</td></tr>
      </table>
      <h3 style="margin: 16px 0 8px;">Project Description</h3>
      <p style="white-space: pre-wrap; margin: 0;">${data.description}</p>
    </div>
  `;
};

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO;

    if (!apiKey || !from || !to) {
      return new Response(
        JSON.stringify({ error: 'Missing email configuration.' }),
        { status: 500 }
      );
    }

    const data = await request.json();

    const missing = requiredFields.filter((field) => !data?.[field]);
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      subject: `New Project Inquiry from ${data.name}`,
      text: formatText(data),
      html: formatHtml(data),
      reply_to: data.email,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to send email.' }),
      { status: 500 }
    );
  }
}
