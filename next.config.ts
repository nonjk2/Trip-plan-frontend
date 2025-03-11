import type { NextConfig } from 'next';

const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP || '';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tripplan-image.s3.ap-northeast-2.amazonaws.com',
        port: '',
        search: '',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${SERVER_IP}/:path*`,
      },
      {
        source: '/admin/proxy/:path*',
        destination: `${SERVER_IP}/:path*`,
      },
    ];
  },
};
{
}

export default nextConfig;
