import { type StructureResolver } from 'sanity/structure'
// Upewnij się, że te pliki istnieją w sanity/components/
import { SquadStatsEditor } from './components/SquadStatsEditor'
import { SquadTablePreview } from './components/SquadTablePreview'
import { EmptySchedule } from './components/EmptySchedule'

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
  Info,
} from 'lucide-react'

// --- FUNKCJA POMOCNICZA: TERMINARZ (DYNAMICZNY) ---
const createScheduleFolder = (S: any, context: any, title: string, squadId?: string, specificSlug?: string) => {
  return S.listItem()
    .title(`Terminarz - ${title}`)
    .icon(Calendar)
    .child(async () => {
      const client = context.getClient({ apiVersion: '2024-01-01' });

      // 1. Domyślnie 0 kolejek.
      let roundsCount = 0;

      try {
        let query = '';
        const params: any = {};

        if (specificSlug === 'seniorzy') {
          query = `*[_type == "leagueConfig" && squad->slug.current == $slug][0].roundsCount`;
          params.slug = specificSlug;
        } else if (squadId) {
          query = `*[_type == "leagueConfig" && squad._ref == $squadId][0].roundsCount`;
          params.squadId = squadId;
        }

        const result = await client.fetch(query, params);
        if (typeof result === 'number' && result > 0) {
          roundsCount = result;
        }
      } catch (error) {
        console.error("Błąd podczas pobierania liczby kolejek:", error);
      }

      // Jeśli brak kolejek, wyświetlamy komponent informacyjny
      if (roundsCount === 0) {
        return S.list()
          .title(`${title} - Brak konfiguracji`)
          .items([
            S.listItem()
              .title('Brak zdefiniowanych kolejek')
              .icon(Info)
              .child(
                S.component()
                  .id('empty-schedule-info')
                  .component(EmptySchedule)
              )
          ]);
      }

      // 2. Definiujemy ID szablonu
      let templateId = '';
      let baseTemplateParams: any = {};

      if (specificSlug === 'seniorzy') {
        templateId = 'result-for-seniorzy';
      } else if (squadId) {
        templateId = 'result-by-squad-id';
        baseTemplateParams = { squadId };
      }

      // 3. Budowanie listy kolejek
      return S.list()
        .title(`${title} - Kolejki (${roundsCount})`)
        .items(
          Array.from({ length: roundsCount }, (_, i) => i + 1).map((round) => {
            // Tutaj tworzymy filtry dla każdej kolejki
            let filter = '_type == "result" && round == $round';
            const filterParams: any = { round };

            if (specificSlug === 'seniorzy') {
              filter += ` && squad->slug.current == "${specificSlug}"`;
            } else if (squadId) {
              filter += ` && squad._ref == $squadId`;
              filterParams.squadId = squadId;
            }

            // Łączymy parametry bazowe (squadId) z numerem kolejki (round)
            const templateParamsWithRound = { ...baseTemplateParams, round };

            return S.listItem()
              .title(`Kolejka ${round}`)
              .child(
                S.documentList()
                  .title(`Mecze - Kolejka ${round}`)
                  .id(`matches-${title}-${round}`)
                  .schemaType('result')
                  .filter(filter)
                  .params(filterParams)
                  // PRZEKAZUJEMY PARAMETRY DO SZABLONU
                  .initialValueTemplates([
                    S.initialValueTemplateItem(templateId, templateParamsWithRound)
                  ])
                  .defaultOrdering([{ field: 'date', direction: 'asc' }])
              )
          })
        );
    });
}

export const structure: StructureResolver = (S, context) =>
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
                          // 1. DANE DRUŻYNY + PODGLĄD TABELI
                          S.listItem()
                            .title('Dane Drużyny')
                            .icon(Edit)
                            .child(
                              S.document()
                                .schemaType('squad')
                                .documentId(squadId)
                                .views([
                                  S.view.form().title('Edycja Danych'),
                                  S.view.component(SquadTablePreview).title('Podgląd Tabeli')
                                ])
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

      // --- 4. WYNIKI I TABELE ---
      S.listItem()
        .title('Tabela i Wyniki')
        .icon(Trophy)
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
                        .title('Informacje o rozgrywkach')
                        .icon(Info)
                        .child(
                          S.documentList()
                            .title('Konfiguracja Ligi')
                            .schemaType('leagueConfig')
                            .filter('_type == "leagueConfig" && squad->slug.current == "seniorzy"')
                            .initialValueTemplates([
                              S.initialValueTemplateItem('league-config-for-seniorzy')
                            ])
                        ),

                      S.listItem().title('Tabela Ligowa').icon(FileText).child(
                        S.documentList()
                          .title('Tabela Seniorów')
                          .schemaType('table')
                          .filter('_type == "table" && squad->slug.current == "seniorzy"')
                      ),
                      // Terminarz
                      createScheduleFolder(S, context, 'Seniorzy', undefined, 'seniorzy')
                    ])
                ),

              S.divider(),

              // B. GRUPY MŁODZIEŻOWE
              S.listItem()
                .title('Grupy Młodzieżowe')
                .icon(Users)
                .child(
                  S.documentTypeList('squad')
                    .title('Wybierz Grupę')
                    .filter('_type == "squad" && slug.current != "seniorzy"')
                    .child(squadId =>
                      S.list()
                        .title('Opcje')
                        .items([
                          S.listItem()
                            .title('Informacje o rozgrywkach')
                            .icon(Info)
                            .child(
                              S.documentList()
                                .title('Konfiguracja Ligi')
                                .schemaType('leagueConfig')
                                .filter('_type == "leagueConfig" && squad._ref == $squadId')
                                .params({ squadId })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem('league-config-by-squad', { squadId })
                                ])
                            ),

                          S.listItem().title('Tabela Ligowa').icon(FileText).child(
                            S.documentList()
                              .title('Tabela')
                              .schemaType('table')
                              .filter('_type == "table" && squad._ref == $squadId')
                              .params({ squadId })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('table-by-squad', { squadId })
                              ])
                          ),

                          createScheduleFolder(S, context, 'Terminarz', squadId)
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