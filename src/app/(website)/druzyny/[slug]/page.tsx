export const revalidate = 60

import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { SQUAD_PAGE_QUERY } from '@/sanity/lib/queries'
import SquadView from '@/components/squad/SquadView'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Opcjonalnie: Generowanie meta tagów
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Kadra | Kujawianka Izbica Kujawska`,
    description: `Skład drużyny Kujawianki na obecny sezon.`,
  }
}

export default async function DynamicSquadPage({ params }: PageProps) {
  const { slug } = await params

  const { data: squadData } = await sanityFetch({
    query: SQUAD_PAGE_QUERY,
    params: { slug },
  })

  if (!squadData) {
    return notFound()
  }

  return <SquadView squadData={squadData} />
}
