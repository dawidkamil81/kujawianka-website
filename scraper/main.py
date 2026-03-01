import os
import json
import requests
from requests.exceptions import RequestException
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from slugify import slugify
import uuid 
from datetime import datetime

load_dotenv()

# --- KONFIGURACJA ŚRODOWISKA ---
API_KEY = os.getenv("SANITY_API_KEY") 
DATASET = os.getenv("SANITY_DATASET")
PROJECT_ID = os.getenv("SANITY_PROJECT_ID")

# Usunięto stałą URL, teraz skrypt pobierze ją sam z Sanity!

# ==========================================
# SUPER OPTYMALIZACJA: DYNAMICZNY SEZON
# ==========================================
def get_current_season():
    env_season = os.getenv("SCRAPER_SEASON")
    if env_season:
        return env_season

    now = datetime.now()
    if now.month <= 7:
        return f"{now.year - 1}/{now.year}"
    else:
        return f"{now.year}/{now.year + 1}"

CURRENT_SEASON = get_current_season()

SANITY_MUTATE_URL = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/{DATASET}"
SANITY_QUERY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/{DATASET}"

MONTHS = {
    'stycznia': '01', 'lutego': '02', 'marca': '03', 'kwietnia': '04',
    'maja': '05', 'czerwca': '06', 'lipca': '07', 'sierpnia': '08',
    'września': '09', 'października': '10', 'listopada': '11', 'grudnia': '12'
}

IGNORED_NAMES = {
    "nazwa", "druzyna", "drużyna", "klub", "zespol", "zespół", 
    "gospodarze", "goscie", "goście", "wynik", "poz", "lp", "m"
}

TEAM_CACHE = {}

# --- OPTYMALIZACJA: SESJA HTTP ---
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
})

sanity_headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def normalize_team_name(text):
    if not text: return ""
    text = text.lower()
    text = text.replace('\xa0', ' ')
    text = text.replace('.', '')
    return " ".join(text.split())

def parse_polish_date(date_str):
    if not date_str: return None
    try:
        clean_str = date_str.replace(',', '').strip()
        parts = clean_str.split()
        if len(parts) < 2: return None
        
        day = parts[0].zfill(2)
        month_name = parts[1].lower()
        
        time_part = "12:00:00"
        if len(parts) >= 3:
            time_parts = parts[2].split(':')
            if len(time_parts) == 2:
                time_part = f"{parts[2]}:00"
        
        month_num = MONTHS.get(month_name)
        if not month_num: return None

        years = CURRENT_SEASON.split('/')
        if len(years) == 2:
            match_year = years[0] if int(month_num) >= 7 else years[1]
        else:
            match_year = years[0] 

        return f"{match_year}-{month_num}-{day}T{time_part}"
    except (ValueError, IndexError):
        return None

def preload_teams():
    print(f"📥 Pobieranie bazy zespołów dla sezonu {CURRENT_SEASON}...")
    query = '*[_type == "team"][0...10000]{_id, name}'
    try:
        response = session.get(
            SANITY_QUERY_URL, 
            params={'query': query},
            headers=sanity_headers,
            timeout=15
        )
        response.raise_for_status()
        data = response.json()
        teams = data.get('result', [])
        
        for team in teams:
            t_id = team['_id']
            t_name = team.get('name', '')
            normalized_key = normalize_team_name(t_name)
            if normalized_key:
                TEAM_CACHE[normalized_key] = t_id
            
        print(f"✅ Załadowano {len(TEAM_CACHE)} zespołów do pamięci.")
    except RequestException as e:
        print(f"❌ Błąd sieci podczas preloadu: {e}")
    except ValueError as e:
        print(f"❌ Błąd parsowania JSON z Sanity: {e}")

# ==========================================
# ZMIANA: POBIERANIE LINKU Z SANITY (CMS)
# ==========================================
def get_competition_info(squad_slug="seniorzy"):
    print(f"🔍 Szukam rozgrywek i linku dla: {squad_slug}...")
    # GROQ pobiera teraz _id oraz url!
    query = f'*[_type == "competition" && squad->slug.current == "{squad_slug}"][0]{{_id, url}}'
    try:
        response = session.get(
            SANITY_QUERY_URL, 
            params={'query': query},
            headers=sanity_headers,
            timeout=15
        )
        response.raise_for_status()
        result = response.json().get('result')
        
        if result and result.get('_id') and result.get('url'):
            print(f"✅ ID: {result['_id']}")
            print(f"✅ Link 90minut: {result['url']}")
            return result
        else:
            print("⚠️ Rozgrywki nie zostały znalezione lub brakuje w nich wklejonego linku 'url'.")
            return None
    except RequestException as e:
        print(f"❌ Błąd sieci Sanity (pobieranie rozgrywek): {e}")
        return None

def get_or_create_team(raw_name):
    if not raw_name: return None

    target_key = normalize_team_name(raw_name)
    if not target_key or target_key in IGNORED_NAMES:
        return None
        
    if target_key in TEAM_CACHE:
        return TEAM_CACHE[target_key]

    pretty_name = raw_name.replace('\xa0', ' ').strip()
    print(f"✨ Tworzę zespół: '{pretty_name}'")
    
    new_team_payload = {
        "mutations": [{
            "create": {
                "_type": "team",
                "name": pretty_name
            }
        }]
    }
    
    try:
        res = session.post(
            SANITY_MUTATE_URL, 
            headers=sanity_headers, 
            data=json.dumps(new_team_payload),
            timeout=15
        )
        res.raise_for_status()
        if res.status_code == 200:
            created_ids = res.json().get('results', [])
            if created_ids:
                new_id = created_ids[0].get('id')
                TEAM_CACHE[target_key] = new_id
                return new_id
    except RequestException as e:
        print(f"❌ Błąd tworzenia zespołu '{pretty_name}': {e}")
    
    return None

