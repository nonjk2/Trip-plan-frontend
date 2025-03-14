import Icons from '@/components/common/Icons';
import React from 'react';

type TItems = { parent: string; child: string };

type FilterSearchItemsProps = {
  items: TItems;
  handleSelect: (items: TItems) => void;
};

const FilterSearchItems = ({ items, handleSelect }: FilterSearchItemsProps) => {
  return (
    <li
      onClick={() => handleSelect(items)}
      className="hover:bg-var-primary-50 flex justify-between text-[2rem] leading-[2.6rem] py-[2.1rem] pl-[2.4rem] pr-[1.6rem]"
    >
      <span className="text-inherit">
        {items.parent} &gt; {items.child}
      </span>
      <Icons.Search />
    </li>
  );
};

export default FilterSearchItems;
