import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'yourshop';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: isProd ? `/${repoName}` : '',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
  compress: true,
};

export default nextConfig;
