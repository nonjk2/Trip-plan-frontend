'use client';

import { NAV_OPTIONS } from '@/constants/sideNavigation';
import useLastPathSegment from '@/lib/hooks/useLastPathSegment';
import Link from 'next/link';

const NavigationBar = () => {
  const navigationItems = NAV_OPTIONS.flatMap(
    (option) => option.listItems
  ).sort((a, b) => (a.order || 0) - (b.order || 0));
  const { lastPathSegment } = useLastPathSegment();

  return (
    <div className="flex text-[1.2rem] text-center font-medium leading-[1.4rem]">
      {navigationItems.map((item) => {
        return item.urlPath === 'storage' ? (
          // <span
          //   key={item.urlPath}
          //   className="flex-1 py-[1.2rem] border-b-[0.2rem] text-black/30 border-black/30 cursor-not-allowed"
          // >
          //   {item.title}
          // </span>
          <Link
            key={item.urlPath}
            href={item.urlPath}
            className={`flex-1 py-[1.2rem] border-b-[0.2rem] ${
              lastPathSegment === item.urlPath
                ? 'text-black border-black'
                : 'text-black/30 border-black/30'
            } `}
          >
            {item.title}
          </Link>
        ) : (
          <Link
            key={item.urlPath}
            href={item.urlPath}
            className={`flex-1 py-[1.2rem] border-b-[0.2rem] ${
              lastPathSegment === item.urlPath
                ? 'text-black border-black'
                : 'text-black/30 border-black/30'
            } `}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;
