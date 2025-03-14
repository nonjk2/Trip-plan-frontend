import { TDetailedReviewInfo } from '@/types/responseData/review';

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
