import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getApplications } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort = searchParams.get('sort') || 'newest';

    const applications = await getApplications({ jobId, status, search, sort });
    return NextResponse.json({ ok: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
