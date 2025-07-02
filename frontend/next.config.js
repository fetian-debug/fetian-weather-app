/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  },
  images: {
    domains: ["openweathermap.org"],
  },
  // Optimize for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ["axios"],
  },
  // Ensure API routes work properly
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
