'use client';

import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { REPORT_REASON_MAP } from './FilterForm';

// ✅ ReportItem 타입 정의
export interface ReportItem {
  planId: number;
  planReportId: number;
  reporter: string;
  reported: string;
  planTitle: string;
  reportCategory: string;
  createdAt: string;
  reportReason: number[];
}

// ✅ 테이블 컬럼 정의
export const columns: ColumnDef<ReportItem>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => (
      <div className="flex justify-center">
        <input
          type="checkbox"
          className="w-[1.5rem] h-[1.5rem] cursor-pointer"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <input
          type="checkbox"
          className="w-[1.5rem] h-[1.5rem] cursor-pointer"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
  {
    accessorKey: 'reporter',
    header: '작성자명',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'reported',
    header: '신고대상',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'planTitle',
    header: '일정 제목',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'reportCategory',
    header: '신고 분류',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'reportReason',
    header: '신고 사유',
    cell: (info) =>
      (info.getValue() as number[])
        .map((reason) => REPORT_REASON_MAP[reason] || '기타')
        .join(', '),
  },
  {
    accessorKey: 'createdAt',
    header: '신고 날짜',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: 'details',
    header: '상세보기',
    cell: ({ row }) => (
      <a
        href={`/report/${row.original.planReportId}`}
        className="text-blue-500 hover:underline"
      >
        보기
      </a>
    ),
  },
];

// ✅ ReportTable 컴포넌트
export default function ReportTable({ data }: { data: ReportItem[] }) {
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable<ReportItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize: 10, // 한 페이지당 10개
      },
    },
  });

  // ✅ 선택된 행의 배경색을 변경하는 함수
  const toggleRowSelection = (planId: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [planId]: !prev[planId], // 선택 토글
    }));
  };

  // ✅ 선택된 행 삭제
  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(selectedRows)
      .filter((id) => selectedRows[Number(id)])
      .map(Number);
    if (selectedIds.length === 0) {
      alert('삭제할 항목을 선택하세요.');
      return;
    }
    // ✅ 선택된 행 삭제 (백엔드 API 연동 가능)
    console.log('삭제된 항목:', selectedIds);
    alert(`삭제된 항목: ${selectedIds.join(', ')}`);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      {/* ✅ 삭제 버튼 */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleDeleteSelected}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          선택 삭제
        </button>
      </div>

      <table className="w-full border-collapse border-gray-200 text-gray-700 font-semibold">
        <thead className="h-[4.8rem] bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-center border-b p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.original.planId}
              onClick={() => toggleRowSelection(row.original.planId)}
              className={`border-b h-[4.8rem] text-black cursor-pointer hover:bg-blue-100 ${
                selectedRows[row.original.planId] ? 'bg-blue-200' : ''
              }`}
            >
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === 'select') {
                  return (
                    <td key={cell.id} className="text-center p-2">
                      <input
                        type="checkbox"
                        className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                        checked={selectedRows[row.original.planId] || false}
                        onChange={() => toggleRowSelection(row.original.planId)}
                      />
                    </td>
                  );
                }
                return (
                  <td key={cell.id} className="text-center p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ 페이지네이션 */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
