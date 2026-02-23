import { NextResponse } from 'next/server';
import { incrementClick } from '../../../../lib/storage';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const linkId = body.linkId;

  if (!linkId) {
    return NextResponse.json({ error: 'linkId requis.' }, { status: 400 });
  }

  await incrementClick(linkId);
  return NextResponse.json({ ok: true });
}
