import { defineField, defineType } from 'sanity'
import { Images } from 'lucide-react'

export const gallerySection = defineType({
    name: 'gallerySection',
    title: 'Sekcja Galeria',
    type: 'object',
    icon: Images,
    fields: [
        defineField({
            name: 'heading',
            title: 'Nagłówek sekcji',
            type: 'string',
            initialValue: 'Galeria zdjęć'
        }),
        defineField({
            name: 'description',
            title: 'Opis (Opcjonalny)',
            type: 'text',
            rows: 2
        }),
        defineField({
            name: 'columns',
            title: 'Liczba kolumn (Desktop)',
            type: 'string',
            options: {
                list: [
                    { title: '2 Kolumny', value: '2' },
                    { title: '3 Kolumny', value: '3' },
                    { title: '4 Kolumny', value: '4' }
                ],
                layout: 'radio'
            },
            initialValue: '3'
        }),
        defineField({
            name: 'images',
            title: 'Zdjęcia',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Tekst alternatywny (Alt)',
                            type: 'string'
                        })
                    ]
                }
            ],
            validation: rule => rule.required().min(1)
        })
    ],
    preview: {
        select: {
            title: 'heading',
            images: 'images'
        },
        prepare({ title, images }) {
            return {
                title: title || 'Galeria',
                subtitle: images ? `${Object.keys(images).length} zdjęć` : 'Brak zdjęć',
                media: Images
            }
        }
    }
})