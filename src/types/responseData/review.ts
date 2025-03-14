export type TDetailedReviewInfo = {
  id: number;
  socialId: string;
  likeId: number | null;
  bookmarkId: number | null;
  placeId: string;
  title: string;
  nickname: string;
  userImage: string;
  content: string;
  viewCount: number;
  latitude: number;
  longitude: number;
  visitedDay: Date;
  averageRating: number;
  createAt: Date;
  like: number;
};

export type TReviewSummary = {
  reviewId: number;
  title: string;
  createdAt: Date;
  userImageUrl: string;
  nickname: string;
  contentText: string;
  contentImageUrl: string;
  imageCount: number;
};

export type TOtherReview = {
  totalReviewCount: number;
  reviewSummaries: TReviewSummary[];
};
