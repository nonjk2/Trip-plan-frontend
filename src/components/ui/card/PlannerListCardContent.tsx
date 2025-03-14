import { TMainCardList } from '@/types/card';
import { formatDate } from '@/utils/dateUtils';

interface PlannerListCardContentProps {
  cardInfo: TMainCardList;
}

const transportationMap: Record<string, string> = {
  PUBLIC: '대중교통',
  CAR: '자차',
};

const PlannerListCardContent = ({ cardInfo }: PlannerListCardContentProps) => {
  const {
    title,
    placeCategory,
    people,
    transportation,
    totalCost,
    startDate,
    endDate,
  } = cardInfo;

  const formattedPlaceCategory = placeCategory.join('·');
  const formattedTransportation = transportationMap[transportation] || '';
  const formattedDate = {
    startDate: formatDate('main', startDate),
    endDate: formatDate('main', endDate),
  };
  const personalCost = Math.round(totalCost / people / 10) * 10; // 1의자리 반올림

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent bg-[length:100%_36%] bg-bottom bg-no-repeat" />
      <div className="absolute bottom-[1.2rem] left-0 right-0 w-[91.8%] flex flex-col items-center gap-[0.4rem] z-10 mx-auto text-white">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold  text-[1.8rem] leading-[2.34rem] truncate max-w-[63%]">
            {title}
          </h3>
          <p className="text-[1.4rem] leading-[1.82rem] truncate max-w-[35%]">
            {formattedPlaceCategory}
          </p>
        </div>

        <div className="w-full">
          <p className="text-[1.4rem] leading-[1.82rem] flex justify-between items-center ">
            <span>
              {formattedDate.startDate}-{formattedDate.endDate}
            </span>
            <span>
              {people}인·{formattedTransportation}
            </span>
            <span>{personalCost.toLocaleString()}원(인당)</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PlannerListCardContent;
