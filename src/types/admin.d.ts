type filterFormStateType = {
  startDate?: Date;
  endDate?: Date;
  reasonId?: number;
};

type ReportReasonCode = number;

interface ReportItem {
  planId: number;
  planReportId: number;
  reporter: string;
  reported: string;
  planTitle: string;
  reportCategory: string;
  createdAt: string; // ISO 8601 날짜 형식
  reportReason: ReportReasonCode[];
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface ReportResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    content: ReportItem[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}
