import { NextResponse } from 'next/server';
import { getPublishedOpenings } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const openings = getPublishedOpenings();
    return NextResponse.json({ ok: true, data: openings });
  } catch (error) {
    console.error('Error fetching published openings:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch openings.' },
      { status: 500 }
    );
  }
}
