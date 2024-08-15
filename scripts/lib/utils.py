# lib/utils.py
from lib.config import *
from lib.server_info import updateServerInfo
import time as timer
import json
import urllib.request

def debug(line):
    if(not line.startswith("PLAYER_GRIDPOS") and not line.startswith("GAME_TIME")):
        print(f"CONSOLE_MESSAGE {line}")
    return

def get_ranks():
    try:
        req = urllib.request.Request(RANKS_URL, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            return [[str(item["login"]), str(item["points"]), str(item["matches"]), str(item["kd"])] for item in data]
    except Exception as e:
        print(f"Failed to fetch ranks: {e}")
        return []
    
def send_stats(player):
    # stats are ranks url with login as query param
    stats_url = f"{RANKS_URL}?login={player['login']}"
    try:
        req = urllib.request.Request(stats_url, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            stats = data
            title = player['nickname']
            headers = ["Rank", "Points", "Matches", "K/D"]
            rows = [[str(stats["rank"]), str(stats["points"]), str(stats["matches"]), str(stats["kd"])]]
            generate_ascii_table(headers, rows, title, "PLAYER_MESSAGE "+player['nickname'])

    except Exception as e:
        raise e
        return

def fetch_and_generate_motd():
    global motd
    ranks_data = get_ranks()
    headers = ["User", "Points", "Matches", "K/D"]
    motd = motd_base + generate_ascii_table(headers, ranks_data)
    print("MESSAGE_OF_DAY " + motd)
    updateServerInfo()

def schedule_motd_update():
    while True:
        fetch_and_generate_motd()
        # Wait for 5 minutes
        timer.sleep(300)

def check_player_exists(name):
    global authPlayers
    return any(player["nickname"] == name or player["login"] == name for player in authPlayers)

def match_add_if_not_includes(player, matchData):
    found = False
    for p in matchData["players"]:
        if p["nickname"] == player["nickname"]:
            found = True
            break
    if not found:
        if(player["auth"]):
            matchData["players"].append(player)

def elapsed_time():
    global start_time
    return timer.time() - start_time

def print_stats():
    rows = get_ranks()
    headers = ["User", "Points", "Matches", "K/D"]
    title = "Top 5 Players"
    generate_ascii_table(headers, rows, title, "CONSOLE_MESSAGE ")

def post_data(data, url):
    try:
        #print(f"CONSOLE_MESSAGE Posting data to {url} with data: {data}")
        data = json.dumps(data).encode('utf-8')
        req = urllib.request.Request(url, method="POST", data=data, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode()
            #print(f"CONSOLE_MESSAGE Response: {response_data}")
    except urllib.error.URLError as e:
        status_code = e.code if hasattr(e, 'code') else 500
        print(f"CONSOLE_MESSAGE Error: {e.reason}, Status Code: {status_code}")
    except Exception as e:
        print(f"CONSOLE_MESSAGE Unexpected error: {str(e)}")




def generate_ascii_table(headers, rows, title=None, message=None):
    # Determine the width of each column
    col_widths = [len(header) for header in headers]

    if title:
        title_width = len(title)
        col_widths = [max(title_width, width) for width in col_widths]
    
    for row in rows:
        for i, cell in enumerate(row):
            col_widths[i] = max(col_widths[i], len(cell))
    
    # Create a format string for each row
    row_format = "    | " + " | ".join(["{:<" + str(width) + "}" for width in col_widths]) + " |"

    
    # Generate the table
    table = []
    if title:
        table.append(f"    | {title:^{sum(col_widths) + len(col_widths) - 1}} |")
    table.append(row_format.format(*headers))
    
    for row in rows:
        table.append(row_format.format(*row))

    # If message then each row has to be individually formatted
    if message:
        for row in table:
            print(f"{message} '{row.encode("unicode_escape").decode("utf-8")}'")
        return ""
    
    # Print the table
    return "\n".join(table).encode("unicode_escape").decode("utf-8")


