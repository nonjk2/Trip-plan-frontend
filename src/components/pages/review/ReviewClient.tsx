'use client';

import InnerLayout from '@/components/layout/InnerLayout';
import DetailedViewSection from './DetailedViewSection';
import OtherReviewSection from './OtherReviewSection';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { getReviewInfo } from '@/apis/review';
import Spinner from '@/components/common/Spinner';
import UserActionSection from './UserActionSection';

interface ReviewClientProps {
  reviewId: number;
}

const getCookieValue = (key: string): string => {
  return Cookies.get(key) || '';
};

const ReviwClient = ({ reviewId }: ReviewClientProps) => {
  const accessToken = getCookieValue('accessToken');
  const socialId = getCookieValue('socialId');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['review', reviewId, 'info'],
    queryFn: () => getReviewInfo(reviewId, accessToken),
  });

  const commonProps = { reviewId, accessToken, socialId };

  if (isError)
    return (
      <div className="min-h-[50rem] flex justify-center items-center text-[4rem] text-red-600 font-bold">
        에러발생!
      </div>
    );
  if (isLoading || !data) return <Spinner />;

  return (
    <>
      <InnerLayout className="max-w-[84.8rem] mt-[4rem] mb-[10rem]">
        <DetailedViewSection postData={data} />
        <UserActionSection
          likeId={data.likeId}
          bookmarkId={data.bookmarkId}
          writerId={data.socialId}
          {...commonProps}
        />
      </InnerLayout>
      <OtherReviewSection />
    </>
  );
};

export default ReviwClient;
