import type { StructureResolver } from 'sanity/structure'
import {
  Users,
  Calendar,
  Settings,
  FileText,
  Briefcase,
  Download,
  Newspaper,
  Shield,
  Gem,
  Handshake,
  Crown,
  Medal,
  Baby
} from 'lucide-react'

// Funkcja pomocnicza do Terminarza
const createScheduleFolder = (S: any, title: string, categoryValue: string) => {
  const isSenior = categoryValue === 'senior';

  // Seniorzy: pokaż wyniki BEZ kategorii (stare) LUB z kategorią 'senior'
  // Juniorzy/Trampkarze: tylko konkretna kategoria
  const filter = isSenior
    ? '_type == "result" && round == $round && (!defined(category) || category == $category)'
    : '_type == "result" && round == $round && category == $category';

  return S.listItem()
    .title(`Terminarz - ${title}`)
    .icon(Calendar)
    .child(
      S.list()
        .title(`${title} - Kolejki`)
        .items(
          Array.from({ length: 34 }, (_, i) => i + 1).map((round) =>
            S.listItem()
              .title(`Kolejka ${round}`)
              .child(
                S.documentList()
                  .title(`Mecze - Kolejka ${round}`)
                  .schemaType('result')
                  .filter(filter)
                  .params({ round, category: categoryValue })
                  .defaultOrdering([{ field: 'date', direction: 'asc' }])
              )
          )
        )
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Panel Administratora')
    .items([
      // --- 1. USTAWIENIA ---
      S.listItem()
        .title('Ustawienia Globalne')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Konfiguracja Strony')
        ),

      S.divider(),

      // --- 2. AKTUALNOŚCI ---
      S.documentTypeListItem('news')
        .title('Aktualności')
        .icon(Newspaper),

      S.divider(),

      // --- 3. TABELA I WYNIKI (Główny poziom) ---
      S.listItem()
        .title('Tabela i Wyniki')
        .icon(FileText)
        .child(
          S.list()
            .title('Wybierz Kategorię')
            .items([
              // A. SENIORZY
              S.listItem()
                .title('Seniorzy')
                .icon(Medal)
                .child(
                  S.list()
                    .title('Seniorzy')
                    .items([
                      S.listItem()
                        .title('Tabela Ligowa')
                        .icon(FileText)
                        .child(
                          S.documentList()
                            .title('Tabela Ligowa')
                            .schemaType('table')
                            .filter('_type == "table" && (!defined(category) || category == "senior")')
                        ),
                      createScheduleFolder(S, 'Seniorzy', 'senior')
                    ])
                ),
              // B. JUNIORZY
              S.listItem()
                .title('Juniorzy')
                .icon(Users)
                .child(
                  S.list()
                    .title('Juniorzy')
                    .items([
                      S.listItem()
                        .title('Tabela Ligowa')
                        .icon(FileText)
                        .child(
                          S.documentList()
                            .title('Tabela Ligowa')
                            .schemaType('table')
                            .filter('_type == "table" && category == "junior"')
                        ),
                      createScheduleFolder(S, 'Juniorzy', 'junior')
                    ])
                ),
              // C. TRAMPKARZE
              S.listItem()
                .title('Trampkarze')
                .icon(Baby)
                .child(
                  S.list()
                    .title('Trampkarze')
                    .items([
                      S.listItem()
                        .title('Tabela Ligowa')
                        .icon(FileText)
                        .child(
                          S.documentList()
                            .title('Tabela Ligowa')
                            .schemaType('table')
                            .filter('_type == "table" && category == "trampkarz"')
                        ),
                      createScheduleFolder(S, 'Trampkarze', 'trampkarz')
                    ])
                ),
            ])
        ),

      // --- 4. DRUŻYNY (Główny poziom) ---
      S.listItem()
        .title('Kadra')
        .icon(Users)
        .child(
          S.list()
            .title('Wybierz Kategorię')
            .items([
              // A. SENIORZY
              S.listItem()
                .title('Seniorzy')
                .icon(Medal)
                .child(
                  S.list()
                    .title('Seniorzy - Zarządzanie')
                    .items([
                      S.listItem()
                        .title('Kadra Zawodnicza')
                        .child(
                          S.documentList()
                            .title('Seniorzy - Kadra')
                            .schemaType('player')
                            .filter('_type == "player" && (!defined(category) || category == "senior") && position != "Sztab"')
                        ),
                      S.listItem()
                        .title('Sztab Szkoleniowy')
                        .child(
                          S.documentList()
                            .title('Seniorzy - Sztab')
                            .schemaType('player')
                            .filter('_type == "player" && (!defined(category) || category == "senior") && position == "Sztab"')
                        )
                    ])
                ),

              // B. JUNIORZY
              S.listItem()
                .title('Juniorzy')
                .icon(Users)
                .child(
                  S.documentList()
                    .title('Kadra Juniorów')
                    .schemaType('player')
                    .filter('_type == "player" && category == "junior"')
                ),

              // C. TRAMPKARZE
              S.listItem()
                .title('Trampkarze')
                .icon(Baby)
                .child(
                  S.documentList()
                    .title('Kadra Trampkarzy')
                    .schemaType('player')
                    .filter('_type == "player" && category == "trampkarz"')
                ),
            ])
        ),

      // --- 5. BAZA KLUBÓW (Główny poziom) ---
      S.documentTypeListItem('team')
        .title('Loga zespołów')
        .icon(Shield),

      S.divider(),

      // --- 6. BIZNES ---
      S.listItem()
        .title('Biznes i Partnerzy')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Strefa Biznesowa')
            .items([
              S.listItem().title('Sponsorzy').icon(Gem).child(
                S.documentList().title('Sponsorzy').schemaType('sponsor')
                  .filter('_type == "sponsor" && tier in ["main", "strategic", "technical"]')
              ),
              S.listItem().title('Klubowicze').icon(Handshake).child(
                S.documentList().title('Klubowicze').schemaType('sponsor')
                  .filter('_type == "sponsor" && tier == "partner"')
              ),
              S.listItem().title('Klub 100').icon(Crown).child(
                S.documentList().title('Klub 100').schemaType('sponsor')
                  .filter('_type == "sponsor" && tier == "club100"')
              ),
            ])
        ),

      S.divider(),

      // --- 7. POZOSTAŁE ---
      S.documentTypeListItem('page')
        .title('Strony Statyczne')
        .icon(FileText),

      S.documentTypeListItem('download')
        .title('Pliki do pobrania')
        .icon(Download),
    ])