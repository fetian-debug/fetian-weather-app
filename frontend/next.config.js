/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove env section to avoid build errors - use runtime environment variables instead
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
