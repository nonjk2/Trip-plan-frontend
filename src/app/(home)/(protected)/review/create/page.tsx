import InnerLayout from '@/components/layout/InnerLayout';
import ReviewForm from '@/components/pages/review/ReviewForm';

const ReviewCreate = () => {
  return (
    <InnerLayout className="max-w-[82.8rem] mt-[4rem] mb-[12rem]">
      <ReviewForm />
    </InnerLayout>
  );
};

export default ReviewCreate;
