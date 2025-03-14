import { TComments } from '@/types/responseData/comments';
import { useQuery } from '@tanstack/react-query';

type TPageType = 'plan' | 'review';

interface UseGetCommentListProps {
  pageType: TPageType;
  postId: number;
  currentPage: number;
  accessToken: string;
}

export const getCommentList = async (
  pageType: TPageType,
  postId: number,
  accessToken: string,
  currentPage: number
): Promise<TComments> => {
  const apiUrl =
    pageType === 'plan'
      ? `plans/${postId}/comments`
      : `reviews/${postId}/comments`;
  const response = await fetch(
    `/api/proxy/${apiUrl}?page=${currentPage - 1}&size=4`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('댓글 불러오기 실패');
  }

  const { data } = await response.json();
  return data;
};

const useGetCommentList = ({
  pageType,
  postId,
  currentPage,
  accessToken,
}: UseGetCommentListProps) => {
  const queryKey = [pageType, postId, 'comments', { currentPage }];
  const queryFn = () =>
    getCommentList(pageType, postId, accessToken, currentPage);

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    data,
    refetch,
    isLoading,
    isFetching,
  };
};

export default useGetCommentList;
