import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Treść Strony')
    .items([
      // 1. Zwykłe typy (Newsy, Zawodnicy, Sponsorzy itp.)
      // Wykluczamy 'result', bo zrobimy dla niego specjalny widok poniżej
      ...S.documentTypeListItems().filter(
        (listItem) => !['result'].includes(listItem.getId() || '')
      ),

      S.divider(), // Linia oddzielająca

      // 2. Specjalny widok dla Meczów (Grupowanie po Kolejkach)
      S.listItem()
        .title('Terminarz i Wyniki') // Nazwa folderu w menu
        .child(
          S.list()
            .title('Wybierz Kolejkę')
            .items(
              // Generujemy 34 foldery (od 1 do 34)
              Array.from({ length: 30 }, (_, i) => i + 1).map((round) =>
                S.listItem()
                  .title(`Kolejka ${round}`) // Nazwa podfolderu
                  .child(
                    S.documentList()
                      .title(`Mecze - Kolejka ${round}`)
                      .schemaType('result')
                      // To jest filtr: Pokaż tylko dokumenty typu 'result', które mają pole round równe X
                      .filter('_type == "result" && round == $round')
                      .params({ round })
                      .defaultOrdering([{ field: 'date', direction: 'asc' }]) // Sortuj chronologicznie
                  )
              )
            )
        )
    ])