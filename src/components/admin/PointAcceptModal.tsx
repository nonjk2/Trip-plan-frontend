'use client';

import useOutsideClick from '@/lib/hooks/useOutsideClick';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
}

const Modal = ({ children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  useOutsideClick(ref, () => {
    onClose();
  });

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden'; // 뒷페이지 스크롤 락
    scrollY.current = window.scrollY;

    const previouslyFocusedElement = document.activeElement as HTMLElement;
    ref.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow; // 스크롤 원상복구
      window.scrollTo(0, scrollY.current);
      previouslyFocusedElement?.focus();
    };
  }, []);

  const modalContent = (
    <section className="modal-background">
      <div
        className={
          'relative w-[59.6rem] h-[35rem] bg-white p-[2.8rem] rounded-[1.8rem] '
        }
        // style={{ height: '720px' }}
        ref={ref}
        tabIndex={-1}
      >
        {children}
      </div>
    </section>
  );
  const portalRoot = document.getElementById('modal-portal');
  return portalRoot ? createPortal(modalContent, portalRoot) : null;
  // return (
  //   <section className="modal-background">
  //     <div className="modal" ref={ref} tabIndex={-1}>
  //       {children}
  //     </div>
  //   </section>
  // );
};

export default Modal;
