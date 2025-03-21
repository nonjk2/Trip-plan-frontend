'use client';
import LoginComponent from '@/components/auth/login/LoginComponent';
import dynamic from 'next/dynamic';
import React from 'react';

const StaticModalCompo = dynamic(
  () => import('@/components/common/StaticModal'),
  { ssr: false }
);

const Page = () => {
  return (
    <StaticModalCompo>
      <LoginComponent />
    </StaticModalCompo>
  );
};

export default Page;
