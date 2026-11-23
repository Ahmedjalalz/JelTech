import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { getDashboardStats } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ ok: true, data: stats });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ ok: false, error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
