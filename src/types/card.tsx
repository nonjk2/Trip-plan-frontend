import { StaticImageData } from 'next/image';

export type TMainCardList = {
  planId: number;
  title: string;
  placeCategory: string[];
  startDate: Date;
  endDate: Date;
  people: number;
  transportation: 'PUBLIC' | 'CAR';
  totalCost: number;
  thumbnail: string | StaticImageData;
};

export type TMypageCardList = {
  planId: number | string;
  categories: string[];
  title: string;
  thumbnail: string | StaticImageData;
  bookmarkId?: number;
  status?: 'PRIVATE' | 'PUBLIC';
};
