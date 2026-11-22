import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getResumeFile } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const auth = verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized: Admin authentication required.' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const file = getResumeFile(id);

    if (!file) {
      return NextResponse.json({ ok: false, error: 'Resume file not found.' }, { status: 404 });
    }

    return new Response(file.buffer, {
      status: 200,
      headers: {
        'Content-Type': file.mimeType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(file.filename)}"`,
        'Content-Length': String(file.size),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error serving resume file:', error);
    return NextResponse.json({ ok: false, error: 'Failed to retrieve file.' }, { status: 500 });
  }
}
