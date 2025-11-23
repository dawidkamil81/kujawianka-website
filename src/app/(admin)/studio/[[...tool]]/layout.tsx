// src/app/(admin)/layout.tsx
export const metadata = {
    title: 'Panel Administratora',
    description: 'Zarządzanie treścią Kujawianka',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl">
            <body style={{ margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    )
}