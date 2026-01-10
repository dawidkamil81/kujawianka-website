import { type StructureResolver } from 'sanity/structure'
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
  Baby,
  Heart,
  ListFilter,
  Edit,
  Shirt,
  UserCog,
  Tag
} from 'lucide-react'

// Funkcja pomocnicza do Terminarza (bez zmian)
const createScheduleFolder = (S: any, title: string, categoryValue: string) => {
  const isSenior = categoryValue === 'senior';
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
          S.list()
            .title('Konfiguracja')
            .items([
              S.documentListItem()
                .schemaType('siteSettings')
                .id('siteSettings')
                .title('Konfiguracja Strony'),
              S.divider(),
              S.documentTypeListItem('squad')
                .title('Dane drużyn (grupy wiekowe)')
                .icon(ListFilter),
              S.documentTypeListItem('staffRole')
                .title('Role w Sztabie')
                .icon(UserCog),
              S.documentTypeListItem('sponsorTier')
                .title('Typy Sponsorów / Rang')
                .icon(Tag)
            ])
        ),

      S.divider(),

      // --- 2. AKTUALNOŚCI ---
      S.documentTypeListItem('news')
        .title('Aktualności')
        .icon(Newspaper),

      S.divider(),

      // --- 3. KADRY DRUŻYN ---
      S.listItem()
        .title('Drużyny')
        .icon(Users)
        .child(
          S.list()
            .title('Zarządzanie Kadrami')
            .items([
              // A. Baza wszystkich
              S.listItem()
                .title('Wszyscy zawodnicy i sztab')
                .icon(Users)
                .child(S.documentTypeList('player')),

              S.divider(),

              // B. Lista Drużyn
              S.listItem()
                .title('Lista Drużyn')
                .icon(ListFilter)
                .child(
                  S.documentTypeList('squad')
                    .title('Wybierz Drużynę')
                    .child(squadId =>
                      S.list()
                        .title('Zarządzanie Drużyną')
                        .items([
                          // 1. Konfiguracja drużyny
                          S.listItem()
                            .title('Dane Drużyny')
                            .icon(Edit)
                            .child(
                              S.document()
                                .schemaType('squad')
                                .documentId(squadId)
                            ),

                          S.divider(),

                          // 2. KADRA ZAWODNICZA
                          S.listItem()
                            .title('Kadra Zawodnicza')
                            .icon(Shirt)
                            .child(
                              S.documentList()
                                .title('Lista Piłkarzy')
                                .schemaType('player')
                                .filter('_type == "player" && squad._ref == $squadId && position != "Sztab"')
                                .params({ squadId })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem('player-by-squad', { squadId })
                                ])
                            ),

                          // 3. SZTAB SZKOLENIOWY
                          S.listItem()
                            .title('Sztab Szkoleniowy')
                            .icon(UserCog)
                            .child(
                              S.documentList()
                                .title('Lista Sztabu')
                                .schemaType('player')
                                .filter('_type == "player" && squad._ref == $squadId && position == "Sztab"')
                                .params({ squadId })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem('staff-by-squad', { squadId })
                                ])
                            )
                        ])
                    )
                )
            ])
        ),

      S.divider(),

      // --- 4. TABELA I WYNIKI ---
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
                    .title('Seniorzy - Liga')
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
              S.divider(),
              // B. POZOSTAŁE GRUPY
              S.listItem()
                .title('Tabele Grup Młodzieżowych')
                .icon(Users)
                .child(
                  S.documentTypeList('squad')
                    .title('Wybierz Grupę')
                    .child(squadId =>
                      S.documentList()
                        .title('Tabele')
                        .schemaType('table')
                        .filter('_type == "table" && squad._ref == $squadId')
                        .params({ squadId })
                    )
                )
            ])
        ),

      S.divider(),

      // --- 5. BAZA KLUBÓW ---
      S.documentTypeListItem('team').title('Loga zespołów').icon(Shield),

      S.divider(),

      // --- 6. BIZNES I PARTNERZY (ZMODYFIKOWANA) ---
      S.listItem()
        .title('Biznes i Partnerzy')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Strefa Biznesowa')
            .items([
              // A. Dynamiczna lista folderów wg Typów Sponsorów
              S.listItem()
                .title('Sponsorzy wg Kategorii')
                .icon(Gem)
                .child(
                  S.documentTypeList('sponsorTier')
                    .title('Wybierz Kategorię')
                    .child(tierId =>
                      S.documentList()
                        .title('Sponsorzy')
                        .schemaType('sponsor')
                        .filter('_type == "sponsor" && tier._ref == $tierId')
                        .params({ tierId })
                        .initialValueTemplates([
                          S.initialValueTemplateItem('sponsor-by-tier', { tierId })
                        ])
                    )
                ),

              S.divider(),

              // B. WYDZIELONE SKRÓTY (Klubowicze i Klub 100)
              // Filtrujemy po nazwie rangi (wymaga utworzenia rang o nazwach "Klubowicz" i "Klub 100")

              S.listItem()
                .title('Klubowicze')
                .icon(Users)
                .child(
                  S.documentList()
                    .title('Lista Klubowiczów')
                    .schemaType('sponsor')
                    .filter('_type == "sponsor" && tier->name == "Klubowicz"')
                ),

              S.listItem()
                .title('Klub 100')
                .icon(Crown)
                .child(
                  S.documentList()
                    .title('Lista Klub 100')
                    .schemaType('sponsor')
                    .filter('_type == "sponsor" && tier->name == "Klub 100"')
                ),

              S.divider(),

              // C. Link do zarządzania kategoriami
              S.documentTypeListItem('sponsorTier')
                .title('Edytuj Typy/Rangi')
                .icon(Tag),

              S.divider(),

              // D. Lista wszystkich sponsorów (opcjonalnie)
              S.documentTypeListItem('sponsor')
                .title('Wszyscy Sponsorzy (Lista)')
                .icon(ListFilter),
            ])
        ),

      S.divider(),

      // --- 7. STRONY STATYCZNE ---
      S.listItem()
        .title('Strony Statyczne')
        .icon(FileText)
        .child(
          S.list()
            .title('Strony Statyczne')
            .items([
              S.documentTypeListItem('page').title('Strony Dodatkowe'),
              S.divider(),
              S.listItem()
                .title('O Klubie')
                .icon(Shield)
                .child(
                  S.document()
                    .schemaType('clubPage')
                    .documentId('clubPage')
                ),
              S.listItem()
                .title('Przekaż 1.5%')
                .icon(Heart)
                .child(
                  S.document()
                    .schemaType('donatePage')
                    .documentId('donatePage')
                ),
              S.divider(),
              S.listItem()
                .title('Współpraca / Oferta')
                .icon(Handshake)
                .child(S.document().schemaType('offerPage').documentId('offerPage')),

              S.listItem()
                .title('Strona: Sponsorzy')
                .icon(Briefcase)
                .child(S.document().schemaType('sponsorsPage').documentId('sponsorsPage')),

              S.listItem()
                .title('Strona: Klubowicze')
                .icon(Users)
                .child(S.document().schemaType('partnersPage').documentId('partnersPage')),

              S.listItem()
                .title('Strona: Klub 100')
                .icon(Crown)
                .child(S.document().schemaType('club100Page').documentId('club100Page')),
            ])
        ),
      S.documentTypeListItem('download')
        .title('Pliki do pobrania')
        .icon(Download),
    ])