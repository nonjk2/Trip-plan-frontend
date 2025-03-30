import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_ETC;

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
  const radius = req.nextUrl.searchParams.get('radius') || '500'; // 기본 반경 500m
  const keyword = req.nextUrl.searchParams.get('keyword') || '';
  const language = req.nextUrl.searchParams.get('language') || 'ko'; // 기본 언어 설정

  if (!lat || !lng) {
    return NextResponse.json(
      { error: '위도(lat)와 경도(lng)가 필요합니다.' },
      { status: 400 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${encodeURIComponent(
    keyword
  )}&language=${language}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Google API 요청 실패' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Nearby Search API 오류:', error);
    return NextResponse.json(
      { error: 'API 호출 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
