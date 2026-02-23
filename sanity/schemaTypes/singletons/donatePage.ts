// sanity/schemaTypes/donatePage.ts
import { defineField, defineType } from 'sanity'
import { Heart, ListOrdered, Quote } from 'lucide-react'

export const donatePage = defineType({
  name: 'donatePage',
  title: 'Strona - Przekaż 1.5%',
  type: 'document',
  icon: Heart,
  fields: [
    defineField({
      name: 'isPageVisible',
      title: 'Widoczność strony',
      description: 'Zaznacz, aby ta strona była widoczna w nawigacji.',
      type: 'boolean',
      initialValue: true,
    }),
    // === 1. HERO SECTION ===
    defineField({
      name: 'heroHeading',
      title: 'Nagłówek główny',
      type: 'string',
      description: 'Np. "Gramy Razem" (Ostatnie słowo będzie zielone)',
      initialValue: 'Gramy Razem',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'krsNumber',
      title: 'Numer KRS',
      type: 'string',
      initialValue: '0000123456',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'specificGoal',
      title: 'Cel Szczegółowy',
      type: 'string',
      initialValue: 'Kujawianka Izbica Kujawska',
      validation: (r) => r.required(),
    }),

    // === 2. INSTRUKCJA (3 KROKI) ===
    defineField({
      name: 'steps',
      title: 'Kroki instrukcji (Dokładnie 3)',
      type: 'array',
      icon: ListOrdered,
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Tytuł kroku',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Opis kroku',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
      validation: (rule) =>
        rule
          .length(3)
          .error(
            'Musisz dodać dokładnie 3 kroki, aby pasowały do układu strony.',
          ),
    }),

    // === 3. LISTA CELÓW (LEWA KOLUMNA) ===
    defineField({
      name: 'goalsList',
      title: 'Cele zbiórki (Lista)',
      type: 'array',
      of: [{ type: 'string', title: 'Cel' }],
      initialValue: [
        'Szkolenie ponad 100 dzieci w akademii',
        'Zakup profesjonalnego sprzętu treningowego',
        'Transport na mecze wyjazdowe i turnieje',
        'Modernizacja boiska i zaplecza sanitarnego',
      ],
    }),

    // === 4. SOCIAL PROOF (PRAWA KOLUMNA) ===
    defineField({
      name: 'socialProof',
      title: 'Sekcja z cytatem/zdjęciem',
      type: 'object',
      icon: Quote,
      fields: [
        defineField({
          name: 'image',
          title: 'Zdjęcie w tle',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'quote',
          title: 'Cytat',
          type: 'text',
          rows: 3,
          initialValue:
            'Twoje 1.5% to realne wsparcie dla tych dzieciaków. Budujemy razem coś więcej niż klub.',
        }),
        defineField({
          name: 'author',
          title: 'Podpis (Autor)',
          type: 'string',
          initialValue: 'Zarząd Klubu',
        }),
      ],
    }),
    defineField({
      name: 'contentBuilder',
      title: 'Dodatkowe Sekcje Strony',
      type: 'array',
      of: [
        { type: 'textSection' },
        { type: 'imageTextSection' },
        { type: 'featuresSection' },
        { type: 'tableSection' },
        { type: 'gallerySection' },
        { type: 'contactSection' },
      ],
    }),
  ],
})
