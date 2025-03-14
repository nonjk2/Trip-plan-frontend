import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const fetchPlaceDetailsWithLocation = async (placeId: string) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ko&fields=geometry,formatted_address,formatted_phone_number,opening_hours`;

  const response = await fetch(detailsUrl);
  if (!response.ok) throw new Error('장소 정보 불러오기 실패');

  const data = await response.json();
  return {
    formatted_address: data.result?.formatted_address || '주소 정보 없음',
    location: data.result?.geometry?.location || null,
    isOpen: data.result?.opening_hours?.open_now ?? null,
    phone_number: data.result?.formatted_phone_number || null,
  };
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}&components=country:KR`;
    const response = await fetch(url);
    const data: GooglePlacesAPIResponse = await response.json();

    const predictionsWithKoreanAddresses = await Promise.all(
      data.predictions.map(async (item: GooglePlaceAPIType) => {
        const details = await fetchPlaceDetailsWithLocation(item.place_id);
        return {
          ...item,
          korean_description: details.formatted_address,
          location: details.location,
          isOpen: details.isOpen,
          phone_number: details.phone_number,
        };
      })
    );

    return NextResponse.json({ predictions: predictionsWithKoreanAddresses });
  } catch (error) {
    console.log('error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}
