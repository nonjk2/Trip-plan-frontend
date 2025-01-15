'use client';

import { usePlanContext } from '@/providers/contexts/PlanContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PlanDayDetailCreate from './PlanDayDetailCreate';
import useIntersectionObserver from '@/lib/hooks/useObserver';
import Button from '@/components/common/Button';

const PlanDayCreates = () => {
  const [dayTab, setDayTab] = useState(1);
  const { planData } = usePlanContext();
  const router = useRouter();
  const tabHandler = (day: number) => {
    setDayTab(day);
    router.replace(`#Day-${day}`);
    document
      .getElementById(`Day-${day}`)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  useIntersectionObserver({
    sections: planData.days.map((e) => `Day${e.day}`),
    threshold: 0.3,
    onChange: (activeSection) => {
      if (activeSection) {
        const day = parseInt(activeSection.replace('Day', ''), 10);
        setDayTab(day);
      }
    },
  });

  return (
    <div className="flex w-full">
      <div className="flex-col space-y-[4.8rem]">
        <span className="flex text-[2.4rem] leading-[2.8rem] font-semibold">
          여행 동선
        </span>

        <div className="flex mb-[2rem] sticky top-0 bg-background z-40">
          <div className="flex justify-between relative w-full pt-[2rem]">
            <div className="flex h-full border-b gap-[4rem]">
              {planData.days.map((e) => (
                <button
                  key={e.date}
                  onClick={() => tabHandler(e.day)}
                  className={`${
                    dayTab === e.day
                      ? 'text-var-primary-500'
                      : 'text-var-enable'
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
            <div className="flex gap-[1.2rem]">
              <Button
                size="md"
                btnColor="white"
                className="text-var-primary-500"
              >
                임시저장
              </Button>
              <Button
                btnColor="white"
                size="md"
                disabled
                className="text-var-primary-500"
              >
                완료
              </Button>
            </div>
          </div>
        </div>

        <PlanDayDetailCreate planData={planData} dayTab={dayTab} />
      </div>
    </div>
  );
};

export default PlanDayCreates;
