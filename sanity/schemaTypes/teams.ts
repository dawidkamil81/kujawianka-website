import { defineField, defineType } from 'sanity'

export const team = defineType({
    name: 'team', // Ważne: liczba pojedyncza, tak jak w zapytaniach GROQ
    title: 'Baza Zespołów (Loga)',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nazwa Zespołu',
            type: 'string',
            description: 'Wpisz nazwę DOKŁADNIE taką, jak pojawia się na 90minut.pl (kopiuj-wklej).',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo', // Zmienione z 'image' na 'logo', żeby pasowało do kodu frontend
            title: 'Herb Klubu',
            type: 'image',
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo'
        }
    }
})