import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { duplicateOpening } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const duplicated = await duplicateOpening(id);
    return NextResponse.json({
      ok: true,
      message: 'Opening duplicated successfully as a Draft.',
      data: duplicated,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
