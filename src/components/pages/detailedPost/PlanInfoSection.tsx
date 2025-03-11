import ProfileImage from '@/components/ui/ProfileImage';
import Image from 'next/image';
import { ICONS } from '@/constants/importImages';
import defaultThumb from '@/assets/img/default-thumb.png';
import {
  calculateTripDuration,
  formatDate,
  formatFromString,
} from '@/utils/dateUtils';
import { personalCostCalc } from '@/utils/costUtils';
import Visibility from './Visibility';
import { ETransportation } from '@/types/enum';
import { TPlanInfo } from '@/types/responseData/detailedPlan';

interface PlanInfoSectionProps {
  infoData: TPlanInfo;
  planId: number;
  accessToken: string;
  socialId: string;
}

const PlanInfoSection = ({
  infoData: data,
  planId,
  socialId,
}: PlanInfoSectionProps) => {
  const day = calculateTripDuration({
    endDate: data.endDate,
    startDate: data.startDate,
  });

  const formattedPlaceCategory = data.placeCategory.join(' - ');
  const formattedDuration = `${formatFromString(
    data.startDate
  )} ~ ${formatFromString(data.endDate)} · ${day?.nights}박 ${day?.days}일`;

  const renderCounterOptions = [
    {
      key: 'view',
      image: { src: ICONS.iconEye.src, alt: ICONS.iconEye.alt },
      count: data.viewCount,
    },
    {
      key: 'like',
      image: { src: ICONS.iconLike.src, alt: ICONS.iconLike.alt },
      count: data.like,
    },
  ];
  const renderInfoOptions = [
    {
      key: '기간',
      value: formattedDuration,
    },
    {
      key: '인원',
      value: `${data.people}명`,
    },
    {
      key: '교통수단',
      value:
        data.transportation === 'CAR'
          ? ETransportation.CAR
          : ETransportation.PUBLIC,
    },
    {
      key: '예상비용',
      value: `${data.totalCost.toLocaleString()}원 (1인${personalCostCalc(
        data.people,
        data.totalCost
      )}원)`,
    },
  ];

  return (
    <section className="flex flex-col gap-[4.5rem]">
      <div className="flex flex-col gap-[0.4rem] items-start text-[2rem] text-black leading-[2.6rem]">
        <div className="flex justify-between items-center gap-[6.8rem]">
          <div className="flex items-center gap-[1.2rem]">
            <h2 className="text-[3.2rem] font-bold leading-[4.8rem]">
              {data.title}
            </h2>
            {/* <button className="text-[#7E7E7E]">편집</button> */}
          </div>
          {data.status && socialId === data.socialId && (
            <Visibility planId={planId} status={data.status} />
          )}
        </div>
        <p className="text-black/60">{formattedPlaceCategory}</p>
      </div>

      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-[2.4rem]">
          <div className="flex flex-col gap-[1.2rem]">
            <div className="flex items-center gap-[1.2rem] text-[2rem] leading-[2.5rem]">
              <ProfileImage imageUrl={data.profileImage || ''} size="m" />
              <span className="font-medium">{data.author}</span>
              <span className="text-black/60">
                {data.createdAt && formatDate('comment', data.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-[2rem] text-[1.6rem] leading-[1.909]">
              {renderCounterOptions.map(
                (option: {
                  key: string;
                  image: {
                    src: string;
                    alt: string;
                  };
                  count: number;
                }) => {
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
                }
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[2rem]">
            <h3 className="text-[2.4rem] font-semibold leading-[3.6rem]">
              여행 정보
            </h3>

            <div className="flex flex-col gap-[1.2rem]">
              {renderInfoOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center gap-[1.2rem] text-[2rem]"
                >
                  <span className="leading-[3rem] font-semibold">
                    {option.key}
                  </span>
                  <span className="leading-[2.6rem] text-black/70">
                    {option.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative max-w-[48rem] w-full rounded-[1.6rem] overflow-hidden my-[2.2rem]">
          <Image
            src={data.thumbnail || defaultThumb}
            alt="썸네일"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default PlanInfoSection;
