import { defineField, defineType } from 'sanity'

export const sponsor = defineType({
    name: 'sponsor',
    title: 'Sponsorzy i klubowicze',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            // Zmieniamy tytuł, aby pasował do obu przypadków
            title: 'Nazwa Firmy / Imię i Nazwisko',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tier',
            title: 'Ranga Sponsora',
            type: 'string',
            options: {
                list: [
                    { title: 'Sponsor Główny', value: 'main' },
                    { title: 'Sponsor Strategiczny', value: 'strategic' },
                    { title: 'Partner Techniczny', value: 'technical' },
                    { title: 'Klubowicz', value: 'partner' },
                ],
                layout: 'radio'
            },
            initialValue: 'partner',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo / Zdjęcie',
            type: 'image',
            options: { hotspot: true },
            // Logo nie powinno być wymagane dla każdego (np. zwykły Klubowicz może nie mieć zdjęcia)
            // validation: (rule) => rule.required(), 
        }),
        defineField({
            name: 'website',
            title: 'Strona internetowa (Link)',
            type: 'url',
        }),
        // Pola specjalne dla Sponsorów Głównych
        defineField({
            name: 'description',
            title: 'Opis',
            type: 'text',
            rows: 3,
            // Ukrywamy, jeśli to zwykły klubowicz (partner) lub techniczny.
            // Zostawiamy dla Main i Strategic.
            hidden: ({ document }) => document?.tier !== 'main' && document?.tier !== 'strategic',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Zdjęcie w tle',
            type: 'image',
            options: { hotspot: true },
            hidden: ({ document }) => document?.tier !== 'main',
        }),
        // USUNĄŁEM dolne pola 'name' i 'surname'. 
        // Wpisuj Imię i Nazwisko w głównym polu 'name' na górze.
        // Dzięki temu unikasz błędu duplikacji i masz porządek w bazie.
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'tier',
            media: 'logo',
        },
        prepare({ title, subtitle, media }) {
            const tiers: Record<string, string> = {
                main: 'Sponsor Główny',
                strategic: 'Sponsor Strategiczny',
                technical: 'Partner Techniczny',
                partner: 'Klubowicz'
            }
            return {
                title,
                subtitle: tiers[subtitle as string] || subtitle,
                media
            }
        }
    }
})