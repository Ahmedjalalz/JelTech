import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { saveCandidateEvaluation } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  const auth = verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const evaluation = saveCandidateEvaluation(id, body, auth.username || 'Admin');
    return NextResponse.json({ ok: true, data: evaluation });
  } catch (error) {
    console.error('Error saving candidate evaluation:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
