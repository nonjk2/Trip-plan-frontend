import Image from 'next/image';
import PlannerListCardContent from './PlannerListCardContent';
import PlannerMypageCardContent from './PlannerMypageCardContent';
import Link from 'next/link';
import { TMainCardList, TMypageCardList } from '@/types/card';
import testImage from '@/assets/img/test-img.png';
interface StorageCardProps<T extends 'main' | 'mypage'> {
  cardType: T;
  cardInfo: T extends 'main' ? TMainCardList : TMypageCardList;
}

const StorageCard = <T extends 'main' | 'mypage'>({
  cardType,
  cardInfo,
}: StorageCardProps<T>) => {
  const isMainType = cardType === 'main';
  const { thumbnail, planId } = cardInfo;

  return (
    <Link
      href={`/plan/${planId}/create`}
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
          {thumbnail ? (
            <Image src={testImage} alt="asdf" className="object-cover" fill />
          ) : (
            <Image src={thumbnail} alt="썸네일" className="object-cover" fill />
          )}
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

export default StorageCard;
