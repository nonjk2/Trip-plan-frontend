import {
  ExtendedGooglePlace,
  GooglePlaceResponse,
} from '@/lib/hooks/queries/useGooglePlace';
import { useQueryClient } from '@tanstack/react-query';
import { RefObject } from 'react';
import { handleSetPlanData } from './handleSetPlanData';
import RecommendOverlay from './RecommnedOverray';
import { createRoot } from 'react-dom/client';

type RenderOverlayParams = {
  place: toolOutputData;
  position: kakao.maps.LatLng;
  planData: PlanDataType;
  setPlanData: (val: PlanDataType) => void;
  day: number;
  recommendMarkersRef: RefObject<Record<string, kakao.maps.Marker>>;
  customOverlayRef: RefObject<kakao.maps.CustomOverlay | null>;
  mapRef: RefObject<kakao.maps.Map | null>;
  onClose?: () => void;
};

export const renderRecommendOverlay = async ({
  customOverlayRef,
  day,
  mapRef,
  place,
  planData,
  position,
  recommendMarkersRef,
  setPlanData,
  onClose,
  queryClient,
}: RenderOverlayParams & {
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  const { place: placeName } = place.output.planData;

  const data: ExtendedGooglePlace | undefined = await queryClient.getQueryData([
    'googlePlace',
    placeName,
    place.tool_call_id,
  ]);

  const overlayContainer = document.createElement('div');
  createRoot(overlayContainer).render(
    <RecommendOverlay
      setPlanData={() =>
        handleSetPlanData({
          data,
          place,
          day,
          planData,
          setPlanData,
          recommendMarkersRef,
          customOverlayRef,
        })
      }
      place={place}
      data={data as GooglePlaceResponse}
      onClose={() => {
        if (onClose) onClose();
      }}
    />
  );

  const customOverlay = new kakao.maps.CustomOverlay({
    content: overlayContainer,
    position,
    yAnchor: 1.2,
  });

  customOverlay.setMap(mapRef.current);
  return customOverlay;
};
