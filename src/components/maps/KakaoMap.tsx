'use client';

import { useDirections } from '@/lib/hooks/queries/useDirectionQuery';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import fullscreen from '@/assets/img/fullscreen.png';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import { renderRecommendOverlay } from './renderRecommendOverlay';
import { useKakaoMap } from './useCustomMap';

const KakaoMap = ({
  detail: details,
  day,
}: {
  detail: PlanDetailType[] | [];
  day: number;
}) => {
  const {
    addCustomOverlay,
    addMarker,
    addRecommendMarker,
    customOverlayRef,
    drawPolyline,
    initializeMap,
    mapRef,
    markersRef,
    recommendMarkersRef,
    removeRecommendMarker,
    resetMap,
  } = useKakaoMap();

  const polylinesRef = useRef<kakao.maps.Polyline | null>(null);

  const { data, isLoading, isError } = useQuery(useDirections(details, day));
  const { mode, toggleMode, recommendPlan, setPlanData, planData } =
    usePlanContext();
  const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => initializeMap(details));
    }
  }, [details]);

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

    // const addMarker = (lat: number, lng: number, title: string) => {
    //   const marker = new kakao.maps.Marker({
    //     position: new kakao.maps.LatLng(lat, lng),
    //     title: title,
    //     clickable: true,
    //   });
    //   marker.setMap(map);
    //   markersRef.current.push(marker);
    //   bounds.extend(marker.getPosition());
    //   kakao.maps.event.addListener(marker, 'click', () => {
    //     // 기존 창 닫기
    //     if (infoWindowRef.current) {
    //       infoWindowRef.current.close();
    //     }

    //     // 새 창 생성
    //     const iwContent = `<div style="padding:8px 12px;font-size:14px;">${title}</div>`;
    //     const infoWindow = new kakao.maps.InfoWindow({
    //       content: iwContent,
    //       removable: true,
    //     });

    //     infoWindow.open(map, marker);
    //     infoWindowRef.current = infoWindow;
    //   });
    // };

    details.forEach((detail) => {
      const marker = addMarker(detail.latitude, detail.longitude, detail.place);
      bounds.extend(marker.getPosition());

      kakao.maps.event.addListener(marker, 'click', () => {
        if (infoWindowRef.current) infoWindowRef.current.close();

        const iwContent = `<div style="padding:8px 12px;font-size:14px;">${detail.place}</div>`;
        const infoWindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: true,
        });

        infoWindow.open(map, marker);
        infoWindowRef.current = infoWindow;
      });
    });

    recommendPlan?.forEach((place) => {
      const marker = addRecommendMarker(place);

      kakao.maps.event.addListener(marker, 'click', async () => {
        if (infoWindowRef.current) infoWindowRef.current.close();
        if (customOverlayRef.current) customOverlayRef.current.setMap(null);

        const position = marker.getPosition();

        const overlay = await renderRecommendOverlay({
          queryClient,
          place,
          position,
          day,
          planData,
          setPlanData,
          recommendMarkersRef,
          customOverlayRef,
          mapRef,
          onClose: () => removeRecommendMarker(place.tool_call_id),
        });

        customOverlayRef.current = overlay;
      });
    });

    map.setBounds(bounds, 100, 100, 100, 100);
    const lastPos = new kakao.maps.LatLng(
      details[details.length - 1].latitude,
      details[details.length - 1].longitude
    );

    const durationLabel = `<div class="label"><span class="left"></span><span class="center">${formatDuration(
      data?.routes[0].summary.duration
    )}</span><span class="right"></span></div>`;

    addCustomOverlay(durationLabel, lastPos);

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
        drawPolyline(path);
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
