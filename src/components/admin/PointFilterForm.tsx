import React from 'react';
import Button from '../common/Button';
import StartDaySelecter from './StartDaySelecter';
import EndDaySelecter from './EndDaySelecter';
import { useRouter, useSearchParams } from 'next/navigation';

export const REPORT_REASON_MAP: Record<number, string> = {
  1: '스팸홍보 및 도배',
  2: '음란물',
  3: '불법정보',
  4: '욕설/생명경시/혐오/차별적 표현',
  5: '개인정보 노출',
  6: '불쾌한 표현',
  7: '청소년 유해 내용',
};

const PointFilterForm = ({
  category,
  filterFormState,
  setFilterDateFormState,
  handleOpenModal,
}: {
  category: 'report' | 'point';
  filterFormState: filterFormStateType;
  handleOpenModal: () => void;
  setFilterDateFormState: (
    date: keyof filterFormStateType,
    value: Date
  ) => void;
}) => {
  const CategoryForm = () => {
    const params = useSearchParams();
    const router = useRouter();

    const searchFilter = () => {
      const newParams = new URLSearchParams(params.toString());

      if (filterFormState.reasonId) {
        newParams.set('reasonId', String(filterFormState.reasonId));
      } else {
        newParams.delete('reasonId');
      }

      router.replace(`/admin/reports?${newParams.toString()}`);
    };
    return (
      <div className="flex items-center justify-between w-full h-[8rem] border-b bg-white shadow-sm">
        <div className="flex items-center">
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
        </div>

        <div className="flex w-[34.2rem] px-[1.5rem] py-[1.8rem] gap-[1rem]">
          <Button
            size="md"
            btnColor="white"
            className="text-var-primary-500 rounded-[1.2rem]"
            onClick={searchFilter}
          >
            조회하기
          </Button>
          <Button
            size="md"
            btnColor="white"
            className="text-var-primary-500 rounded-[1.2rem]"
            onClick={handleOpenModal}
          >
            포인트 지급
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

export default PointFilterForm;
