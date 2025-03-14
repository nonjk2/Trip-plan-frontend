import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { getOtherPlace } from '@/apis/review';
import ReviewCard from '../../ui/card/ReviewCard';
import cs from 'classnames';

import 'swiper/css';

interface OtherReviewSectionProps {
  reviewId: number;
  accessToken: string;
}

const OtherReviewSection = ({
  reviewId,
  accessToken,
}: OtherReviewSectionProps) => {
  const { data } = useQuery({
    queryKey: ['place', reviewId],
    queryFn: () => getOtherPlace(reviewId, accessToken),
  });

  return (
    <section className="mb-[30rem]">
      <h2 className="text-[2.8rem] font-bold leading-[4.2rem] text-center">
        이 장소의 다른 후기
      </h2>

      {data?.totalReviewCount ? (
        <div
          className={cs('review-page', {
            'flex justify-center': data.totalReviewCount <= 2,
          })}
        >
          {data.totalReviewCount <= 2 ? (
            <div className="mt-[4rem] flex gap-5">
              {data.reviewSummaries.map((item) => (
                <div key={item.reviewId} className="w-[62rem]">
                  <ReviewCard cardType="post" itemData={item} />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {data.reviewSummaries.map((item) => (
                <SwiperSlide key={item.reviewId}>
                  <ReviewCard cardType="post" itemData={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      ) : (
        <div className="mt-[10rem] border-t border-b flex justify-center items-center h-[40rem]">
          <span className="text-[2rem] text-black/60 font-bold">
            아직 이 장소의 다른 후기가 없어요.
          </span>
        </div>
      )}
    </section>
  );
};

export default OtherReviewSection;
