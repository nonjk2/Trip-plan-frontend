import { TMypageCardList } from '../card';

type TPageNation = {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
};

export type TMyPlanners = {
  content: TMypageCardList[];
} & TPageNation;

export type TComment = {
  commentId: number;
  planId: number;
  title: string;
  categories: string[];
  createdAt: Date;
  comment: string;
};

export type TMyComments = {
  content: TComment[];
} & TPageNation;

export type TReviews = {
  reviewId: number;
  bookmarkId?: number;
  title: string;
  imageCount: number;
  contentText: string;
  contentImageUrl: string;
  createdAt: Date;
};

export type TMyReviews = {
  content: TReviews[];
} & TPageNation;
