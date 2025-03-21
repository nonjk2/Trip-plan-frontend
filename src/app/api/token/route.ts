import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshTokenGetToken } from '@/lib/server/login';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const socialId = cookieStore.get('socialId')?.value;
  if (!accessToken || !refreshToken || !socialId) {
    return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 400 });
  }
  try {
    const tokenResponse = await refreshTokenGetToken({
      accessToken,
      refreshToken,
      socialId,
    });
    const NewAccessToken = tokenResponse.headers.get('authorization') || '';
    cookieStore.set('accessToken', NewAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return NextResponse.json('재발급 성공', { status: 203 });
  } catch {
    return NextResponse.json({ error: '토큰저장실패' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  try {
    const { accessToken, refreshToken, socialId } = await req.json();

    if (!accessToken || !refreshToken) {
      cookieStore.delete('accessToken');
      return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 400 });
    }

    cookieStore.set('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    cookieStore.set('socialId', socialId, {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
    });
    return NextResponse.json('hdd!');
    // return new NextResponse('리디렉트 완료', { status: 302 });
  } catch {
    return NextResponse.json({ error: '토큰저장실패' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/users/logout`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        },
      }
    );

    if (!backendResponse.ok) {
      console.warn('백엔드 로그아웃 실패 (프론트 쿠키만 삭제)');
      return NextResponse.json('로그아웃실패', { status: 410 });
    }
    cookieStore.set('accessToken', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    cookieStore.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    cookieStore.set('socialId', '', {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    console.log(' 로그아웃 성공: 모든 토큰 삭제');

    return NextResponse.json('로그아웃성공', { status: 200 });
  } catch {
    return NextResponse.json({ error: '로그아웃실패' }, { status: 500 });
  }
}
