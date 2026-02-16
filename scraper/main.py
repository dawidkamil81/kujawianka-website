import os
import json
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from slugify import slugify
import uuid 
from datetime import datetime

load_dotenv()

API_KEY = os.getenv("SANITY_API_KEY") 
DATASET = os.getenv("SANITY_DATASET")
PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
# URL do mutacji (zapisu)
SANITY_MUTATE_URL = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/{DATASET}"
# URL do zapytań (odczytu)
SANITY_QUERY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/{DATASET}"

URL = "http://www.90minut.pl/liga/1/liga14189.html"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

MONTHS = {
    'stycznia': '01', 'lutego': '02', 'marca': '03', 'kwietnia': '04',
    'maja': '05', 'czerwca': '06', 'lipca': '07', 'sierpnia': '08',
    'września': '09', 'października': '10', 'listopada': '11', 'grudnia': '12'
}

def parse_polish_date(date_str):
    if not date_str: return None
    try:
        clean_str = date_str.replace(',', '').strip()
        parts = clean_str.split()
        if len(parts) < 2: return None
        
        day = parts[0].zfill(2)
        month_name = parts[1].lower()
        
        time = "12:00:00"
        if len(parts) >= 3:
            time_parts = parts[2].split(':')
            if len(time_parts) == 2:
                time = f"{parts[2]}:00"
        
        month_num = MONTHS.get(month_name)
        if not month_num: return None

        year = "2025" if int(month_num) >= 8 else "2026"
        return f"{year}-{month_num}-{day}T{time}"
    except:
        return None

# --- NOWA FUNKCJA: POBIERANIE ID SENIORÓW ---
def get_senior_squad_id():
    print("🔍 Szukam ID drużyny 'Seniorzy' w Sanity...")
    # Zapytanie GROQ szukające drużyny po slugu
    query = '*[_type == "squad" && slug.current == "seniorzy"][0]._id'
    
    try:
        # Enkodowanie zapytania i wysłanie requestu
        response = requests.get(
            SANITY_QUERY_URL, 
            params={'query': query},
            headers={"Authorization": f"Bearer {API_KEY}"}
        )
        data = response.json()
        
        if 'result' in data and data['result']:
            print(f"✅ Znaleziono ID Seniorów: {data['result']}")
            return data['result']
        else:
            print("❌ BŁĄD: Nie znaleziono drużyny o slugu 'seniorzy'. Upewnij się, że taka drużyna istnieje w panelu!")
            return None
    except Exception as e:
        print(f"❌ Błąd połączenia z Sanity: {e}")
        return None

# --- AKTUALIZACJA TABELI ---
def get_table(soup, senior_id):
    if not senior_id:
        print("⚠️ Pomijam tabelę z powodu braku ID Seniorów.")
        return

    print("🔄 Przetwarzam tabelę...")
    table = soup.find('table', {'class': 'main2'})
    if not table: table = soup.find('table', {'class': 'main'})
    if not table:
        print("⚠️ Nie znaleziono tabeli ligowej.")
        return

    rows = table.find_all('tr')
    table_rows = []

    for row in rows:
        cols = row.find_all('td')
        if len(cols) < 8: continue
        try:
            position = int(cols[0].text.strip().replace('.', ''))
            team_name = cols[1].text.strip()
            matches = int(cols[2].text.strip())
            points = int(cols[3].text.strip())
            won = int(cols[4].text.strip())
            drawn = int(cols[5].text.strip())
            lost = int(cols[6].text.strip())
            goals = cols[7].text.strip()

            table_rows.append({
                "_type": "tableRow",       
                "_key": str(uuid.uuid4()), 
                "position": position,
                "teamName": team_name,
                "matches": matches,
                "points": points,
                "won": won,
                "drawn": drawn,
                "lost": lost,
                "goals": goals 
            })
        except ValueError:
            continue 

    if table_rows:
        payload = {
            "mutations": [{"createOrReplace": {
                "_id": "tabela-ligowa-glowna", 
                "_type": "table",
                "season": "2025/2026",
                # DODANO: Przypisanie do kadry seniorów
                "squad": {
                    "_type": "reference",
                    "_ref": senior_id
                },
                "rows": table_rows
            }}]
        }
        res = requests.post(SANITY_MUTATE_URL, headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"}, data=json.dumps(payload))
        if res.status_code == 200: print("✅ Tabela zaktualizowana.")
        else: print(f"❌ Błąd tabeli: {res.text}")

# --- AKTUALIZACJA MECZÓW ---
def get_matches(soup, senior_id):
    if not senior_id:
        print("⚠️ Pomijam mecze z powodu braku ID Seniorów.")
        return

    print("🔄 Przetwarzam mecze...")
    all_tables = soup.find_all('table', class_='main')
    
    matches_mutations = []
    current_round = 0
    
    for table in all_tables:
        text = table.get_text().strip()
        if "Kolejka" in text:
            try:
                parts = text.split("Kolejka")[1].strip().split()
                possible_number = ''.join(filter(str.isdigit, parts[0]))
                if possible_number:
                    current_round = int(possible_number)
            except: pass
            continue

        if current_round > 0:
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all('td')
                if len(cells) < 3: continue

                try:
                    home_team = cells[0].get_text(strip=True)
                    score_raw = cells[1].get_text(strip=True)
                    away_team = cells[2].get_text(strip=True)
                    date_raw = cells[3].get_text(strip=True) if len(cells) > 3 else ""
                    parsed_date = parse_polish_date(date_raw)

                    home_score = None
                    away_score = None
                    if "-" in score_raw and any(c.isdigit() for c in score_raw):
                        parts = score_raw.split("-")
                        try:
                            home_score = int(parts[0])
                            away_score = int(parts[1])
                        except: pass

                    match_id = f"match-r{current_round}-{slugify(home_team)}-{slugify(away_team)}"

                    matches_mutations.append({
                        "createOrReplace": {
                            "_id": match_id,
                            "_type": "result",
                            "round": current_round,
                            "homeTeam": home_team,
                            "awayTeam": away_team,
                            "homeScore": home_score,
                            "awayScore": away_score,
                            "date": parsed_date,
                            "externalId": match_id,
                            # DODANO: Przypisanie do kadry i kategorii
                            "squad": {
                                "_type": "reference",
                                "_ref": senior_id
                            },
                            "category": "senior"
                        }
                    })
                except Exception:
                    continue

    if matches_mutations:
        print(f"📦 Znaleziono {len(matches_mutations)} meczów.")
        payload = { "mutations": matches_mutations }
        
        res = requests.post(
            SANITY_MUTATE_URL,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {API_KEY}"},
            data=json.dumps(payload)
        )
        if res.status_code == 200: print("✅ Mecze zaktualizowane.")
        else: print(f"❌ Błąd meczów: {res.text}")
    else:
        print("⚠️ Nie znaleziono meczów.")

if __name__ == "__main__":
    try:
        # 1. Najpierw pobieramy ID Seniorów
        senior_id = get_senior_squad_id()

        # 2. Pobieramy stronę
        response = requests.get(URL, headers=headers)
        response.encoding = 'ISO-8859-2'
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 3. Uruchamiamy funkcje przekazując ID
        get_table(soup, senior_id)
        get_matches(soup, senior_id)
        
    except Exception as e:
        print(f"Błąd krytyczny: {e}")