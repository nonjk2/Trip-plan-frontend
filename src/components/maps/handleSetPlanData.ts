import { ExtendedGooglePlace } from '@/lib/hooks/queries/useGooglePlace';

import { RefObject } from 'react';

type HandleSetPlanDataParams = {
  data?: ExtendedGooglePlace;
  place: toolOutputData;
  day: number;
  planData: PlanDataType;
  setPlanData: (val: PlanDataType) => void;
  recommendMarkersRef: React.RefObject<Record<string, kakao.maps.Marker>>;
  customOverlayRef: RefObject<kakao.maps.CustomOverlay | null>;
};

export const handleSetPlanData = ({
  data,
  customOverlayRef,
  day,
  place,
  planData,
  recommendMarkersRef,
  setPlanData,
}: HandleSetPlanDataParams) => {
  const Newdata: PlanDetailType = {
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

  const updatedDays = planData.days.map((dayData) => {
    if (dayData.day === day + 1) {
      console.log('들어왔니');
      return {
        ...dayData,
        detail: [
          ...dayData.detail,
          { ...Newdata, order: dayData.detail.length + 1 },
        ],
      };
    }
    return dayData;
  });
  const newPlan = {
    ...planData,
    days: updatedDays,
  };

  console.log('🧩 저장될 newPlan:', newPlan, Newdata, day);
  setPlanData(newPlan);
  const markerToRemove = recommendMarkersRef.current[place.tool_call_id];
  if (markerToRemove) {
    markerToRemove.setMap(null);
    delete recommendMarkersRef.current[place.tool_call_id];
  }
  if (customOverlayRef.current) customOverlayRef.current.setMap(null);
};
