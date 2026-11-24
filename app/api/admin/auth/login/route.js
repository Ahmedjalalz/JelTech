import { NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminSession, SESSION_COOKIE_NAME } from '@/app/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const authResult = await verifyAdminCredentials(username, password);
    if (!authResult || !authResult.valid) {
      return NextResponse.json(
        { ok: false, error: authResult?.error || 'Invalid admin email/username or password.' },
        { status: 401 }
      );
    }

    const sessionUsername = authResult.username || username.trim();
    const session = await createAdminSession(sessionUsername);

    const response = NextResponse.json({
      ok: true,
      message: 'Authentication successful.',
      username: sessionUsername,
      token: session.token,
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { ok: false, error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}
