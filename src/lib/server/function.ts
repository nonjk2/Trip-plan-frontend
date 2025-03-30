import { getCategoryId } from '@/utils/placeFormat';

export async function recommendPlace(
  placeName: string,
  description: string,
  coord?: {
    x: number;
    y: number;
  }
) {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY!;
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
    placeName
  )}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
    });

    const data: PlaceAPIType<KeyWordDocument> = await response.json();
    if (data.documents.length === 0) {
      return { error: '장소를 찾을 수 없습니다.' };
    }

    const region = data.meta.same_name?.region?.[0];
    const keyword = data.meta.same_name?.keyword;

    const isLifestyleName = !region && !keyword;

    // 지역 필터링
    const filtered = region
      ? data.documents.filter((doc) => doc.address_name.includes(region))
      : data.documents;

    const place = filtered[0] ?? data.documents[0];
    const categoryId = getCategoryId(place.category_group_code) ?? 13;
    const latitude = isLifestyleName && coord ? coord.y : place.y;
    const longitude = isLifestyleName && coord ? coord.x : place.x;

    return {
      planData: {
        order: 1,
        place: isLifestyleName ? placeName : place.place_name,
        streetAddress: place.road_address_name || place.address_name,
        latitude,
        longitude,
        planCategoryNameId: categoryId,
        placeUrl: place.place_url || '',
        phone: place.phone || '',
        description: description || '',
        isLifestyleName,
      },
    };
  } catch (error) {
    console.error('카카오 API 호출 오류:', error);
    return { error: '카카오 API 호출 실패' };
  }
}

export async function registerPlace({
  placeName,
  lat,
  lng,
}: {
  placeName: string;
  lat: string;
  lng: string;
}) {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY!;
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${lat}&x=${lng}&radius=500&query=${encodeURIComponent(
    placeName
  )}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
    });

    const data = await response.json();
    if (data.documents.length === 0) {
      return { error: '장소를 찾을 수 없습니다.' };
    }

    const place = data.documents[0];
    const categoryId = getCategoryId(place.category_group_code) ?? 13;
    return {
      planData: {
        order: 0,
        place: place.place_name,
        streetAddress: place.road_address_name || place.address_name,
        latitude: place.y,
        longitude: place.x,
        planCategoryNameId: categoryId,
      },
    };
  } catch (error) {
    console.error('카카오 API 호출 오류:', error);
    return { error: '카카오 API 호출 실패' };
  }
}
