import Button from '@/components/common/Button';
import ScheduleCard from '@/components/ui/schedule/ScheduleCard';
import React, { useState } from 'react';
import RegionAdd from './modal/RegionAdd';
import CostAdd from './modal/CostAdd';
type PlanDayDetailCreateItemProps = {
  item: PlanDayType;
  people: number;
};
const PlanDayDetailCreateItem = ({
  item,
  people,
}: PlanDayDetailCreateItemProps) => {
  const [openModal, setOpenModal] = useState<{
    regionAdd: boolean;
    costAdd: boolean;
  }>({ costAdd: false, regionAdd: false });

  const onClose = (type: 'regionAdd' | 'costAdd') => {
    setOpenModal((prev) => ({ ...prev, [type]: false }));
  };
  return (
    <article className="flex flex-col gap-[2rem] min-h-[100rem] relative">
      {/* <div className="absolute top-0" id={`Day-${item.day}`}></div> */}
      <div className="flex flex-col justify-between sticky top-[20%]">
        <ScheduleCard
          day={item.day}
          people={people}
          scheduleData={item}
          date={new Date(item.date)}
        />

        <div className="flex gap-[1.2rem] mt-[2rem]">
          <Button
            onClick={() => setOpenModal({ ...openModal, regionAdd: true })}
            size="md"
            btnColor="white"
            className="text-var-primary-500 hover:bg-var-primary-50 w-1/2"
          >
            장소 추가
          </Button>
          <Button
            size="md"
            btnColor="white"
            className="text-var-primary-500 w-1/2"
            onClick={() => setOpenModal({ ...openModal, costAdd: true })}
          >
            비용 입력
          </Button>
        </div>
        {openModal.regionAdd && (
          <RegionAdd onClose={() => onClose('regionAdd')} day={item.day} />
        )}
        {openModal.costAdd && (
          <CostAdd onClose={() => onClose('costAdd')} day={item.day} />
        )}
      </div>
    </article>
  );
};

export default PlanDayDetailCreateItem;
