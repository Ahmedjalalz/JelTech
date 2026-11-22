import { NextResponse } from 'next/server';
import { deleteAdminSession, parseCookies, SESSION_COOKIE_NAME } from '@/app/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parseCookies(cookieHeader);
    const token = cookies[SESSION_COOKIE_NAME];

    if (token) {
      deleteAdminSession(token);
    }

    const response = NextResponse.json({ ok: true, message: 'Logged out successfully.' });
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ ok: true });
  }
}
