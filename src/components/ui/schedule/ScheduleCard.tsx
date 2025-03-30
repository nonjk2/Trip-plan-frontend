import DetailedSchedule from './DetailedSchedule';
import { formatDate } from '@/utils/dateUtils';
import { personalCostCalc } from '@/utils/costUtils';
import ViewDetailedSchedule from './ViewDetailedSchedule';
import {
  TPlanScheduleItem,
  TPlanSchedules,
} from '@/types/responseData/detailedPlan';

interface ScheduleCardProps {
  day: number;
  people: number;
  date: Date;
  scheduleData?: PlanDayType | TPlanSchedules;
  isDetailView?: boolean;
  mode?: 'full' | 'planner';
}

const ScheduleCard = ({
  day,
  people,
  scheduleData,
  date,
  mode = 'planner',
  isDetailView = false,
}: ScheduleCardProps) => {
  return (
    <div
      id={`Day${day}`}
      className={`${
        mode === 'full' && 'flex flex-col justify-between gap-[2.8rem]'
      }`}
    >
      <div className="flex flex-col gap-[1.6rem] text-[2rem] text-black leading-[3rem]">
        <div className="flex gap-[0.8rem] items-center">
          <div className="absolute top-0" id={`Day-${day}`}></div>
          <h2 className="text-[2.4rem] font-semibold leading-[2.864rem]">
            Day {day}
          </h2>

          <p className="text-black/50">{formatDate('schedule', date)}</p>
        </div>
        {scheduleData && (
          <p className="flex gap-[1.2rem]">
            <span className="font-semibold">예상비용</span>
            <span className="text-black/70">
              {scheduleData.cost.toLocaleString()}원 (1인{' '}
              {personalCostCalc(people, scheduleData?.cost)}원)
            </span>
          </p>
        )}
      </div>
      {mode === 'full' && <div className="border w-full h-[1px]" />}

      <div className="max-h-[60vh] overflow-auto">
        {scheduleData?.detail && scheduleData?.detail.length > 0 ? (
          isDetailView ? (
            <div className="mt-[3.6rem] min-h-[35.2rem]">
              <ViewDetailedSchedule
                placesData={scheduleData.detail as TPlanScheduleItem[]}
              />
            </div>
          ) : (
            <div className="relative flex justify-between gap-[8rem] mt-[3.6rem] min-h-[35.2rem]">
              <DetailedSchedule
                placesData={scheduleData.detail as PlanDetailType[]}
                day={day}
              />
            </div>
          )
        ) : (
          <div className="flex items-center justify-center min-h-[35.2rem] text-var-enable-text text-[2rem]">
            스케쥴을 추가해주세요
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
