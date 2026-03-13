import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Kujawianka Izbica Kujawska',
  description:
    'Zasady przetwarzania danych osobowych i polityka cookies w serwisie MGKS Kujawianka Izbica Kujawska.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Tło i dekoracje */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      {/* Zwężony kontener (max-w-3xl) dla lepszej czytelności minimalistycznego tekstu */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 md:py-32">
        {/* Nagłówek strony (Zostawiony bez zmian) */}
        <div className="mb-20 text-center">
          <span className="text-xs font-bold tracking-widest text-[#da1818] uppercase">
            Dokument
          </span>
          <h1 className="font-montserrat mt-4 text-3xl font-black tracking-tight text-white uppercase md:text-5xl">
            Polityka <span className="text-[#da1818]">Prywatności</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
        </div>

        {/* Treść dokumentu - Minimalistyczna */}
        <div className="prose prose-invert prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-white prose-a:text-[#da1818] hover:prose-a:text-red-400 prose-strong:text-white max-w-none space-y-16 text-sm leading-relaxed text-gray-400 md:text-base">
          <div>
            <h2 className="mb-6 border-b border-white/10 pb-4 text-xl md:text-2xl">
              1. Informacje ogólne
            </h2>
            <p className="mb-4">
              Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod
              adresem url:{' '}
              <strong>https://kujawianka-website.vercel.app</strong> (oraz
              docelowej domeny klubu).
            </p>
            <p className="mb-4">
              Operatorem serwisu oraz Administratorem danych osobowych jest:{' '}
              <strong>MGKS Kujawianka Izbica Kujawska</strong>, ul. Sportowa 1a,
              87-865 Izbica Kujawska, KRS: 0000270261.
            </p>
            <p className="mb-4">
              Adres kontaktowy poczty elektronicznej operatora:{' '}
              <a
                href="mailto:kujawiankaizbicakujawska@gmail.com"
                className="font-medium"
              >
                kujawiankaizbicakujawska@gmail.com
              </a>
            </p>
            <p>
              Operator jest Administratorem Twoich danych osobowych w
              odniesieniu do danych podanych dobrowolnie podczas kontaktu z
              Klubem (np. poprzez wysłanie wiadomości e-mail). Serwis
              wykorzystuje dane wyłącznie w celach informacyjnych oraz do
              nawiązania ewentualnego kontaktu z Użytkownikiem na jego prośbę.
            </p>
          </div>

          <div>
            <h2 className="mb-6 border-b border-white/10 pb-4 text-xl md:text-2xl">
              2. Metody ochrony danych
            </h2>
            <p className="mb-4">
              Komunikacja między Twoim komputerem a naszym serwerem jest
              chroniona w warstwie transmisji (certyfikat SSL). Dzięki temu dane
              wprowadzane na stronie lub przesyłane w tle zostają zaszyfrowane i
              mogą być odczytane jedynie na docelowym serwerze.
            </p>
            <p>
              Istotnym elementem ochrony danych jest również regularna
              aktualizacja oprogramowania i komponentów programistycznych
              wykorzystywanych do utrzymania Serwisu.
            </p>
          </div>

          <div>
            <h2 className="mb-6 border-b border-white/10 pb-4 text-xl md:text-2xl">
              3. Hosting i zewnętrzni dostawcy
            </h2>
            <p className="mb-4">
              Serwis jest hostowany (technicznie utrzymywany) oraz zarządzany
              przy użyciu zewnętrznych dostawców usług o ugruntowanej pozycji
              rynkowej:
            </p>
            <ul className="mb-4 space-y-2">
              <li>
                <strong>Vercel Inc.</strong> – firma hostingowa, na której
                serwerach znajduje się strona internetowa.
              </li>
              <li>
                <strong>Sanity AS</strong> – dostawca systemu zarządzania
                treścią (CMS), w którym przechowywane są teksty oraz pliki
                graficzne Serwisu.
              </li>
            </ul>
            <p>
              Firma hostingowa, w celu zapewnienia niezawodności technicznej i
              bezpieczeństwa, prowadzi standardowe logi na poziomie serwera.
              Zapisowi mogą podlegać m.in.: czas nadejścia zapytania, informacje
              o błędach HTTP, informacje o przeglądarce użytkownika oraz
              zanonimizowane adresy IP.
            </p>
          </div>

          <div>
            <h2 className="mb-6 border-b border-white/10 pb-4 text-xl md:text-2xl">
              4. Analityka i Pliki Cookies
            </h2>
            <p className="mb-4">
              Nasz Serwis dba o Twoją prywatność.{' '}
              <strong>
                Nie wykorzystujemy inwazyjnych plików cookies (ciasteczek) w
                celach śledzenia Użytkowników, profilowania ani reklam (brak
                Google Analytics, Meta Pixel itp.).
              </strong>
            </p>
            <ol className="space-y-4">
              <li>
                Serwis wykorzystuje narzędzie analityczne{' '}
                <strong>Vercel Analytics</strong>, które zostało zaprojektowane
                zgodnie z zasadą <em>privacy-first</em> (przyjazne prywatności).
                Narzędzie to służy wyłącznie do zbierania ogólnych, anonimowych
                statystyk odwiedzin (np. liczba wyświetleń strony, rodzaj
                urządzenia).
              </li>
              <li>
                Vercel Analytics nie przechowuje na Twoim urządzeniu plików
                cookies służących do śledzenia Cię pomiędzy różnymi stronami
                internetowymi. Działanie systemu opiera się na hashowaniu
                (kryptograficznym zabezpieczaniu) adresów IP, co uniemożliwia
                Twoją identyfikację jako konkretnej osoby fizycznej.
              </li>
              <li>
                Jeśli w Twojej przeglądarce zapiszą się jakiekolwiek pliki
                techniczne z naszej domeny, służą one wyłącznie poprawnemu
                wyświetlaniu strony oraz kwestiom bezpieczeństwa (tzw.
                ciasteczka niezbędne).
              </li>
            </ol>
          </div>

          <div>
            <h2 className="mb-6 border-b border-white/10 pb-4 text-xl md:text-2xl">
              5. Twoje prawa i wykorzystanie danych
            </h2>
            <p className="mb-4">
              Zgodnie z przepisami RODO, przysługują Ci następujące prawa
              związane z przetwarzaniem Twoich danych osobowych:
            </p>
            <ul className="mb-6 grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
              <li>Dostępu do danych osobowych</li>
              <li>Żądania ich sprostowania</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Sprzeciwu wobec przetwarzania</li>
            </ul>
            <p className="mb-4">
              W celach technicznych (hosting, infrastruktura chmurowa),
              zanonimizowane dane mogą być przesyłane do krajów trzecich (poza
              teren Unii Europejskiej), jednak nasi partnerzy (Vercel, Sanity)
              zapewniają odpowiednie mechanizmy ochrony zgodne z europejskimi
              standardami (m.in. Standardowe Klauzule Umowne).
            </p>
            <p className="mb-4">
              Twoje dane kontaktowe (np. pochodzące z wysłanej do nas
              korespondencji e-mail) przetwarzamy nie dłużej, niż jest to
              konieczne do udzielenia odpowiedzi lub załatwienia sprawy. Serwis
              nie prowadzi zautomatyzowanego podejmowania decyzji ani
              profilowania Użytkowników.
            </p>
            <p className="mb-8">
              Na działania Administratora przysługuje prawo wniesienia skargi do
              Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193
              Warszawa).
            </p>

            <p className="mt-8 rounded-lg bg-white/5 p-4 text-center text-sm">
              W sprawach związanych z prywatnością skontaktuj się z nami na
              e-mail:{' '}
              <a
                href="mailto:kujawiankaizbicakujawska@gmail.com"
                className="font-medium"
              >
                kujawiankaizbicakujawska@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
