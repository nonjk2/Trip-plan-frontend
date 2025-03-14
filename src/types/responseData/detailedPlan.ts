export type TPlanInfo = {
  title: string;
  placeCategory: string[];
  author: string;
  profileImage: string;
  thumbnail: string;
  createdAt: Date;
  startDate: string;
  endDate: string;
  status: 'PUBLIC' | 'PRIVATE';
  viewCount: number;
  like: number;
  likeId: number | null;
  bookmarkId: number | null;
  people: number;
  transportation: 'CAR' | 'PUBLIC';
  totalCost: number;
  socialId: string;
};

export type TPlanCommmentItem = {
  socialId: string;
  commentId: number;
  profileImage: string;
  nickname: string;
  createdAt: Date;
  content: string;
};

export type TPlanComments = {
  content: TPlanCommmentItem[];
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
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type TPlanScheduleItem = {
  order: number;
  placeName: string;
  streetAddress: string;
  code: string;
  latitude: number;
  longitude: number;
};

export type TPlanSchedules = {
  date: Date;
  cost: number;
  day: number;
  detail: TPlanScheduleItem[];
};
