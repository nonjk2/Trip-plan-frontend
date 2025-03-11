import { TMyComments, TMyPlanners } from '@/types/responseData/mypage';

export const getMyPlanners = async (
  currentPage: number,
  accessToken: string
): Promise<TMyPlanners> => {
  try {
    const response = await fetch(
      `/api/proxy/users/myplan?page=${currentPage}&size=6`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '내 일정 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDibsPlanners = async (
  currentPage: number,
  accessToken: string
): Promise<TMyPlanners> => {
  try {
    const response = await fetch(
      `/api/proxy/users/bookmarks?page=${currentPage}&size=6`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '찜한 일정 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMyComments = async (
  currentPage: number,
  accessToken: string
): Promise<TMyComments> => {
  try {
    const response = await fetch(
      `/api/proxy/users/comments?page=${currentPage}&size=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '내 댓글 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchEditProfile = async (
  profileFormData: FormData,
  accessToken: string
) => {
  try {
    const response = await fetch(`/api/proxy/users/profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: profileFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.message || '프로필 수정 실패',
      };
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
