import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { createTemplateFromOpening } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const template = await createTemplateFromOpening(id, body.name);
    return NextResponse.json({
      ok: true,
      message: 'Template created successfully from opening.',
      data: template,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
