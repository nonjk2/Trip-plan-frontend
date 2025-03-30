import React, { memo, useRef, useState } from 'react';
import useOutsideClick from '@/lib/hooks/useOutsideClick';
import Chip from '@/components/common/Chip';

type DropdownProps = {
  onSelect?: (item: number) => void;
  title: string;
  Icon?: React.JSX.Element;
  list: string[];
};

const ChatInputDropdown = memo(
  ({ list, title, onSelect, Icon }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useOutsideClick(ref, () => setIsOpen(false));

    const toggleDropdown = () => setIsOpen((prev) => !prev); // 토글 기능
    const handleSelect = (item: number) => {
      if (onSelect) onSelect(item);
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        className="relative w-full overflow-visible pt-[1.2rem]"
        role="menu"
        aria-hidden={!isOpen}
        aria-label="Dropdown"
      >
        <Chip
          state={isOpen}
          Icon={Icon}
          onClick={toggleDropdown}
          dropdown
          type="button"
          admin
          className={`${'border border-var-primary-500 rounded-b-none'} w-full border-none h-[4.4rem] admin-dropdown-text rounded-[1.2rem]`}
          aria-label="Close dropdown"
        >
          {title}
        </Chip>

        <div className="relative">
          {isOpen && (
            <ul className="shadow-lg z-50 overflow-visible max-h-[26.4rem] mb-[2.8rem]">
              {list.map((e, i) => (
                <li
                  key={e}
                  onClick={() => handleSelect(i + 1)}
                  className="ai-addtext-selecter hover:bg-var-primary-50 text-[1.4rem] h-[4.1rem] pb-[1.2rem] pt-[0.8rem] pr-[1.6rem] pl-[2rem]"
                >
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

ChatInputDropdown.displayName = 'chat-input-dropdown';
export default ChatInputDropdown;
