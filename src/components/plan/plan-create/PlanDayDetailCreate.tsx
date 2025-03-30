'use client';

import React from 'react';
import PlanDayDetailCreateItem from './PlanDayDetailCreateItem';
import KakaoMap from '@/components/maps/KakaoMap';
import FullscreenMap from '@/components/maps/FullScreenMap';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import FullScreenDayTab from './FullScreenDayTab';

type PlanDayDetailCreateProps = {
  planData: PlanDataType;
  dayTab: number;
};

const PlanDayDetailCreate = ({
  planData,
  dayTab,
}: PlanDayDetailCreateProps) => {
  const { mode } = usePlanContext();
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
      {mode === 'full' ? (
        <FullscreenMap>
          <div className="fixed top-0 flex w-screen h-screen">
            <FullScreenDayTab />
            <KakaoMap
              detail={planData.days[dayTab - 1]?.detail || []}
              day={dayTab - 1}
            />
          </div>
        </FullscreenMap>
      ) : (
        <div className="sticky top-[40%] h-full w-[70rem] z-50 rounded-[1.2rem] overflow-hidden">
          <KakaoMap
            detail={planData.days[dayTab - 1]?.detail || []}
            day={dayTab - 1}
          />
        </div>
      )}
    </section>
  );
};

export default PlanDayDetailCreate;
