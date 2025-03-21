'use client';

import { useDirections } from '@/lib/hooks/queries/useDirectionQuery';
import { TPlanScheduleItem } from '@/types/responseData/detailedPlan';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

const DetailedViewKakaoMap = ({
  detail: details,
  day,
}: {
  detail: TPlanScheduleItem[] | [];
  day: number;
}) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker[]>([]);
  const polylinesRef = useRef<kakao.maps.Polyline | null>(null);

  const { data, isLoading, isError } = useQuery(useDirections(details, day));

  const initializeMap = useCallback(() => {
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
      };

      if (container) {
        mapRef.current = new kakao.maps.Map(container, options);
      }
    }

    const map = mapRef.current;
    if (map) {
      markerRef.current.forEach((marker) => marker.setMap(null));
      markerRef.current = [];

      const bounds = new kakao.maps.LatLngBounds();

      details.forEach((detail) => {
        const markerPosition = new kakao.maps.LatLng(
          detail.latitude,
          detail.longitude
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          title: detail.placeName,
        });

        marker.setMap(map);
        markerRef.current.push(marker);
        bounds.extend(markerPosition);
      });

      map.setBounds(bounds);
    }
  }, [details]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      if (!window.kakao.maps.Map) {
        kakao.maps.load(initializeMap);
      } else {
        initializeMap();
      }
    }

    if (isLoading || isError || !mapRef.current || !data?.routes?.[0]) return;

    if (polylinesRef.current) {
      polylinesRef.current.setMap(null);
    }

    const path = data.routes[0].sections.flatMap((section) =>
      section.roads.flatMap((road) =>
        road.vertexes.reduce(
          (acc: kakao.maps.LatLng[], _, index: number, array: number[]) => {
            if (index % 2 === 0) {
              acc.push(new kakao.maps.LatLng(array[index + 1], array[index]));
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

    polyline.setMap(mapRef.current);
    polylinesRef.current = polyline;
  }, [initializeMap, details, data, isLoading, isError]);

  return <div id="map" className="w-full h-[50rem] z-30"></div>;
};

export default DetailedViewKakaoMap;
