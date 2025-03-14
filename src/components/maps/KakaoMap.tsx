'use client';

import { useDirections } from '@/lib/hooks/queries/useDirectionQuery';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const KakaoMap = ({
  detail: details,
  day,
}: {
  detail: PlanDetailType[] | [];
  day: number;
}) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const polylinesRef = useRef<kakao.maps.Polyline | null>(null);
  const customOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const { data, isLoading, isError } = useQuery(useDirections(details, day));

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
          draggable: false,
          scrollwheel: false,
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
      });
      marker.setMap(map);
      markersRef.current.push(marker);
      bounds.extend(marker.getPosition());
    };

    const position = new kakao.maps.LatLng(
      details[details.length - 1].latitude,
      details[details.length - 1].longitude
    );

    details.forEach((detail) => {
      addMarker(detail.latitude, detail.longitude, detail.place);
    });
    map.setBounds(bounds, 100, 100, 100, 100);

    if (!customOverlayRef.current) {
      customOverlayRef.current = new kakao.maps.CustomOverlay({
        position,
        content,
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
  }, [details, data, content, isLoading, isError]);

  return <div id="map" className="w-full h-[50rem] z-30"></div>;
};

export default KakaoMap;
