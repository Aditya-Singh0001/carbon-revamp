import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes('@') || !email.includes('.')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, 'emails.txt');
    await fs.appendFile(filePath, email + '\n', 'utf8');
  } catch (error) {
    console.error('Failed to save email:', error);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('esg_access', '1', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}
