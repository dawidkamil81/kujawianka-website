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

      // --- 1. Szablon dla GRUP MŁODZIEŻOWYCH (Manualne) ---
      // Używany, gdy tworzysz mecz w folderze konkretnej drużyny młodzieżowej
      {
        id: 'result-by-squad-id',
        title: 'Nowy Mecz (Młodzież)',
        schemaType: 'result',
        parameters: [{ name: 'squadId', type: 'string' }, { name: 'round', type: 'number' }],
        value: ({ squadId, round }: { squadId: string, round: number }) => ({
          squad: { _type: 'reference', _ref: squadId }, // Przypisz drużynę
          round: round,                                 // Przypisz kolejkę
          season: '2025/2026',
          source: 'manual'                              // <--- TUTAJ: Wymuszamy tryb ręczny
        }),
      },

      // --- 2. Szablon dla SENIORÓW (Scraper) ---
      // Używany, gdy tworzysz mecz w folderze Seniorów
      {
        id: 'result-for-seniorzy',
        title: 'Mecz Seniorów (Scraper)',
        schemaType: 'result',
        parameters: [{ name: 'round', type: 'number' }],
        value: ({ round }: { round: number }) => ({
          // Tutaj musisz wpisać ID dokumentu "Seniorzy". 
          // Jeśli nie znasz ID, scraper i tak nadpisze dane, ale dla porządku w panelu:
          round: round,
          season: '2025/2026',
          source: 'scraper',                             // <--- TUTAJ: Wymuszamy tryb scrapera
          category: 'senior'
        }),
      },

      // --- 3. TABELA (Naprawa błędu z poprzedniego kroku) ---
      {
        id: 'table-by-squad',
        title: 'Tabela dla Drużyny',
        schemaType: 'table',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId } }),
      },

      // --- 4. KONFIGURACJA LIGI ---
      {
        id: 'league-config-by-squad',
        title: 'Konfiguracja Ligi',
        schemaType: 'leagueConfig',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId } }),
      },

      // --- 5. POZOSTAŁE SZABLONY (Bez zmian) ---
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