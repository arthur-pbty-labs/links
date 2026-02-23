import { NextResponse } from 'next/server';
import { removeLink } from '../../../../lib/storage';
import { isAdminRequest } from '../../../../lib/auth';

export async function DELETE(request, { params }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await removeLink(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Lien introuvable.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
