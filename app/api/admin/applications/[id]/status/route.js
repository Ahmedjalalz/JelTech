import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { updateApplicationStatus } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const auth = verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    if (!body.status) {
      return NextResponse.json({ ok: false, error: 'Status is required' }, { status: 400 });
    }

    const updated = updateApplicationStatus(id, body.status, auth.username || 'Admin');
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
