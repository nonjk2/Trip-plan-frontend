'use client';
import CardList from '@/components/pages/my/CardList';
import { TMypageCardList } from '@/types/card';
import React from 'react';

const page = () => {
  const localStorageItems = localStorage.getItem('planData');
  if (!localStorageItems) return <></>;
  const cardListForm = (): TMypageCardList[] => {
    const LocalDataMap: LocalPlanDataType[] = JSON.parse(localStorageItems);
    const NewCardList: TMypageCardList[] = LocalDataMap.map((e) => {
      return {
        categories: [e.planData.subtitle],
        planId: e.planId,
        thumbnail: e.planData.title,
        title: e.planData.title,
        bookmarkId: 1,
        status: 'PUBLIC',
      };
    });
    return NewCardList;
  };

  return (
    <div className="flex flex-col gap-[6rem]">
      <CardList listItems={cardListForm() || []} storage />
      {/* <Pagination
    pageType="my"
    currentPage={currentPage}
    totalPages={data?.totalPages || 1}
  /> */}
    </div>
  );
};

export default page;
