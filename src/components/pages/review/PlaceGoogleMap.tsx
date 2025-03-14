import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '240px',
  borderRadius: '8px',
};

type PlaceGoogleMapProps = {
  lat: number;
  lng: number;
};

const PlaceGoogleMap = ({ lat, lng }: PlaceGoogleMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div />;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default PlaceGoogleMap;
