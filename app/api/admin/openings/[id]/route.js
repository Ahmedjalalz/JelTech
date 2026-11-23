import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getOpeningByIdOrSlug, updateOpening, deleteOpening } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const opening = await getOpeningByIdOrSlug(id, true);
    if (!opening) {
      return NextResponse.json({ ok: false, error: 'Opening not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: opening });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateOpening(id, body);
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Opening not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteOpening(id);
    return NextResponse.json({ ok: true, message: 'Opening deleted successfully' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
