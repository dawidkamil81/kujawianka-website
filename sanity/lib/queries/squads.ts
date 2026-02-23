// sanity/lib/queries/squads.ts
import { defineQuery } from 'next-sanity'

export const HOMEPAGE_PLAYERS_QUERY = defineQuery(`
  *[_type == "player" && squad->slug.current == "seniorzy"] | order(number asc)[0...4] {
    _id, name, surname, number, position,
    "staffRole": staffRole->name, 
    "imageUrl": image.asset->url,
    "slug": slug.current
  }
`)

export const ALL_PLAYERS_QUERY = defineQuery(`
  *[_type == "player"] | order(number asc) {
    _id, name, surname, number, position, "imageUrl": image.asset->url
  }
`)

export const SQUADS_NAVIGATION_QUERY = defineQuery(`
  *[_type == "squad"] | order(order asc) {
    name, "slug": slug.current,
    "hasTable": count(*[_type == "table" && squad._ref == ^._id]) > 0
  }
`)

export const SQUAD_PAGE_QUERY = defineQuery(`
  *[_type == "squad" && slug.current == $slug][0] {
    name, 
    "slug": slug.current, 
    coachName, 
    coachPhone, 
    coachEmail, 
    description,
    "statsConfig": coalesce(statsConfig, {
      "showMatches": true,
      "showGoals": true,
      "showAssists": true,
      "showCleanSheets": true,
      "showCards": true
    }),
    "players": *[_type == "player" && references(^._id)] | order(number asc) {
       _id, name, surname, number, position, "staffRole": staffRole-> name, "imageUrl": image.asset->url,
       "stats": {
         "matches": coalesce(matches, 0),
         "goals": coalesce(goals, 0),
         "assists": coalesce(assists, 0),
         "cleanSheets": coalesce(cleanSheets, 0),
         "yellowCards": coalesce(yellowCards, 0),
         "redCards": coalesce(redCards, 0)
       }
    }
  }
`)

export const YOUTH_SQUADS_LIST_QUERY = defineQuery(`
  *[_type == "squad" && slug.current != "seniorzy"] | order(order asc) {
    _id, name, "slug": slug.current, description, coachName
  }
`)
