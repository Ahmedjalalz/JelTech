import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getApplicationDetails } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const application = await getApplicationDetails(id);
    if (!application) {
      return NextResponse.json({ ok: false, error: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: application });
  } catch (error) {
    console.error('Error fetching application details:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
