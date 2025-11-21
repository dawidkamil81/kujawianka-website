import "./globals.css";
import Header from "../components/Header";

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
      <body className="bg-neutral-50 text-neutral-900">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        <footer className="bg-[#174135] text-white text-center text-sm py-4">
          © {new Date().getFullYear()} Kujawianka – Wszystkie prawa zastrzeżone.
        </footer>
      </body>
    </html>
  );
}