def process_table(soup, competition_id):
    if not competition_id: return
    print("\n📊 --- Tabela ---")
    
    table = soup.find('table', {'class': 'main2'}) or soup.find('table', {'class': 'main'})
    if not table: return

    standing_rows = []
    for row in table.find_all('tr'):
        cols = row.find_all('td')
        if len(cols) < 8: continue
        
        try:
            matches_text = cols[2].text.strip()
            if not matches_text.isdigit(): continue

            raw_team_name = cols[1].text
            team_id = get_or_create_team(raw_team_name)
            if not team_id: continue

            standing_rows.append({
                "_type": "standingRow",       
                "_key": str(uuid.uuid4()), 
                "team": { "_type": "reference", "_ref": team_id },
                "matches": int(matches_text),
                "points": int(cols[3].text.strip()),
                "won": int(cols[4].text.strip()),
                "drawn": int(cols[5].text.strip()),
                "lost": int(cols[6].text.strip()),
                "goals": cols[7].text.strip()
            })
        except ValueError: 
            continue 

    if standing_rows:
        payload = {
            "mutations": [{"createOrReplace": {
                "_id": f"standing-{competition_id}", 
                "_type": "standing",
                "competition": { "_type": "reference", "_ref": competition_id },
                "season": CURRENT_SEASON,
                "rows": standing_rows
            }}]
        }
        try:
            res = session.post(
                SANITY_MUTATE_URL, 
                headers=sanity_headers, 
                data=json.dumps(payload),
                timeout=15
            )
            res.raise_for_status()
            print(f"✅ Tabela zaktualizowana ({CURRENT_SEASON}).")
        except RequestException as e:
            print(f"❌ Błąd zapisu tabeli do Sanity: {e}")

def process_fixtures(soup, competition_id):
    if not competition_id: return
    print("\n⚽ --- Terminarz ---")
    
    rounds_data = {}
    current_round = 0
    
    for table in soup.find_all('table', class_='main'):
        text = table.get_text().strip()
        if "Kolejka" in text:
            try:
                parts = text.split("Kolejka")[1].strip().split()
                current_round = int(''.join(filter(str.isdigit, parts[0])))
            except (ValueError, IndexError): pass
            continue

        if current_round > 0:
            for row in table.find_all('tr'):
                cells = row.find_all('td')
                if len(cells) < 3: continue

                try:
                    raw_home = cells[0].get_text()
                    if normalize_team_name(raw_home) in IGNORED_NAMES: continue

                    raw_away = cells[2].get_text()
                    
                    home_id = get_or_create_team(raw_home)
                    away_id = get_or_create_team(raw_away)
                    
                    if not home_id or not away_id: continue

                    score_raw = cells[1].get_text(strip=True)
                    date_raw = cells[3].get_text(strip=True) if len(cells) > 3 else ""
                    
                    home_score = None
                    away_score = None
                    if "-" in score_raw and any(c.isdigit() for c in score_raw):
                        try:
                            parts = score_raw.split("-")
                            home_score = int(parts[0])
                            away_score = int(parts[1])
                        except (ValueError, IndexError): pass
                        
                    ext_id = f"m-{current_round}-{slugify(raw_home)}-{slugify(raw_away)}"

                    match_obj = {
                        "_key": str(uuid.uuid4()),
                        "_type": "match",
                        "dataSource": "scraper",
                        "externalId": ext_id,
                        "homeTeam": {"_type": "reference", "_ref": home_id},
                        "awayTeam": {"_type": "reference", "_ref": away_id},
                        "homeScore": home_score,
                        "awayScore": away_score,
                        "isFinished": True 
                    }
                    parsed_date = parse_polish_date(date_raw)
                    if parsed_date: 
                        match_obj["date"] = parsed_date

                    if current_round not in rounds_data: rounds_data[current_round] = []
                    rounds_data[current_round].append(match_obj)

                except Exception: 
                    continue

    mutations = []
    for r_num, matches in rounds_data.items():
        mutations.append({
            "createOrReplace": {
                "_id": f"fixture-{competition_id}-r{r_num}",
                "_type": "fixture",
                "competition": { "_type": "reference", "_ref": competition_id },
                "roundNumber": r_num,
                "matches": matches
            }
        })

    if mutations:
        chunk_size = 5
        for i in range(0, len(mutations), chunk_size):
            chunk = mutations[i:i + chunk_size]
            payload = { "mutations": chunk }
            try:
                res = session.post(
                    SANITY_MUTATE_URL, 
                    headers=sanity_headers, 
                    data=json.dumps(payload),
                    timeout=15
                )
                res.raise_for_status()
                print(f"✅ Zapisano kolejki (partia {i//chunk_size + 1})")
            except RequestException as e:
                print(f"❌ Błąd zapisu paczki z kolejkami: {e}")

if __name__ == "__main__":
    try:
        preload_teams()
        
        # 1. Pobieramy Info (wraz z linkiem) z Sanity
        comp_info = get_competition_info("seniorzy")
        
        if comp_info:
            comp_id = comp_info["_id"]
            target_url = comp_info["url"]
            
            # 2. Używamy zescrapowanego linku do pobrania strony!
            print(f"🌐 Łączenie ze stroną: {target_url}")
            response = session.get(target_url, timeout=15)
            response.raise_for_status()
            response.encoding = 'ISO-8859-2' 
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 3. Przetwarzamy dane
            process_table(soup, comp_id)
            process_fixtures(soup, comp_id)
            
    except RequestException as e:
        print(f"🔥 Błąd połączenia (Strona / Sanity API): {e}")
    except Exception as e:
        print(f"🔥 Krytyczny błąd skryptu: {e}")
    finally:
        session.close()