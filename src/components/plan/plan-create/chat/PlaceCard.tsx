import Icons from '@/components/common/Icons';
import useGooglePlace from '@/lib/hooks/queries/useGooglePlace';
import Image from 'next/image';
import React from 'react';
import { openModalType } from '../AICreateComponents';

const PlaceCard = ({
  place,
  addOpenModalHandler,
}: {
  place: toolOutputData;
  addOpenModal: openModalType;
  addOpenModalHandler: (data: PlanDetailType) => void;
}) => {
  const { data, isLoading } = useGooglePlace({
    placeName: place.output.planData.place,
    key: place.tool_call_id,
    isLifestyleName: place.output.planData.isLifestyleName,
    coord: {
      lat: Number(place.output.planData.latitude),
      lng: Number(place.output.planData.longitude),
    },
  });
  const NewData: PlanDetailType = {
    latitude:
      data?.geometry.location.lat || Number(place.output.planData.latitude),
    longitude:
      data?.geometry.location.lng || Number(place.output.planData.longitude),
    order: 1,
    place: data?.name || place.output.planData.place,
    planCategoryNameId: place.output.planData.planCategoryNameId,
    streetAddress:
      data?.formatted_address || place.output.planData.streetAddress,
  };

  //   console.log(place.output.planData);
  if (!data) {
    return <></>;
  }
  return (
    <div className={`flex w-full relative`}>
      <div className="absolute bottom-0 left-[-4rem] cursor-pointer">
        <div
          className="w-[2.8rem] h-[2.8rem] flex justify-center items-center bg-opacity-10 bg-black rounded-[0.8rem] hover:scale-105"
          onClick={() => addOpenModalHandler(NewData)}
        >
          <Icons.Download />
        </div>
      </div>
      <div
        className={`relative w-full p-[1.2rem] rounded-lg max-w-max text-[1.4rem] leading-[1.82rem] tracking-normal text-white bg-blue-500 space-y-[1.2rem]`}
      >
        {isLoading && <>loading...</>}
        <p>{data.name}</p> :<p>{place.output.planData.description}</p>
        <p>{data.formatted_address}</p>
        {data.mainImageUrl && (
          <div className="w-full h-[14.3rem] overflow-hidden rounded-[0.8rem] relative bg-black">
            <Image
              src={data.mainImageUrl}
              fill
              alt="장소 img"
              className="absolute object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
