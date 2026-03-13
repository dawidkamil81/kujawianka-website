import type { NextConfig } from 'next'
const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    qualities: [75, 85, 95],
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-scripts.com va.vercel-scripts.com;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              img-src 'self' blob: data: cdn.sanity.io;
              font-src 'self' data: fonts.gstatic.com ${isDev ? 'https://fonts.gstatic.com' : ''};
              connect-src 'self' *.sanity.io *.vercel-insights.com *.vitals.vercel-insights.com;
              frame-src 'self' https://www.google.com https://maps.google.com;
              frame-ancestors 'self' https://*.sanity.studio http://localhost:3333 http://localhost:3000 https://mgkskujawianka.pl https://www.mgkskujawianka.pl;
              upgrade-insecure-requests;
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
