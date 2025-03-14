'use client';
import PointComponents from '@/components/admin/PointComponents';
import { taglistPoints } from '@/components/admin/service';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useSearchParams();
  const lists = params.get('list') ?? 'all';
  const router = useRouter();

  return (
    <section className="relative w-full flex flex-col gap-[2rem]">
      <div className="w-full h-full min-h-[36.5rem]">
        <div className="flex">
          {taglistPoints.map((e) => (
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
          category={taglistPoints.find((e) => e.lists === lists)?.category || 0}
        />
      </div>
    </section>
  );
};

export default Page;
