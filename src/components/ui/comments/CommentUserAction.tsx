import Image from 'next/image';
import { ICONS } from '@/constants/importImages';
import { Dispatch, SetStateAction } from 'react';
import { useMyCommentAction } from '@/lib/hooks/queries/mutate/useMyCommentAction';

interface CommentUserActionProps {
  pageType: 'plan' | 'review';
  isMine: boolean;
  accessToken: string;
  commentId: number;
  postId: number;
  currentPage: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const CommentUserAction = ({
  pageType,
  isMine,
  accessToken,
  commentId,
  postId,
  currentPage,
  setIsEdit,
}: CommentUserActionProps) => {
  const { deleteMutation } = useMyCommentAction({
    pageType,
    accessToken,
    postId,
    currentPage,
  });

  const commentDeleteHandler = () => deleteMutation.mutate(commentId);

  const commentEditHandler = () => setIsEdit(true);

  const buttonOptions = {
    mine: [
      {
        key: '삭제하기',
        image: { src: ICONS.iconDelete.src, alt: ICONS.iconDelete.alt },
        clickHandler: commentDeleteHandler,
      },
      {
        key: '수정하기',
        image: { src: ICONS.iconEdit.src, alt: ICONS.iconEdit.alt },
        clickHandler: commentEditHandler,
      },
    ],
    other: [
      {
        key: '좋아요',
        image: { src: ICONS.iconLike.src, alt: ICONS.iconLike.alt },
        clickHandler: () => console.log('좋아요..'),
      },
      {
        key: '신고하기',
        image: { src: ICONS.iconSiren.src, alt: ICONS.iconSiren.alt },
        clickHandler: () => console.log('신고하기..'),
      },
    ],
  };
  const renderButtonItems = isMine ? buttonOptions.mine : buttonOptions.other;

  return (
    <div className="flex items-center gap-[2rem]">
      {renderButtonItems.map((item) => {
        return (
          <button
            key={item.key}
            type="button"
            className="flex items-center gap-[0.8rem]"
            onClick={item.clickHandler}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={24}
              height={24}
            />
            <span className="text-[1.6rem] leading-[1.909rem]">{item.key}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CommentUserAction;
