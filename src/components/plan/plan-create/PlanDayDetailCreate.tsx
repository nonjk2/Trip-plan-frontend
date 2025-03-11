'use client';

import React from 'react';
import PlanDayDetailCreateItem from './PlanDayDetailCreateItem';
import KakaoMap from '@/components/maps/KakaoMap';

type PlanDayDetailCreateProps = {
  planData: PlanDataType;
  dayTab: number;
};

const PlanDayDetailCreate = ({
  planData,
  dayTab,
}: PlanDayDetailCreateProps) => {
  return (
    <section className="flex relative gap-[3rem] w-full">
      <div className="flex flex-col space-y-[6.8rem] relative ">
        {planData.days.map((e) => (
          <PlanDayDetailCreateItem
            key={e.date}
            item={e}
            people={planData.people}
          />
        ))}
      </div>
      <div className="sticky top-[40%] h-full w-[70rem] z-50 rounded-[1.2rem] overflow-hidden">
        <KakaoMap
          detail={planData.days[dayTab - 1]?.detail || []}
          day={dayTab - 1}
        />
      </div>
    </section>
  );
};

export default PlanDayDetailCreate;
