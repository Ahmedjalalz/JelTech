import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getAllOpenings, createOpening } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const openings = getAllOpenings();
    return NextResponse.json({ ok: true, data: openings });
  } catch (error) {
    console.error('Error fetching admin openings:', error);
    return NextResponse.json({ ok: false, error: 'Failed to fetch openings' }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ ok: false, error: 'Job title is required.' }, { status: 400 });
    }
    const created = createOpening(body);
    return NextResponse.json({ ok: true, data: created });
  } catch (error) {
    console.error('Error creating opening:', error);
    return NextResponse.json({ ok: false, error: error.message || 'Failed to create opening' }, { status: 500 });
  }
}
