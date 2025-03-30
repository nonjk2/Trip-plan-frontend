import { usePlanContext } from '@/providers/contexts/PlanContext';
import React from 'react';

import PlanDayDetailCreateItem from './PlanDayDetailCreateItem';

const FullScreenDayTab = () => {
  const { dayTab, planData, setDayHandler } = usePlanContext();
  const DayItem = planData.days[dayTab - 1];
  return (
    <div className="flex flex-col bg-white p-[2.4rem]">
      <div className="flex border-b gap-[4rem] relative min-h-[3.4rem] pb-[4px]">
        {planData.days.map((e) => (
          <button
            key={e.date}
            onClick={() => setDayHandler(e.day)}
            className={`${
              dayTab === e.day ? 'text-var-primary-500' : 'text-var-enable'
            } text-[2rem] leading-[3rem] flex justify-center items-center w-[6rem]`}
          >
            {`Day${e.day}`}
          </button>
        ))}
        <div
          style={{
            transform: `translateX(${0 + (dayTab - 1) * (6 + 4)}rem)`,
          }}
          className={`absolute bottom-0 border-b-2 border-b-var-primary-500 w-[6rem] transition-transform duration-300`}
        />
      </div>
      <PlanDayDetailCreateItem item={DayItem} people={planData.people} />
    </div>
  );
};

export default FullScreenDayTab;
