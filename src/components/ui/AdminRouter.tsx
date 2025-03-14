'use client';

import { useGetProfile } from '@/lib/hooks/queries/useGetProfile';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminRouter = () => {
  const router = useRouter();
  const { data: users, isError } = useQuery(useGetProfile());

  if (!users?.data || isError || users.data.userRole !== 'ADMIN') {
    return <></>;
  }
  return (
    <>
      <span
        className="text-[2.4rem] text-white font-semibold cursor-pointer"
        onClick={() => router.push('/admin/reports')}
      >
        관리자 페이지
      </span>
    </>
  );
};

export default AdminRouter;
