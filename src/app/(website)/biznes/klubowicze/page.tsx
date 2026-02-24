export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { PARTNERS_PAGE_QUERY } from '@/sanity/lib/queries'
import PartnersView from '@/components/partners/PartnersView'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Klubowicze | Kujawianka Izbica Kujawska',
  description:
    'Poznaj lokalnych przedsiębiorców i osoby wspierające nasz klub.',
}

export default async function KlubowiczePage() {
  const { data } = await sanityFetch({ query: PARTNERS_PAGE_QUERY })

  const pageData = data?.pageData
  const members = data?.members || []

  if (!pageData || pageData.isPageVisible === false) {
    notFound()
  }

  return <PartnersView members={members} pageData={pageData} />
}
