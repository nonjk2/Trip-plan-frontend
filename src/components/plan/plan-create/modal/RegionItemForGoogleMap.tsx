import { switchCategoryIcon } from '@/lib/helpers/categoryIcons';
import React from 'react';

type SearchItemProps = {
  items: GooglePlaceAPIType;
  handleSelect: (items: GooglePlaceAPIType) => void;
};

const SearchKeyWordItems = ({ items, handleSelect }: SearchItemProps) => {
  return (
    <li
      onClick={() => handleSelect(items)}
      className="hover:bg-var-primary-50 truncate flex gap-[1.2rem] items-center text-[2rem] leading-[2.6rem] py-[2.1rem] pl-[2.4rem] pr-[0.4rem]"
    >
      <div className="flex w-[4rem] h-[4rem] justify-center">
        {switchCategoryIcon(items.types[0])}
      </div>
      <div className="text-inherit truncate max-w-[25rem]">
        {items.structured_formatting.main_text}
      </div>
      <div className="flex items-center truncate">
        <span className="text-[1.6rem] leading-[2.08rem] opacity-50 truncate">
          {items.korean_description}
        </span>
      </div>
    </li>
  );
};

export default SearchKeyWordItems;
