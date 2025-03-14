'use client';
import PointComponents from '@/components/admin/PointComponents';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export const taglist = [
  { link: '', title: '전체', lists: 'all', category: 1 },
  {
    link: '?list=schedule',
    lists: 'schedule',
    title: '일정작성',
    category: 2,
  },

  {
    link: '?list=review',
    lists: 'review',
    title: '후기작성',
    category: 3,
  },
];

const Page = () => {
  const params = useSearchParams();
  const lists = params.get('list') ?? 'all';
  const router = useRouter();

  return (
    <section className="relative w-full flex flex-col gap-[2rem]">
      <div className="w-full h-full min-h-[36.5rem]">
        <div className="flex">
          {taglist.map((e) => (
            <div
              // href={`'${e.link}`}
              key={e.link}
              onClick={() => router.replace(`/admin/points${e.link}`)}
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

        <PointComponents
          category={taglist.find((e) => e.lists === lists)?.category || 0}
        />
      </div>
    </section>
  );
};

export default Page;
