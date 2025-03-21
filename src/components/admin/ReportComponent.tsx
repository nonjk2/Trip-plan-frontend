'use client';
import React, { useState } from 'react';
import ReportTable from './FilterTable';
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

import { REPORT_REASON_MAP } from '@/lib/hooks/useReports';
import { useSearchParams } from 'next/navigation';
import { deleteReport, fetchReports } from './service';
import toast from 'react-hot-toast';
import FilterForm from './FilterForm';
import { ReportTableColumns } from './TableColoums';

const ReportComponent = ({ category }: { category: number }) => {
  const params = useSearchParams();
  const reason = params.get('reasonId');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [, setSelectedRowId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [filterFormState, setFilterFormState] = useState<filterFormStateType>(
    {}
  );
  // const toggleRowSelection = (id: number) => {};
  const queryClient = useQueryClient();
  const toggleRowSelection = (row: Row<ReportItem>) => {
    table.resetRowSelection();
    row.toggleSelected(!row.getIsSelected());
    row.getToggleSelectedHandler();

    setSelectedRowId((prev) => (prev === row.id ? null : row.id));

    switch (row.original.type) {
      case 'plan':
        setSelectedReportId((row.original as PlanReportItem).planReportId);
        break;
      case 'comment':
        setSelectedReportId(
          (row.original as PlanCommentReportItem).planCommentReportId
        );
        break;
      case 'review':
        setSelectedReportId((row.original as ReviewReportItem).reviewReportId);
        break;
      case 'reviewComment':
        setSelectedReportId(
          (row.original as ReviewCommentReportItem).reviewCommentReportId
        );
        break;
      default:
        setSelectedReportId(null);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedReport) {
      toast.error('삭제할 항목을 선택하세요.');
      return;
    }

    try {
      await deleteReport(selectedReport);
      toast.success('🚀 신고된 항목이 삭제되었습니다.');

      // 삭제 후 다시 데이터 불러오기
      queryClient.invalidateQueries({
        queryKey: ['reports', pagination, category, reason],
      });

      // 선택 해제
      setSelectedRowId(null);
      setSelectedReportId(null);
      table.resetRowSelection();
    } catch (error) {
      toast.error('삭제에 실패했습니다.');
      console.error('🚨 삭제 실패:', error);
    }
  };

  const dataQuery = useQuery({
    queryKey: ['reports', pagination, category, reason],
    queryFn: () => fetchReports(pagination, category, reason ? reason : ''),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: dataQuery.data?.rows ?? [],
    columns: ReportTableColumns,
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
  const setFilterReportFormState = (rePort: number) => {
    setFilterFormState((prev) => ({
      ...prev,
      reasonId: rePort,
    }));
  };

  const selectedReport = dataQuery.data?.rows.find((report) => {
    if ('planReportId' in report)
      return report.planReportId === selectedReportId;
    if ('planCommentReportId' in report)
      return report.planCommentReportId === selectedReportId;
    if ('reviewReportId' in report)
      return report.reviewReportId === selectedReportId;
    if ('reviewCommentReportId' in report)
      return report.reviewCommentReportId === selectedReportId;
    return false;
  });

  const reportContentMap: Record<ReportItem['type'], string | undefined> =
    selectedReport
      ? {
          plan: (selectedReport as PlanReportItem).planTitle,
          comment: (selectedReport as PlanCommentReportItem).commentContent,
          review: (selectedReport as ReviewReportItem).reviewTitle,
          reviewComment: (selectedReport as ReviewCommentReportItem)
            .reviewCommentContent,
        }
      : ({} as Record<ReportItem['type'], undefined>);

  return (
    <>
      <FilterForm
        category="report"
        filterFormState={filterFormState}
        setFilterDateFormState={setFilterDateFormState}
        setFilterReportFormState={setFilterReportFormState}
        handleDeleteSelected={handleDeleteSelected}
      />
      <ReportTable
        table={table}
        dataQuery={dataQuery}
        toggleRowSelection={toggleRowSelection}
      />
      <div className="h-[15.7rem] shadow-sm bg-white mt-[2rem]">
        <div className="flex border-b">
          <div
            className="flex justify-center items-center h-[6.3rem] w-[12.2rem] bg-var-primary-100 border-[#E1E1E1] report-sub-title"
            id="신고사유-title"
          >
            신고사유
          </div>
          <div
            className="flex items-center report-sub-content w-fit pl-[3.2rem]"
            id="신고사유-content"
          >
            {selectedReport
              ? selectedReport.reportReason
                  .map((reason) => REPORT_REASON_MAP[reason] || '기타')
                  .join(', ')
              : '선택된 신고 없음'}
          </div>
        </div>
        <div className="flex">
          <div
            className="flex justify-center items-center h-[9.4rem] w-[12.2rem] bg-var-primary-100 border-[#E1E1E1] report-sub-title"
            id="신고내용-title"
          >
            신고내용
          </div>
          <div
            className="flex items-center report-sub-content w-fit pl-[3.2rem]"
            id="신고내용-content"
          >
            {selectedReport
              ? reportContentMap[selectedReport.type] ?? '신고 내용 없음'
              : '선택된 신고 없음'}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportComponent;
