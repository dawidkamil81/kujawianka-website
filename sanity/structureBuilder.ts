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
  Heart,
  ListFilter,
  Edit,
  Shirt,
  UserCog,
  Tag,
  Database
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
                          S.listItem().title('Dane Drużyny').icon(Edit).child(S.document().schemaType('squad').documentId(squadId)),
                          S.divider(),
                          S.listItem().title('Kadra Zawodnicza').icon(Shirt).child(
                            S.documentList().title('Lista Piłkarzy').schemaType('player')
                              .filter('_type == "player" && squad._ref == $squadId && position != "Sztab"')
                              .params({ squadId })
                              .initialValueTemplates([S.initialValueTemplateItem('player-by-squad', { squadId })])
                          ),
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

      // --- 4. WYNIKI ---
      S.listItem()
        .title('Tabela i Wyniki')
        .icon(FileText)
        .child(
          S.list()
            .title('Wybierz Kategorię')
            .items([
              S.listItem().title('Seniorzy').icon(Medal).child(
                S.list().title('Seniorzy - Liga').items([
                  S.listItem().title('Tabela Ligowa').icon(FileText).child(
                    S.documentList().title('Tabela Ligowa').schemaType('table')
                      .filter('_type == "table" && (!defined(category) || category == "senior")')
                  ),
                  createScheduleFolder(S, 'Seniorzy', 'senior')
                ])
              ),
              S.divider(),
              S.listItem().title('Tabele Grup Młodzieżowych').icon(Users).child(
                S.documentTypeList('squad').title('Wybierz Grupę').child(squadId =>
                  S.documentList().title('Tabele').schemaType('table')
                    .filter('_type == "table" && squad._ref == $squadId').params({ squadId })
                )
              )
            ])
        ),

      S.divider(),
      S.documentTypeListItem('team').title('Loga zespołów').icon(Shield),
      S.divider(),

      // --- 6. BIZNES I PARTNERZY (POPRAWIONE FILTROWANIE) ---
      S.listItem()
        .title('Biznes i Partnerzy')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Strefa Biznesowa')
            .items([
              // 1. SPONSORZY BIZNESOWI (Tylko typ 'sponsor')
              S.listItem()
                .title('Sponsorzy Biznesowi')
                .icon(Gem)
                .child(
                  S.documentTypeList('sponsorTier')
                    .title('Kategorie Sponsorów')
                    // Wykluczamy Klubowiczów i Klub 100 z listy kategorii, żeby nie mylić admina
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

              // 2. KLUBOWICZE (Typ 'partner')
              // Klikając "Utwórz" tutaj, otworzy się formularz BEZ wyboru rangi!
              S.documentTypeListItem('partner')
                .title('Klubowicze')
                .icon(Users),

              // 3. KLUB 100 (Typ 'club100')
              // Klikając "Utwórz" tutaj, otworzy się formularz BEZ wyboru rangi!
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