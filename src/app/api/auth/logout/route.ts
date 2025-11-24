import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(): Promise<Response> {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');

  return NextResponse.json({ message: 'Logged out successfully' });
}

