import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('accessToken');
  if (pathname.startsWith('/login') && !!isLoggedIn) {
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

  return NextResponse.next();
}

// ✅ 특정 경로에서만 미들웨어 실행 (불필요한 요청 차단)
export const config = {
  matcher: [
    '/login',
    '/my/:path*',
    '/plan/:path*/create',
    '/review/:path*',
    '/plan-n/:path*',
  ],
};
