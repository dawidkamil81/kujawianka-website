import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { userAgent } from 'next/server'
import type { Metadata } from 'next'
import { logUserVisit } from '@/lib/serverLogger'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Info2026Page(props: PageProps) {
  try {
    const headerList = await headers()
    const searchParams = await props.searchParams

    // 1. Pobieranie IP (z uwzględnieniem proxy Vercel / Cloudflare)
    const forwardedFor = headerList.get('x-forwarded-for')
    let ipAddress =
      forwardedFor?.split(',')[0].trim() ||
      headerList.get('x-real-ip') ||
      headerList.get('cf-connecting-ip')

    // Na localhoscie nie ma proxy Vercela, więc nagłówki proxy nie występują
    if (!ipAddress) {
      const host = headerList.get('host') || ''
      if (
        host.includes('localhost') ||
        host.includes('127.0.0.1') ||
        host.includes('192.168.')
      ) {
        ipAddress = '127.0.0.1 (localhost)'
      } else {
        ipAddress = 'unknown'
      }
    }

    // 2. Geolokalizacja z nagłówków Vercel
    const rawCity = headerList.get('x-vercel-ip-city')
    const city = rawCity ? decodeURIComponent(rawCity) : undefined
    const country = headerList.get('x-vercel-ip-country') || undefined
    const region = headerList.get('x-vercel-ip-country-region') || undefined

    // 3. User Agent i urządzenie (wbudowane narzędzie Next.js)
    const rawUserAgent = headerList.get('user-agent') || ''
    const ua = userAgent({ headers: headerList })

    const browser =
      [ua.browser.name, ua.browser.version].filter(Boolean).join(' ') ||
      'Nieznana'
    const os =
      [ua.os.name, ua.os.version].filter(Boolean).join(' ') || 'Nieznany'
    const deviceType = ua.device.type || (ua.isBot ? 'bot' : 'desktop')

    // 4. Opcjonalny identyfikator z parametru linku (?u=..., ?userId=..., ?id=...)
    const paramUser =
      searchParams.userId ||
      searchParams.u ||
      searchParams.id ||
      searchParams.user
    const userId =
      typeof paramUser === 'string'
        ? paramUser
        : Array.isArray(paramUser)
          ? paramUser[0]
          : 'link-visitor'

    await logUserVisit({
      userId,
      ipAddress,
      city,
      country,
      region,
      deviceType,
      os,
      browser,
      userAgent: rawUserAgent,
      loggedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Błąd podczas rejestracji logu w /info-2026:', error)
  }

  // Przejście do widoku strony 404 (VAR / not-found)
  notFound()
}
