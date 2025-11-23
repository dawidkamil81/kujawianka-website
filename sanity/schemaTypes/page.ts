import { defineField, defineType } from 'sanity'
import { Square, Image as ImageIcon, Type, Star, Megaphone } from 'lucide-react'
// Opcjonalnie: ikony dla ładniejszego wyglądu w Studio (jeśli nie masz lucide-react w studio, usuń imports i icon: ...)

export const page = defineType({
    name: 'page',
    title: 'Strona (Page Builder)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tytuł Strony (np. O nas)',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Adres URL (np. /o-nas)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        // === TO JEST SERCE PAGE BUILDERA ===
        defineField({
            name: 'content',
            title: 'Sekcje Strony',
            description: 'Dodawaj, usuwaj i zmieniaj kolejność sekcji na stronie.',
            type: 'array',
            of: [
                // 1. Sekcja HERO (Nagłówek z tłem)
                defineField({
                    name: 'heroSection',
                    title: 'Hero (Duży Baner)',
                    type: 'object',
                    // icon: Square, // Opcjonalnie ikona
                    fields: [
                        defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
                        defineField({ name: 'subheading', title: 'Podtytuł', type: 'text', rows: 3 }),
                        defineField({ name: 'image', title: 'Zdjęcie w tle', type: 'image', options: { hotspot: true } }),
                    ],
                    preview: {
                        select: { title: 'heading', media: 'image' },
                        prepare({ title, media }) {
                            return { title: title || 'Hero bez tytułu', subtitle: 'Sekcja Hero', media }
                        }
                    }
                }),

                // 2. Sekcja TEKSTOWA
                defineField({
                    name: 'textSection',
                    title: 'Sekcja Tekstowa',
                    type: 'object',
                    // icon: Type,
                    fields: [
                        defineField({ name: 'heading', title: 'Tytuł sekcji', type: 'string' }),
                        defineField({ name: 'content', title: 'Treść', type: 'array', of: [{ type: 'block' }] }),
                    ],
                    preview: {
                        select: { title: 'heading' },
                        prepare({ title }) {
                            return { title: title || 'Sekcja Tekstowa', subtitle: 'Tekst i nagłówek' }
                        }
                    }
                }),

                // 3. Sekcja GALERIA
                defineField({
                    name: 'gallerySection',
                    title: 'Galeria Zdjęć',
                    type: 'object',
                    // icon: ImageIcon,
                    fields: [
                        defineField({ name: 'title', title: 'Tytuł Galerii', type: 'string' }),
                        defineField({
                            name: 'images',
                            title: 'Zdjęcia',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }]
                        }),
                    ],
                    preview: {
                        select: { title: 'title', images: 'images' },
                        prepare({ title, images }) {
                            return {
                                title: title || 'Galeria',
                                subtitle: `${images?.length || 0} zdjęć`,
                                media: images && images[0]
                            }
                        }
                    }
                }),

                // 4. Sekcja SPONSORZY (Automatyczna)
                defineField({
                    name: 'sponsorsSection',
                    title: 'Pasek Sponsorów',
                    type: 'object',
                    // icon: Star,
                    fields: [
                        defineField({
                            name: 'showTitle',
                            title: 'Pokaż nagłówek "Nasi Sponsorzy"?',
                            type: 'boolean',
                            initialValue: true
                        }),
                    ],
                    preview: {
                        prepare() {
                            return { title: 'Pasek Sponsorów', subtitle: 'Automatycznie wyświetla loga z bazy' }
                        }
                    }
                }),

                // 5. Sekcja CTA (Call to Action)
                defineField({
                    name: 'ctaSection',
                    title: 'Wezwanie do działania (CTA)',
                    type: 'object',
                    // icon: Megaphone,
                    fields: [
                        defineField({ name: 'heading', title: 'Hasło', type: 'string' }),
                        defineField({ name: 'text', title: 'Opis zachęty', type: 'text', rows: 2 }),
                        defineField({ name: 'buttonText', title: 'Tekst na przycisku', type: 'string' }),
                        defineField({ name: 'buttonUrl', title: 'Link (np. /kontakt)', type: 'string' }),
                        defineField({ name: 'backgroundImage', title: 'Tło (opcjonalnie)', type: 'image' }),
                    ],
                    preview: {
                        select: { title: 'heading' },
                        prepare({ title }) {
                            return { title: title || 'CTA', subtitle: 'Wezwanie do działania' }
                        }
                    }
                }),
            ],
        }),
    ],
})