// sanity/schemaTypes/clubPage.ts
import { defineField, defineType } from 'sanity'
import { Shield, User, Users } from 'lucide-react'

export const clubPage = defineType({
  name: 'clubPage',
  title: 'Strona - O Klubie',
  type: 'document',
  icon: Shield,
  fields: [
    // === SEKCJA HERO ===
    defineField({
      name: 'heroHeading',
      title: 'Nagłówek główny (Hero)',
      type: 'string',
      initialValue: 'Kujawianka Izbica Kujawska',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Opis w nagłówku',
      type: 'text',
      rows: 2,
    }),

    // === SEKCJA HISTORIA ===
    defineField({
      name: 'historyTitle',
      title: 'Tytuł sekcji historii',
      type: 'string',
      initialValue: 'Historia i Misja',
      group: 'history',
    }),
    defineField({
      name: 'historyContent',
      title: 'Treść historii',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'history',
    }),
    defineField({
      name: 'historyImage',
      title: 'Zdjęcie historyczne (Hero Image)',
      type: 'image',
      options: { hotspot: true },
      group: 'history',
    }),

    // === SEKCJA OSIĄGNIĘCIA ===
    defineField({
      name: 'achievements',
      title: 'Osiągnięcia (Karty)',
      type: 'array',
      group: 'achievements',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'iconType',
              title: 'Ikona',
              type: 'string',
              options: {
                list: [
                  { title: 'Gwiazda (Star)', value: 'star' },
                  { title: 'Medal', value: 'medal' },
                  { title: 'Puchar (Trophy)', value: 'trophy' },
                ],
              },
            }),
          ],
        },
      ],
    }),

    // === SEKCJA STADION ===
    defineField({
      name: 'stadiumDescription',
      title: 'Opis stadionu',
      type: 'text',
      group: 'stadium',
    }),
    defineField({
      name: 'stadiumImage',
      title: 'Zdjęcie stadionu',
      type: 'image',
      options: { hotspot: true },
      group: 'stadium',
    }),
    defineField({
      name: 'stadiumAddress',
      title: 'Adres stadionu',
      type: 'string',
      initialValue: 'ul. Sportowa 12',
      group: 'stadium',
    }),
    defineField({
      name: 'stadiumCapacity',
      title: 'Pojemność',
      type: 'string',
      initialValue: '800 Miejsc',
      group: 'stadium',
    }),
    defineField({
      name: 'stadiumBuilt',
      title: 'Rok otwarcia',
      type: 'string',
      initialValue: '1984 Rok',
      group: 'stadium',
    }),

    // === SEKCJA WŁADZE KLUBU (ZMODYFIKOWANA) ===
    defineField({
      name: 'clubAuthorities',
      title: 'Władze Klubu (Zarząd i Komisja)',
      type: 'array',
      group: 'board',
      of: [
        {
          type: 'object',
          icon: User,
          fields: [
            defineField({
              name: 'name',
              title: 'Imię i Nazwisko',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'group',
              title: 'Przypisanie do organu',
              type: 'string',
              options: {
                list: [
                  { title: 'Zarząd Klubu', value: 'management' },
                  { title: 'Komisja Rewizyjna', value: 'audit' },
                ],
                layout: 'radio',
              },
              initialValue: 'management',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'role',
              title: 'Funkcja',
              type: 'string',
              options: {
                list: [
                  // Funkcje Zarządu
                  { title: 'Prezes Zarządu', value: 'Prezes Zarządu' },
                  { title: 'Wiceprezes', value: 'Wiceprezes' },
                  { title: 'Skarbnik', value: 'Skarbnik' },
                  { title: 'Sekretarz', value: 'Sekretarz' },
                  { title: 'Członek Zarządu', value: 'Członek Zarządu' },
                  // Funkcje Komisji
                  {
                    title: 'Przewodniczący Komisji Rewizyjnej',
                    value: 'Przewodniczący Komisji Rewizyjnej',
                  },
                  { title: 'Wiceprzewodniczący', value: 'Wiceprzewodniczący' },
                  { title: 'Członek Komisji', value: 'Członek' },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'isVisible',
              title: 'Widoczny na stronie?',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              group: 'group',
              isVisible: 'isVisible',
            },
            prepare({ title, subtitle, group, isVisible }) {
              const groupName = group === 'management' ? 'Zarząd' : 'Komisja'
              return {
                title: title,
                subtitle: `${subtitle} (${groupName}) ${isVisible ? '' : '[UKRYTY]'}`,
                media: User,
              }
            },
          },
        },
      ],
    }),
  ],
  groups: [
    { name: 'history', title: 'Historia' },
    { name: 'achievements', title: 'Osiągnięcia' },
    { name: 'stadium', title: 'Stadion' },
    { name: 'board', title: 'Władze Klubu', icon: Users },
  ],
})
