import { createClient } from 'next-sanity'
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
}

// Blokada w pamięci procesu serwera zapobiegająca natychmiastowym duplikatom (np. podwójny strzał przeglądarki/Next.js dev)
const recentLogs = new Set<string>()

function getDedupeKey(entry: LogEntry): string {
  if (entry.userId && entry.userId !== 'link-visitor') {
    return `user:${entry.userId}`
  }
  return `ip:${entry.ipAddress || 'unknown'}`
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

  // 2. Sprawdzenie w bazie Sanity, czy ten użytkownik lub IP już został kiedykolwiek zarejestrowany
  let existingLogId: string | null = null

  if (entry.userId && entry.userId !== 'link-visitor') {
    existingLogId = await serverClient.fetch(
      `*[_type == "userLog" && userId == $userId][0]._id`,
      { userId: entry.userId },
    )
  } else if (entry.ipAddress && entry.ipAddress !== 'unknown') {
    existingLogId = await serverClient.fetch(
      `*[_type == "userLog" && ipAddress == $ipAddress][0]._id`,
      { ipAddress: entry.ipAddress },
    )
  }

  // Jeśli log dla danego usera / IP już istnieje, nie tworzymy duplikatu
  if (existingLogId) {
    return
  }

  // 3. Utworzenie jednorazowego logu w Sanity
  await serverClient.create({
    _type: 'userLog',
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
