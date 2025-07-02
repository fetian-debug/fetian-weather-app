/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  // Build optimizations compatible with Next.js 12
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

module.exports = nextConfig;
