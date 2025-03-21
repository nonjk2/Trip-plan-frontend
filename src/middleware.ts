import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP || '';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const isLoggedIn = !!accessToken;
  if (pathname.startsWith('/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (
    (pathname.startsWith('/my') ||
      pathname.match(/^\/plan\/[^/]+\/create$/) ||
      pathname.startsWith('/review') ||
      pathname.match(/^\/plan-n\/[^/]+$/)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    pathname.startsWith('/proxy/reports') ||
    pathname.startsWith('/proxy/admin')
  ) {
    const requestHeaders = new Headers(request.headers);
    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    const rewriteUrl = `${SERVER_IP}${pathname.replace('/proxy', '')}`;

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/my/:path*',
    '/plan/:path*/create',
    '/proxy/reports/:path*',
    '/proxy/admin/:path*',
    '/review/:path*',
    '/plan-n/:path*',
  ],
};
