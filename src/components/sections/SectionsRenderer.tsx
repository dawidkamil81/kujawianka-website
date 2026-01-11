import TextSection from "./TextSection";
import ImageTextSection from "./ImageTextSection";
// Importujemy Twój gotowy komponent (upewnij się, że ścieżka jest poprawna)
import ContactSection from "@/components/sections/ContactSection";
import FeaturesSection from "./FeaturesSection"; // <--- Import
import TableSection from "./TableSection";
import GallerySection from "./GallerySection";

const sectionMap: Record<string, React.ComponentType<any>> = {
    textSection: TextSection,
    imageTextSection: ImageTextSection,
    featuresSection: FeaturesSection,
    contactSection: ContactSection,
    tableSection: TableSection, // <--- Mapowanie
    gallerySection: GallerySection,
};

export default function SectionsRenderer({ sections }: { sections: any[] }) {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="flex flex-col gap-0">
            {sections.map((section) => {
                const Component = sectionMap[section._type];
                if (!Component) return null;

                // Przekazujemy 'data' do komponentu. 
                // Twój ContactSection oczekuje propsów 'title' i 'description' bezpośrednio, 
                // a z CMS przychodzi obiekt 'data' z polami title i description.
                // Musimy to lekko dopasować.

                if (section._type === 'contactSection') {
                    return (
                        <ContactSection
                            key={section._key}
                            title={section.title}
                            description={section.description}
                        />
                    );
                }

                return <Component key={section._key} data={section} />;
            })}
        </div>
    );
}