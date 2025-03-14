import { useState } from 'react';
import CommentUserAction from './CommentUserAction';
import ProfileImage from '@/components/ui/ProfileImage';
import { formatDate } from '@/utils/dateUtils';
import { TCommmentItem } from '@/types/responseData/comments';
import Button from '@/components/common/Button';
import { z } from 'zod';
import { useMyCommentAction } from '@/lib/hooks/queries/mutate/useMyCommentAction';
import cs from 'classnames';

interface CommentCardProps {
  pageType: 'plan' | 'review';
  itemData: TCommmentItem;
  accessToken: string;
  socialId: string;
  postId: number;
  currentPage: number;
}

const addCommentSchema = z.string().min(1, '내용을 입력해주세요.');

const CommentCard = ({ itemData, ...combinedProps }: CommentCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [contentValue, setContentValue] = useState(itemData?.content);

  const { updateMutation } = useMyCommentAction({
    pageType: combinedProps.pageType,
    accessToken: combinedProps.accessToken,
    postId: combinedProps.postId,
    currentPage: combinedProps.currentPage,
    setIsEdit: setIsEdit,
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
    updateMutation.mutate({
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
    <div
      className={cs(
        'w-full border border-var-primary-500 rounded-lg p-[2rem]',
        {
          'text-[2rem] leading-[2.5rem]': combinedProps.pageType === 'plan',
          'text-[1.8rem] leading-[2.34rem]':
            combinedProps.pageType === 'review',
        }
      )}
    >
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
              className={cs('text-[1.2rem] text-var-primary-500 w-[100px] ', {
                'py-[12px]': combinedProps.pageType === 'plan',
                'py-[8px]': combinedProps.pageType === 'review',
              })}
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
            <ProfileImage
              imageUrl={itemData.profileImage || ''}
              size={combinedProps.pageType === 'plan' ? 'm' : 's'}
            />
            <div className="flex justify-between items-center w-full">
              <p
                className={cs(
                  'flex items-center leading-[2.5rem] gap-[1.2rem]',
                  {
                    'text-[2rem]': combinedProps.pageType === 'plan',
                    'text-[1.8rem]': combinedProps.pageType === 'review',
                  }
                )}
              >
                <span className="text-black font-medium">
                  {itemData.nickname}
                </span>
                <span className="text-black/60">
                  {formatDate('comment', itemData.createdAt)}
                </span>
              </p>
              <CommentUserAction
                pageType={combinedProps.pageType}
                isMine={combinedProps.socialId === itemData.socialId}
                accessToken={combinedProps.accessToken}
                commentId={itemData.commentId}
                postId={combinedProps.postId}
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
