import { defineField, defineType } from 'sanity'

// Obiekt pojedynczego wiersza w tabeli
const standingRow = defineField({
  name: 'standingRow',
  title: 'Wiersz tabeli',
  type: 'object',
  fields: [
    defineField({
      name: 'team',
      title: 'Drużyna',
      type: 'reference',
      to: [{ type: 'team' }], // Wybierz z bazy lub stwórz nową (wbudowana funkcja Sanity)
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'matches',
      title: 'M',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'points',
      title: 'PKT',
      type: 'number',
      initialValue: 0,
    }),
    defineField({ name: 'won', title: 'Z', type: 'number', initialValue: 0 }),
    defineField({ name: 'drawn', title: 'R', type: 'number', initialValue: 0 }),
    defineField({ name: 'lost', title: 'P', type: 'number', initialValue: 0 }),
    defineField({
      name: 'goals',
      title: 'Bilans Bramkowy',
      type: 'string',
      description: 'Format: Zdobyte-Stracone (np. 45-12)',
      initialValue: '0-0',
    }),
  ],
  preview: {
    select: {
      teamName: 'team.name',
      points: 'points',
      matches: 'matches',
    },
    prepare({ teamName, points, matches }) {
      return {
        title: teamName || 'Brak drużyny',
        subtitle: `Mecze: ${matches} | Pkt: ${points}`,
      }
    },
  },
})

export const standing = defineType({
  name: 'standing',
  title: 'Tabela Ligowa',
  type: 'document',
  fields: [
    defineField({
      name: 'competition',
      title: 'Rozgrywki',
      type: 'reference',
      to: [{ type: 'competition' }],
      validation: (Rule) => Rule.required(),
    }),
    // Pola automatyczne (read-only w UI, ustawiane przez initialValue lub hooki)
    defineField({
      name: 'season',
      title: 'Sezon (Pobierany z rozgrywek)',
      type: 'string',
      readOnly: false, // Możliwość edycji zgodnie z wymaganiem pkt 3
    }),
    defineField({
      name: 'rows',
      title: 'Tabela',
      type: 'array',
      of: [standingRow],
      validation: (Rule) =>
        Rule.custom(async (rows, context) => {
          // WALIDACJA LIMITU ZESPOŁÓW
          const client = context.getClient({ apiVersion: '2024-01-01' })
          // @ts-expect-error - document w context nie jest precyzyjnie otypowany przez Sanity
          const competitionId = context.document?.competition?._ref

          if (!competitionId) return true

          const competition = await client.fetch(
            `*[_type == "competition" && _id == $id][0]`,
            { id: competitionId },
          )

          if (
            competition &&
            competition.config?.teamsCount &&
            rows &&
            rows.length > competition.config.teamsCount
          ) {
            return `Maksymalna liczba drużyn w tej lidze to ${competition.config.teamsCount}. Masz obecnie ${rows.length}.`
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      competitionName: 'competition.name',
      season: 'season',
    },
    prepare({ competitionName, season }) {
      return {
        title: `Tabela: ${competitionName}`,
        subtitle: season,
      }
    },
  },
})
