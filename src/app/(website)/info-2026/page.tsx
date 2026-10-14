import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { captureRequestTelemetry } from '@/lib/serverLogger'

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
    await captureRequestTelemetry(headerList, 'info 2026', searchParams)
  } catch (error) {
    console.error('Błąd podczas rejestracji logu w /info-2026:', error)
  }

  // Przejście do widoku strony 404 (VAR / not-found)
  notFound()
}
