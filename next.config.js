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
  },
  env: {
    GATEWAY_URL: process.env.GATEWAY_URL,
    LAMBDA_FUNCTION_URL: process.env.LAMBDA_FUNCTION_URL
  }
};

module.exports = nextConfig;
