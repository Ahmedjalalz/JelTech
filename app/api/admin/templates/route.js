import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getTemplates, createTemplate } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const templates = await getTemplates();
    return NextResponse.json({ ok: true, data: templates });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const template = await createTemplate(body);
    return NextResponse.json({ ok: true, data: template });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
