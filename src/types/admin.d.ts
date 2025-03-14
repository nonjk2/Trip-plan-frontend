type filterFormStateType = {
  startDate?: Date;
  endDate?: Date;
  reasonId?: number;
};

type ReportReasonCode = number;

//
interface BaseReportItem {
  reporter: string;
  reported: string;
  reportCategory: string;
  createdAt: string | null;
  reportReason: number[];
  type: 'plan' | 'comment' | 'review' | 'reviewComment';
}

//  일정 신고
interface PlanReportItem extends BaseReportItem {
  type: 'plan';
  planId: number;
  planReportId: number;
  planTitle: string;
}

//  일정 댓글 신고
interface PlanCommentReportItem extends BaseReportItem {
  type: 'comment';
  commentId: number;
  commentContent: string;
  planCommentReportId: number;
  planId: number;
}

//  리뷰 신고
interface ReviewReportItem extends BaseReportItem {
  type: 'review';
  reviewId: number;
  reviewTitle: string;
  reviewReportId: number;
}

//  리뷰 댓글 신고
interface ReviewCommentReportItem extends BaseReportItem {
  type: 'reviewComment';
  reviewCommentId: number;
  reviewCommentContent: string;
  reviewCommentReportId: number;
}

//  통합 신고 타입
type ReportItem =
  | PlanReportItem
  | PlanCommentReportItem
  | ReviewReportItem
  | ReviewCommentReportItem;

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

type PointType = 'REVIEW' | 'PLAN';

type PointStatus = 'COMPLETED' | 'PENDING';

interface PointItem {
  pointId: number; // 포인트 ID
  nickname: string; // 사용자 닉네임
  pointType: PointType; // 포인트 유형 (리뷰, 일정)
  point: number; // 포인트 양
  detailPageId: number; // 해당 상세 페이지 ID
  status: PointStatus; // 상태 (완료, 대기)
  createAt: string; // 생성 날짜 (ISO 8601 형식)
}

interface PointResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    content: PointItem[]; // 포인트 목록
    pageable: Pageable; // 페이지네이션 정보
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    empty: boolean;
  };
}

type ReportActiveType = { author: string; content: string };
