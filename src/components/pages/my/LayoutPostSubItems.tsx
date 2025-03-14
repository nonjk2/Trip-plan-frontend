'use client';

import { NAV_OPTIONS } from '@/constants/sideNavigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const LayoutPostSubItems = ({ type }: { type: 'myPost' | 'dibs' }) => {
  const pathname = usePathname();
  const filterText = type === 'myPost' ? '내 게시물' : '찜한 게시물';
  const optionItem = NAV_OPTIONS.flatMap((category) => category.listItems).find(
    (item) => item.title === filterText
  );

  const subItems = optionItem?.subItems || [];

  return (
    <div className="ml-4 flex gap-[2rem]">
      {subItems.map((subItem) => {
        const isActive = pathname.includes(subItem.urlPath);
        return (
          <Link
            key={subItem.urlPath}
            href={`/my/${subItem.urlPath}`}
            className={`text-[2rem] font-semibold leading-[3rem] ${
              isActive ? 'text-black' : 'text-black/30'
            }`}
          >
            {subItem.title}
          </Link>
        );
      })}
    </div>
  );
};

export default LayoutPostSubItems;
