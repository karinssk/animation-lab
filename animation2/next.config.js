/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => null,
  turbopack: {
    root: ".",
  },
};

module.exports = nextConfig;
