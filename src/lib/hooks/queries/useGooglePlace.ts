import { useQuery } from '@tanstack/react-query';

type GooglePlaceResponse = {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  rating?: number;
  reference: string;
  types: string[];
  user_ratings_total?: number;
};

export type ExtendedGooglePlace = GooglePlaceResponse & {
  imageUrls: string[];
  mainImageUrl: string | null;
};
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_ETC;
type UseGooglePlaceOptions = {
  placeName: string;
  isLifestyleName?: boolean;
  coord?: { lat: number; lng: number };
  key: string;
};

const getPhotoUrl = (photoRef: string, maxWidth = 400): string => {
  //   return `/api/proxy/google/photo?photo_reference=${photoRef}&maxwidth=${maxWidth}`;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${apiKey}`;
};
type FetchGooglePlaceParams = {
  placeName: string;
  key: string;
  isLifestyleName?: boolean;
  coord?: { lat: number; lng: number };
};

export const fetchGooglePlace = async ({
  placeName,
  isLifestyleName,
  coord,
}: FetchGooglePlaceParams): Promise<GooglePlaceResponse | undefined> => {
  if (!placeName) throw new Error('장소 이름이 없습니다.');

  const textRes = await fetch(
    `/api/proxy/google?query=${encodeURIComponent(placeName)}`
  );

  if (!textRes.ok) {
    throw new Error(`Google 프록시 API 요청 실패: ${textRes.status}`);
  }

  const textData = await textRes.json();
  if (textData.status !== 'OK') throw new Error('장소 이름이 없습니다.');

  let place = textData.results[0] as GooglePlaceResponse;

  const needsFallback =
    (!place || !Array.isArray(place.photos) || place.photos.length === 0) &&
    isLifestyleName &&
    coord;

  if (needsFallback) {
    const { lat, lng } = coord!;
    const nearbyRes = await fetch(
      `/api/proxy/google/nearby?lat=${lat}&lng=${lng}&radius=300&keyword=${encodeURIComponent(
        placeName
      )}&language=ko`
    );
    const nearbyData = await nearbyRes.json();
    place = nearbyData?.results?.[0] as GooglePlaceResponse;
  }

  return place;
};

const useGooglePlace = ({
  placeName,
  isLifestyleName = false,
  coord,
  key,
}: UseGooglePlaceOptions) => {
  return useQuery<ExtendedGooglePlace | undefined>({
    queryKey: ['googlePlace', placeName, key],
    queryFn: async () => {
      if (!placeName) throw new Error('장소 이름이 없습니다.');

      const TextRes = await fetch(
        `/api/proxy/google?query=${encodeURIComponent(placeName)}`
      );
      if (!TextRes.ok)
        throw new Error(`Google 프록시 API 요청 실패: ${TextRes.status}`);

      const TextResdata = await TextRes.json();
      if (TextResdata.status !== 'OK') return undefined;

      let place = TextResdata.results[0] as GooglePlaceResponse;
      if ((!place || !place.photos?.length) && isLifestyleName && coord) {
        const { lat, lng } = coord;
        const nearbyRes = await fetch(
          `/api/proxy/google/nearby?lat=${lat}&lng=${lng}&radius=300&keyword=${encodeURIComponent(
            placeName
          )}&language=ko`
        );
        const nearbyData = await nearbyRes.json();
        place = nearbyData?.results?.[0] as GooglePlaceResponse;
      }

      if (!place) return undefined;

      const imageUrls =
        place.photos?.map((photo) => getPhotoUrl(photo.photo_reference, 600)) ??
        [];

      const mainImageUrl = imageUrls.length > 0 ? imageUrls[0] : '';

      return {
        ...place,
        imageUrls,
        mainImageUrl,
      };
    },
    enabled: !!placeName,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export default useGooglePlace;
export type { GooglePlaceResponse };
