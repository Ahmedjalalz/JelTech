import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const data = await request.json();
    const email = String(data?.email || '').trim().toLowerCase();
    const name = String(data?.name || '').trim();
    const website = String(data?.website || '').trim();
    const businessType = String(data?.businessType || '').trim();
    const interest = String(data?.interest || 'GrowthPilot AI Wave 1 Early Access').trim();
    const wave = String(data?.wave || 'Wave 1 Priority Queue').trim();

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
          subject: `Early Access Application [${wave}]: ${interest} (${email})`,
          text: [
            `New Wave 1 Early Access Application`,
            `-------------------------------------------`,
            `Queue: ${wave}`,
            `Product: ${interest}`,
            `Email: ${email}`,
            `Name: ${name || 'Not provided'}`,
            `Website / URL: ${website || 'Not provided'}`,
            `Business Type: ${businessType || 'Not specified'}`,
            `Submitted At: ${new Date().toISOString()}`,
          ].join('\n'),
          html: `
            <div style="font-family: Arial, sans-serif; color: #0f172a; max-width: 600px; padding: 20px;">
              <h2 style="color: #45BE43; margin-top: 0;">New Early Access Application (${wave})</h2>
              <p>A new applicant has joined the priority queue for <strong>${interest}</strong>.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Queue:</td><td><strong>${wave}</strong></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${name || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Website:</td><td>${website || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Business Type:</td><td>${businessType || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Product:</td><td>${interest}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Timestamp:</td><td>${new Date().toLocaleString()}</td></tr>
              </table>
            </div>
          `,
          reply_to: email,
        });
      } catch (emailError) {
        console.error('Failed to send early access email via Resend:', emailError);
        // Continue and return success so client flow is unblocked
      }
    } else {
      console.log(`[EARLY ACCESS APPLICATION] Queue: ${wave}, Email: ${email}, Name: ${name}, Website: ${website}, Type: ${businessType}`);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        queue: wave,
        message: 'You have been added to the Wave 1 priority queue! We will notify you as onboarding slots open.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Early access route error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to submit application.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
