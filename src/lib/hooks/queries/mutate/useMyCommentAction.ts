import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetStateAction } from 'react';
import toast from 'react-hot-toast';

type TPageType = 'plan' | 'review';
interface IPatchCommentData {
  commentId: number;
  content: string;
}
interface UseMyCommentActionProps {
  pageType: TPageType;
  accessToken: string;
  postId: number;
  currentPage: number;
  setIsEdit?: (value: SetStateAction<boolean>) => void;
}

const patchComment = async (
  apiUrl: 'plans' | 'reviews',
  commentData: {
    commentId: number;
    content: string;
  },
  accessToken: string
) => {
  const { commentId, content } = commentData;

  const response = await fetch(`/api/proxy/${apiUrl}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(content),
  });
  if (!response.ok) {
    throw new Error('댓글 수정 실패');
  }
  return await response.json();
};

const deleteComment = async (
  apiUrl: 'plans' | 'reviews',
  commentId: number,
  accessToken: string
) => {
  const response = await fetch(`/api/proxy/${apiUrl}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('댓글 삭제 실패');
  }
  return await response.json();
};

export const useMyCommentAction = ({
  pageType,
  accessToken,
  postId,
  currentPage,
  setIsEdit,
}: UseMyCommentActionProps) => {
  const queryClient = useQueryClient();
  const apiUrl = pageType === 'plan' ? 'plans' : 'reviews';

  const updateMutation = useMutation({
    mutationFn: async (patchCommentData: IPatchCommentData) => {
      await patchComment(apiUrl, patchCommentData, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [pageType, postId, 'comments', { currentPage }],
      });
      toast.success('댓글이 수정되었습니다.');
    },
    onError: (error) => {
      toast.error('댓글 수정에 실패했습니다.');
      console.log(error.message);
    },
    onSettled: () => {
      if (setIsEdit) setIsEdit(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await deleteComment(apiUrl, commentId, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [pageType, postId, 'comments', { currentPage }],
      });
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: (error) => {
      toast.error('댓글 삭제에 실패했습니다.');
      console.log(error.message);
    },
  });

  return { updateMutation, deleteMutation };
};
