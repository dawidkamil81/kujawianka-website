import { defineField, defineType } from 'sanity'
import { Users, Phone, CalendarRange } from 'lucide-react'

export const squad = defineType({
    name: 'squad',
    title: 'Kadry (Grupy)',
    type: 'document',
    icon: Users,
    // Grupowanie pól dla porządku
    fieldsets: [
        {
            name: 'infoSection',
            title: '📢 Strefa Informacyjna (Kontakt / Nabór)',
            description: 'Wypełnij te pola, jeśli chcesz wyświetlić sekcję kontaktową i informacje o treningach na stronie tej drużyny.',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: [
        // --- PODSTAWOWE DANE ---
        defineField({
            name: 'name',
            title: 'Nazwa Kadry',
            type: 'string',
            description: 'np. Juniorzy Młodsi, Rocznik 2010, Skrzaty',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Identyfikator URL (Slug)',
            type: 'slug',
            options: { source: 'name' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Kolejność w menu',
            type: 'number',
        }),

        // --- NOWA SEKCJA KONTAKTOWA ---
        defineField({
            name: 'coachName',
            title: 'Imię i Nazwisko Trenera (do kontaktu)',
            type: 'string',
            fieldset: 'infoSection',
            description: 'Pojawi się w sekcji "Kontakt z trenerem".'
        }),
        defineField({
            name: 'coachPhone',
            title: 'Telefon do Trenera',
            type: 'string',
            fieldset: 'infoSection',
            icon: Phone
        }),
        defineField({
            name: 'coachEmail',
            title: 'Email do Trenera (opcjonalnie)',
            type: 'string',
            fieldset: 'infoSection',
        }),

        // --- OPIS / NABÓR / TRENINGI ---
        defineField({
            name: 'description',
            title: 'Informacje o naborze / Treningach',
            type: 'array',
            fieldset: 'infoSection',
            of: [{ type: 'block' }], // Pozwala na pogrubienia, listy itp.
            description: 'Tutaj wpisz godziny treningów, informacje o naborze, wymagane dokumenty itp.',
            icon: CalendarRange
        }),
    ],
    preview: {
        select: {
            title: 'name',
            coach: 'coachName'
        },
        prepare({ title, coach }) {
            return {
                title: title,
                subtitle: coach ? `Trener: ${coach}` : ''
            }
        }
    }
})