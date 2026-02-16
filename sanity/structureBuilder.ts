import { type StructureResolver } from 'sanity/structure'
// Upewnij się, że te importy są poprawne w Twoim projekcie
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

// --- FUNKCJA TWORZĄCA TERMINARZ ---
// Przyjmuje ID drużyny i przekazuje je do szablonu tworzenia meczu
const createScheduleFolder = (S: any, context: any, title: string, squadId: string, defaultSource: string, specificSlug?: string) => {
  return S.listItem()
    .title(`Terminarz - ${title}`)
    .icon(Calendar)
    .child(async () => {
      const client = context.getClient({ apiVersion: '2024-01-01' });

      // 1. Pobieramy liczbę kolejek z LeagueConfig
      let roundsCount = 0;
      try {
        let query = '';
        const params: any = {};

        // Jeśli podano slug (np. seniorzy), szukamy po slugu, jeśli nie - po ID
        if (specificSlug === 'seniorzy') {
          query = `*[_type == "leagueConfig" && squad->slug.current == $slug][0].roundsCount`;
          params.slug = specificSlug;
        } else {
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

      // Jeśli brak kolejek, wyświetlamy informację
      if (roundsCount === 0) {
        return S.list()
          .title(`${title} - Brak konfiguracji`)
          .items([
            S.listItem()
              .title('Brak zdefiniowanych kolejek')
              .icon(Info)
              .child(S.component().id('empty-schedule-info').component(EmptySchedule))
          ]);
      }

      // 2. Generujemy listę folderów (Kolejka 1, Kolejka 2...)
      return S.list()
        .title(`${title} - Kolejki (${roundsCount})`)
        .items(
          Array.from({ length: roundsCount }, (_, i) => i + 1).map((round) => {

            // Filtr: Szukamy meczów tej konkretnej kolejki ORAZ tej drużyny
            let filter = '_type == "result" && round == $round && squad._ref == $squadId';
            const filterParams = { round, squadId };

            return S.listItem()
              .title(`Kolejka ${round}`)
              .child(
                S.documentList()
                  .title(`Mecze - Kolejka ${round}`)
                  .id(`matches-${title}-${round}`)
                  .schemaType('result')
                  .filter(filter)
                  .params(filterParams)
                  // 3. TUTAJ PRZEKAZUJEMY DANE DO NOWEGO DOKUMENTU
                  .initialValueTemplates([
                    S.initialValueTemplateItem('result-in-round', {
                      squadId: squadId,   // <-- To trafi do pola 'squad'
                      round: round,       // <-- To trafi do pola 'round'
                      source: defaultSource // <-- 'manual' lub 'scraper'
                    })
                  ])
                  .defaultOrdering([{ field: 'date', direction: 'asc' }])
              )
          })
        );
    });
}

export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion: '2024-01-01' });

  // 1. Pobieramy ID Seniorów (potrzebne, by przekazać je do funkcji createScheduleFolder)
  let seniorSquadId = '';
  try {
    // Zakładam slug 'seniorzy'. Jeśli masz 'Seniorzy', popraw wielkość liter.
    const seniorSquad = await client.fetch('*[_type == "squad" && slug.current == "seniorzy"][0]._id');
    seniorSquadId = seniorSquad || '';
  } catch (e) {
    console.error("Błąd pobierania ID seniorów", e);
  }

  return S.list()
    .title('Panel Administratora')
    .items([
      // --- USTAWIENIA ---
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

      // --- AKTUALNOŚCI ---
      S.documentTypeListItem('news').title('Aktualności').icon(Newspaper),

      S.divider(),

      // --- DRUŻYNY (Tylko zarządzanie ludźmi/opisem, BEZ terminarza) ---
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
                          // A. DANE I ZDJĘCIE
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

                          // B. ZAWODNICY
                          S.listItem().title('Kadra Zawodnicza').icon(Shirt).child(
                            S.documentList().title('Lista Piłkarzy').schemaType('player')
                              .filter('_type == "player" && squad._ref == $squadId && position != "Sztab"')
                              .params({ squadId })
                              .initialValueTemplates([S.initialValueTemplateItem('player-by-squad', { squadId })])
                          ),

                          // C. STATYSTYKI
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

                          // D. SZTAB
                          S.listItem().title('Sztab Szkoleniowy').icon(UserCog).child(
                            S.documentList().title('Lista Sztabu').schemaType('player')
                              .filter('_type == "player" && squad._ref == $squadId && position == "Sztab"')
                              .params({ squadId })
                              .initialValueTemplates([S.initialValueTemplateItem('staff-by-squad', { squadId })])
                          )

                          // UWAGA: Usunięto stąd "createScheduleFolder" zgodnie z życzeniem
                        ])
                    )
                )
            ])
        ),

      S.divider(),

      // --- WYNIKI I TABELE (Tutaj jest Terminarz) ---
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
                        ),

                      S.listItem().title('Tabela Ligowa').icon(FileText).child(
                        S.documentList()
                          .title('Tabela Seniorów')
                          .schemaType('table')
                          .filter('_type == "table" && squad->slug.current == "seniorzy"')
                      ),
                      // Terminarz SENIORZY -> Przekazujemy 'scraper' oraz ID Seniorów
                      createScheduleFolder(S, context, 'Seniorzy', seniorSquadId, 'scraper', 'seniorzy')
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

                          // Terminarz MŁODZIEŻ -> Przekazujemy 'manual' oraz ID drużyny z pętli
                          createScheduleFolder(S, context, 'Terminarz', squadId, 'manual')
                        ])
                    )
                )
            ])
        ),

      S.divider(),

      S.documentTypeListItem('team').title('Baza Klubów (Przeciwnicy)').icon(Database),

      S.divider(),

      // --- BIZNES I PARTNERZY ---
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

      // --- STRONY STATYCZNE ---
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