import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { deleteTemplate } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  const auth = verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    deleteTemplate(id);
    return NextResponse.json({ ok: true, message: 'Template deleted successfully.' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
