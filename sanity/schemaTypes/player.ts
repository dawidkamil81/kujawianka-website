import { defineField, defineType } from 'sanity'

export const player = defineType({
    name: 'player',
    title: 'Zawodnik',
    type: 'document',
    fields: [
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
                    { title: 'Sztab', value: 'Sztab' }
                ]
            }
        }),
        defineField({ name: 'matches', title: 'Mecze', type: 'number' }),
        defineField({ name: 'goals', title: 'Bramki', type: 'number' }),
        defineField({ name: 'assists', title: 'Asysty', type: 'number' }),
        defineField({ name: 'yellowCards', title: 'Żółte kartki', type: 'number' }),
        defineField({ name: 'redCards', title: 'Czerwone kartki', type: 'number' }),
        defineField({ name: 'image', title: 'Zdjęcie', type: 'image', options: { hotspot: true } }),
        defineField({
            name: 'squad',
            title: 'Przypisana Kadra',
            type: 'reference', // Kluczowa zmiana: Referencja do dokumentu
            to: [{ type: 'squad' }],
            description: 'Wybierz grupę wiekową, do której należy ten zawodnik.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'staffRole',
            title: 'Rola w Sztabie',
            type: 'reference',
            to: [{ type: 'staffRole' }], // Pobiera opcje z nowego dokumentu
            description: 'Wybierz funkcję (np. Trener, Fizjoterapeuta)',
            // To pole pokaże się TYLKO jeśli wybrano pozycję "Sztab"
            hidden: ({ document }) => document?.position !== 'Sztab',
            validation: (rule) => rule.custom((value, context) => {
                // Wymagamy tego pola tylko dla sztabu
                // @ts-ignore
                if (context.document?.position === 'Sztab' && !value) {
                    return 'Musisz wybrać rolę dla członka sztabu'
                }
                return true
            })
        }),
    ],
    // --- SEKCJA PODGLĄDU ---
    preview: {
        select: {
            name: 'name',
            surname: 'surname',
            media: 'image',
            position: 'position',
            staffRoleName: 'staffRole.name' // Pobieramy nazwę roli z referencji
        },
        prepare({ name, surname, media, position, staffRoleName }) {
            const title = name && surname ? `${name} ${surname}` : (name || surname || 'Nowy')
            // Jeśli to sztab i mamy wybraną rolę, wyświetl rolę. Jeśli nie - pozycję.
            const subtitle = position === 'Sztab' && staffRoleName ? staffRoleName : position

            return {
                title: title,
                subtitle: subtitle,
                media: media
            }
        }
    }
})