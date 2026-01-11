import { defineType } from 'sanity'

export const pageBuilder = defineType({
    name: 'pageBuilder',
    title: 'Kreator Sekcji',
    type: 'array', // To jest kluczowe - definiujemy to jako tablicę
    of: [
        // Tutaj wrzucasz wszystkie swoje dostępne klocki
        { type: 'textSection' },
        { type: 'imageTextSection' },
        { type: 'featuresSection' },
        { type: 'tableSection' },
        { type: 'gallerySection' },
        { type: 'contactSection' },
        // W przyszłości jak dodasz 'videoSection', dopiszesz to TYLKO TUTAJ
        // i automatycznie pojawi się na wszystkich podstronach!
    ],
    options: {
        insertMenu: {
            views: [
                { name: 'list' }
            ]
        }
    }
})