import dynamic from 'next/dynamic'

const TextSection = dynamic(() => import('./TextSection'))
const ImageTextSection = dynamic(() => import('./ImageTextSection'))
const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
)
const FeaturesSection = dynamic(() => import('./FeaturesSection'))
const TableSection = dynamic(() => import('./TableSection'))
const GallerySection = dynamic(() => import('./GallerySection'))

// Deklarujemy typ dla przychodzących z Sanity sekcji
interface SanitySection {
  _type: string
  _key: string
  title?: string
  description?: string
  contact?: {
    address?: string
    email?: string
    phone?: string
  }
  [key: string]: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionMap: Record<string, React.ComponentType<any>> = {
  textSection: TextSection,
  imageTextSection: ImageTextSection,
  featuresSection: FeaturesSection,
  contactSection: ContactSection,
  tableSection: TableSection,
  gallerySection: GallerySection,
}

interface SectionsRendererProps {
  sections: SanitySection[]
}

export default function SectionsRenderer({ sections }: SectionsRendererProps) {
  if (!sections || sections.length === 0) return null

  return (
    <div className="flex flex-col gap-0">
      {sections.map((section) => {
        const Component = sectionMap[section._type]
        if (!Component) return null

        if (section._type === 'contactSection') {
          return (
            <ContactSection
              key={section._key}
              title={section.title}
              description={section.description}
              contact={section.contact}
            />
          )
        }

        return <Component key={section._key} data={section} />
      })}
    </div>
  )
}
