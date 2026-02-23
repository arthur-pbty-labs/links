import { NextResponse } from 'next/server';
import { getAnalyticsForLinks } from '../../../lib/storage';
import { isAdminRequest } from '../../../lib/auth';

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const analytics = await getAnalyticsForLinks();
  return NextResponse.json({ analytics });
}
