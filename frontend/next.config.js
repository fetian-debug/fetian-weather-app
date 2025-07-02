/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  },
  images: {
    domains: ["openweathermap.org"],
  },
  // Vercel deployment optimizations
  experimental: {
    serverComponentsExternalPackages: ["axios"],
  },
  // Build optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  // Ensure compatibility with Vercel
  trailingSlash: false,
  output: "standalone",
};

module.exports = nextConfig;
