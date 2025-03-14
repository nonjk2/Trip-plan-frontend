import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json({ error: 'Missing placeId' }, { status: 400 });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ko&fields=geometry,formatted_address,formatted_phone_number,opening_hours,types,reference,name`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch place details');

    const data = await response.json();
    const result = data.result;

    if (!result) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const placeDetails: GooglePlaceAPIType = {
      description: result.formatted_address || '주소 정보 없음',
      place_id: placeId,
      reference: result.reference || '',
      structured_formatting: {
        main_text: result.name || '',
        secondary_text: result.formatted_address || '',
      },
      matched_substrings: [],
      terms: [],
      types: result.types || [],
      korean_description: result.formatted_address || '',
      location: result.geometry?.location || null,
      isOpen: result.opening_hours?.open_now ?? null,
      phone_number: result.formatted_phone_number || null,
    };

    return NextResponse.json({ place: placeDetails });
  } catch (error) {
    console.error('error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place details' },
      { status: 500 }
    );
  }
}
