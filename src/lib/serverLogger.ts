import { createClient } from 'next-sanity'
import { userAgent } from 'next/server'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export interface LogEntry {
  userId?: string
  ipAddress?: string
  city?: string
  country?: string
  region?: string
  deviceType?: string
  os?: string
  browser?: string
  userAgent?: string
  loggedAt?: string
  podstrona?: string
}

// Blokada w pamięci procesu serwera zapobiegająca natychmiastowym duplikatom (np. podwójny strzał przeglądarki/Next.js dev)
const recentLogs = new Set<string>()

function getDedupeKey(entry: LogEntry): string {
  const podstrona = entry.podstrona || 'default'
  if (entry.userId && entry.userId !== 'link-visitor') {
    return `${podstrona}:user:${entry.userId}`
  }
  return `${podstrona}:ip:${entry.ipAddress || 'unknown'}`
}

export async function logUserVisit(entry: LogEntry): Promise<void> {
  const dedupeKey = getDedupeKey(entry)

  // 1. Sprawdzenie w pamięci podręcznej procesu
  if (recentLogs.has(dedupeKey)) {
    return
  }

  // Zabezpieczenie przed równoległymi strzałami z tej samej przeglądarki
  recentLogs.add(dedupeKey)
  setTimeout(() => recentLogs.delete(dedupeKey), 1000 * 60 * 60) // 1h retencji w pamięci

  const writeToken =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

  if (!writeToken) {
    console.warn(
      '[Logger] Brak tokenu SANITY_API_WRITE_TOKEN / SANITY_API_READ_TOKEN. Log nie został zapisany.',
    )
    return
  }

  const serverClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
  })

  // 2. Sprawdzenie w bazie Sanity, czy ten użytkownik lub IP już został zarejestrowany dla TEJ podstrony
  const podstrona = entry.podstrona || 'info 2026'
  let existingLogId: string | null = null

  if (entry.userId && entry.userId !== 'link-visitor') {
    existingLogId = await serverClient.fetch(
      `*[_type == "userLog" && podstrona == $podstrona && userId == $userId][0]._id`,
      { podstrona, userId: entry.userId },
    )
  } else if (entry.ipAddress && entry.ipAddress !== 'unknown') {
    existingLogId = await serverClient.fetch(
      `*[_type == "userLog" && podstrona == $podstrona && ipAddress == $ipAddress][0]._id`,
      { podstrona, ipAddress: entry.ipAddress },
    )
  }

  // Jeśli log dla danego usera / IP na tej podstronie już istnieje, nie tworzymy duplikatu
  if (existingLogId) {
    return
  }

  // 3. Utworzenie jednorazowego logu w Sanity
  await serverClient.create({
    _type: 'userLog',
    podstrona,
    userId: entry.userId || 'link-visitor',
    ipAddress: entry.ipAddress || 'unknown',
    city: entry.city || undefined,
    country: entry.country || undefined,
    region: entry.region || undefined,
    deviceType: entry.deviceType || 'unknown',
    os: entry.os || 'unknown',
    browser: entry.browser || 'unknown',
    userAgent: entry.userAgent || '',
    loggedAt: entry.loggedAt || new Date().toISOString(),
  })
}

/**
 * Pomocnicza funkcja do rejestrowania telemetrii bezpośrednio po stronie serwera Next.js
 */
export async function captureRequestTelemetry(
  headerList: Headers,
  podstrona: 'klub 1946' | 'info 2026' | string,
  searchParams?: { [key: string]: string | string[] | undefined },
): Promise<void> {
  try {
    // 1. IP klienta
    const forwardedFor = headerList.get('x-forwarded-for')
    let ipAddress =
      forwardedFor?.split(',')[0].trim() ||
      headerList.get('x-real-ip') ||
      headerList.get('cf-connecting-ip')

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

    // 2. Geolokalizacja Vercel
    const rawCity = headerList.get('x-vercel-ip-city')
    const city = rawCity ? decodeURIComponent(rawCity) : undefined
    const country = headerList.get('x-vercel-ip-country') || undefined
    const region = headerList.get('x-vercel-ip-country-region') || undefined

    // 3. User Agent i urządzenie
    const rawUserAgent = headerList.get('user-agent') || ''
    const ua = userAgent({ headers: headerList })

    const browser =
      [ua.browser.name, ua.browser.version].filter(Boolean).join(' ') ||
      'Nieznana'
    const os =
      [ua.os.name, ua.os.version].filter(Boolean).join(' ') || 'Nieznany'
    const deviceType = ua.device.type || (ua.isBot ? 'bot' : 'desktop')

    // 4. Opcjonalny identyfikator z query params
    const paramUser =
      searchParams?.userId ||
      searchParams?.u ||
      searchParams?.id ||
      searchParams?.user
    const userId =
      typeof paramUser === 'string'
        ? paramUser
        : Array.isArray(paramUser)
          ? paramUser[0]
          : 'link-visitor'

    await logUserVisit({
      podstrona,
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
    console.error(`Błąd podczas rejestracji telemetrii (${podstrona}):`, error)
  }
}
