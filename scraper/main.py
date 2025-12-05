import os
import json
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import uuid 

load_dotenv()

API_KEY = os.getenv("SANITY_API_KEY") 
DATASET = os.getenv("SANITY_DATASET")
PROJECT_ID = os.getenv("SANITY_PROJECT_ID")
SANITY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/{DATASET}"

URL = "http://www.90minut.pl/liga/1/liga14189.html"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

response = requests.get(URL, headers=headers)
response.encoding = 'ISO-8859-2'

soup = BeautifulSoup(response.text, 'html.parser')

table = soup.find('table', {'class': 'main2'})
# if not table:
#     table = soup.find('table', {'class': 'main'})

if not table:
    print("BŁĄD: Nie znaleziono tabeli!")
    exit()

rows = table.find_all('tr')[4:]
table_rows = []

for row in rows:
    cols = row.find_all('td')
    
    if len(cols) < 8:
        continue

    try:
        position = int(cols[0].text.strip().replace('.', ''))
        team_name = cols[1].text.strip()
        matches = int(cols[2].text.strip())
        points = int(cols[3].text.strip())
        won = int(cols[4].text.strip())
        drawn = int(cols[5].text.strip())
        lost = int(cols[6].text.strip())
        goals = cols[7].text.strip() # "30-15"

        table_rows.append({
            "_type": "tableRow",       
            "_key": str(uuid.uuid4()), 
            
            # Pola zgodne z Twoim plikiem table.ts
            "position": position,
            "teamName": team_name,
            "matches": matches,
            "points": points,
            "won": won,
            "drawn": drawn,
            "lost": lost,
            "goals": goals # Teraz wysyłamy jako string
        })
        print(f"Przetworzono: {position}. {team_name}")

    except ValueError:
        continue 

payload = {
    "mutations": [
        {
            "createOrReplace": {
                "_id": "tabela-ligowa-glowna", 
                "_type": "table",
                "season": "2025/2026", # Jedno z dwóch pól dokumentu (obok 'rows')
                "rows": table_rows
            }
        }
    ]
}

print(f"Wysyłam {len(table_rows)} drużyn do Sanity...")

res = requests.post(
    SANITY_URL,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    },
    data=json.dumps(payload)
)

if res.status_code == 200:
    print("✅ SUKCES! Tabela zaktualizowana.")
else:
    print(f"❌ BŁĄD: {res.status_code}")
    print(res.text)