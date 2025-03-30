import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_ETC;

  if (!query) {
    return NextResponse.json(
      { error: 'query 파라미터가 필요합니다.' },
      { status: 400 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${key}&language=ko`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
