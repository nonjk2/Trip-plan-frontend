import { TMypageCardList } from '@/types/card';
import Image from 'next/image';
import { ICONS } from '@/constants/importImages';

interface PlannerMypageCardContentProps {
  cardInfo: TMypageCardList;
}

const PlannerMypageCardContent = ({
  cardInfo,
}: PlannerMypageCardContentProps) => {
  const { title, categories, status } = cardInfo;

  const formattedPlaceCategory = categories.join('·');

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent bg-[length:100%_40%] bg-bottom bg-no-repeat" />
      <div className="absolute bottom-[1.2rem] left-0 right-0 w-[90.8%] flex flex-col items-start gap-[0.4rem] z-10 mx-auto">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-white text-[1.8rem] leading-[2.34rem] font-bold truncate max-w-[95%]">
            {title}
          </h3>
          {status === 'PRIVATE' && (
            <Image
              src={ICONS.iconLock.src}
              alt={ICONS.iconLock.alt}
              width={20}
              height={20}
            />
          )}
        </div>

        <p className="text-white text-[1.4rem] leading-[1.82rem]">
          {formattedPlaceCategory}
        </p>
      </div>
    </>
  );
};

export default PlannerMypageCardContent;
