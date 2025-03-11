'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReportTable from './FilterTable';
import { getCookieValue } from '../pages/detailedPost/PlanClient';

const fetchReports = async (list?: string): Promise<ReportResponse> => {
  const accessToken = getCookieValue('accessToken');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP}/admin/reports?category=${1}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw Error();
  }
  return res.json();
};
// / &reasonId= &startDate= &endDate =&page = & size =
const ReportTableSuspense = ({ list = '1' }: { list?: string }) => {
  const { data } = useSuspenseQuery({
    queryKey: ['reports', list],
    queryFn: () => fetchReports(list),
  });

  return <ReportTable data={data.data.content} />;
};

export default function SuspenseWrapper({ list }: { list?: string }) {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ReportTableSuspense list={list} />
    </Suspense>
  );
}
