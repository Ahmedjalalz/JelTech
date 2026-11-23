import { NextResponse } from 'next/server';
import { getOpeningByIdOrSlug } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const opening = await getOpeningByIdOrSlug(id, false);

    if (!opening) {
      return NextResponse.json(
        { ok: false, error: 'Job opening not found or no longer active.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data: opening });
  } catch (error) {
    console.error('Error fetching opening details:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to fetch job details.' },
      { status: 500 }
    );
  }
}
