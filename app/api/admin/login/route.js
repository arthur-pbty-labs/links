import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  isValidAdminCredentials
} from '../../../../lib/auth';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const username = body.username || '';
  const password = body.password || '';

  if (!isValidAdminCredentials(username, password)) {
    return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: createAdminSessionToken(),
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12
  });

  return response;
}
