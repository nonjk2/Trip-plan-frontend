'use client';
import Header from '@/components/ui/Header';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.includes('admin');
  return (
    <>
      {!admin && <Header />}
      {children}
    </>
  );
}
