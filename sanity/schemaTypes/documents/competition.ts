import { defineField, defineType } from 'sanity'

export const competition = defineType({
  name: 'competition',
  title: 'Rozgrywki (Konfiguracja)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa Rozgrywek',
      type: 'string', // np. "IV Liga Kujawsko-Pomorska"
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Sezon',
      type: 'string',
      initialValue: () => {
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() // Miesiące są indeksowane od 0 (0 = Styczeń, 6 = Lipiec)

        // Jeśli jest przed lipcem (np. runda wiosenna), to sezon zaczął się w zeszłym roku
        if (currentMonth < 6) {
          return `${currentYear - 1}/${currentYear}`
        }

        // Jeśli jest lipiec lub później (np. runda jesienna), to nowy sezon
        return `${currentYear}/${currentYear + 1}`
      },
    }),
    defineField({
      name: 'squad',
      title: 'Przypisana Kadra',
      type: 'reference',
      to: [{ type: 'squad' }],
      description:
        'Wybierz kadrę (np. Seniorzy, Juniorzy), która bierze udział w tych rozgrywkach.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link do 90minut.pl (Potrzebne tylko dla kadry seniorów)',
      type: 'url',
    }),
    // --- KONFIGURACJA ROZGRYWEK ---
    defineField({
      name: 'config',
      title: 'Zasady rozgrywek',
      type: 'object',
      options: { collapsible: false },
      fields: [
        {
          name: 'teamsCount',
          title: 'Liczba drużyn w lidze',
          type: 'number',
          validation: (Rule) => Rule.min(2),
        },
        { name: 'roundsCount', title: 'Liczba kolejek', type: 'number' },
        {
          name: 'promotionSpots',
          title: 'Miejsca premiowane awansem',
          type: 'number',
        },
        {
          name: 'promotionPlayoffSpots',
          title: 'Miejsca barażowe (awans)',
          type: 'number',
        },
        {
          name: 'relegationPlayoffSpots',
          title: 'Miejsca barażowe (utrzymanie)',
          type: 'number',
        },
        { name: 'relegationSpots', title: 'Miejsca spadkowe', type: 'number' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'season',
    },
  },
})
