import Image from 'next/image';
import PlannerListCardContent from './PlannerListCardContent';
import PlannerMypageCardContent from './PlannerMypageCardContent';
import Link from 'next/link';
import { TMainCardList, TMypageCardList } from '@/types/card';
import defaultThumb from '@/assets/img/default-thumb.png';

interface PlannerCardProps<T extends 'main' | 'mypage'> {
  cardType: T;
  cardInfo: T extends 'main' ? TMainCardList : TMypageCardList;
}

const PlannerCard = <T extends 'main' | 'mypage'>({
  cardType,
  cardInfo,
}: PlannerCardProps<T>) => {
  const isMainType = cardType === 'main';
  const { thumbnail, planId } = cardInfo;

  return (
    <Link
      href={`/plan-n/${planId}`}
      className={`relative block w-full rounded-[0.6rem] overflow-hidden ${
        isMainType ? 'max-w-[30.5rem]' : 'max-w-[26.3rem]'
      }`}
    >
      <div>
        <div
          className={`relative w-full ${
            isMainType ? 'pb-[57.7%]' : 'pb-[60.8%]'
          } `}
        >
          <Image
            src={thumbnail || defaultThumb}
            alt="썸네일"
            className="object-cover"
            fill
          />
        </div>

        {isMainType ? (
          <PlannerListCardContent cardInfo={cardInfo as TMainCardList} />
        ) : (
          <PlannerMypageCardContent cardInfo={cardInfo as TMypageCardList} />
        )}
      </div>
    </Link>
  );
};

export default PlannerCard;
