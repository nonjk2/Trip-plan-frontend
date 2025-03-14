import { useState } from 'react';
import Icons from '@/components/common/Icons/index';
import cs from 'classnames';
import ReviewModalLayout from './ReviewModalLayout';
import { useReviewStore } from '@/stores/reviewStores';
import PlaceDetailedInfo from './PlaceDetailedInfo';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ReviewPlaceInfoProps {
  visitDate: Date | null;
  setVisitDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const ReviewPlaceInfo = ({ visitDate, setVisitDate }: ReviewPlaceInfoProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isReviewCompleted, savedReview } = useReviewStore();

  return (
    <>
      <div
        className={cs('mt-[2rem] flex flex-nowrap gap-[2.4rem]', {
          'mb-[2.8rem]': isReviewCompleted,
        })}
      >
        <button
          type="button"
          className="px-[2rem] py-[1.2rem] border border-[#D9D9D9] rounded-xl"
          onClick={() => setModalOpen(true)}
        >
          <div className="flex justify-between items-center gap-[0.8rem] whitespace-nowrap">
            <span className="text-[1.6rem] text-black/50">
              {isReviewCompleted
                ? `${savedReview?.selectedPlace?.structured_formatting.main_text}`
                : '방문 장소'}
            </span>
            <Icons.Plus size={24} />
          </div>
        </button>

        <DatePicker
          locale={ko}
          selected={visitDate}
          onChange={(date) => setVisitDate(date)}
          dateFormat="yyyy.MM.dd"
          popperPlacement="bottom-start"
          showPopperArrow={false}
          maxDate={new Date()}
          customInput={
            <button
              type="button"
              className="px-[2rem] py-[1.2rem] border border-[#D9D9D9] rounded-xl flex justify-between items-center gap-[0.8rem] whitespace-nowrap"
            >
              <span className="text-[1.6rem] text-black/50">
                {visitDate
                  ? format(visitDate, 'yyyy.MM.dd (EEE)', { locale: ko })
                  : isReviewCompleted
                  ? '선택한 날짜'
                  : '방문 날짜'}
              </span>
              <Icons.Calendar size={24} color="#80000000" />
            </button>
          }
        />
      </div>
      {isReviewCompleted && <PlaceDetailedInfo />}
      {isModalOpen && <ReviewModalLayout onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default ReviewPlaceInfo;
