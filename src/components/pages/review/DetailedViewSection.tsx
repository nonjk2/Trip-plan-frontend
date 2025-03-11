import ProfileImage from '@/components/ui/ProfileImage';
import { ICONS } from '@/constants/importImages';
import { TDetailedReviewInfo } from '@/types/responseData/review';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import PlaceDetailedInfo from './PlaceDetailedInfo';
import { useEffect, useState } from 'react';
import { useReviewStore } from '@/stores/reviewStores';
import Spinner from '@/components/common/Spinner';

interface DetailedViewSectionProps {
  postData: TDetailedReviewInfo;
}

const DetailedViewSection = ({ postData }: DetailedViewSectionProps) => {
  const {
    setSelectedPlace,
    completeReview,
    setRating,
    savedReview,
    isReviewCompleted,
  } = useReviewStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaceInfo = async (placeId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/google-places/details?placeId=${placeId}`);
      if (!res.ok) throw new Error('장소 정보를 가져오지 못했습니다.');

      const data = await res.json();
      if (data.place) {
        setSelectedPlace(data.place);
        completeReview();
      }
    } catch (error) {
      console.error('error::', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postData.placeId && !savedReview) {
      setRating('average', postData.averageRating);
      fetchPlaceInfo(postData.placeId);
    }
  }, [postData.placeId, savedReview]);

  const renderCounterOptions = [
    {
      key: 'view',
      image: { src: ICONS.iconEye.src, alt: ICONS.iconEye.alt },
      count: postData.viewCount,
    },
    {
      key: 'like',
      image: { src: ICONS.iconLike.src, alt: ICONS.iconLike.alt },
      count: postData.reviewLike,
    },
  ];

  return (
    <section>
      <h2 className="text-[2rem] text-black/30 font-semibold leading-[3rem]">
        여행 후기
      </h2>
      <div className="mt-[1.6rem] flex flex-col gap-[2rem]">
        <h3 className="text-[3.2rem] font-bold leading-[4.8rem]">
          {postData.title}
        </h3>
        <div className="flex items-center gap-[2rem]">
          <div className="flex items-center gap-[1.2rem]">
            <ProfileImage imageUrl={postData.userImage} size="r" />
            <span className="text-[1.6rem] leading-[2.4rem]">
              {postData.nickname}
            </span>
            <span className="text-[1.4rem] text-black/60 leading-[1.82rem]">
              {formatDate('comment', postData.createAt)}
            </span>
          </div>
          <div className="flex items-center gap-[2rem] text-[1.4rem] leading-[1.82rem]">
            {renderCounterOptions.map((option) => {
              return (
                <div
                  key={option.key}
                  className="flex items-center gap-[0.8rem]"
                >
                  <Image
                    src={option.image.src}
                    alt={option.image.alt}
                    width={24}
                    height={24}
                  />
                  <span>{option.count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mb-[3.2rem] flex items-center gap-[1.6rem]">
          <span className="text-[1.6rem] leading-[2.4rem]">방문 날짜</span>
          <span className="text-[1.4rem] text-black/50 leading-[1.82rem]">
            {formatDate('review', postData.visitedDay)}
          </span>
        </p>
      </div>
      {isLoading ? (
        <Spinner isPageLoading={false} />
      ) : (
        isReviewCompleted && (
          <div className="mb-[3.2rem]">
            <PlaceDetailedInfo />
          </div>
        )
      )}
      <div
        className="pt-[3.2rem] border-t border-[#D9D9D9] text-[1.3rem]"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </section>
  );
};

export default DetailedViewSection;
