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
};

module.exports = nextConfig;