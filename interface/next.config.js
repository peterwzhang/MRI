/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://localhost:8443/',
        permanent: false,
        basePath: false
      },
    ]
  },
};

module.exports = nextConfig;