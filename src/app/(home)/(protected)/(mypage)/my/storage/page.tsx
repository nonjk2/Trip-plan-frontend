'use client';

import CardList from '@/components/pages/my/CardList';
import { TMypageCardList } from '@/types/card';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [cardList, setCardList] = useState<TMypageCardList[]>([]);

  useEffect(() => {
    const localStorageItems = localStorage.getItem('planData');
    if (!localStorageItems) return;

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

    setCardList(NewCardList);
  }, []);

  return (
    <div className="flex flex-col gap-[6rem]">
      <CardList listItems={cardList} storage />
    </div>
  );
};

export default Page;
