import "./globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
