import { useRef } from 'react';

export const useKakaoMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const recommendMarkersRef = useRef<Record<string, kakao.maps.Marker>>({});
  const polylinesRef = useRef<kakao.maps.Polyline | null>(null);
  const customOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

  const initializeMap = (details: PlanDetailType[]) => {
    const container = document.getElementById('map');
    if (container && window.kakao?.maps) {
      mapRef.current = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(
          details[0]?.latitude || 37.5665,
          details[0]?.longitude || 126.978
        ),
        level: 7,
        disableDoubleClickZoom: false,
      });
    }
  };

  const resetMap = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (polylinesRef.current) {
      polylinesRef.current.setMap(null);
      polylinesRef.current = null;
    }
    if (customOverlayRef.current) {
      customOverlayRef.current.setMap(null);
      customOverlayRef.current = null;
    }
  };

  const addMarker = (
    lat: number,
    lng: number,
    title: string,
    onClick?: (marker: kakao.maps.Marker) => void
  ): kakao.maps.Marker => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      title,
      clickable: true,
    });
    marker.setMap(mapRef.current);
    markersRef.current.push(marker);

    if (onClick)
      kakao.maps.event.addListener(marker, 'click', () => onClick(marker));
    return marker;
  };

  const addRecommendMarker = (
    place: toolOutputData,
    onClick?: (marker: kakao.maps.Marker) => void
  ): kakao.maps.Marker => {
    const { latitude, longitude, place: placeName } = place.output.planData;
    const { tool_call_id } = place;
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
    recommendMarkersRef.current[tool_call_id] = marker;
    if (onClick)
      kakao.maps.event.addListener(marker, 'click', () => onClick(marker));
    return marker;
  };

  const removeRecommendMarker = (tool_call_id: string) => {
    const marker = recommendMarkersRef.current[tool_call_id];
    if (marker) {
      marker.setMap(null);
      delete recommendMarkersRef.current[tool_call_id];
    }
  };

  const drawPolyline = (path: kakao.maps.LatLng[]) => {
    if (polylinesRef.current) polylinesRef.current.setMap(null);

    const polyline = new kakao.maps.Polyline({
      path,
      strokeWeight: 10,
      strokeColor: '#1653CC',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });

    polyline.setMap(mapRef.current);
    polylinesRef.current = polyline;
  };

  const addCustomOverlay = (
    overlayElement: HTMLElement | string,
    position: kakao.maps.LatLng
  ) => {
    if (customOverlayRef.current) customOverlayRef.current.setMap(null);

    const overlay = new kakao.maps.CustomOverlay({
      content: overlayElement,
      position,
      yAnchor: 1.2,
      xAnchor: 0.5,
    });

    overlay.setMap(mapRef.current);
    customOverlayRef.current = overlay;
  };

  return {
    mapRef,
    markersRef,
    recommendMarkersRef,
    customOverlayRef,
    initializeMap,
    resetMap,
    addMarker,
    addRecommendMarker,
    removeRecommendMarker,
    drawPolyline,
    addCustomOverlay,
  };
};
