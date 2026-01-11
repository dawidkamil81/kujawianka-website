import { defineField, defineType } from 'sanity'
import { Phone } from 'lucide-react'

export const contactSection = defineType({
    name: 'contactSection',
    title: 'Sekcja Kontaktowa',
    type: 'object',
    icon: Phone,
    fields: [
        defineField({
            name: 'title',
            title: 'Nagłówek',
            type: 'string',
            initialValue: 'Skontaktuj się'
        }),
        defineField({
            name: 'description',
            title: 'Opis pod nagłówkiem',
            type: 'text',
            rows: 3,
            initialValue: 'Masz pytania lub propozycję współpracy? Jesteśmy do Twojej dyspozycji.'
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description'
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Sekcja Kontaktowa',
                subtitle: subtitle,
                media: Phone
            }
        }
    }
})