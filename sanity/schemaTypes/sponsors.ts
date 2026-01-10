import { defineField, defineType } from 'sanity'

export const sponsor = defineType({
    name: 'sponsor',
    title: 'Sponsorzy i klubowicze',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nazwa Firmy / Imię i Nazwisko',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        // ZMIANA: Teraz to referencja do dynamicznego typu
        defineField({
            name: 'tier',
            title: 'Ranga Sponsora',
            type: 'reference',
            to: [{ type: 'sponsorTier' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo / Zdjęcie',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'website',
            title: 'Strona internetowa (Link)',
            type: 'url',
        }),
        defineField({
            name: 'description',
            title: 'Opis',
            type: 'text',
            rows: 3,
            // Opcjonalnie: możesz usunąć 'hidden' jeśli chcesz opis dla każdego,
            // lub zostawić, ale logika musi być oparta o pobranie referencji (co w Studio jest trudne dynamicznie),
            // więc dla uproszczenia polecam pokazać to pole zawsze lub ukrywać tylko css-em w studio.
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Zdjęcie w tle',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'tier.name', // Pobieramy nazwę z referencji
            media: 'logo',
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle || 'Brak rangi',
                media
            }
        }
    }
})