/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { getSearchList } from '@/apis/search';
import SortFilterDropdown from '@/components/common/SortFilterDropdown';
import Spinner from '@/components/common/Spinner';
import InnerLayout from '@/components/layout/InnerLayout';
import PlannerCard from '@/components/ui/card/PlannerCard';
import { TSearchList } from '@/types/responseData/search';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const switchValueFromText = (text: string) => {
  switch (text) {
    case '최신순':
      return 'id';
    case '조회순':
      return 'viewCount';
    // 인기순 백엔드 구현되면 수정
    case '인기순':
      return 'id';
    default:
      return;
  }
};

const SearchListSection = () => {
  const [sort, setSort] = useState('최신순');
  const params = useSearchParams();
  const fetchSearchList = ({
    pageParam = { lastId: 0, lastValue: null },
  }: {
    pageParam?: { lastId: number; lastValue: string | null };
  }) => {
    const queryParams = {
      day: params.get('day'),
      transportCategoryName: params.get('transportCategoryName'),
      people: params.get('people'),
      categoryNames: params.getAll('categoryNames'),
      ...pageParam,
      sortBy: switchValueFromText(sort),
      keyword: params.get('keyword'),
    };
    return getSearchList(queryParams);
  };

  const { data, hasNextPage, isLoading, isFetching, fetchNextPage, refetch } =
    useInfiniteQuery<
      TSearchList,
      Error,
      InfiniteData<TSearchList>,
      [_1: string, _2: string],
      { lastId: number; lastValue: string | null }
    >({
      queryKey: ['search', params.toString()],
      queryFn: fetchSearchList,
      initialPageParam: { lastId: 0, lastValue: null },
      getNextPageParam: (lastPage) =>
        lastPage.hasNext
          ? { lastId: lastPage.nextId, lastValue: lastPage.nextValue }
          : undefined,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchNextPageThrottled = throttle(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, 1000);

  useEffect(() => {
    refetch();
  }, [refetch, sort]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPageThrottled();
    }
  }, [inView]);

  const listFlatMapList = useMemo(() => {
    return data?.pages.flatMap((page) => page.plans) || [];
  }, [data]);

  const noSearchDataRender = (
    <div className="flex justify-center items-center min-h-[30rem]">
      <span className="text-[2.4rem] text-black font-semibold">
        검색 결과가 없습니다.
      </span>
    </div>
  );

  if (isLoading) return <Spinner />;

  return (
    <InnerLayout>
      {listFlatMapList.length > 0 ? (
        <>
          <section className="flex flex-col gap-[1.6rem]">
            <div className="flex justify-between items-center">
              <p className="text-[2rem] text-black font-semibold leading-[3rem]">
                총{' '}
                <span className="text-var-primary-500">
                  {data?.pages[0].totalCount}
                </span>
                개의 일정을 발견했어요
              </p>
              <SortFilterDropdown text={sort} onSelect={setSort} />
            </div>
            <div className="grid grid-cols-4 grid-rows-4 gap-y-[2.4rem] gap-x-[2rem]">
              {listFlatMapList.map((item) => {
                return (
                  <div key={item.planId} className="flex justify-center">
                    <PlannerCard cardType="main" cardInfo={item} />
                  </div>
                );
              })}
            </div>
          </section>
          <div ref={ref} className="h-[0.1rem]"></div>
        </>
      ) : (
        noSearchDataRender
      )}
    </InnerLayout>
  );
};

export default SearchListSection;
