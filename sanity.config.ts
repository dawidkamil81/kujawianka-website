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
      // 2. NOWOŚĆ: Szablon dla SZTABU (przypisuje do drużyny ORAZ ustawia pozycję 'Sztab')
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
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})