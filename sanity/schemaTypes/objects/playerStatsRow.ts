import { defineField, defineType } from 'sanity'

export const playerStatsRow = defineType({
  name: 'playerStatsRow',
  title: 'Statystyki Zawodnika',
  type: 'object',
  fields: [
    defineField({
      name: 'player',
      title: 'Zawodnik',
      type: 'reference',
      to: [{ type: 'player' }],
      validation: (rule) => rule.required(),
      // --- LOGIKA FILTROWANIA ---
      options: {
        filter: ({ document }) => {
          // 'document' to aktualny dokument Raportu Meczowego
          // Sprawdzamy, czy raport ma przypisaną drużynę
          // @ts-expect-error
          const squadId = document?.squad?._ref

          if (!squadId) {
            return {
              filter: '!defined(_id)', // Jeśli brak drużyny, nie pokazuj nikogo
            }
          }

          return {
            filter: 'squad._ref == $squadId && position != "Sztab"', // Tylko zawodnicy z tej kadry (bez trenerów)
            params: { squadId },
          }
        },
        disableNew: true, // Wyłączamy tworzenie nowych zawodników z poziomu raportu
      },
    }),
    // ... reszta pól (minutes, goals, itp.) pozostaje bez zmian ...
    defineField({
      name: 'minutes',
      title: 'Minuty',
      type: 'number',
      initialValue: 90,
    }),
    defineField({
      name: 'goals',
      title: 'Gole',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'assists',
      title: 'Asysty',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'yellowCards',
      title: 'Żółte kartki',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'redCard',
      title: 'Czerwona kartka',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'cleanSheet',
      title: 'Czyste konto',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'player.surname',
      name: 'player.name',
      goals: 'goals',
    },
    prepare({ title, name, goals }) {
      return {
        title: `${title} ${name}`,
        subtitle: `Gole: ${goals}`,
      }
    },
  },
})
