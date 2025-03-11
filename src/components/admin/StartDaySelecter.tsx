import { ko } from 'date-fns/locale';
import React from 'react';
import DatePicker from 'react-datepicker';
import Chip from '../common/Chip';
import Icons from '../common/Icons';
import { formatDatePicker } from '@/utils/dateUtils';

const StartDaySelecter = ({
  filterFormState,
  setFilterDateFormState,
}: {
  filterFormState: filterFormStateType;
  setFilterDateFormState: (
    date: keyof filterFormStateType,
    value: Date
  ) => void;
}) => {
  const { startDate: startDay } = filterFormState;
  return (
    <div className="flex-1 w-full flex flex-col gap-[1.2rem] relative">
      <div className="relative w-full">
        <DatePicker
          locale={ko}
          selected={!startDay ? new Date() : startDay}
          // maxDate={endDay ? new Date(endDay) : undefined}
          onChange={(date) => {
            if (!date) return;

            setFilterDateFormState('startDate', date);
          }}
          calendarClassName="text-[1.6rem] w-full rounded-[2rem]"
          dateFormat="yyyy년 MM월 dd일"
          popperPlacement="bottom-start"
          customInput={
            <Chip
              state={true}
              Icon={<Icons.Date />}
              dropdown
              admin
              className={`text-[#939393] bg-[#F7F7F7] border-none h-[4.4rem] admin-dropdown-text rounded-[1.2rem]
              `}
              aria-label="Close dropdown"
            >
              {!startDay ? '날짜를 선택해주세요' : formatDatePicker(startDay)}
            </Chip>
          }
          popperClassName="w-full"
          weekDayClassName={(date) => {
            return `${date.getDay() === 0 ? 'text-red' : 'text-white'}`;
          }}
          dayClassName={(date) => {
            const today = new Date();
            const currentMonth = today.getMonth();
            const dateMonth = date.getMonth();

            return `${
              currentMonth !== dateMonth ? 'text-gray-400' : 'text-black'
            } hover:bg-gray-100 rounded-full text-[2rem] py-[1rem]`;
          }}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-[0.8rem] py-[1rem] text-white">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="text-var-primary-500 disabled:text-gray-300"
              >
                ◀
              </button>
              <span className="text-[2rem] font-semibold">
                {date.getFullYear()}년 {date.getMonth() + 1}월
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="text-var-primary-500 disabled:text-gray-300"
              >
                ▶
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default StartDaySelecter;
