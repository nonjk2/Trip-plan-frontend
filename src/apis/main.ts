import { TMainCardList } from '@/types/card';

interface getMainSlidesResponse {
  mostViewPlans: TMainCardList[];
  mostRecentPlans: TMainCardList[];
  hotPlacePlans: TMainCardList[];
}

export const getMainSlides = async (): Promise<getMainSlidesResponse> => {
  try {
    const response = await fetch(`api/proxy/home`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '메인 슬라이드 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
