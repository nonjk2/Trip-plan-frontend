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
