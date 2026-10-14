import { headers } from 'next/headers'
import { client } from '@/sanity/lib/client'
import { CLUB100_PAGE_QUERY } from '@/sanity/lib/queries'
import { captureRequestTelemetry } from '@/lib/serverLogger'
import Club100View from '@/components/club100/Club100View'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Klub 1946 | MGKS Kujawianka Izbica Kujawska',
  description:
    'Elitarne grono partnerów i sympatyków Klubu 1946 MGKS Kujawianka.',
  robots: {
    index: false,
    follow: false,
  },
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Klub1946Page(props: PageProps) {
  try {
    const headerList = await headers()
    const searchParams = await props.searchParams
    await captureRequestTelemetry(headerList, 'klub 1946', searchParams)
  } catch (error) {
    console.error('Błąd podczas rejestracji logu dla klub 1946:', error)
  }

  const data = await client.fetch(
    CLUB100_PAGE_QUERY,
    {},
    { next: { tags: ['sanity'] } },
  )

  const pageData = data?.pageData
  const members = data?.members || []

  if (!pageData || pageData.isPageVisible === false) {
    notFound()
  }

  return <Club100View members={members} pageData={pageData} />
}
