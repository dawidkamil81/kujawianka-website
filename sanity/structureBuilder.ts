import { type StructureResolver } from 'sanity/structure'
// Komponenty widoku (bez zmian)
import { SquadStatsEditor } from './components/SquadStatsEditor'
import { SquadTablePreview } from './components/SquadTablePreview'

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
  ListOrdered
} from 'lucide-react'

// --- POMOCNICZA FUNKCJA WIDOKU ROZGRYWEK (BEZ ZMIAN) ---
const buildCompetitionView = (S: any, competitionId: string, competitionName: string) => {
  return S.list()
    .title(competitionName)
    .items([
      // 1. KONFIGURACJA
      S.listItem()
        .title('Konfiguracja i Limity')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('competition')
            .documentId(competitionId)
        ),

      // 2. TABELA LIGOWA
      S.listItem()
        .title('Tabela Ligowa')
        .icon(ListOrdered)
        .child(
          S.documentList()
            .title(`Tabela - ${competitionName}`)
            .schemaType('standing')
            .filter('_type == "standing" && competition._ref == $competitionId')
            .params({ competitionId })
            .initialValueTemplates([
              S.initialValueTemplateItem('standing-by-competition', { competitionId })
            ])
        ),

      // 3. TERMINARZ
      S.listItem()
        .title('Terminarz (Kolejki)')
        .icon(Calendar)
        .child(
          S.documentList()
            .title(`Kolejki - ${competitionName}`)
            .schemaType('fixture')
            .filter('_type == "fixture" && competition._ref == $competitionId')
            .params({ competitionId })
            .defaultOrdering([{ field: 'roundNumber', direction: 'asc' }])
            .initialValueTemplates([
              S.initialValueTemplateItem('fixture-by-competition', { competitionId })
            ])
        )
    ])
}

export const structure: StructureResolver = async (S, context) => {
  // Nie potrzebujemy już pobierać ID seniorów, bo lista jest uniwersalna

  return S.list()
    .title('Panel Administratora')
    .items([
      // --- SEKCJA 1: GLOBALNE ---
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

      // --- SEKCJA 2: STRUKTURY DANYCH ---
      S.listItem()
        .title('Edycja Struktur Danych')
        .icon(Database)
        .child(
          S.list()
            .title('Bazy Danych')
            .items([
              S.documentTypeListItem('squad').title('Drużyny i Grupy wiekowe').icon(Users),
              S.documentTypeListItem('team').title('Baza Klubów (Przeciwnicy)').icon(Shield),
              S.documentTypeListItem('staffRole').title('Role w Sztabie'),
              S.documentTypeListItem('sponsorTier').title('Kategorie sponsorów').icon(Tag)
            ])
        ),

      S.divider(),
      S.documentTypeListItem('news').title('Aktualności').icon(Newspaper),
      S.divider(),

      // --- SEKCJA 3: ZARZĄDZANIE KADRAMI (Ludzie) ---
      S.listItem()
        .title('Kadry Zawodnicze')
        .icon(Users)
        .child(
          S.list()
            .title('Wybierz Kadrę')
            .items([
              S.listItem().title('Wszyscy zawodnicy').icon(Users).child(S.documentTypeList('player')),
              S.divider(),
              S.listItem()
                .title('Zarządzaj wg Drużyny')
                .icon(ListFilter)
                .child(
                  S.documentTypeList('squad')
                    .title('Wybierz Drużynę')
                    .child(squadId =>
                      S.list()
                        .title('Zarządzanie Kadrą')
                        .items([
                          // Edycja samej drużyny
                          S.listItem().title('Dane Drużyny').icon(Edit).child(
                            S.document().schemaType('squad').documentId(squadId)
                              .views([S.view.form().title('Edycja'), S.view.component(SquadTablePreview).title('Podgląd')])
                          ),
                          S.divider(),
                          // Lista piłkarzy
                          S.listItem().title('Lista Zawodników').icon(Shirt).child(
                            S.documentList().title('Piłkarze').schemaType('player')
                              .filter('_type == "player" && squad._ref == $squadId && position != "Sztab"')
                              .params({ squadId })
                              .initialValueTemplates([S.initialValueTemplateItem('player-by-squad', { squadId })])
                          ),
                          // Masowa edycja
                          S.listItem().title('Masowa Edycja Statystyk').icon(ClipboardList).child(
                            S.document().schemaType('squad').documentId(squadId)
                              .views([S.view.component(SquadStatsEditor).title('Edytor')])
                          ),
                          // Sztab
                          S.listItem().title('Sztab Szkoleniowy').icon(UserCog).child(
                            S.documentList().title('Sztab').schemaType('player')
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

      // --- SEKCJA 4: ROZGRYWKI (WYNIKI I TABELE) - UPROSZCZONA ---
      S.listItem()
        .title('Tabela i Wyniki')
        .icon(Trophy)
        .child(
          S.documentTypeList('squad') // Wyświetla listę wszystkich drużyn
            .title('Wybierz Drużynę')
            .child(squadId =>
              S.documentList()
                .title('Dostępne Rozgrywki')
                .schemaType('competition')
                // Filtrujemy rozgrywki tylko dla wybranej drużyny
                .filter('_type == "competition" && squad._ref == $squadId')
                .params({ squadId })
                // Po kliknięciu w konkretne rozgrywki (np. IV Liga), wchodzimy w widok Tabeli/Terminarza
                .child(competitionId =>
                  buildCompetitionView(S, competitionId, 'Panel Rozgrywek')
                )
                // Przy tworzeniu nowych rozgrywek, przypisz je od razu do tej drużyny
                .initialValueTemplates([
                  S.initialValueTemplateItem('competition-by-squad', { squadId })
                ])
            )
        ),

      S.divider(),

      // --- SEKCJA 5: BIZNES ---
      S.listItem()
        .title('Biznes i Partnerzy')
        .icon(Briefcase)
        .child(
          S.list()
            .title('Strefa Biznesowa')
            .items([
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
              S.documentTypeListItem('partner').title('Klubowicze').icon(Users),
              S.documentTypeListItem('club100').title('Klub 100').icon(Crown),
            ])
        ),

      S.divider(),

      // --- SEKCJA 6: STRONY STATYCZNE ---
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
}