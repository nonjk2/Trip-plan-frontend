import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative h-screen w-full p-[4rem]">
      <div className="flex flex-col w-full py-[2rem] gap-[2rem]">
        <div className="flex flex-col gap-[1.2rem]">
          <strong className="admin-title">신고 목록 관리</strong>
          <p className="admin-subtitle opacity-50">
            각 항목별로 신고 목록을 확인하고 관리할 수 있습니다
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Layout;
