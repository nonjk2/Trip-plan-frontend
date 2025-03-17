import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: '토큰 없음' }, { status: 401 });
    }

    const { url, method, body } = await req.json();

    if (!url) {
      return NextResponse.json({ error: '잘못된 요청 URL' }, { status: 400 });
    }

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}${url}`,
      {
        method: method || 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      }
    );

    if (!backendResponse.ok) {
      throw new Error(`백엔드 요청 실패: ${backendResponse.status}`);
    }

    const responseData = await backendResponse.json();
    return NextResponse.json(responseData, { status: backendResponse.status });
  } catch (error) {
    console.error('프록시 요청 실패:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
