'use client';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import PlanSetting from '@/components/PlanSetting';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

interface FilterFormState {
  startDate: Date | null;
  endDate: Date | null;
  // 필요한 다른 필터 상태들을 여기에 추가할 수 있습니다
}

const Page = () => {
  const [aaa, setaaa] = useState(false);
  const [filterForm, setFilterForm] = useState<FilterFormState>({
    startDate: null,
    endDate: null,
  });

  return (
    <div className="relative w-full">
      <DatePicker
        selected={filterForm.startDate}
        onChange={(date) =>
          setFilterForm((prev) => ({
            ...prev,
            startDate: date,
          }))
        }
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        className="p-2 border rounded"
      />

      <Button
        size="md"
        onClick={() => {
          setaaa(!aaa);
        }}
      >
        {`${aaa}`}
      </Button>
      {aaa && (
        <Modal onClose={() => setaaa(!aaa)}>
          <PlanSetting onClose={() => setaaa(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Page;
