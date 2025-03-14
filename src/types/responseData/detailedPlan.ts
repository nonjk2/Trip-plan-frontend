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
