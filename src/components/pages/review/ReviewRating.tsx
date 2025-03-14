import Button from '@/components/common/Button';
import RatingInput from './RatingInput';
import { ratingQuestions } from '@/constants/ratingQuestions';
import Star from './Star';
import { useReviewStore } from '@/stores/reviewStores';

interface ReviewRatingProps {
  onClose: () => void;
}

const ReviewRating = ({ onClose }: ReviewRatingProps) => {
  const { ratings, getAverageRating, completeReview } = useReviewStore();

  const isAllRated = Object.values(ratings).length === ratingQuestions.length;
  const averageRating = isAllRated ? Math.round(getAverageRating()) : 0;

  const handleSaveRating = () => {
    completeReview();
    onClose();
  };

  return (
    <>
      <div className="mt-[2.8rem] grow">
        <div className="flex flex-col pb-[2rem] gap-[2rem] border-b border-[#D9D9D9]">
          {ratingQuestions.map((question) => (
            <RatingInput key={question} question={question} />
          ))}
        </div>
        <div className="mt-[2rem]">
          <span className="text-[2rem] leading-[2.6rem]">총 평점</span>
          <ul className="flex gap-[0.2rem]">
            {[...Array(5)].map((_, i) => (
              <li key={i}>
                <Star selected={i < averageRating} isStatic />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button
        size="lg"
        onClick={handleSaveRating}
        btnColor="blue"
        className="text-white"
        disabled={!isAllRated}
      >
        완료
      </Button>
    </>
  );
};

export default ReviewRating;
