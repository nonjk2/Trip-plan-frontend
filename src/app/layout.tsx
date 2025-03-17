import type { Metadata } from 'next';
import './globals.css';

import RootProviders from '@/providers/RootProviders';
import Script from 'next/script';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // userScalable: false,
};

export const metadata: Metadata = {
  title: '마이트립플래너 - 쉽고 빠른 여행 일정 계획',
  description:
    '여행 일정 계획을 쉽고 빠르게! 마이트립플래너에서 맞춤형 여행 플랜을 만들어보세요.',
  keywords: '여행, 일정, 플래너, 여행 계획, 트립 플랜, 여행 코스',
  authors: [
    { name: '최은석', url: new URL('https://github.com/nonjk2') },
    { name: '김은재', url: new URL('https://github.com/rladmswo1715') },
    { name: '강지석', url: new URL('https://github.com/KangJiSseok') },
    { name: '김도욱', url: new URL('https://github.com/kdw0737') },
  ],
  generator: 'Next.js',
  applicationName: '마이트립플래너',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    title: '마이트립플래너 - 쉽고 빠른 여행 일정 계획',
    description:
      '여행 일정 계획을 쉽고 빠르게! 마이트립플래너에서 맞춤형 여행 플랜을 만들어보세요.',
    url: 'https://trip-plan-frontend.vercel.app/',
    siteName: '마이트립플래너',
    images: [
      {
        url: 'https://s3-alpha-sig.figma.com/img/eb1f/33e5/d3ff9b7ecdbada2e1ed7e54c9563cfb8?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JGQjI5yMsbImD8Ouql-kjyRGdLlwE5ejzxl-i7w1DnqHhrgN0zFSdNyhhhwJbggEda9OUiGGLS8nF0t4oiU5cqfpG9CNZ0SyM9-vAnTm2Ke7EeyD4In~nL5sNE~1Ojc0ak2K2gdZHbBbGNJyjHP9xos7XJDF-hdbmpV9rbeG~Dx1HxI8kqonvbUvBBjhFS5RNsI7oLAkTYyxm0XeJ4oLQeYLuto7waDRm7PX6~OaiX8n5p2a63C9phtpgl~rrZvIkmPADGsXRHi5NNiExLebv8GWluvfBrNvk14psXuTxcEFCcr7QOPAAc6aToN5tI5uy~AGw5PyOSNvrEdb2UmMUg__',
        width: 1200,
        height: 630,
        alt: '마이트립플래너 - 여행 일정 플래너',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={''}>
        <RootProviders>
          {children}
          {modal}
          <div id="modal-portal" />
        </RootProviders>

        <Script
          defer
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
