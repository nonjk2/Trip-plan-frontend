'use client';

import { useMypageReviewList } from '@/lib/hooks/useMypageReviewList';
import { getMyReviews } from '@/apis/mypage';
import { TMyReviews } from '@/types/responseData/mypage';
import Pagination from '@/components/common/Pagination';
import Spinner from '@/components/common/Spinner';
import ReviewCardList from '../ReviewCardList';

const MyReviewListSection = () => {
  const { data, currentPage, isLoading, isFetching } =
    useMypageReviewList<TMyReviews>({
      fetchReviews: getMyReviews,
      pageType: 'myReviews',
    });

  if (isLoading || isFetching) return <Spinner isPageLoading={false} />;
  if (!data?.content || data.content.length === 0) {
    return (
      <div className="flex items-center justify-center h-[10rem] text-[2rem] font-bold">
        작성한 리뷰가 없어요..
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[6rem]">
      <ReviewCardList listItems={data.content} />
      <Pagination
        pageType="my-review"
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
      />
    </div>
  );
};

export default MyReviewListSection;
