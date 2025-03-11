'use client';
import FilterForm from '@/components/admin/FilterForm';

import SuspenseWrapper from '@/components/admin/SuspenseWrraper';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const taglist = [
  { link: '', title: '전체', lists: 'all' },
  {
    link: '?list=schedule',
    lists: 'schedule',
    title: '일정',
  },
  {
    link: '?list=schedule-comment',
    lists: 'schedule-comment',
    title: '일정 댓글',
  },
  {
    link: '?list=review',
    lists: 'review',
    title: '후기',
  },
  {
    link: '?list=review-comment',
    lists: 'review-comment',
    title: '후기 댓글',
  },
];

const Page = () => {
  const params = useSearchParams();
  const lists = params.get('list') ?? 'all';
  const router = useRouter();
  const [filterFormState, setFilterFormState] = useState<filterFormStateType>(
    {}
  );

  const setFilterDateFormState = (
    date: keyof filterFormStateType,
    value: Date
  ) => {
    setFilterFormState((prev) => ({
      ...prev,
      [date]: value,
    }));
  };
  const setFilterReportFormState = (rePort: number) => {
    setFilterFormState((prev) => ({
      ...prev,
      reasonId: rePort,
    }));
  };

  return (
    <section className="relative w-full flex flex-col gap-[2rem]">
      <div className="w-full h-full min-h-[36.5rem]">
        <div className="flex">
          {taglist.map((e) => (
            <div
              // href={`'${e.link}`}
              key={e.link}
              onClick={() => router.replace(`/admin/reports${e.link}`)}
              className={`w-[12rem] h-[4.5rem] admin-report-link flex justify-center items-center cursor-pointer ${
                lists === `${e.lists}`
                  ? 'text-white bg-var-primary-400'
                  : 'text-black bg-var-primary-100'
              }`}
            >
              {e.title}
            </div>
          ))}
        </div>
        <FilterForm
          category="report"
          filterFormState={filterFormState}
          setFilterDateFormState={setFilterDateFormState}
          setFilterReportFormState={setFilterReportFormState}
        />
        <SuspenseWrapper />
      </div>
      <div className="w-full border h-full min-h-[36.5rem]"></div>
    </section>
  );
};

export default Page;
