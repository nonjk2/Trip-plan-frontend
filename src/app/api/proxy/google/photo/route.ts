import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const photoRef = req.nextUrl.searchParams.get('photo_reference');
  const maxwidth = req.nextUrl.searchParams.get('maxwidth') || '400';
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_ETC;

  if (!photoRef) {
    return NextResponse.json(
      { error: 'photo_reference 파라미터가 필요합니다.' },
      { status: 400 }
    );
  }

  const redirectUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${photoRef}&key=${apiKey}`;

  return NextResponse.redirect(redirectUrl);
}
