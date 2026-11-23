import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/app/lib/auth';
import { addApplicationNote } from '@/app/lib/careers-service';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (!auth.authenticated) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    if (!body.content || !body.content.trim()) {
      return NextResponse.json({ ok: false, error: 'Note content cannot be empty' }, { status: 400 });
    }

    const note = await addApplicationNote(id, {
      note_type: body.note_type || 'internal',
      content: body.content,
      author: auth.username || 'Admin',
    });

    return NextResponse.json({ ok: true, data: note });
  } catch (error) {
    console.error('Error adding note:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
