import { sanityFetch } from '@/sanity/lib/live'
import { DONATE_PAGE_QUERY } from '@/sanity/lib/queries'
import DonateView from '@/components/donate/DonateView'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: DONATE_PAGE_QUERY })

  if (!data) {
    return {
      title: 'Wesprzyj Nas | Kujawianka Izbica Kujawska',
    }
  }

  return {
    title: `${data.heroHeading || 'Wesprzyj Nas'} | Kujawianka Izbica Kujawska`,
    description:
      'Przekaż 1,5% podatku lub wesprzyj klub Kujawianka Izbica Kujawska. Każda pomoc ma znaczenie.',
  }
}

export default async function DonatePage() {
  const { data } = await sanityFetch({ query: DONATE_PAGE_QUERY })

  if (!data || data.isPageVisible === false) {
    notFound()
  }

  return <DonateView data={data} />
}
