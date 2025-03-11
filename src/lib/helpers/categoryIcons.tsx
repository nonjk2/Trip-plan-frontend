import { Icons } from '@/components/common/Icons';

export const switchCategoryIcon = (category: string) => {
  switch (category) {
    case 'parking':
    case 'gas_station':
    case 'subway_station':
    case 'bus_station':
    case 'train_station':
    case 'airport':
      return <Icons.Traffic className="z-10" />;

    case 'restaurant':
    case 'cafe':
    case 'bar':
    case 'bakery':
    case 'food':
      return <Icons.Restaurant className="z-100" />;

    case 'shopping_mall':
    case 'supermarket':
    case 'convenience_store':
    case 'clothing_store':
    case 'electronics_store':
    case 'book_store':
    case 'furniture_store':
    case 'bank':
    case 'real_estate_agency':
    case 'hospital':
    case 'pharmacy':
    case 'lodging':
    case 'store':
    case 'establishment':
      return <Icons.Building className="z-10" />;

    case 'tourist_attraction':
    case 'museum':
    case 'art_gallery':
    case 'stadium':
    case 'amusement_park':
    case 'zoo':
    case 'aquarium':
    case 'library':
    case 'city_hall':
    case 'embassy':
    case 'local_government_office':
      return <Icons.Map className="z-10" />;

    case 'school':
    case 'university':
      return <Icons.Building className="z-10" />;

    case 'gym':
    case 'spa':
    case 'beauty_salon':
    case 'hair_care':
    case 'night_club':
    case 'casino':
      return <Icons.Restaurant className="z-100" />;

    case 'church':
    case 'mosque':
    case 'hindu_temple':
    case 'synagogue':
      return <Icons.Map className="z-10" />;

    case 'police':
    case 'fire_station':
    case 'post_office':
    case 'courthouse':
      return <Icons.Map className="z-10" />;

    default:
      return <Icons.Defalut size={40} className="z-10" />;
  }
};
