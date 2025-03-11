import {
  TPlanComments,
  TPlanInfo,
  TPlanSchedules,
} from '@/types/responseData/detailedPlan';

export const getPlanInfo = async (
  planId: number,
  accessToken: string
): Promise<TPlanInfo> => {
  try {
    const response = await fetch(`/api/proxy/plans/${planId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '플랜 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchToggleStatus = async (
  { planId, status }: { planId: number; status: 'PUBLIC' | 'PRIVATE' },
  accessToken: string
) => {
  try {
    const response = await fetch(`/api/proxy/plans/${planId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.message || '게시글 상태 변경 실패',
      };
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPlanSchedules = async (
  planId: number,
  accessToken: string,
  day: number
): Promise<TPlanSchedules> => {
  try {
    const response = await fetch(
      `/api/proxy/plans/${planId}/route?day=${day}`,
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
        message: errorData.message || '플랜 스케쥴 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlanComments = async (
  planId: number,
  accessToken: string,
  currentPage: number
): Promise<TPlanComments> => {
  try {
    const response = await fetch(
      `/api/proxy/plans/${planId}/comments?page=${currentPage - 1}&size=4`,
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
        message: errorData.message || '댓글리스트 불러오기 실패',
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postAddComment = async (
  commentData: {
    planId: number;
    content: string;
  },
  accessToken: string
) => {
  try {
    const response = await fetch(
      `/api/proxy/plans/${commentData.planId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(commentData.content),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '댓글 등록 실패',
        details: errorData.details,
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const patchComment = async (
  commentData: {
    commentId: number;
    content: string;
  },
  accessToken: string
) => {
  try {
    const { commentId, ...dataToPatch } = commentData;

    const response = await fetch(`/api/proxy/plans/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToPatch),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '댓글 수정 실패',
        details: errorData.details,
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (id: number, accessToken: string) => {
  try {
    const response = await fetch(`/api/proxy/plans/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '댓글 삭제 실패',
        details: errorData.details,
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postLike = async (planId: number, accessToken: string) => {
  try {
    const response = await fetch(`/api/proxy/plans/${planId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '좋아요 실패',
        details: errorData.details,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLike = async (likeId: number, accessToken: string) => {
  try {
    const response = await fetch(`/api/proxy/plans/like/${likeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '좋아요 취소 실패',
        details: errorData.details,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postDibs = async (planId: number, accessToken: string) => {
  try {
    const response = await fetch(`/api/proxy/plans/${planId}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '찜하기 실패',
        details: errorData.details,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDibs = async (bookmarkId: number, accessToken: string) => {
  try {
    const response = await fetch(`/api/proxy/plans/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || '찜하기 취소 실패',
        details: errorData.details,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
