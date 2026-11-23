import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    authenticated: true,
    username: auth.username,
  });
}
