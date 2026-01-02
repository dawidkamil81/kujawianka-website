import "./globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live"; // <--- 1. DODAJ IMPORT

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
      <body className="bg-[#121212] text-white min-h-screen flex flex-col font-sans antialiased">
        <Header />

        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer />

        {/* <--- 2. DODAJ KOMPONENT NASŁUCHUJĄCY NA KOŃCU BODY */}
        <SanityLive />
      </body>
    </html>
  );
}