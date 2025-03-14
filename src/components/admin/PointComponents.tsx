'use client';
import React, { useState } from 'react';
import {
  getCoreRowModel,
  PaginationState,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { PointTableColumns } from './TableColoums';

import { fetchPoint, sentPointFetch } from './service';
import toast from 'react-hot-toast';

import PointFilterForm from './PointFilterForm';
import PointTable from './PointTable';
import Modal from './PointAcceptModal';
import Button from '../common/Button';

//   { pageIndex, pageSize }: PaginationState,
//   category: number
// ) => {
//   let res;
//   if (category === 0) {
//     res = await fetch();
//   }

//   await new Promise((resolve) => setTimeout(resolve, 500));
//   const url = process.env.NEXT_PUBLIC_SERVER_IP;
//   res = await fetch(
//     `${url}/admin/reports?category=${category}&page=${pageIndex}&size=${pageSize}`,
//     {
//       headers: {
//         Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTc0MTcyMjYzOSwic29jaWFsX2lkIjoiMzg4MzQ1ODY1MCIsInJvbGUiOiJBRE1JTiJ9.SANn2By1VfL4YZ9PgH3Uaobo7_3RTvzxucWkFvpMtp60JpCsQxPKDBqcXc7DrcCAza-mpO2tYrmDPlbkRupaqQ`,
//       },
//     }
//   );

//   if (!res.ok) throw new Error('🚨 데이터 로드 실패');
//   const data: ReportResponse = await res.json();
//   return {
//     rows: data.data.content,
//     pageCount: data.data.totalPages,
//     rowCount: data.data.totalElements,
//   };
// };
// const fetchReports = async (
//   { pageIndex, pageSize }: PaginationState,
//   category: number,
//   reason?: string
// ) => {
//   await new Promise((resolve) => setTimeout(resolve, 500)); // ✅ 네트워크 지연 시뮬레이션
//   const accessToken = getCookieValue('accessToken');
//   const url = process.env.NEXT_PUBLIC_SERVER_IP;
//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//   };
//   console.log(reason);
//   let reports: ReportItem[] = [];
//   let totalCount = 0;
//   let totalPages = 0;
//   let reasonId = '';
//   if (reason) {
//     reasonId = `&reasonId=${reason}`;
//   }

//   if (category === 0) {
//     const categoryRequests = [1, 2, 3, 4].map((cat) =>
//       fetch(
//         `${url}/admin/reports?category=${cat}&page=${pageIndex}&size=${pageSize}${reasonId}`,
//         { headers }
//       ).then((res) =>
//         res.ok
//           ? res.json()
//           : Promise.reject(new Error(`카테고리 ${cat} 요청 실패`))
//       )
//     );

//     try {
//       const responses = await Promise.all(categoryRequests);

//       reports = responses.flatMap((res) => res.data.content);
//       totalCount = responses.reduce(
//         (acc, res) => acc + res.data.totalElements,
//         0
//       );
//       totalPages = Math.ceil(totalCount / pageSize);
//     } catch (error) {
//       console.error('🚨 데이터 로드 중 오류 발생:', error);
//       throw new Error('🚨 카테고리 0번 데이터 로드 실패');
//     }
//   } else {
//     const res = await fetch(
//       `${url}/admin/reports?category=${category}&page=${pageIndex}&size=${pageSize}${reasonId}`,
//       { headers }
//     );

//     if (!res.ok) throw new Error('🚨 데이터 로드 실패');
//     const data: ReportResponse = await res.json();

//     reports = data.data.content;
//     totalCount = data.data.totalElements;
//     totalPages = data.data.totalPages;
//   }

//   return {
//     rows: reports,
//     pageCount: totalPages,
//     rowCount: totalCount,
//   };
// };

const PointComponents = ({ category }: { category: number }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedPointId, setSelectedPointId] = useState<Row<PointItem>[]>([]);
  const [filterFormState, setFilterFormState] = useState<filterFormStateType>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const toggleRowSelection = (row: Row<PointItem>) => {
    if (row.original.status === 'COMPLETED') {
      toast.error('이미 포인트를 지급한 사용자입니다.');
      return;
    }
    row.toggleSelected(!row.getIsSelected());

    setSelectedPointId((prev) => {
      if (prev.some((selectedRow) => selectedRow.id === row.id)) {
        return prev.filter((selectedRow) => selectedRow.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };
  const handleOpenModal = () => {
    if (selectedPointId.length === 0) {
      toast.error('포인트를 지급할 사용자를 선택해주세요');
      return;
    }
    setIsModalOpen(true);
  };
  const handlePointSent = async () => {
    try {
      const pointIds = selectedPointId.map((row) => row.original.pointId);
      await sentPointFetch(pointIds);
      toast.success('포인트 지급이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['points', pagination, category],
      });
      table.resetRowSelection();

      setSelectedPointId([]);
    } catch (error) {
      toast.error('포인트 지급에 실패했습니다.');
      console.error('🚨 포인트 지급 오류:', error);
    }
    setIsModalOpen(false);
  };

  const dataQuery = useQuery({
    queryKey: ['points', pagination, category],
    queryFn: () => fetchPoint(pagination, category),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: dataQuery.data?.rows ?? [],
    columns: PointTableColumns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    rowCount: dataQuery.data?.rowCount,

    manualPagination: true,
  });
  // 탭
  const setFilterDateFormState = (
    date: keyof filterFormStateType,
    value: Date
  ) => {
    setFilterFormState((prev) => ({
      ...prev,
      [date]: value,
    }));
  };
  // 탭

  const ModalComponents = () => (
    <p className="admin-point-modal-text">
      {selectedPointId.length > 0 ? (
        selectedPointId.length === 1 ? (
          <>
            {selectedPointId[0].original.nickname} 에게 포인트를
            <br />
            지급하시겠습니까?
          </>
        ) : (
          <>
            {selectedPointId[0].original.nickname} 외{' '}
            {selectedPointId.length - 1} 명에게
            <br />
            포인트를 지급하시겠습니까?
          </>
        )
      ) : (
        '선택된 사용자가 없습니다.'
      )}
    </p>
  );

  return (
    <>
      <PointFilterForm
        category="report"
        filterFormState={filterFormState}
        setFilterDateFormState={setFilterDateFormState}
        handlePointSent={handlePointSent}
        handleOpenModal={handleOpenModal}
      />
      <PointTable
        table={table}
        dataQuery={dataQuery}
        toggleRowSelection={toggleRowSelection}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col w-full h-full justify-between">
            <div className="flex items-center justify-center px-[8.85rem] w-full h-full">
              <ModalComponents />
            </div>
            <div className="flex gap-[1.2rem]">
              <Button
                size="md"
                className="w-[29.6rem] rounded-[1.2rem] text-var-primary-500"
                btnColor="white"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                size="md"
                className="w-[29.6rem] rounded-[1.2rem]"
                btnColor="blue"
                onClick={handlePointSent}
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PointComponents;
