import { NextResponse } from 'next/server';

export function middleware(request) {
  const hasAccess = request.cookies.get('esg_access');

  if (!hasAccess) {
    const url = request.nextUrl.clone();
    url.pathname = '/esg-access';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/esg-calculator'],
};
