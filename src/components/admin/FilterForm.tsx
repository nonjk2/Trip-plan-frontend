import React from 'react';
import Dropdown from '../common/Dropdown';
import Icons from '../common/Icons';

import Button from '../common/Button';

import StartDaySelecter from './StartDaySelecter';
import EndDaySelecter from './EndDaySelecter';

export const REPORT_REASON_MAP: Record<number, string> = {
  1: '스팸홍보 및 도배',
  2: '음란물',
  3: '불법정보',
  4: '욕설/생명경시/혐오/차별적 표현',
  5: '개인정보 노출',
  6: '불쾌한 표현',
  7: '청소년 유해 내용',
};

const FilterForm = ({
  category,
  filterFormState,
  setFilterDateFormState,
  setFilterReportFormState,
}: {
  category: 'report' | 'point';
  filterFormState: filterFormStateType;
  setFilterDateFormState: (
    date: keyof filterFormStateType,
    value: Date
  ) => void;
  setFilterReportFormState: (rePort: number) => void;
}) => {
  const CategoryForm = () => {
    return (
      <div className="flex items-center w-full h-[8rem] border-b bg-white shadow-sm">
        <div className="h-full w-[10rem] flex items-center admin-dropdown-text justify-center">
          신고 사유
        </div>
        <div className="h-full flex items-center">
          <Dropdown
            list={Object.values(REPORT_REASON_MAP)}
            title={
              filterFormState.reasonId
                ? REPORT_REASON_MAP[filterFormState.reasonId]
                : '신고 사유를 선택하세요'
            }
            Icon={<Icons.Search admin />}
            admin
            onSelect={(item) => {
              const reasonId = Object.entries(REPORT_REASON_MAP).find(
                ([, value]) => value === item
              )?.[0];
              if (reasonId) setFilterReportFormState(Number(reasonId));
            }}
          />
        </div>
        <div className="h-full w-[7.2rem] flex items-center admin-dropdown-text justify-center">
          날짜
        </div>

        <div
          id="endday"
          className="w-[28rem] flex justify-center items-center max-w-[28rem] min-w-[28rem] h-full"
        >
          <StartDaySelecter
            filterFormState={filterFormState}
            setFilterDateFormState={setFilterDateFormState}
          />
        </div>

        <div className="flex items-center justify-center min-w-[4rem] h-full">
          ~
        </div>

        <div
          id="endday"
          className="flex justify-center items-center max-w-[28rem] min-w-[28rem] h-full"
        >
          <EndDaySelecter
            filterFormState={filterFormState}
            setFilterDateFormState={setFilterDateFormState}
          />
        </div>

        <div className="flex w-[34.2rem] px-[1.5rem] py-[1.8rem] gap-[1rem]">
          <Button
            size="md"
            btnColor="white"
            className="text-var-primary-500 rounded-[1.2rem]"
          >
            조회하기
          </Button>
          <Button
            size="md"
            btnColor="white"
            className="text-var-primary-500 rounded-[1.2rem]"
          >
            삭제하기
          </Button>
        </div>
      </div>
    );
  };
  return (
    <form
      className="w-full flex"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {category === 'report' ? <CategoryForm /> : <></>}
    </form>
  );
};

export default FilterForm;
