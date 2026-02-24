// sanity/schemaTypes/singletons/homePage.ts
import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

export const homePage = defineType({
  name: 'homePage',
  title: 'Strona - Główna',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'heroOvertitle',
      title: 'Nadtytuł (Hero)',
      description: 'Drobny tekst nad głównym tytułem',
      type: 'string',
      initialValue: 'Oficjalny serwis klubu',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Nazwa klubu / Tytuł główny',
      type: 'string',
      initialValue: 'Kujawianka Izbica Kujawska',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Opis pod tytułem',
      description: 'Krótki tekst zachęcający',
      type: 'text',
      rows: 3,
      initialValue:
        'Duma, pasja i tradycja od pokoleń. Bądź na bieżąco z wynikami, relacjami meczowymi i życiem klubu',
    }),
    defineField({
      name: 'heroImage',
      title: 'Zdjęcie w tle (Hero Image)',
      description:
        'Zdjęcie na pełen ekran wyświetlane na samej górze strony głównej',
      type: 'image',
      options: { hotspot: true }, // Pozwala na wybór najważniejszego punktu na zdjęciu (fokus)
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Strona Główna',
        subtitle: 'Ustawienia sekcji Hero',
      }
    },
  },
})
