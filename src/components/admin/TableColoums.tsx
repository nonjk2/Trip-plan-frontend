import { REPORT_REASON_MAP } from '@/lib/hooks/useReports';
import { ColumnDef } from '@tanstack/react-table';

export const ReportTableColumns: ColumnDef<ReportItem>[] = [
  {
    accessorKey: 'select',
    size: 75,
    header: () => <div className="flex justify-center">선택</div>,
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
    size: 297,
    accessorKey: 'reporter',
    header: '작성자명',
    cell: (info) => info.getValue(),
  },
  {
    size: 277,
    accessorKey: 'reported',
    header: '신고대상',
    cell: (info) => info.getValue(),
  },
  {
    size: 275,
    accessorKey: 'reportCategory',
    header: '신고 분류',
    cell: (info) => info.getValue(),
  },
  {
    size: 298,
    accessorKey: 'reportReason',
    header: '신고 사유',
    cell: (info) =>
      (info.getValue() as number[])
        .map((reason) => REPORT_REASON_MAP[reason] || '기타')
        .join(', '),
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: '신고 날짜',
  //   cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  // },
  {
    size: 278,
    accessorKey: 'details',
    header: '상세보기',
    cell: ({ row }) => {
      switch (row.original.type) {
        case 'plan':
          return (
            <a
              href={`/plan-n/${String(
                (row.original as PlanReportItem).planId
              )}`}
              className="text-blue-500 hover:underline"
            >
              보기
            </a>
          );
        case 'comment':
          return (
            <a
              href={`/plan-n/${String(
                (row.original as PlanCommentReportItem).planId
              )}#${String((row.original as PlanCommentReportItem).commentId)}`}
              className="text-blue-500 hover:underline"
            >
              보기
            </a>
          );
        case 'review':
          return (
            <a
              href={`/review/${String(
                (row.original as ReviewReportItem).reviewId
              )}`}
              className="text-blue-500 hover:underline"
            >
              보기
            </a>
          );
        case 'reviewComment':
          return (
            <a
              href={`/review-comment/${String(
                (row.original as ReviewCommentReportItem).reviewCommentId
              )}`}
              className="text-blue-500 hover:underline"
            >
              보기
            </a>
          );
        default:
          return <span className="text-gray-400">-</span>; // ID가 없는 경우 빈 값 표시
      }
    },
  },
];

export const PointTableColumns: ColumnDef<PointItem>[] = [
  {
    accessorKey: 'select',
    size: 75,
    header: ({ table }) => (
      <div 
        className="flex justify-center cursor-pointer" 
        onClick={table.getToggleAllRowsSelectedHandler()}
      >
        선택
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
    size: 298,
    accessorKey: 'nickname',
    header: '회원명',
    cell: (info) => info.getValue(),
  },
  {
    size: 277,
    accessorKey: 'pointType',
    header: '지급사유',
    cell: (info) => {
      switch (info.row.original.pointType) {
        case 'PLAN':
          return '일정작성';
        case 'REVIEW':
          return '일정작성';
        default:
          return '출처이상';
      }
    },
  },
  {
    size: 276,
    accessorKey: 'point',
    header: '지급 포인트',
    cell: (info) => info.getValue(),
  },
  {
    size: 275,
    accessorKey: 'detailPageId',
    header: '상세보기',
    cell: (info) => {
      switch (info.row.original.pointType) {
        case 'PLAN':
          return (
            <a
              href={`/plan-n/${String(info.getValue())}`}
              className="text-blue-500 hover:underline"
            >
              보기
            </a>
          );

        case 'REVIEW':
          return (
            <a
              href={`/review/${String(info.getValue())}`}
              className="text-blue-500 hover:underline"
            >
              보기
            </a>
          );

        default:
          return <span className="text-gray-400">-</span>; // ID가 없는 경우 빈 값 표시
      }
    },
  },

  {
    size: 215,
    accessorKey: 'status',
    header: ({ column }) => (
      <div
      onClick={() => column.toggleSorting()}
      className="cursor-pointer flex items-center"
    >
      <span>지급상태</span>
      <span className="w-[1rem]">
        {column.getIsSorted() === 'asc' && '🔼'}
        {column.getIsSorted() === 'desc' && '🔽'}
        {column.getIsSorted() === false && <span className="invisible">🔽</span>}
      </span>
    </div>
    ),
    cell: (info) => {
      switch (info.row.original.status) {
        case 'PENDING':
          return '지급대기';
        case 'COMPLETED':
          return '지급완료';
        default:
          return '이상발생';
      }
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const order = {
        PENDING: 0,
        COMPLETED: 1,
      };
      const a = rowA.getValue(columnId);
      const b = rowB.getValue(columnId);
      return order[a as PointStatus] - order[b as PointStatus];
    },
  },
];
