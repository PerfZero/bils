/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporary: allow production build even if TS errors exist
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
