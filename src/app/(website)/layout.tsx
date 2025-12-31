import "./globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "Kujawianka – Oficjalna Strona Klubu",
  description:
    "Amatorski klub piłkarski Kujawianka – aktualności, wyniki, skład i kontakt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      {/* Zmieniamy bg-neutral-50 na ciemne tło i ustawiamy flexbox dla pełnej wysokości */}
      <body className="bg-[#121212] text-white min-h-screen flex flex-col font-sans antialiased">
        <Header />

        {/* USUWAMY ograniczenia szerokości (max-w-6xl, px-6). 
            Teraz main zajmuje 100% szerokości. */}
        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}