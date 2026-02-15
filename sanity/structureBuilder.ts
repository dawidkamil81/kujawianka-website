import { type StructureResolver } from 'sanity/structure'
// Upewnij się, że ścieżka do komponentu jest poprawna
import { SquadStatsEditor } from './components/SquadStatsEditor'
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
  Heart,
  ListFilter,
  Edit,
  Shirt,
  UserCog,
  Tag,
  Database,
  ClipboardList,
  Trophy,
} from 'lucide-react'

// Funkcja pomocnicza do Terminarza
// ZMIANA: Teraz przyjmuje opcjonalnie squadId zamiast sztywnej kategorii tekstowej
const createScheduleFolder = (S: any, title: string, squadId?: string, specificSlug?: string) => {
  // Jeśli podano specificSlug (np. 'seniorzy'), filtrujemy po slugu kadry.
  // Jeśli podano squadId (dla grup młodzieżowych), filtrujemy po referencji ID.

  let filter = '_type == "result" && round == $round';
  const params: any = { round: 1 }; // round będzie nadpisane w pętli

  if (specificSlug) {
    filter += ` && squad->slug.current == "${specificSlug}"`;
  } else if (squadId) {
    filter += ` && squad._ref == $squadId`;
    params.squadId = squadId;
  }

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
                  .params({ ...params, round }) // Przekazujemy round i ewentualnie squadId
                  .initialValueTemplates(
                    // Przy tworzeniu nowego meczu w tym folderze, chcemy wstępnie wypełnić dane
                    squadId
                      ? [S.initialValueTemplateItem('match-report-by-squad', { squadId })]
                      : [] // Dla seniorów logika może być inna lub standardowa
                  )
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
              S.documentListItem().schemaType('siteSettings').id('siteSettings').title('Konfiguracja Strony'),
            ])
        ),

      S.listItem()
        .title('Edycja Struktur Danych')
        .icon(Database)
        .child(
          S.list()
            .title('Konfiguracja')
            .items([
              S.documentTypeListItem('squad').title('Drużyny i Grupy wiekowe').icon(Users),
              S.documentTypeListItem('staffRole').title('Role w Sztabie'),
              S.documentTypeListItem('sponsorTier').title('Kategorie sponsorów').icon(Tag)
            ])
        ),

      S.divider(),

      // --- 2. AKTUALNOŚCI ---
      S.documentTypeListItem('news').title('Aktualności').icon(Newspaper),

      S.divider(),

      // --- 3. DRUŻYNY ---
      S.listItem()
        .title('Drużyny')
        .icon(Users)
        .child(
          S.list()
            .title('Zarządzanie Kadrami')
            .items([
              S.listItem().title('Wszyscy zawodnicy i sztab').icon(Users).child(S.documentTypeList('player')),
              S.divider(),
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
                          // 1. DANE DRUŻYNY
                          S.listItem()
                            .title('Dane Drużyny')
                            .icon(Edit)
                            .child(
                              S.document().schemaType('squad').documentId(squadId)
                            ),

                          S.divider(),

                          // 2. KADRA
                          S.listItem().title('Kadra Zawodnicza').icon(Shirt).child(
                            S.documentList().title('Lista Piłkarzy').schemaType('player')
                              .filter('_type == "player" && squad._ref == $squadId && position != "Sztab"')
                              .params({ squadId })
                              .initialValueTemplates([S.initialValueTemplateItem('player-by-squad', { squadId })])
                          ),

                          // 3. STATYSTYKI ZAWODNIKÓW
                          S.listItem()
                            .title('Statystyki zawodników')
                            .icon(ClipboardList)
                            .child(
                              S.document()
                                .schemaType('squad')
                                .documentId(squadId)
                                .title('Edycja Statystyk')
                                .views([
                                  S.view.component(SquadStatsEditor).title('Statystyki')
                                ])
                            ),

                          // 4. SZTAB
                          S.listItem().title('Sztab Szkoleniowy').icon(UserCog).child(
                            S.documentList().title('Lista Sztabu').schemaType('player')
                              .filter('_type == "player" && squad._ref == $squadId && position == "Sztab"')
                              .params({ squadId })
                              .initialValueTemplates([S.initialValueTemplateItem('staff-by-squad', { squadId })])
                          )
                        ])
                    )
                )
            ])
        ),

      S.divider(),

      // --- 4. WYNIKI I TABELE (ZMODYFIKOWANE) ---
      S.listItem()
        .title('Tabela i Wyniki')
        .icon(Trophy) // Ikona pucharu pasuje lepiej
        .child(
          S.list()
            .title('Wybierz Kategorię')
            .items([
              // A. SENIORZY (Specjalna kategoria na górze)
              S.listItem()
                .title('Seniorzy')
                .icon(Medal)
                .child(
                  S.list()
                    .title('Seniorzy')
                    .items([
                      S.listItem().title('Tabela Ligowa').icon(FileText).child(
                        S.documentList()
                          .title('Tabela Seniorów')
                          .schemaType('table')
                          // Filtrujemy po slugu kadry "seniorzy"
                          .filter('_type == "table" && squad->slug.current == "seniorzy"')
                      ),
                      // Terminarz dla seniorów (szukamy po slugu "seniorzy")
                      createScheduleFolder(S, 'Seniorzy', undefined, 'seniorzy')
                    ])
                ),

              S.divider(),

              // B. GRUPY MŁODZIEŻOWE (Dynamiczna lista)
              S.listItem()
                .title('Grupy Młodzieżowe')
                .icon(Users)
                .child(
                  // Lista wszystkich kadr OPRÓCZ seniorów
                  S.documentTypeList('squad')
                    .title('Wybierz Grupę')
                    .filter('_type == "squad" && slug.current != "seniorzy"')
                    .child(squadId =>
                      S.list()
                        .title('Opcje')
                        .items([
                          // 1. Tabela dla konkretnej grupy
                          S.listItem().title('Tabela Ligowa').icon(FileText).child(
                            S.documentList()
                              .title('Tabela')
                              .schemaType('table')
                              .filter('_type == "table" && squad._ref == $squadId')
                              .params({ squadId })
                              .initialValueTemplates([
                                // Opcjonalnie: szablon tworzenia tabeli z przypisanym ID
                                S.initialValueTemplateItem('table-by-squad', { squadId })
                                // (Upewnij się, że masz taki szablon w sanity.config.ts jeśli chcesz z tego korzystać, 
                                // w przeciwnym razie usuń tę linię initialValueTemplates)
                              ])
                          ),
                          // 2. Terminarz dla konkretnej grupy
                          createScheduleFolder(S, 'Terminarz', squadId)
                        ])
                    )
                )
            ])
        ),

      S.divider(),
      S.documentTypeListItem('team').title('Loga zespołów').icon(Shield),
      S.divider(),

      // --- 6. BIZNES I PARTNERZY ---
      S.listItem()
        .title('Biznes i Partnerzy')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Strefa Biznesowa')
            .items([
              // 1. SPONSORZY BIZNESOWI
              S.listItem()
                .title('Sponsorzy Biznesowi')
                .icon(Gem)
                .child(
                  S.documentTypeList('sponsorTier')
                    .title('Kategorie Sponsorów')
                    .filter('_type == "sponsorTier" && name != "Klubowicz" && name != "Klub 100"')
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

              // 2. KLUBOWICZE
              S.documentTypeListItem('partner')
                .title('Klubowicze')
                .icon(Users),

              // 3. KLUB 100
              S.documentTypeListItem('club100')
                .title('Klub 100')
                .icon(Crown),

              S.divider(),
              S.documentTypeListItem('sponsorTier').title('Zarządaj kategoriami sponsorów').icon(Tag),
            ])
        ),

      S.divider(),

      // --- 7. STRONY STATYCZNE ---
      S.listItem()
        .title('Edycja Stron')
        .icon(FileText)
        .child(
          S.list()
            .title('Strony Statyczne')
            .items([
              S.listItem().title('Współpraca').icon(Handshake).child(S.document().schemaType('offerPage').documentId('offerPage')),
              S.listItem().title('Sponsorzy').icon(Briefcase).child(S.document().schemaType('sponsorsPage').documentId('sponsorsPage')),
              S.listItem().title('Klubowicze').icon(Users).child(S.document().schemaType('partnersPage').documentId('partnersPage')),
              S.listItem().title('Klub 100').icon(Crown).child(S.document().schemaType('club100Page').documentId('club100Page')),
              S.divider(),
              S.listItem().title('O Klubie').icon(Shield).child(S.document().schemaType('clubPage').documentId('clubPage')),
              S.divider(),
              S.listItem().title('Przekaż 1.5%').icon(Heart).child(S.document().schemaType('donatePage').documentId('donatePage')),
            ])
        ),
      S.documentTypeListItem('download').title('Pliki do pobrania').icon(Download),
    ])