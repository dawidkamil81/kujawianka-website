import { defineField, defineType } from 'sanity'

export const player = defineType({
  name: 'player',
  title: 'Zawodnik',
  type: 'document',

  // 1. Definiujemy grupę dla porządku w panelu
  fieldsets: [
    {
      name: 'stats',
      title: 'Statystyki (Obecny Sezon)',
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    // --- DANE PODSTAWOWE ---
    defineField({ name: 'name', title: 'Imię', type: 'string' }),
    defineField({ name: 'surname', title: 'Nazwisko', type: 'string' }),
    defineField({ name: 'number', title: 'Numer', type: 'number' }),
    defineField({
      name: 'position',
      title: 'Pozycja',
      type: 'string',
      options: {
        list: [
          { title: 'Bramkarz', value: 'Bramkarz' },
          { title: 'Obrońca', value: 'Obrońca' },
          { title: 'Pomocnik', value: 'Pomocnik' },
          { title: 'Napastnik', value: 'Napastnik' },
          { title: 'Sztab', value: 'Sztab' },
        ],
      },
    }),

    // --- STATYSTYKI (Wszystkie w fieldsecie 'stats') ---
    defineField({
      name: 'matches',
      title: 'Rozegrane mecze',
      type: 'number',
      fieldset: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'goals',
      title: 'Bramki',
      type: 'number',
      fieldset: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'assists',
      title: 'Asysty',
      type: 'number',
      fieldset: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'cleanSheets',
      title: 'Czyste konta',
      type: 'number',
      fieldset: 'stats',
      initialValue: 0,
      // Ukrywamy to pole, jeśli zawodnik nie jest bramkarzem
      hidden: ({ document }) => document?.position !== 'Bramkarz',
    }),
    defineField({
      name: 'yellowCards',
      title: 'Żółte kartki',
      type: 'number',
      fieldset: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'redCards',
      title: 'Czerwone kartki',
      type: 'number',
      fieldset: 'stats',
      initialValue: 0,
    }),

    // --- RESZTA PÓL ---
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'squad',
      title: 'Przypisana Kadra',
      type: 'reference',
      to: [{ type: 'squad' }],
      description: 'Wybierz grupę wiekową, do której należy ten zawodnik.',
    }),

    defineField({
      name: 'staffRole',
      title: 'Rola w Sztabie',
      type: 'reference',
      to: [{ type: 'staffRole' }],
      description: 'Wybierz funkcję (np. Trener, Fizjoterapeuta)',
      hidden: ({ document }) => document?.position !== 'Sztab',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.position === 'Sztab' && !value) {
            return 'Musisz wybrać rolę dla członka sztabu'
          }
          return true
        }),
    }),
  ],

  // --- SEKCJA PODGLĄDU ---
  preview: {
    select: {
      name: 'name',
      surname: 'surname',
      media: 'image',
      position: 'position',
      staffRoleName: 'staffRole.name',
    },
    prepare({ name, surname, media, position, staffRoleName }) {
      const title =
        name && surname ? `${name} ${surname}` : name || surname || 'Nowy'
      const subtitle =
        position === 'Sztab' && staffRoleName ? staffRoleName : position

      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
