/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Ensure packages with only "default" export conditions (like Swiper) resolve.
    if (!config.resolve.conditionNames?.includes("default")) {
      config.resolve.conditionNames = [
        ...(config.resolve.conditionNames || []),
        "default",
      ];
    }
    return config;
  },
};

module.exports = nextConfig;
