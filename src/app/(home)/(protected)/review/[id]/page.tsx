import ReviewClient from '@/components/pages/review/ReviewClient';

const Review = async ({ params }: { params: Promise<{ id: number }> }) => {
  const reviewId = (await params).id;

  return <ReviewClient reviewId={reviewId} />;
};

export default Review;
