'use client';

import { usePlanContext } from '@/providers/contexts/PlanContext';

import React from 'react';
import PlanDayDetailCreate from './PlanDayDetailCreate';

import PlanCreateTab from './PlanCreateTab';

const PlanDayCreates = () => {
  const { planData, submit, mode, dayTab, setDayHandler } = usePlanContext();
  const { handleSubmit, isGenerating } = submit;
  return (
    <div className="flex w-full">
      <div className="flex-col space-y-[4.8rem]">
        <span className="flex text-[2.4rem] leading-[2.8rem] font-semibold">
          여행 동선
        </span>

        {mode === 'planner' && (
          <PlanCreateTab
            planData={planData}
            isGenerating={isGenerating}
            handleSubmit={handleSubmit}
            dayTab={dayTab}
            setDayHandler={setDayHandler}
          />
        )}
        <PlanDayDetailCreate planData={planData} dayTab={dayTab} />
      </div>
    </div>
  );
};

export default PlanDayCreates;
