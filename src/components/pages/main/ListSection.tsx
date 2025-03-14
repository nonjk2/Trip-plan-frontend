'use client';

import InnerLayout from '@/components/layout/InnerLayout';
import SlideContainer from './slide/SlideContainer';
import { useQuery } from '@tanstack/react-query';
import { getMainReviewSlides, getMainSlides } from '@/apis/main';
import { useMemo } from 'react';
import { SLIDES_INFO } from '@/constants/mainSlides';
import Spinner from '@/components/common/Spinner';

const ListSection = () => {
  const { data: planData } = useQuery({
    queryKey: ['slides', 'plan'],
    queryFn: getMainSlides,
  });

  const { data: reviewData } = useQuery({
    queryKey: ['slides', 'review'],
    queryFn: getMainReviewSlides,
  });

  const slidesData = useMemo(() => {
    if (!planData) return [];
    return SLIDES_INFO.map(({ title, key }) => ({
      key,
      title,
      items: planData[key] || [],
    }));
  }, [planData]);

  return (
    <InnerLayout className="flex flex-col gap-[4rem] max-w-[146.4rem] px-[4.8rem]">
      {slidesData.map((item) => {
        return (
          <SlideContainer key={item.key} type="plan" slideItems={item.items}>
            {item.title}
          </SlideContainer>
        );
      })}
      {reviewData?.reviewSummaries ? (
        <div className="main-review mt-[9rem]">
          <SlideContainer type="review" slideItems={reviewData.reviewSummaries}>
            생생한 여행 후기를 들려주세요
          </SlideContainer>
        </div>
      ) : (
        <Spinner isPageLoading={false} />
      )}
    </InnerLayout>
  );
};

export default ListSection;
