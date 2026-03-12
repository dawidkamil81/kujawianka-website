// export const revalidate = 43200 //12hours
// const { data: files } = await sanityFetch({ query: DOWNLOADS_QUERY })

import { client } from '@/sanity/lib/client' // <-- Zmieniony import
import { DOWNLOADS_QUERY } from '@/sanity/lib/queries'
import DownloadsView from '@/components/downloads/DownloadsView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Do pobrania | Kujawianka Izbica Kujawska',
  description: 'Dokumenty i pliki do pobrania.',
}

export default async function DownloadsPage() {
  const files = await client.fetch(
    DOWNLOADS_QUERY,
    {},
    { next: { tags: ['sanity'] } },
  )

  return <DownloadsView files={files || []} />
}
