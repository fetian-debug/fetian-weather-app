/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WEATHER_API_URL: process.env.WEATHER_API_URL || "http://localhost:3000",
  },
  images: {
    domains: ["openweathermap.org"],
  },
};

module.exports = nextConfig;
