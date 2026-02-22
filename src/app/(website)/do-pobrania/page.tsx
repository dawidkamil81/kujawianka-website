export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { DOWNLOADS_QUERY } from '@/sanity/lib/queries'
import DownloadsView from '@/components/downloads/DownloadsView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Do pobrania | Kujawianka Izbica Kujawska',
  description: 'Dokumenty i pliki do pobrania.',
}

export default async function DownloadsPage() {
  const { data: files } = await sanityFetch({ query: DOWNLOADS_QUERY })

  return <DownloadsView files={files || []} />
}
