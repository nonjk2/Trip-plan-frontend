import { useAddComment } from '@/lib/hooks/queries/mutate/useAddComment';
import { TComments } from '@/types/responseData/comments';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useState } from 'react';
import cs from 'classnames';

interface CommentTextareaProps {
  pageType: 'plan' | 'review';
  postId: number;
  accessToken: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TComments, Error>>;
  currentPage: number;
}

const CommentTextarea = ({
  pageType,
  postId,
  accessToken,
  refetch,
  currentPage,
}: CommentTextareaProps) => {
  const [content, setContent] = useState('');

  const addCommentMutation = useAddComment({
    pageType,
    postId,
    accessToken,
    refetch,
    currentPage,
  });

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentMutation.mutate({ postId, content });
    setContent('');
  };

  return (
    <form onSubmit={handleAddComment} className="flex flex-col gap-[2rem]">
      <textarea
        className="text-[1.8rem] text-black leading-[2.16rem] w-full min-h-[18rem] p-[2rem] border border-black rounded-lg"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 남겨주세요"
        maxLength={100}
      />
      <button
        className={cs(
          'text-black leading-[2.4rem] px-[4rem] py-[1rem] border border-black rounded-lg self-end',
          {
            'text-[2rem]': pageType === 'plan',
            'text-[1.6rem]': pageType === 'review',
          }
        )}
      >
        등록
      </button>
    </form>
  );
};

export default CommentTextarea;
