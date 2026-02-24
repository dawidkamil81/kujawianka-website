'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
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
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode-enable',
        },
      },
      resolve: {
        locations: {
          // 1. Singleton: Strona Główna (Statyczna lista)
          homePage: {
            locations: [{ title: 'Strona Główna', href: '/' }],
          },

          // 2. Singleton: Strona O Klubie (Statyczna lista)
          clubPage: {
            locations: [{ title: 'O Klubie', href: '/klub' }],
          },

          // --- DODAJ TE LINIJKI DLA BRAKUJĄCYCH STRON ---

          // Singleton: Strona Wesprzyj
          donatePage: {
            locations: [{ title: 'Wesprzyj Nas', href: '/wesprzyj' }],
          },

          // Singleton: Strona Sponsorzy (lub użyj nazwy z Twojego schematu dla tej strony)
          sponsorsPage: {
            // UWAGA: upewnij się, czy w schemaTypes ta strona nazywa się 'sponsorsPage' czy np. 'sponsors' lub 'businessPages'
            locations: [{ title: 'Sponsorzy', href: '/biznes/sponsorzy' }],
          },

          offerPage: {
            // UWAGA: upewnij się, czy w schemaTypes ta strona nazywa się 'sponsorsPage' czy np. 'sponsors' lub 'businessPages'
            locations: [{ title: 'Oferta', href: '/biznes/oferta' }],
          },
          partnersPage: {
            // UWAGA: upewnij się, czy w schemaTypes ta strona nazywa się 'sponsorsPage' czy np. 'sponsors' lub 'businessPages'
            locations: [{ title: 'Kluboicze', href: '/biznes/klubowicze' }],
          },

          club100Page: {
            // UWAGA: upewnij się, czy w schemaTypes ta strona nazywa się 'sponsorsPage' czy np. 'sponsors' lub 'businessPages'
            locations: [{ title: 'Klub 100', href: '/biznes/klub100' }],
          },
          downloadPage: {
            // UWAGA: upewnij się, czy w schemaTypes ta strona nazywa się 'sponsorsPage' czy np. 'sponsors' lub 'businessPages'
            locations: [
              { title: 'Pliki do Pobrania', href: '/biznes/do-pobrania' },
            ],
          },

          // 3. Dokumenty: Aktualności
          news: {
            // Wybieramy tylko te pola, których potrzebujemy do wygenerowania linku
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              if (!doc?.slug) return null

              return {
                locations: [
                  {
                    title: doc.title || 'Aktualność',
                    href: `/aktualnosci/${doc.slug}`,
                  },
                  {
                    title: 'Wszystkie aktualności',
                    href: '/aktualnosci',
                  },
                ],
              }
            },
          },

          // 4. Dokumenty: Kadry (Drużyny)
          squad: {
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              if (!doc?.slug) return null

              return {
                locations: [
                  {
                    title: doc.name || 'Kadra',
                    href: `/druzyny/${doc.slug}`,
                  },
                ],
              }
            },
          },

          // 5. Dokumenty: Rozgrywki (Wyniki i Tabele)
          competition: {
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              if (!doc?.slug) return null

              return {
                locations: [
                  {
                    title: doc.name || 'Rozgrywki',
                    href: `/wyniki/${doc.slug}`,
                  },
                ],
              }
            },
          },
        },
      },
    }),
  ],
})
