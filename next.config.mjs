/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/hfg-gmuend/openmoji/**',
      },
    ],
  },
};

export default nextConfig;
