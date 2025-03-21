/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationState } from '@tanstack/react-table';

const fetchFromProxy = async (
  url: string,
  method: string = 'GET',
  body?: object
) => {
  const res = await fetch('/api/proxy/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, method, body }),
  });

  if (!res.ok) throw new Error(`🚨 요청 실패: ${res.statusText}`);
  return res.json();
};

export const fetchReports = async (
  { pageIndex, pageSize }: PaginationState,
  category: number,
  reason?: string
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // const accessToken = getCookieValue('accessToken');

  // const url = process.env.NEXT_PUBLIC_SERVER_IP;
  // const headers = {
  //   Authorization: `Bearer ${accessToken}`,
  // };

  let reports: ReportItem[] = [];
  let totalCount = 0;
  let totalPages = 0;
  const reasonId = reason ? `&reasonId=${reason}` : '';

  const categoryTypeMap: Record<number, ReportItem['type']> = {
    1: 'plan',
    2: 'comment',
    3: 'review',
    4: 'reviewComment',
  };

  if (category === 0) {
    // const categoryRequests = [1, 2, 3, 4].map((cat) =>
    //   fetch(`${url}/admin/reports?category=${cat}${reasonId}`, {
    //     headers,
    //   }).then((res) =>
    //     res.ok
    //       ? res.json()
    //       : Promise.reject(new Error(`카테고리 ${cat} 요청 실패`))
    //   )
    // );
    const categoryRequests = [1, 2, 3, 4].map((cat) =>
      fetchFromProxy(`/admin/reports?category=${cat}${reasonId}`)
    );

    try {
      const responses = await Promise.all(categoryRequests);

      reports = responses.flatMap((res, index) =>
        res.data.content.map((report: any) => ({
          ...report,
          type: categoryTypeMap[index + 1],
        }))
      );

      totalCount = reports.length;
      totalPages = Math.ceil(totalCount / pageSize);

      reports = reports.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
      throw new Error('카테고리 0번 데이터 로드 실패');
    }
  } else {
    // const res = await fetch(
    //   `${url}/admin/reports?category=${category}&page=${pageIndex}&size=${pageSize}${reasonId}`,
    //   { headers }
    // );
    // const data = await fetchFromProxy(
    //   `/admin/reports?category=${category}&page=${pageIndex}&size=${pageSize}${reasonId}`
    // );
    // if (!res.ok) throw new Error('🚨 데이터 로드 실패');
    // const data: ReportResponse = await res.json();

    const data = await fetchFromProxy(
      `/admin/reports?category=${category}&page=${pageIndex}&size=${pageSize}${reasonId}`
    );
    reports = data.data.content.map((report: any) => ({
      ...report,
      type: categoryTypeMap[category],
    }));
    totalCount = data.data.totalElements;
    totalPages = data.data.totalPages;

    reports = data.data.content.map((report: any) => ({
      ...report,
      type: categoryTypeMap[category],
    }));

    totalCount = data.data.totalElements;
    totalPages = data.data.totalPages;
  }

  return {
    rows: reports,
    pageCount: totalPages,
    rowCount: totalCount,
  };
};

export const deleteReport = async (report: ReportItem) => {
  let url = '';
  // const accessToken = getCookieValue('accessToken');
  switch (report.type) {
    case 'plan':
      url = `/plans/${(report as PlanReportItem).planId}`;
      break;
    case 'comment':
      url = `/plans/comments/${(report as PlanCommentReportItem).commentId}`;
      break;
    case 'review':
      url = `/review/${(report as ReviewReportItem).reviewId}`;
      break;
    case 'reviewComment':
      url = `/reviews/comments/${
        (report as ReviewCommentReportItem).reviewCommentId
      }`;
      break;
    default:
      throw new Error(' 알 수 없는 신고 유형');
  }

  // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}${url}`, {
  //   method: 'DELETE',
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // if (!res.ok) {
  //   throw new Error(' 삭제 요청 실패');
  // }

  // return res.json();
  return fetchFromProxy(url, 'DELETE');
};

export const taglistReports = [
  { link: '', title: '전체', lists: 'all', category: 0 },
  {
    link: '?list=schedule',
    lists: 'schedule',
    title: '일정',
    category: 1,
  },
  {
    link: '?list=schedule-comment',
    lists: 'schedule-comment',
    title: '일정 댓글',
    category: 2,
  },
  {
    link: '?list=review',
    lists: 'review',
    title: '후기',
    category: 3,
  },
  {
    link: '?list=review-comment',
    lists: 'review-comment',
    title: '후기 댓글',
    category: 4,
  },
];

export const taglistPoints = [
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
// export const fetchPoint = async (
//   { pageIndex, pageSize }: PaginationState,
//   category: number
// ) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   // const accessToken = getCookieValue('accessToken');

//   const url = process.env.NEXT_PUBLIC_SERVER_IP;
//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//   };

//   // let reports: PointItem[] = [];
//   let totalCount = 0;
//   let totalPages = 0;

//   // const categoryTypeMap: Record<number, PointItem['type']> = {
//   //   1: 'plan',
//   //   2: 'comment',
//   //   3: 'review',
//   //   4: 'reviewComment',
//   // };

//   const res = await fetch(
//     `${url}/admin/points?category=${category}&page=${pageIndex}&size=${pageSize}`,
//     { headers }
//   );

//   if (!res.ok) throw new Error('🚨 데이터 로드 실패');
//   const data: PointResponse = await res.json();

//   // reports = data.data.content.map((report: any) => ({
//   //   ...report,
//   //   type: categoryTypeMap[category],
//   // }));

//   totalCount = data.data.totalElements;
//   totalPages = data.data.totalPages;

//   return {
//     rows: data.data.content,
//     pageCount: totalPages,
//     rowCount: totalCount,
//   };
// };

export const fetchPoint = async (
  { pageIndex, pageSize }: PaginationState,
  category: number
) => {
  const data = await fetchFromProxy(
    `/admin/points?category=${category}&page=${pageIndex}&size=${pageSize}`
  );
  return {
    rows: data.data.content,
    pageCount: data.data.totalPages,
    rowCount: data.data.totalElements,
  };
};
// export const sentPointFetch = async (pointIds: number[]) => {
//   console.log(pointIds);
//   const url = `/admin/points`;
//   // const accessToken = getCookieValue('accessToken');

//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}${url}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({ pointIds }),
//   });

//   if (!res.ok) {
//     throw new Error(' 지급 요청 실패');
//   }

//   return res.json();
// };

export const sentPointFetch = async (pointIds: number[]) => {
  return fetchFromProxy(`/admin/points`, 'POST', { pointIds });
};
