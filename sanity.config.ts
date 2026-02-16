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
      // --- 1. Szablon dla GRUP MŁODZIEŻOWYCH (po ID) ---
      {
        id: 'result-by-squad-id',
        title: 'Nowy Mecz',
        schemaType: 'result',
        // Dodajemy parametr 'round'
        parameters: [{ name: 'squadId', type: 'string' }, { name: 'round', type: 'number' }],
        value: ({ squadId, round }: { squadId: string, round: number }) => ({
          squad: { _type: 'reference', _ref: squadId },
          round: round, // Przypisujemy numer kolejki
        }),
      },

      // --- 2. Szablon dla SENIORÓW (po Slugu) ---
      {
        id: 'result-for-seniorzy',
        title: 'Nowy Mecz',
        schemaType: 'result',
        // Dodajemy parametr 'round' również tutaj
        parameters: [{ name: 'round', type: 'number' }],
        value: async (params: { round: number }, { getClient }: any) => {
          const client = getClient({ apiVersion: '2024-01-01' });
          const seniorSquad = await client.fetch('*[_type == "squad" && slug.current == "seniorzy"][0]');

          if (seniorSquad) {
            return {
              squad: { _type: 'reference', _ref: seniorSquad._id },
              category: 'senior',
              round: params.round // Przypisujemy numer kolejki z parametru
            };
          }
          return {
            round: params.round
          };
        },
      },

      // --- 3. Szablony dla konfiguracji ligi ---
      {
        id: 'league-config-by-squad',
        title: 'Konfiguracja Ligi',
        schemaType: 'leagueConfig',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({
          squad: { _type: 'reference', _ref: squadId },
        }),
      },
      {
        id: 'league-config-for-seniorzy',
        title: 'Konfiguracja Ligi Seniorów',
        schemaType: 'leagueConfig',
        value: async (params: any, { getClient }: any) => {
          const client = getClient({ apiVersion: '2024-01-01' });
          const seniorSquad = await client.fetch('*[_type == "squad" && slug.current == "seniorzy"][0]');
          if (seniorSquad) {
            return { squad: { _type: 'reference', _ref: seniorSquad._id } };
          }
          return {};
        },
      },

      // --- Pozostałe szablony ---
      {
        id: 'player-by-squad',
        title: 'Nowy Zawodnik w Kadrze',
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
        id: 'table-by-squad',
        title: 'Tabela dla Drużyny',
        schemaType: 'table',
        parameters: [{ name: 'squadId', type: 'string' }],
        value: ({ squadId }: { squadId: string }) => ({ squad: { _type: 'reference', _ref: squadId } }),
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

  // Filtrowanie opcji tworzenia
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'structure' && creationContext.schemaType === 'result') {
        return prev.filter((templateItem) => templateItem.templateId !== 'result');
      }
      return prev;
    },
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})