import { useMutation, useQueryClient } from '@tanstack/react-query';

type PageType = 'plan' | 'review';
type UserAction = 'UNLIKE' | 'LIKE';

interface UsePostActionLikeProps {
  pageType: PageType;
  pageId: number;
  likeId: number | null;
  accessToken: string;
  setLikeId: (id: number) => void;
}

export const postLike = async (
  type: PageType,
  pageId: number,
  accessToken: string
) => {
  const pageApi =
    type === 'plan' ? `plans/${pageId}/like` : `review/${pageId}/like`;
  const response = await fetch(`/api/proxy/${pageApi}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('좋아요 실패');
  }
};

export const deleteLike = async (
  type: PageType,
  likeId: number,
  accessToken: string
) => {
  const pageApi =
    type === 'plan' ? `plans/like/${likeId}` : `review/like/${likeId}`;
  const response = await fetch(`/api/proxy/${pageApi}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('좋아요 취소 실패');
  }
};

const usePostActionLike = <T extends { like: number; likeId: number | null }>({
  pageType,
  pageId,
  likeId,
  accessToken,
  setLikeId,
}: UsePostActionLikeProps) => {
  const queryClient = useQueryClient();
  const queryKey = [pageType, pageId, 'info'];

  return useMutation({
    mutationFn: async (userAction: UserAction) => {
      if (userAction === 'LIKE') {
        await postLike(pageType, pageId, accessToken);
      } else {
        await deleteLike(pageType, likeId as number, accessToken);
      }
    },
    onMutate: async (userAction) => {
      await queryClient.cancelQueries({ queryKey });

      const prevLikeStatus = queryClient.getQueryData<T>(queryKey);

      queryClient.setQueryData(queryKey, (prevData: T) => ({
        ...prevData,
        like: userAction === 'LIKE' ? prevData.like + 1 : prevData.like - 1,
      }));

      return { prevLikeStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.prevLikeStatus);
    },
    onSettled: async () => {
      const updatedInfo = await queryClient.fetchQuery<T>({ queryKey });
      if (updatedInfo) {
        setLikeId(updatedInfo.likeId as number);
      }
    },
  });
};

export default usePostActionLike;
