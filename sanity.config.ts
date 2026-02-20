'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structureBuilder'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  schema: {
    types: schema.types,
    templates: (prev) => [
      ...prev,

      // --- 1. NOWE SZABLONY (Dla struktury Competition) ---

      // A. Tworzenie nowych Rozgrywek (przypisanych do konkretnej Kadry)
      {
        id: 'competition-by-squad',
        title: 'Rozgrywki dla kadry',
        schemaType: 'competition',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
        }),
      },

      // B. Tworzenie Tabeli (przypisanej do Rozgrywek)
      {
        id: 'standing-by-competition',
        title: 'Tabela dla rozgrywek',
        schemaType: 'standing',
        parameters: [{ name: 'competitionId', type: 'string' }],
        value: ({ competitionId }: { competitionId: string }) => ({
          competition: { _type: 'reference', _ref: competitionId },
        }),
      },

      // C. Tworzenie Kolejki/Terminarza (przypisanej do Rozgrywek)
      {
        id: 'fixture-by-competition',
        title: 'Kolejka dla rozgrywek',
        schemaType: 'fixture',
        parameters: [{ name: 'competitionId', type: 'string' }],
        value: ({ competitionId }: { competitionId: string }) => ({
          competition: { _type: 'reference', _ref: competitionId },
        }),
      },

      // --- 2. STARE, ALE NADAL POTRZEBNE SZABLONY ---

      // Tworzenie zawodnika w konkretnej kadrze
      {
        id: 'player-by-squad',
        title: 'Nowy Zawodnik',
        schemaType: 'player',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
        }),
      },

      // Tworzenie członka sztabu w konkretnej kadrze
      {
        id: 'staff-by-squad',
        title: 'Nowy Członek Sztabu',
        schemaType: 'player',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
          position: 'Sztab',
        }),
      },

      // Tworzenie sponsora w konkretnej kategorii
      {
        id: 'sponsor-by-tier',
        title: 'Sponsor w tej kategorii',
        schemaType: 'sponsor',
        parameters: [{ name: 'tierId', type: 'string' }],
        value: ({ tierId }: { tierId: string }) => ({
          tier: { _type: 'reference', _ref: tierId },
        }),
      },
    ],
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
