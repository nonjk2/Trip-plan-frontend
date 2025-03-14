'use client';
import ProfileImage from './ProfileImage';
import { MouseEventHandler, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useOutsideClick from '@/lib/hooks/useOutsideClick';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProfileProps {
  src: string;
  nickname: string;
}

const HeaderProfile = ({ src, nickname }: HeaderProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const ref = useRef(null);
  const queryClient = useQueryClient();

  useOutsideClick(ref, () => setIsOpen(false));
  const logOut = async () => {
    try {
      const res = await fetch('/api/token', {
        method: 'DELETE',
      });
      if (!res.ok) {
        return { status: 401 };
      }
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      router.refresh();
    } catch {
      return;
    }
    router.push('/');
  };

  const goToMypage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    router.push('/my/my-post/plans');
  };
  return (
    <div
      className="flex items-center gap-[1.2rem] relative cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <ProfileImage imageUrl={src} size="m" />
      <span className="text-[2rem] font-normal text-white">{nickname}</span>
      {isOpen && (
        <div
          className="absolute flex flex-col left-0 bottom-0 top-full w-[20rem] h-[10.8rem] min-h-[10.8rem] mt-2 bg-white border rounded-lg shadow-lg z-50"
          ref={ref}
        >
          <button
            onClick={goToMypage}
            className="block w-full px-[1.6rem] py-[1.6rem] text-left hover:bg-gray-100 text-[1.6rem] leading-[2rem]"
          >
            마이페이지
          </button>
          <button
            onClick={() => logOut()}
            className="block w-full px-[1.6rem] py-[1.6rem] text-left text-red-500 hover:bg-gray-100 text-[1.6rem] leading-[2rem]"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderProfile;
