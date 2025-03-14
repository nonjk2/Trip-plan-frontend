import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP || '';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // ✅ 로그인 상태 체크
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

    // ✅ 백엔드로 rewrite
    const rewriteUrl = `${SERVER_IP}${pathname.replace('/proxy', '')}`;

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

// ✅ 특정 경로에서만 미들웨어 실행
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
