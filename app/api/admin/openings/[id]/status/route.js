import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { changeOpeningStatus } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await changeOpeningStatus(id, {
      recruitment_status: body.recruitment_status,
      publication_status: body.publication_status,
    });
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
