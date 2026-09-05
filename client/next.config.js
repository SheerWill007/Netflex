/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') +
          '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
