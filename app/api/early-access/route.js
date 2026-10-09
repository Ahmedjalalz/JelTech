import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const data = await request.json();
    const email = String(data?.email || '').trim().toLowerCase();
    const name = String(data?.name || '').trim();
    const interest = String(data?.interest || 'GrowthPilot AI Early Access').trim();
    const role = String(data?.role || 'Small Business Owner / Operator').trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO;

    if (apiKey && from && to) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from,
          to,
          subject: `Early Access Request: ${interest} (${email})`,
          text: [
            `New Early Access & Development Update Request`,
            `-------------------------------------------`,
            `Email: ${email}`,
            `Name: ${name || 'Not provided'}`,
            `Interest: ${interest}`,
            `Role: ${role}`,
            `Submitted At: ${new Date().toISOString()}`,
          ].join('\n'),
          html: `
            <div style="font-family: Arial, sans-serif; color: #0f172a; max-width: 600px; padding: 20px;">
              <h2 style="color: #45BE43; margin-top: 0;">New Early Access Request</h2>
              <p>Someone has requested to follow development or join the early access list for <strong>${interest}</strong>.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${name || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Product:</td><td>${interest}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td>${role}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Timestamp:</td><td>${new Date().toLocaleString()}</td></tr>
              </table>
            </div>
          `,
          reply_to: email,
        });
      } catch (emailError) {
        console.error('Failed to send early access email via Resend:', emailError);
        // Continue and return success to the user so client does not break if mail service is temporarily down
      }
    } else {
      console.log(`[EARLY ACCESS REQUEST] Email: ${email}, Name: ${name}, Interest: ${interest}, Role: ${role}`);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Thank you for your interest! You have been added to our development update list.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Early access route error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to submit request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
