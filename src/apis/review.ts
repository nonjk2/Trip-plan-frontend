import { TDetailedReviewInfo, TOtherReview } from '@/types/responseData/review';

export const getImgUrl = async (imgFormData: FormData, accessToken: string) => {
  try {
    const response = await fetch(`/api/proxy/review/image/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: imgFormData,
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '이미지 url 반환 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postAddReview = async (
  reviewPostData: {
    title: string;
    placeId: string | undefined;
    latitude: number | undefined;
    longitude: number | undefined;
    content: string;
    visitedDay: Date | null;
    averageRating: number;
    imageUrl: string[];
  },
  accessToken: string
) => {
  try {
    const response = await fetch(`/api/proxy/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reviewPostData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '리뷰 게시글 등록 실패',
        details: errorData.details,
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getReviewInfo = async (
  reviewId: number,
  accessToken: string
): Promise<TDetailedReviewInfo> => {
  try {
    const response = await fetch(`/api/proxy/review/${reviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '리뷰 게시글 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchWeatherData = async (
  lat: number,
  lon: number,
  date: string
) => {
  try {
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode&timezone=Asia/Seoul&start_date=${date}&end_date=${date}`;

    const response = await fetch(weatherApiUrl);
    if (!response.ok) throw new Error('날씨 불러오기 실패');
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOtherPlace = async (
  reviewId: number,
  accessToken: string
): Promise<TOtherReview> => {
  try {
    const response = await fetch(`/api/proxy/review/others/${reviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '리뷰 게시글 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
