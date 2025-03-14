import weather1 from '@/assets/icon/weather/ic_weather-1.svg';
import weather2 from '@/assets/icon/weather/ic_weather-2.svg';
import weather3 from '@/assets/icon/weather/ic_weather-3.svg';
import weather4 from '@/assets/icon/weather/ic_weather-4.svg';
import weather5 from '@/assets/icon/weather/ic_weather-5.svg';
import weather6 from '@/assets/icon/weather/ic_weather-6.svg';
import weather7 from '@/assets/icon/weather/ic_weather-7.svg';
import weather8 from '@/assets/icon/weather/ic_weather-8.svg';
import weather9 from '@/assets/icon/weather/ic_weather-9.svg';
import weather10 from '@/assets/icon/weather/ic_weather-10.svg';
import weather11 from '@/assets/icon/weather/ic_weather-11.svg';
import weather12 from '@/assets/icon/weather/ic_weather-12.svg';
import weather13 from '@/assets/icon/weather/ic_weather-13.svg';
import weather14 from '@/assets/icon/weather/ic_weather-14.svg';

const switchDailyWeather = (weatherCode: number | null): string => {
  let returnIcon = '';

  switch (weatherCode) {
    case 0:
      returnIcon = weather1;
      break;
    case 1:
      returnIcon = weather2;
      break;
    case 2:
      returnIcon = weather3;
      break;
    case 3:
    case 45:
    case 48:
      returnIcon = weather4;
      break;
    case 51:
      returnIcon = weather6;
      break;
    case 53:
      returnIcon = weather7;
      break;
    case 55:
      returnIcon = weather8;
      break;
    case 56:
      returnIcon = weather9;
      break;
    case 57:
      returnIcon = weather10;
      break;
    case 61:
    case 63:
    case 80:
    case 81:
      returnIcon = weather11;
      break;
    case 65:
    case 82:
      returnIcon = weather12;
      break;
    case 66:
    case 71:
    case 73:
    case 85:
    case 86:
      returnIcon = weather13;
      break;
    case 67:
    case 75:
    case 77:
      returnIcon = weather14;
      break;
    case 95:
    case 96:
    case 99:
      returnIcon = weather5;
      break;
    default:
      returnIcon = weather1;
  }

  return returnIcon;
};

export default switchDailyWeather;
