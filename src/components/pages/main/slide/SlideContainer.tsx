import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import PlannerCard from '@/components/ui/card/PlannerCard';
import ReviewCard from '@/components/ui/card/ReviewCard';
import { ReactNode, useRef } from 'react';
import { TMainCardList } from '@/types/card';
import SlideCustomButton from './SlideCustomButton';
import { TReviewSummary } from '@/types/responseData/review';
import cs from 'classnames';

import 'swiper/css';

interface SlideContainerProps<T> {
  children: ReactNode;
  type: 'plan' | 'review';
  slideItems: T[];
}

const SlideContainer = <T extends TMainCardList | TReviewSummary>({
  children,
  type,
  slideItems,
}: SlideContainerProps<T>) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const slideItemsLength = slideItems.length;

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const settingOptions = {
    plan: {
      emptyText: '추천하는 슬라이드가 없어요..',
      renderSwipe: (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          navigation
        >
          {(slideItems as TMainCardList[]).map((item) => (
            <SwiperSlide key={'plan' + item.planId}>
              <PlannerCard cardType="main" cardInfo={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ),
      buttonLenderLength: 4,
    },
    review: {
      emptyText: '작성된 리뷰가 없어요..',
      renderSwipe: (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          navigation
        >
          {(slideItems as TReviewSummary[]).map((item) => (
            <SwiperSlide key={'review' + item.reviewId}>
              <div className="ml-[0.2rem] mt-[0.4rem] w-[62.6rem] h-[24.2rem]">
                <ReviewCard cardType="main" itemData={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ),
      buttonLenderLength: 2,
    },
  };

  const noSlideItemRender = (
    <div className="flex justify-center items-center min-h-[10rem] text-[2rem] font-semibold">
      {settingOptions[type].emptyText}
    </div>
  );

  return (
    <div className="flex flex-col gap-[2rem]">
      <div className="w-full max-w-[128rem] mx-auto ">
        <h3 className="font-semibold text-[2.8rem] text-black text-left leading-[3.341rem] tracking-2percent">
          {children}
        </h3>
      </div>

      <div
        className={cs('main-page relative', {
          plan: type === 'plan',
        })}
      >
        {slideItemsLength > 0 ? (
          <>
            {settingOptions[type].renderSwipe}
            {slideItemsLength > settingOptions[type].buttonLenderLength && (
              <>
                <SlideCustomButton direction="left" onClick={handlePrev} />
                <SlideCustomButton direction="right" onClick={handleNext} />
              </>
            )}
          </>
        ) : (
          noSlideItemRender
        )}
      </div>
    </div>
  );
};

export default SlideContainer;
