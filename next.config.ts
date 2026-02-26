import type { NextConfig } from 'next'

// Zmienne środowiskowe pobierane na etapie budowania
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const nextConfig: NextConfig = {
  // 1. Zabezpieczenie przed drenażem budżetu (Vercel Billing Attack)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**', // Uproszczona ścieżka akceptująca wszystkie projekty
      },
    ],
  },

  // 2. Ukrywanie nagłówka X-Powered-By
  poweredByHeader: false,

  // 3. Automatyczne czyszczenie console.log na produkcji (nie dotyczy błędów console.error)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error'] } // Usuwa logi, info i ostrzeżenia, ale zostawia krytyczne błędy
        : false,
  },

  // 4. Nagłówki bezpieczeństwa chroniące kibiców (XSS, Clickjacking)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://*.sanity.studio http://localhost:3333 http://localhost:3000",
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
