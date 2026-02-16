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

      // --- 1. UNIWERSALNY SZABLON MECZU ---
      // To on odpowiada za automatyczne wypełnienie kadry i źródła
      {
        id: 'result-in-round',
        title: 'Nowy Mecz',
        schemaType: 'result',
        parameters: [
          { name: 'squadId', type: 'string' }, // Musi dostać ID drużyny
          { name: 'round', type: 'number' },
          { name: 'source', type: 'string' }
        ],
        value: ({ squadId, round, source }: { squadId: string, round: number, source: string }) => ({
          squad: { _type: 'reference', _ref: squadId }, // <--- TU PRZYPISUJEMY KADRĘ
          round: round,
          season: '2025/2026', // Możesz zmienić na dynamiczny jeśli trzeba
          source: source
        }),
      },

      // --- 2. POZOSTAŁE SZABLONY (Bez zmian) ---
      {
        id: 'table-by-squad',
        title: 'Tabela dla Drużyny',
        schemaType: 'table',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId } }),
      },
      {
        id: 'league-config-by-squad',
        title: 'Konfiguracja Ligi',
        schemaType: 'leagueConfig',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId } }),
      },
      {
        id: 'player-by-squad',
        title: 'Nowy Zawodnik',
        schemaType: 'player',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId } }),
      },
      {
        id: 'staff-by-squad',
        title: 'Nowy Członek Sztabu',
        schemaType: 'player',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId }, position: 'Sztab' }),
      },
      {
        id: 'sponsor-by-tier',
        title: 'Sponsor w tej kategorii',
        schemaType: 'sponsor',
        parameters: [{ name: 'tierId', type: 'string' }],
        value: ({ tierId }: { tierId: string }) => ({ tier: { _type: 'reference', _ref: tierId } }),
      },
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})