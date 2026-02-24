// sanity/lib/queries/matches.ts
import { defineQuery } from 'next-sanity'

export const RESULTS_PAGE_QUERY = defineQuery(`
  {
    "table": *[_id == "tabela-ligowa-glowna"][0] {
      season, rows[] { _key, position, teamName, matches, points, won, drawn, lost, goals }
    },
    "matches": *[_type == "result"] | order(round asc) {
      _id, round, date, homeTeam, awayTeam, homeScore, awayScore, "isFinished": defined(homeScore)
    },
    "teams": *[_type == "team"] { name, "logoUrl": logo.asset->url }
  }
`)

export const SQUAD_RESULTS_QUERY = defineQuery(`
  {
    "table": *[_type == "table" && squad->slug.current == $slug][0] {
      season, rows[] { _key, position, teamName, matches, points, won, drawn, lost, goals }
    },
    "matches": *[_type == "result" && squad->slug.current == $slug] | order(round asc) {
      _id, round, date, homeTeam, awayTeam, homeScore, awayScore, "isFinished": defined(homeScore)
    },
    "teams": *[_type == "team"] { name, "logoUrl": logo.asset->url },
    "squadInfo": *[_type == "squad" && slug.current == $slug][0] { name, coachName }
  }
`)

export const COMPETITION_BY_SQUAD_QUERY = defineQuery(`
  *[_type == "competition" && squad->slug.current == $slug][0] {
    _id, name, season,
    config { promotionSpots, promotionPlayoffSpots, relegationPlayoffSpots, relegationSpots },
    pointCorrections[] { points, reason, "team": team->{_id, name, "logoUrl": logo.asset->url} },
    "standing": *[_type == "standing" && competition._ref == ^._id][0] {
      _id, season,
      rows[] { _key, position, matches, points, won, drawn, lost, goals, "teamName": team->name, "teamLogo": team->logo.asset->url }
    },
    "fixtures": *[_type == "fixture" && competition._ref == ^._id] | order(roundNumber asc) {
      roundNumber,
      matches[] {
        _key, dataSource, date, homeScore, awayScore, isFinished,
        "homeTeam": homeTeam->{_id, name, "logoUrl": logo.asset->url},
        "awayTeam": awayTeam->{_id, name, "logoUrl": logo.asset->url}
      }
    }
  }
`)

export const HOMEPAGE_RESULTS_QUERY = defineQuery(`
  {
    "table": *[_type == "standing" && competition->squad->slug.current == "seniorzy"][0] {
      rows[] { _key, position, "teamName": team->name, "teamLogo": team->logo.asset->url, matches, points }
    },
    "config": *[_type == "competition" && squad->slug.current == "seniorzy"][0].config,
    "lastMatches": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
      "expandedMatches": matches[defined(homeScore)] {
        "_id": _key, "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
        "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
        homeScore, awayScore, date, "round": ^.roundNumber
      }
    }.expandedMatches[] | order(date desc)[0...8],
    "teams": *[_type == "team"] { name, "logoUrl": logo.asset->url }
  }
`)

export const MATCH_CENTER_QUERY = defineQuery(`
  {
    "nextMatch": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
      "expandedMatches": matches[!defined(homeScore) && (homeTeam->name match "Kujawianka*" || awayTeam->name match "Kujawianka*")] {
        "_id": _key, "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
        "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
        date, "round": ^.roundNumber, "stadium": "Stadion Miejski"
      }
    }.expandedMatches[] | order(date asc)[0],
    "lastMatches": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
      "expandedMatches": matches[defined(homeScore) && (homeTeam->name match "Kujawianka*" || awayTeam->name match "Kujawianka*")] {
        "_id": _key, "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
        "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
        homeScore, awayScore, date, "round": ^.roundNumber
      }
    }.expandedMatches[] | order(date desc)[0...2],
    "teams": *[_type == "team"] { name, "logoUrl": logo.asset->url },
    "clubLogo": *[_type == "siteSettings"][0].logo.asset->url
  }
`)

export const SQUADS_WITH_RESULTS_QUERY = defineQuery(`
  *[_type == "squad" && count(*[_type == "competition" && squad._ref == ^._id]) > 0] | order(order asc) {
    name,
    "slug": slug.current
  }
`)
