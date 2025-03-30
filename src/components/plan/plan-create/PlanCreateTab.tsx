import Button from '@/components/common/Button';
import { useGetProfile } from '@/lib/hooks/queries/useGetProfile';
import useIntersectionObserver from '@/lib/hooks/useObserver';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

type PlanDayDetailCreateProps = {
  planData: PlanDataType;
  dayTab: number;
  handleSubmit: () => Promise<void>;
  setDayHandler: (day: number) => void;
};

const PlanCreateTab = ({
  dayTab,
  planData,
  handleSubmit,
  setDayHandler,
}: PlanDayDetailCreateProps) => {
  const { planid: planId } = useParams<{ planid: string }>();
  const { data } = useQuery(useGetProfile());
  const router = useRouter();
  const tabHandler = (day: number) => {
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
        setDayHandler(day);
      }
    },
  });

  const handleTempSave = () => {
    try {
      const storedData = localStorage.getItem('planData');
      let localStorageItems: LocalPlanDataType[] = [];

      if (storedData) {
        localStorageItems = JSON.parse(storedData) as LocalPlanDataType[];
      }

      const updatedData = localStorageItems.some(
        (item) => item.planId === planId
      )
        ? localStorageItems.map((item) =>
            item.planId === planId
              ? { ...item, planData, userId: data?.data?.userId ?? '' }
              : item
          )
        : [
            ...localStorageItems,
            { planData, planId, userId: data?.data?.userId ?? '' },
          ];

      localStorage.setItem('planData', JSON.stringify(updatedData));

      toast.success('임시 저장되었습니다!');
    } catch (e) {
      console.error('임시 저장 오류:', e);
      toast.error('임시 저장에 실패했습니다.');
    }
  };

  return (
    <div className="flex mb-[2rem] sticky top-0 bg-background z-40">
      <div className="flex justify-between relative w-full pt-[2rem]">
        <div className="flex h-full border-b gap-[4rem]">
          {planData.days.map((e) => (
            <button
              key={e.date}
              onClick={() => tabHandler(e.day)}
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

        <div className="flex gap-[1.2rem]">
          <Button
            size="md"
            btnColor="white"
            className="text-var-primary-500"
            onClick={handleTempSave}
          >
            임시저장
          </Button>
          <Button
            btnColor="white"
            size="md"
            // disabled
            className="text-var-primary-500"
            onClick={handleSubmit}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanCreateTab;
