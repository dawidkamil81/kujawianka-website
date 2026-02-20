export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { CLUB_PAGE_QUERY } from '@/sanity/lib/queries'
import ClubPageContent from './ClubPage' // Zakładam, że tam jest Twój komponent, jeśli nie - dostosuj ścieżkę

export default async function ClubPage() {
  const { data } = await sanityFetch({ query: CLUB_PAGE_QUERY })

  // Jeśli nie ma danych (np. admin jeszcze nie wypełnił), można zwrócić null lub loading
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0e0e0e] text-white">
        Błąd ładowania strony klubu
      </div>
    )
  }

  return <ClubPageContent data={data} />
}
