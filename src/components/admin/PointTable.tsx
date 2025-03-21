'use client';

import { flexRender, Row, Table } from '@tanstack/react-table';

import { UseQueryResult } from '@tanstack/react-query';
import Icons from '../common/Icons';
import { ReportTableColumns } from './TableColoums';

export default function PointTable({
  table,
  dataQuery,
  toggleRowSelection,
}: {
  table: Table<PointItem>;
  toggleRowSelection: (row: Row<PointItem>) => void;
  dataQuery: UseQueryResult<
    {
      rows: PointItem[];
      pageCount: number;
      rowCount: number;
    },
    Error
  >;
}) {
  const totalPageCount = table.getPageCount();
  const pagesPerGroup = 5;
  const currentPageGroup = Math.floor(
    table.getState().pagination.pageIndex / pagesPerGroup
  );
  const startPage = currentPageGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPageCount);

  const SkeletonRow = ({ columns }: { columns: number }) => {
    return (
      <tr>
        {Array.from({ length: columns }).map((_, index) => (
          <td key={index} className="">
            <div className="animate-pulse [animation-duration:0.7s] bg-gray-300 border-b h-[4.6rem] rounded-lg w-full"></div>
          </td>
        ))}
      </tr>
    );
  };
  return (
    <div className="w-full">
      <div className="bg-white shadow-sm rounded-lg">
        <table className="w-full border-collapse border-gray-200 text-gray-700 font-semibold">
          <thead className="h-[4.8rem] bg-white border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="admin-table-header text-[#6B6B6B] text-left"
                    style={{ width: `${header.column.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="min-h-[24rem]">
            {dataQuery.isFetching ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} columns={ReportTableColumns.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr key="no-data">
                <td
                  colSpan={ReportTableColumns.length}
                  className="w-full h-full flex justify-center items-center admin-empty-text"
                >
                  신고 내역을 조회해주세요
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b h-[4.8rem] cursor-pointer text-black ${
                    row.getIsSelected() ? 'bg-blue-200' : ''
                  }`}
                  onClick={() => toggleRowSelection(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="admin-table-content">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {table.getRowModel().rows.length !== 0 && (
          <div className="flex justify-center bg-none items-center h-[4.8rem] gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 rounded disabled:opacity-50 disabled:bg-none"
            >
              <Icons.Arrow.Left />
            </button>

            {Array.from(
              { length: endPage - startPage },
              (_, i) => startPage + i
            ).map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => table.setPageIndex(pageIndex)}
                className={`px-3 py-1 rounded ${
                  table.getState().pagination.pageIndex === pageIndex
                    ? 'admin-report-arrow text-[#763AA5]'
                    : 'admin-report-arrow-text text-[#6B6B6B]'
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}

            {/* ▶ 다음 페이지 */}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              <Icons.Arrow.Right />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
