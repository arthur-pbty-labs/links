import { NextResponse } from 'next/server';
import { addLink, getLinks } from '../../../lib/storage';
import { isAdminRequest } from '../../../lib/auth';

export async function GET() {
  const links = await getLinks();
  return NextResponse.json({ links });
}

export async function POST(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const required = ['name', 'url'];
  const missing = required.some((field) => !payload[field]);

  if (missing) {
    return NextResponse.json({ error: 'Nom et URL sont obligatoires.' }, { status: 400 });
  }

  const created = await addLink(payload);
  return NextResponse.json({ link: created }, { status: 201 });
}
