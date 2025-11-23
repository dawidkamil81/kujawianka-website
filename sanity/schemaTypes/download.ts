import { defineField, defineType } from 'sanity'

export const downloadFile = defineType({
    name: 'downloadFile',
    title: 'Pliki do pobrania', // To zobaczysz w menu po lewej w Studio
    type: 'document',           // Ważne: to sprawia, że jest to osobna lista w panelu
    fields: [
        defineField({
            name: 'title',
            title: 'Nazwa wyświetlana',
            description: 'Np. Regulamin Klubu 2025',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'file',
            title: 'Plik',
            type: 'file',
            options: {
                storeOriginalFilename: true, // Zachowuje oryginalną nazwę (np. regulamin.pdf)
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Krótki opis (opcjonalnie)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'category',
            title: 'Kategoria',
            type: 'string',
            options: {
                list: [
                    { title: 'Dokumenty', value: 'docs' },
                    { title: 'Dla Rodziców', value: 'parents' },
                    { title: 'Inne', value: 'other' },
                ],
            },
            initialValue: 'docs',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
        }
    }
})