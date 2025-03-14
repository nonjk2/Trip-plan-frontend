import DefaultProfile from '@/assets/img/default-profile.svg';
import IconCalendar from '@/assets/icon/ic_calendar.svg';
import IconCategoryBuilding from '@/assets/icon/ic_category-building.svg';
import IconCategoryMap from '@/assets/icon/ic_category-map.svg';
import IconCategoryRestaurant from '@/assets/icon/ic_category-restaurant.svg';
import IconCategoryTraffic from '@/assets/icon/ic_category-traffic.svg';
import IconCopy from '@/assets/icon/ic_copy.svg';
import IconDownArrow from '@/assets/icon/ic_down-arrow.svg';
import IconDownTriangle from '@/assets/icon/ic_down-triangle.svg';
import IconLeftArrow from '@/assets/icon/ic_left-arrow.svg';
import IconLike from '@/assets/icon/ic_like.svg';
import IconLogoWhite from '@/assets/icon/ic_logo-white.svg';
import IconPeople from '@/assets/icon/ic_people.svg';
import IconRightArrow from '@/assets/icon/ic_right-arrow.svg';
import IconSearch from '@/assets/icon/ic_search.svg';
import IconShare from '@/assets/icon/ic_share.svg';
import IconSiren from '@/assets/icon/ic_siren.svg';
import IconUpArrow from '@/assets/icon/ic_up-arrow.svg';
import IconUptriangle from '@/assets/icon/ic_up-triangle.svg';
import IconPlus from '@/assets/icon/ic_plus.svg';
import IconEdit from '@/assets/icon/ic_edit.svg';
import IconDelete from '@/assets/icon/ic_delete.svg';
import IconEye from '@/assets/icon/ic_eye.svg';
import IconLock from '@/assets/icon/ic_lock.svg';
import IconStarOn from '@/assets/icon/ic_star-on.svg';
import IconStarOff from '@/assets/icon/ic_star-off.svg';
import IconLocation from '@/assets/icon/ic_location.svg';
import IconClock from '@/assets/icon/ic_clock.svg';
import IconPhone from '@/assets/icon/ic_phone.svg';
// import IconClose from '@/assets/icon/close.svg';

type ImageType = {
  src: string;
  alt: string;
};

type Icons =
  | 'iconCalendar'
  | 'iconCategoryBuilding'
  | 'iconCategoryMap'
  | 'iconCategoryRestaurant'
  | 'iconCategoryTraffic'
  | 'iconCopy'
  | 'iconDownArrow'
  | 'iconDownTriangle'
  | 'iconLeftArrow'
  | 'iconLike'
  | 'iconLogoWhite'
  | 'iconPeople'
  | 'iconRightArrow'
  | 'iconSearch'
  | 'iconShare'
  | 'iconSiren'
  | 'iconUpArrow'
  | 'iconUptriangle'
  | 'iconPlus'
  | 'iconEdit'
  | 'iconDelete'
  | 'iconEye'
  | 'iconLock'
  | 'iconStarOn'
  | 'iconStarOff'
  | 'iconLocation'
  | 'iconClock'
  | 'iconPhone';
// | 'iconClose';

type Images = 'defaultProfile';
type ExportAssetsType<T extends string> = {
  [key in T]: ImageType;
};

export const IMAGES: ExportAssetsType<Images> = {
  defaultProfile: {
    src: DefaultProfile,
    alt: '프로필',
  },
};

export const ICONS: ExportAssetsType<Icons> = {
  // iconClose: {
  //   src: IconClose,
  //   alt: '닫기',
  // },
  iconCalendar: {
    src: IconCalendar,
    alt: '달력 아이콘',
  },
  iconCategoryBuilding: {
    src: IconCategoryBuilding,
    alt: '숙소 카테고리',
  },
  iconCategoryMap: {
    src: IconCategoryMap,
    alt: '관광지 카테고리',
  },
  iconCategoryRestaurant: {
    src: IconCategoryRestaurant,
    alt: '식당 카테고리',
  },
  iconCategoryTraffic: {
    src: IconCategoryTraffic,
    alt: '교통 카테고리',
  },
  iconCopy: {
    src: IconCopy,
    alt: '복사 아이콘',
  },
  iconDownArrow: {
    src: IconDownArrow,
    alt: '아랫방향 아이콘',
  },
  iconDownTriangle: {
    src: IconDownTriangle,
    alt: '아랫방향 아이콘',
  },
  iconLeftArrow: {
    src: IconLeftArrow,
    alt: '왼방향 아이콘',
  },
  iconLike: {
    src: IconLike,
    alt: '좋아요 아이콘',
  },
  iconLogoWhite: {
    src: IconLogoWhite,
    alt: '로고',
  },
  iconPeople: {
    src: IconPeople,
    alt: '사람 아이콘',
  },
  iconRightArrow: {
    src: IconRightArrow,
    alt: '오른방향 아이콘',
  },
  iconSearch: {
    src: IconSearch,
    alt: '검색 아이콘',
  },
  iconShare: {
    src: IconShare,
    alt: '공유 아이콘',
  },
  iconSiren: {
    src: IconSiren,
    alt: '사이렌 아이콘',
  },
  iconUpArrow: {
    src: IconUpArrow,
    alt: '윗방향 아이콘',
  },
  iconUptriangle: {
    src: IconUptriangle,
    alt: '윗방향 아이콘',
  },
  iconPlus: {
    src: IconPlus,
    alt: '추가 아이콘',
  },
  iconEdit: {
    src: IconEdit,
    alt: '수정 아이콘',
  },
  iconDelete: {
    src: IconDelete,
    alt: '삭제 아이콘',
  },
  iconEye: {
    src: IconEye,
    alt: '조회수 아이콘',
  },
  iconLock: {
    src: IconLock,
    alt: '잠금 아이콘',
  },
  iconStarOn: {
    src: IconStarOn,
    alt: '별점',
  },
  iconStarOff: {
    src: IconStarOff,
    alt: '별점',
  },
  iconLocation: {
    src: IconLocation,
    alt: '위치',
  },
  iconClock: {
    src: IconClock,
    alt: '시간',
  },
  iconPhone: {
    src: IconPhone,
    alt: '전화번호',
  },
};
