'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const AdminLinks = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="w-full flex flex-col gap-[4rem]">
      <p className="logo">관리자</p>
      <div className="flex flex-col gap-[0.4rem]">
        <div
          className={`px-[3.2rem] py-[1.2rem] rounded-[1.2rem] ${
            segment === 'reports'
              ? 'bg-white text-var-primary-500'
              : 'text-white'
          }  admin-link-text`}
        >
          <Link href={'/admin/reports'}>신고목록</Link>
        </div>
        <div
          className={`px-[3.2rem] py-[1.2rem] rounded-[1.2rem] ${
            segment === 'points'
              ? 'bg-white text-var-primary-500'
              : 'text-white'
          }  admin-link-text`}
        >
          <Link href={'/admin/points'}>포인트 지급 목록</Link>
        </div>
        <div
          className={`px-[3.2rem] py-[1.2rem] rounded-[1.2rem] ${
            segment === 'users' ? 'bg-white text-var-primary-500' : 'text-white'
          }  admin-link-text`}
        >
          <Link href={'/admin/users'}>회원 목록</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLinks;
