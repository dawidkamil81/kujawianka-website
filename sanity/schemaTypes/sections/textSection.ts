import { defineField, defineType } from 'sanity'
import { Type } from 'lucide-react'

export const textSection = defineType({
    name: 'textSection',
    title: 'Sekcja Tekstowa',
    type: 'object',
    icon: Type,
    fields: [
        defineField({
            name: 'eyebrow',
            title: 'Nadtytuł (Mały tekst nad nagłówkiem)',
            description: 'Np. "NASZA MISJA" lub "WAŻNY KOMUNIKAT"',
            type: 'string',
        }),
        defineField({
            name: 'heading',
            title: 'Nagłówek',
            type: 'string'
        }),
        defineField({
            name: 'content',
            title: 'Treść',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'isCentered',
            title: 'Wyśrodkuj tekst',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'design',
            title: 'Styl sekcji',
            type: 'string',
            options: {
                list: [
                    { title: 'Standardowy (Czysty)', value: 'standard' },
                    { title: 'Przeźroczysty (Karta)', value: 'card' }
                ],
                layout: 'radio'
            },
            initialValue: 'standard'
        })
    ],
    preview: {
        select: { title: 'heading', subtitle: 'content.0.children.0.text' },
        prepare({ title, subtitle }) {
            return { title: title || 'Sekcja Tekstowa', subtitle, media: Type }
        }
    }
})