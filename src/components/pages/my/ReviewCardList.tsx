import ReviewCard from '@/components/ui/card/ReviewCard';

interface ReviewCardListProps {
  listItems: {
    reviewId: number;
    title: string;
    createdAt: Date;
    contentText: string;
    contentImageUrl: string;
    imageCount: number;
  }[];
}

const ReviewCardList = ({ listItems }: ReviewCardListProps) => {
  return (
    <section className="flex flex-col w-[100%] gap-[1.2rem]">
      {listItems.map((item) => {
        return (
          <ReviewCard key={item.reviewId} cardType="mypage" itemData={item} />
        );
      })}
    </section>
  );
};

export default ReviewCardList;
