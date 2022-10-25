/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/login',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
