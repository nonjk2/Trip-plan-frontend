'use client';

import PlanInfoSection from '@/components/pages/detailedPost/PlanInfoSection';
import PlanDayScheduleSection from '@/components/pages/detailedPost/PlanDayScheduleSection';
import UserActionSection from '@/components/pages/detailedPost/UserActionSection';
import CommentsSection from '@/components/ui/comments/CommentsSection';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { getPlanInfo } from '@/apis/plan';
import Spinner from '@/components/common/Spinner';
import { calculateTripDuration } from '@/utils/dateUtils';

interface PlanClientProps {
  planId: number;
}

const getCookieValue = (key: string): string => {
  return Cookies.get(key) || '';
};

const PlanClient = ({ planId }: PlanClientProps) => {
  const accessToken = getCookieValue('accessToken');
  const socialId = getCookieValue('socialId');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['plan', planId, 'info'],
    queryFn: () => getPlanInfo(planId, accessToken),
  });

  const days =
    data &&
    calculateTripDuration({
      endDate: data.endDate,
      startDate: data.startDate,
    });

  const dayArray =
    days?.days && [...Array(days.days).keys()].map((day) => day + 1);
  const commonProps = { planId, accessToken, socialId };

  if (isError)
    return (
      <div className="min-h-[50rem] flex justify-center items-center text-[4rem] text-red-600 font-bold">
        에러발생!
      </div>
    );
  if (isLoading || !data) return <Spinner />;
  return (
    <>
      <PlanInfoSection infoData={data} {...commonProps} />
      <PlanDayScheduleSection
        planId={planId}
        accessToken={accessToken}
        days={dayArray as number[]}
      />
      <UserActionSection
        likeId={data.likeId}
        bookmarkId={data.bookmarkId}
        writerId={data.socialId}
        {...commonProps}
      />
      <CommentsSection
        pageType="plan"
        postId={planId}
        accessToken={accessToken}
        socialId={socialId}
      />
    </>
  );
};

export default PlanClient;
