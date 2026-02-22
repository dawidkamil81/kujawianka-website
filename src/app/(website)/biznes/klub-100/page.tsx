export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { CLUB100_PAGE_QUERY } from '@/sanity/lib/queries'
import Club100View from '@/components/club100/Club100View'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Klub 100 | Kujawianka Izbica Kujawska',
  description:
    'Elitarne grono 100 najbardziej zaangażowanych firm i osób prywatnych wspierających nasz klub.',
}

export default async function Club100Page() {
  const { data } = await sanityFetch({ query: CLUB100_PAGE_QUERY })

  const pageData = data?.pageData
  const members = data?.members || []

  return <Club100View members={members} pageData={pageData} />
}
