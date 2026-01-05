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
    ],
    // --- SEKCJA PODGLĄDU ---
    preview: {
        select: {
            name: 'name',
            surname: 'surname',
            media: 'image',
            position: 'position'
        },
        prepare({ name, surname, media, position }) {
            // Sprawdzamy czy mamy imię i nazwisko, jeśli nie - wyświetlamy "Nowy Zawodnik"
            const title = name && surname ? `${name} ${surname}` : (name || surname || 'Nowy Zawodnik')

            return {
                title: title,
                subtitle: position, // Pod spodem pojawi się np. "Pomocnik"
                media: media
            }
        }
    }
})