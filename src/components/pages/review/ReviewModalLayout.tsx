import Modal from '@/components/common/Modal';
import ReviewPlace from './ReviewPlace';
import { useEffect, useState } from 'react';
import ReviewRating from './ReviewRating';
import { useReviewStore } from '@/stores/reviewStores';

interface ReviewModalLayoutProps {
  onClose: () => void;
}

const ReviewModalLayout = ({ onClose }: ReviewModalLayoutProps) => {
  const [type, setType] = useState<'region' | 'rating'>('region');
  const { setSelectedPlace, selectedPlace, reset } = useReviewStore();

  const handleNextStep = (place: GooglePlaceAPIType) => {
    setSelectedPlace(place);
    setType('rating');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    reset();
    setType('region');
  }, []);

  const renderOptions = {
    region: {
      title: '장소 검색',
      renderContent: <ReviewPlace onConfirm={handleNextStep} />,
    },
    rating: {
      title: `'${selectedPlace?.structured_formatting.main_text}'은(는) 어떠셨나요?`,
      renderContent: <ReviewRating onClose={handleClose} />,
    },
  };

  return (
    <Modal onClose={() => onClose()}>
      <section className="flex flex-col w-full h-full justify-between">
        <span className="leading-[4.2rem] text-[2.8rem] font-bold">
          {renderOptions[type].title}
        </span>
        {renderOptions[type].renderContent}
      </section>
    </Modal>
  );
};

export default ReviewModalLayout;
