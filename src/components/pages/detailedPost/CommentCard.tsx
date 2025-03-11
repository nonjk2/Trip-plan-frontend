import { useState } from 'react';
import CommentUserAction from './CommentUserAction';
import ProfileImage from '@/components/ui/ProfileImage';
import { formatDate } from '@/utils/dateUtils';
import { TPlanCommmentItem } from '@/types/responseData/detailedPlan';
import Button from '@/components/common/Button';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchComment } from '@/apis/plan';
import toast from 'react-hot-toast';

interface IPatchCommentData {
  commentId: number;
  content: string;
}

interface CommentCardProps {
  itemData: TPlanCommmentItem;
  accessToken: string;
  socialId: string;
  planId: number;
  currentPage: number;
}

const addCommentSchema = z.string().min(1, '내용을 입력해주세요.');

const CommentCard = ({ itemData, ...combinedProps }: CommentCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [contentValue, setContentValue] = useState(itemData?.content);
  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation({
    mutationFn: async (patchCommentData: IPatchCommentData) => {
      await patchComment(patchCommentData, combinedProps.accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'plan',
          combinedProps.planId,
          'comments',
          { currentPage: combinedProps.currentPage },
        ],
      });
      toast.success('댓글이 수정되었습니다.');
    },
    onError: (error) => {
      toast.error('댓글 수정에 실패했습니다.');
      console.log(error.message);
    },
    onSettled: () => {
      setIsEdit(false);
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const editCancelHandler = () => {
    setIsEdit(false);
    setContentValue(itemData?.content);
  };

  const editSaveHandler = () => {
    addCommentSchema.parse(contentValue);
    updateCommentMutation.mutate({
      commentId: itemData.commentId,
      content: contentValue,
    });
  };

  const editOptions = [
    {
      key: '취소',
      clickHandler: editCancelHandler,
    },
    {
      key: '완료',
      clickHandler: editSaveHandler,
    },
  ];

  const renderEditState = (
    <div className="w-full border border-var-primary-500 rounded-lg p-[2rem] text-[2rem] leading-[2.5rem]">
      <p className="font-medium ">{itemData.nickname}</p>
      <textarea
        className="mt-[1.6rem] w-full h-[5rem] font-normal"
        value={contentValue}
        onChange={handleCommentChange}
      />
      <div className="mt-[1.2rem] flex gap-[0.8rem] justify-end">
        {editOptions.map((item) => {
          return (
            <Button
              key={item.key}
              size="sm"
              btnColor="white"
              className="text-[1.2rem] text-var-primary-500 w-[100px] py-[12px]"
              onClick={item.clickHandler}
            >
              {item.key}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {isEdit ? (
        renderEditState
      ) : (
        <div key={itemData.commentId}>
          <div className="flex items-center gap-[1.2rem]">
            <ProfileImage imageUrl={itemData.profileImage || ''} size="m" />
            <div className="flex justify-between items-center w-full">
              <p className="flex items-center text-[2rem] leading-[2.5rem] gap-[1.2rem]">
                <span className="text-black font-medium">
                  {itemData.nickname}
                </span>
                <span className="text-black/60">
                  {formatDate('comment', itemData.createdAt)}
                </span>
              </p>
              <CommentUserAction
                isMine={combinedProps.socialId === itemData.socialId}
                accessToken={combinedProps.accessToken}
                commentId={itemData.commentId}
                planId={combinedProps.planId}
                currentPage={combinedProps.currentPage}
                setIsEdit={setIsEdit}
              />
            </div>
          </div>
          <div className="pl-[6rem] py-[1rem]">
            <p className="text-[2rem] leading-[2.5rem]">{itemData.content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentCard;
