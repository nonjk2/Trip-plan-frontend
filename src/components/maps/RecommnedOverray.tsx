import { GooglePlaceResponse } from '@/lib/hooks/queries/useGooglePlace';
import Star from '../pages/review/Star';

import Icons from '../common/Icons';
import Button from '../common/Button';

const RecommendOverlay = ({
  place,
  //   onClose,
  data,
  setPlanData,
}: {
  place: toolOutputData;
  setPlanData: () => void;
  onClose: () => void;
  data: GooglePlaceResponse | undefined;
}) => {
  let rating = 0;
  if (data) {
    rating = data.rating || 0;
  }
  const { place: name, phone } = place.output.planData;

  return (
    <div className="bg-white flex flex-col rounded-[1.2rem] p-[1.6rem] shadow-md text-sm w-[40.1rem] min-h-[15.1rem] shadow-[0px 0px 20px 0px #0000001A] justify-between gap-[2rem]">
      {/* {!data ? (
        <BeatLoader color="#1C68FF" />
      ) : (
        <> */}
      <div className="flex gap-[1.6rem] items-center">
        <strong className="text-[1.8rem] font-bold leading-[130%]">
          {name}
        </strong>
        {!!rating && (
          <div className="flex gap-[1rem]">
            <ul className="flex gap-[0.2rem]">
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <Star size={20} selected={i < (rating || 0)} isStatic />
                </li>
              ))}
            </ul>

            <div className="font-medium text-[1.8rem] leading-[130%]">
              ({rating})
            </div>
          </div>
        )}
      </div>
      {data && (
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex gap-[0.8rem]">
            <Icons.MapIcons.Location />
            <div className="flex items-center admin-table-content">
              {data.formatted_address}
            </div>
          </div>
          <div className="flex gap-[0.8rem]">
            <Icons.MapIcons.Timeline />
            <div className="flex items-center admin-table-content">
              {data.opening_hours?.open_now ? '운영 중' : '매장 닫힘'}
              {/* {} */}
            </div>
          </div>
          <div className="flex gap-[0.8rem]">
            <Icons.MapIcons.Phone />
            <div className="flex items-center admin-table-content">{phone}</div>
          </div>
        </div>
      )}
      <Button
        size="md"
        btnColor="blue"
        className="admin-table-content text-white w-full"
        onClick={setPlanData}
      >
        내 일정에 추가
      </Button>
    </div>
  );
};

export default RecommendOverlay;
