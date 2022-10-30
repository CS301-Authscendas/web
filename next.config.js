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
    NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    NEXT_PUBLIC_LAMBDA_FUNCTION_URL: process.env.NEXT_PUBLIC_LAMBDA_FUNCTION_URL
  }
};

module.exports = nextConfig;
