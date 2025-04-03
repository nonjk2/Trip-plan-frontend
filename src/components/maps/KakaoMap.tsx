'use client';

import { useDirections } from '@/lib/hooks/queries/useDirectionQuery';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import fullscreen from '@/assets/img/fullscreen.png';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import RecommendOverlay from './RecommnedOverray';
import { createRoot } from 'react-dom/client';
import {
  ExtendedGooglePlace,
  GooglePlaceResponse,
} from '@/lib/hooks/queries/useGooglePlace';

const KakaoMap = ({
  detail: details,
  day,
}: {
  detail: PlanDetailType[] | [];
  day: number;
}) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const recommendMarkersRef = useRef<Record<string, kakao.maps.Marker>>({});
  const polylinesRef = useRef<kakao.maps.Polyline | null>(null);
  const customOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const { data, isLoading, isError } = useQuery(useDirections(details, day));
  const { mode, toggleMode, recommendPlan, setPlanData, planData } =
    usePlanContext();
  const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) {
        const container = document.getElementById('map');
        const options: kakao.maps.MapOptions = {
          center: new kakao.maps.LatLng(
            details[0]?.latitude || 37.5665,
            details[0]?.longitude || 126.978
          ),
          level: 7,
          // draggable: false,
          // scrollwheel: false,
          disableDoubleClickZoom: false,
        };

        if (container) {
          mapRef.current = new kakao.maps.Map(container, options);
        }
      }
    };

    if (window.kakao && window.kakao.maps) {
      console.log('맵');
      kakao.maps.load(initializeMap);
    }
  }, [details]);
  const queryClient = useQueryClient();

  const handleSetPlanData = (
    data: ExtendedGooglePlace | undefined,
    place: toolOutputData
  ) => {
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

  const renderRecommendOverlay = async (
    place: toolOutputData,
    position: kakao.maps.LatLng,
    onClose?: () => void
  ) => {
    const { place: placeName } = place.output.planData;

    const data: ExtendedGooglePlace | undefined =
      await queryClient.getQueryData([
        'googlePlace',
        placeName,
        place.tool_call_id,
      ]);
    // 일정등록

    const overlayContainer = document.createElement('div');
    createRoot(overlayContainer).render(
      <RecommendOverlay
        setPlanData={() => handleSetPlanData(data, place)}
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

  const formatDuration = (seconds: number | undefined) => {
    if (!seconds) {
      return '시간 측정 불가';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };
  const content = `<div class ="label"><span class="left"></span><span class="center">${formatDuration(
    data?.routes[0].summary.duration
  )}</span><span class="right"></span></div>`;

  const resetMap = () => {
    if (mapRef.current) {
      // 모든 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // 폴리라인 제거
      if (polylinesRef.current) {
        polylinesRef.current.setMap(null);
        polylinesRef.current = null;
      }

      // 커스텀 오버레이 제거
      if (customOverlayRef.current) {
        customOverlayRef.current.setMap(null);
        customOverlayRef.current = null;
      }
    }
  };
  useEffect(() => {
    if (!mapRef.current || isLoading || isError || !details.length) {
      resetMap(); // 초기화 함수 호출
      return;
    }

    const map = mapRef.current;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    if (polylinesRef.current) {
      polylinesRef.current.setMap(null);
      polylinesRef.current = null;
    }
    const bounds = new kakao.maps.LatLngBounds();

    const addMarker = (lat: number, lng: number, title: string) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        title: title,
        clickable: true,
      });
      marker.setMap(map);
      markersRef.current.push(marker);
      bounds.extend(marker.getPosition());
      kakao.maps.event.addListener(marker, 'click', () => {
        // 기존 창 닫기
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        // 새 창 생성
        const iwContent = `<div style="padding:8px 12px;font-size:14px;">${title}</div>`;
        const infoWindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: true,
        });

        infoWindow.open(map, marker);
        infoWindowRef.current = infoWindow;
      });
    };

    const addRecommendMarker = (place: toolOutputData) => {
      const { latitude, longitude, place: placeName } = place.output.planData;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(Number(latitude), Number(longitude)),
        title: placeName,
        clickable: true,
        image: new kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          new kakao.maps.Size(24, 35),
          { offset: new kakao.maps.Point(12, 35) }
        ),
      });

      marker.setMap(mapRef.current);
      markersRef.current.push(marker);
      recommendMarkersRef.current[place.tool_call_id] = marker;

      kakao.maps.event.addListener(marker, 'click', async () => {
        if (infoWindowRef.current) infoWindowRef.current.close();
        if (customOverlayRef.current) customOverlayRef.current.setMap(null);

        const position = new kakao.maps.LatLng(
          Number(latitude),
          Number(longitude)
        );
        const overlay = await renderRecommendOverlay(place, position, () => {
          customOverlayRef.current?.setMap(null);
        });

        customOverlayRef.current = overlay;
      });
    };

    const position = new kakao.maps.LatLng(
      details[details.length - 1].latitude,
      details[details.length - 1].longitude
    );

    details.forEach((detail) => {
      addMarker(detail.latitude, detail.longitude, detail.place);
    });
    recommendPlan?.forEach((place) => {
      addRecommendMarker(place);
    });

    map.setBounds(bounds, 100, 100, 100, 100);

    if (!customOverlayRef.current) {
      customOverlayRef.current = new kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 1.2,
        xAnchor: 0.5,
      });
      customOverlayRef.current.setMap(mapRef.current);
    } else {
      customOverlayRef.current.setPosition(position);
      customOverlayRef.current.setContent(content);
    }
    // 경로 그리기 함수
    const drawRoute = async () => {
      if (data?.routes && data.routes[0]) {
        const path = data.routes[0].sections.flatMap((section) =>
          section.roads.flatMap((road) =>
            road.vertexes.reduce(
              (acc: kakao.maps.LatLng[], _, index: number, array: number[]) => {
                if (index % 2 === 0) {
                  acc.push(
                    new kakao.maps.LatLng(array[index + 1], array[index])
                  );
                }
                return acc;
              },
              []
            )
          )
        );

        const polyline = new kakao.maps.Polyline({
          path: path,
          strokeWeight: 10,
          strokeColor: '#1653CC',
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
        });

        polyline.setMap(map);
        polylinesRef.current = polyline;
      }
    };

    drawRoute();
  }, [details, data, content, isLoading, isError, recommendPlan]);

  return (
    <div
      id="map"
      className={`z-30 ${
        mode === 'full' ? 'w-full h-screen' : 'w-full h-[50rem]'
      } transition-all`}
    >
      <div
        id="roadviewControl"
        title="전체화면 전환"
        className={`${
          mode === 'full' ? 'w-[48px] h-[48px]' : 'w-[32px] h-[32px]'
        } rounded-[0.8rem] p-[4px] bg-opacity-60 bg-white`}
        onClick={toggleMode}
      >
        <Image
          src={fullscreen}
          width={mode === 'full' ? 36 : 24}
          height={mode === 'full' ? 36 : 24}
          alt="asd"
          className={`object-contain`}
        />
      </div>
    </div>
  );
};

export default KakaoMap;
