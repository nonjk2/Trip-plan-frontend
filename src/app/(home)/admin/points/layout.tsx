import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative h-screen w-full p-[4rem]">
      <div className="flex flex-col w-full py-[2rem] gap-[2rem]">
        <div className="flex flex-col gap-[1.2rem]">
          <strong className="admin-title">포인트 지급 로그 관리</strong>
          <p className="admin-subtitle opacity-50">
            지급된 포인트의 로그 정보를 확인할 수 있습니다.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Layout;
