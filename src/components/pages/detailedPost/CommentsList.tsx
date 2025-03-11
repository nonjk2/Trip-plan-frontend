import { TPlanCommmentItem } from '@/types/responseData/detailedPlan';
import CommentCard from './CommentCard';

interface CommentsListProps {
  listData: TPlanCommmentItem[];
  accessToken: string;
  socialId: string;
  planId: number;
  currentPage: number;
}

const CommentsList = ({
  listData,
  accessToken,
  socialId,
  ...commonPageInfoProps
}: CommentsListProps) => {
  const combinedProps = {
    accessToken,
    socialId,
    ...commonPageInfoProps,
  };

  return (
    <div className="flex flex-col gap-[4rem]">
      {listData.map((item) => {
        return (
          <CommentCard
            key={item.commentId}
            itemData={item}
            {...combinedProps}
          />
        );
      })}
    </div>
  );
};

export default CommentsList;
