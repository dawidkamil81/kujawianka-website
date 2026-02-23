'use client'

import { Sponsor, Club100PageData } from '@/types/index'
import PageHero from '@/components/common/PageHero'
import ContactSection from '@/components/sections/ContactSection'
import SectionsRenderer from '@/components/sections/SectionsRenderer'
import Club100About from './Club100About'
import Club100Benefits from './Club100Benefits'
import Club100Members from './Club100Members'

interface Club100ViewProps {
  members: Sponsor[]
  pageData?: Club100PageData
}

export default function Club100View({ members, pageData }: Club100ViewProps) {
  // Wyciągamy tytuł, aby móc użyć go w opisie Hero i formularzu kontaktowym
  const pageTitle = pageData?.title || 'Klub 100'

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle z Twojego oryginalnego kodu */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      {/* --- 1. NAGŁÓWEK STRONY (ZAMKNIĘTY W TWOIM ORYGINALNYM KONTENERZE) --- */}
      <div className="relative z-10 pt-16 pb-12 md:pt-24">
        <div className="container mx-auto px-4">
          <PageHero
            animated
            badgeText="Prestiż i Wsparcie"
            title={pageTitle}
            description={
              pageData?.description ||
              `Elitarne grono najbardziej zaangażowanych firm i osób prywatnych. To prestiżowy ${pageTitle.toLowerCase()}, który poprzez regularne wsparcie ma realny wpływ na stabilność i rozwój Kujawianki.`
            }
            className="mb-0" // Resetujemy dolny margines PageHero, by uszanować Twój pb-12
          />
        </div>
      </div>

      {/* --- 2. LISTA I KORZYŚCI (BEZ KONTENERA ZEWNĘTRZNEGO) --- */}
      <div className="relative z-10 w-full">
        <Club100About pageData={pageData} />
        <Club100Benefits pageData={pageData} />
        <Club100Members members={members} />

        {/* Sekcje Dynamiczne z CMS */}
        {pageData?.contentBuilder && pageData.contentBuilder.length > 0 && (
          <div className="mt-24 md:mt-32">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SectionsRenderer sections={pageData.contentBuilder as any[]} />
          </div>
        )}
      </div>
    </main>
  )
}
