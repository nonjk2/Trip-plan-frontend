import AdminLinks from '@/components/admin/AdminLinks';
import LogoWithText from '@/components/ui/LogoWithText';
import Link from 'next/link';
import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen relative w-screen overflow-hidden">
      <section className="h-full min-w-[34rem] bg-var-primary-500">
        <div className="flex flex-col w-full px-[4rem] pt-[4.4rem] gap-[4rem]">
          <Link href={'/'}>
            <LogoWithText />
          </Link>
          <AdminLinks />
        </div>
      </section>
      <section className="flex bg-[#F0F5FF]">{children}</section>
    </div>
  );
};

export default AdminLayout;
