import { NextRequest, NextResponse } from 'next/server'
import { userAgent } from 'next/server'
import { logUserVisit } from '@/lib/serverLogger'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const page = typeof body.page === 'string' ? body.page : 'Klub 100'
    const userId = typeof body.userId === 'string' ? body.userId : undefined

    // 1. IP klienta (z obsługą Vercel Edge / Cloudflare / localhost)
    const forwardedFor = req.headers.get('x-forwarded-for')
    let ipAddress =
      forwardedFor?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      req.headers.get('cf-connecting-ip')

    if (!ipAddress) {
      const host = req.headers.get('host') || ''
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

    // 2. Geolokalizacja dostarczana przez Vercel
    const rawCity = req.headers.get('x-vercel-ip-city')
    const city = rawCity ? decodeURIComponent(rawCity) : undefined
    const country = req.headers.get('x-vercel-ip-country') || undefined
    const region = req.headers.get('x-vercel-ip-country-region') || undefined

    // 3. User Agent i urządzenie
    const rawUserAgent = req.headers.get('user-agent') || ''
    const ua = userAgent(req)

    const browser =
      [ua.browser.name, ua.browser.version].filter(Boolean).join(' ') ||
      'Nieznana'
    const os =
      [ua.os.name, ua.os.version].filter(Boolean).join(' ') || 'Nieznany'
    const deviceType = ua.device.type || (ua.isBot ? 'bot' : 'desktop')

    await logUserVisit({
      page,
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Błąd podczas zapisu telemetrii w /api/telemetry:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
