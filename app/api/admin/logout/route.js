import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '../../../../lib/auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: '',
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 0
  });
  return response;
}
