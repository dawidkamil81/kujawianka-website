'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structureBuilder'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schema.types,
    // --- SZABLONY WARTOŚCI POCZĄTKOWYCH ---
    templates: (prev) => [
      ...prev,
      // 1. Szablon dla zwykłego zawodnika (tylko przypisuje do drużyny)
      {
        id: 'player-by-squad',
        title: 'Nowy Zawodnik w Kadrze',
        description: 'Tworzy zawodnika przypisanego do wybranej kadry',
        schemaType: 'player',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
          // Nie ustawiamy pozycji, użytkownik wybierze (Bramkarz, Obrońca itp.)
        }),
      },
      // 2. Szablon dla SZTABU (przypisuje do drużyny ORAZ ustawia pozycję 'Sztab')
      {
        id: 'staff-by-squad',
        title: 'Nowy Członek Sztabu',
        description: 'Tworzy trenera/członka sztabu w wybranej kadrze',
        schemaType: 'player',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
          position: 'Sztab' // <--- To jest kluczowe!
        }),
      },
      // 3. Szablon dla SPONSORA (przypisuje automatycznie rangę/tier)
      {
        id: 'sponsor-by-tier',
        title: 'Sponsor w tej kategorii',
        description: 'Sponsor przypisany do wybranej rangi',
        schemaType: 'sponsor',
        parameters: [{ name: 'tierId', type: 'string' }],
        value: ({ tierId }: { tierId: string }) => ({
          tier: { _type: 'reference', _ref: tierId },
        }),
      },
      // 4. Szablon dla Raportu Meczowego
      {
        id: 'match-report-by-squad',
        title: 'Raport dla Drużyny',
        description: 'Nowy raport meczowy dla konkretnej kadry',
        schemaType: 'matchReport',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId }, // Automatycznie przypisz drużynę
          title: 'Nowy Mecz', // Domyślny tytuł
        }),
      },
      // 5. NOWOŚĆ: Szablon dla TABELI (Naprawia błąd)
      {
        id: 'table-by-squad',
        title: 'Tabela dla Drużyny',
        description: 'Tworzy tabelę przypisaną do wybranej kadry',
        schemaType: 'table',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
        }),
      },
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})