import { useMutation, useQueryClient } from '@tanstack/react-query';

type PageType = 'plan' | 'review';
type UserAction = 'UNDIBS' | 'DIBS';

interface UsePostActionLikeProps {
  pageType: PageType;
  pageId: number;
  bookmarkId: number | null;
  accessToken: string;
  setBookmarkId: (id: number) => void;
}

export const postDibs = async (
  type: PageType,
  pageId: number,
  accessToken: string
) => {
  const pageApi =
    type === 'plan'
      ? `plans/${pageId}/bookmarks`
      : `review/${pageId}/bookmarks`;
  const response = await fetch(`/api/proxy/${pageApi}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('찜하기 실패');
  }
};

export const deleteDibs = async (
  type: PageType,
  bookmarkId: number,
  accessToken: string
) => {
  const pageApi =
    type === 'plan'
      ? `plans/bookmarks/${bookmarkId}`
      : `review/bookmarks/${bookmarkId}`;
  const response = await fetch(`/api/proxy/${pageApi}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('찜하기 취소 실패');
  }
};

const usePostActionDibs = <T extends { bookmarkId: number | null }>({
  pageType,
  pageId,
  bookmarkId,
  accessToken,
  setBookmarkId,
}: UsePostActionLikeProps) => {
  const queryClient = useQueryClient();
  const queryKey = [pageType, pageId, 'info'];

  return useMutation({
    mutationFn: async (userAction: UserAction) => {
      if (userAction === 'DIBS') {
        await postDibs(pageType, pageId, accessToken);
      } else {
        await deleteDibs(pageType, bookmarkId as number, accessToken);
      }
    },
    onMutate: async (userAction) => {
      await queryClient.cancelQueries({ queryKey });

      const prevLikeStatus = queryClient.getQueryData<T>(queryKey);

      queryClient.setQueryData(queryKey, (prevData: T) => {
        return {
          ...prevData,
          dibsId: userAction === 'DIBS' ? -1 : null,
        };
      });

      return { prevLikeStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, context?.prevLikeStatus);
    },
    onSettled: async () => {
      const updatedPlanInfo = await queryClient.fetchQuery<T>({
        queryKey,
      });
      if (updatedPlanInfo) {
        setBookmarkId(updatedPlanInfo.bookmarkId as number);
      }
    },
  });
};

export default usePostActionDibs;
