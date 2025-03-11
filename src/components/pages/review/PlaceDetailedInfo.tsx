import Star from './Star';
import { useReviewStore } from '@/stores/reviewStores';
import { ICONS } from '@/constants/importImages';
import Image from 'next/image';
import PlaceGoogleMap from './PlaceGoogleMap';

const InfoItem = ({
  icon,
  text,
}: {
  icon: { src: string; alt: string };
  text: string;
}) => (
  <div className="flex items-center gap-[0.8rem]">
    <Image src={icon.src} alt={icon.alt} width={28} height={28} />
    <span className="text-[1.6rem] leading-[2.08rem]">{text}</span>
  </div>
);

const PlaceDetailedInfo = () => {
  const { savedReview } = useReviewStore();
  const place = savedReview?.selectedPlace;

  return (
    <div className="pt-[2.8rem] border-t border-[#D9D9D9] flex flex-col gap-[2rem]">
      <div className="flex gap-[1.6rem] items-center">
        <span className="text-[2rem] font-semibold leading-[3rem]">
          {place?.structured_formatting.main_text}
        </span>
        <div className="flex gap-[1rem] items-center">
          <div>
            <ul className="flex">
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <Star
                    selected={i < (savedReview?.averageRating as number)}
                    size={24}
                    isStatic
                  />
                </li>
              ))}
            </ul>
          </div>
          <span className="text-[1.8rem] font-bold leading-[2.34rem]">
            ({savedReview?.averageRating.toFixed(1)})
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[1.6rem]">
        <InfoItem
          icon={ICONS.iconLocation}
          text={place?.korean_description || '정보 없음'}
        />
        <InfoItem
          icon={ICONS.iconClock}
          text={
            place?.isOpen === null
              ? '정보 없음'
              : place?.isOpen
              ? '영업 중'
              : '영업 종료'
          }
        />
        <InfoItem
          icon={ICONS.iconPhone}
          text={place?.phone_number || '정보 없음'}
        />
      </div>

      {location && (
        <PlaceGoogleMap
          lat={savedReview?.selectedPlace?.location?.lat as number}
          lng={savedReview?.selectedPlace?.location?.lng as number}
        />
      )}
    </div>
  );
};

export default PlaceDetailedInfo;
