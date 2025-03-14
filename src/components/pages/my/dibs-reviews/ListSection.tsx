'use client';

import ReviewCardList from '../ReviewCardList';
import { useMypageReviewList } from '@/lib/hooks/useMypageReviewList';
import { TMyReviews } from '@/types/responseData/mypage';
import { getDibsReviews } from '@/apis/mypage';
import Pagination from '@/components/common/Pagination';
import Spinner from '@/components/common/Spinner';

const DibsReviewListSection = () => {
  const { data, currentPage, isLoading, isFetching } =
    useMypageReviewList<TMyReviews>({
      fetchReviews: getDibsReviews,
      pageType: 'dibsReviews',
    });

  if (isLoading || isFetching) return <Spinner isPageLoading={false} />;
  if (!data?.content || data.content.length === 0) {
    return (
      <div className="flex items-center justify-center h-[10rem] text-[2rem] font-bold">
        찜한 리뷰가 없어요..
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[6rem]">
      <ReviewCardList listItems={data.content} />
      <Pagination
        pageType="dibs-review"
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
      />
    </div>
  );
};

export default DibsReviewListSection;
