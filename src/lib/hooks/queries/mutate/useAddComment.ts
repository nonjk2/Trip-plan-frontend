import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type TPageType = 'plan' | 'review';
interface IPostCommentData {
  postId: number;
  content: string;
}
interface UseAddCommentProps {
  pageType: TPageType;
  postId: number;
  accessToken: string;
  refetch: () => void;
  currentPage: number;
}

const postAddComment = async (
  pageType: TPageType,
  commentData: IPostCommentData,
  accessToken: string
) => {
  const response = await fetch(
    `/api/proxy/${pageType === 'plan' ? `plans` : `reviews`}/${
      commentData.postId
    }/comments`,
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
    throw new Error('댓글 추가 실패');
  }
  return await response.json();
};

export const useAddComment = ({
  pageType,
  postId,
  accessToken,
  refetch,
  currentPage,
}: UseAddCommentProps) => {
  const router = useRouter();
  const pageRouterUrl =
    pageType === 'plan'
      ? `/plan-n/${postId}?currentPage=1`
      : `/review/${postId}?currentPage=1`;

  return useMutation({
    mutationFn: (postCommentData: IPostCommentData) =>
      postAddComment(pageType, postCommentData, accessToken),
    onSuccess: () => {
      if (currentPage > 1) {
        router.push(pageRouterUrl);
      } else refetch();
    },
  });
};
