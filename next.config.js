/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['vforvape-s3.s3.eu-north-1.amazonaws.com'],
  },
  env: {
    API_URL: 'https://vforvape-api.vercel.app',
  },
};

module.exports = nextConfig;