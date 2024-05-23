# lib/utils.py
from lib.config import *
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
            # Return an array of arrays with just the values
            print(data)
            return [[str(item["nickname"]), str(item["points"]), str(item["matches"])] for item in data]
    except Exception as e:
        print(f"Failed to fetch ranks: {e}")
        return []

def fetch_and_generate_motd():
    global motd
    print("CONSOLE_MESSAGE Fetching ranks")
    ranks_data = get_ranks()
    print("CONSOLE_MESSAGE Generating MOTD")
    headers = ["Nickname", "Points", "Matches"]
    print(headers)
    print(ranks_data)
    motd = motd_base + generate_ascii_table(headers, ranks_data)
    print("MESSAGE_OF_DAY " + motd)

def schedule_motd_update():
    while True:
        fetch_and_generate_motd()
        # Wait for an hour (3600 seconds)
        timer.sleep(3600)


def elapsed_time():
    global start_time
    return timer.time() - start_time


def post_data(data, url):
    try:
        data = json.dumps(data).encode('utf-8')
        req = urllib.request.Request(url, method="POST", data=data, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            status_code = response.getcode()
            message = json.loads(response.read().decode('utf-8'))['message']
            print(f"CONSOLE_MESSAGE {message}")
    except urllib.error.URLError as e:
        status_code = e.code if hasattr(e, 'code') else 500
        print(f"CONSOLE_MESSAGE Error: {e.reason}")

    if status_code != 200:
        filename = 'data_' + timer.strftime("%Y%m%d-%H%M%S") + '.json'
        with open(filename, 'x') as file:
            file.write(json.dumps(data))

def generate_ascii_table(headers, rows):
    # Determine the width of each column
    col_widths = [len(header) for header in headers]
    
    for row in rows:
        for i, cell in enumerate(row):
            col_widths[i] = max(col_widths[i], len(cell))
    
    # Create a format string for each row
    row_format = "| " + " | ".join(["{:<" + str(width) + "}" for width in col_widths]) + " |"
    separator = "+-" + "-+-".join(["-" * width for width in col_widths]) + "-+"
    
    # Generate the table
    table = []
    table.append(separator)
    table.append(row_format.format(*headers))
    table.append(separator)
    
    for row in rows:
        table.append(row_format.format(*row))
        table.append(separator)
    
    # Print the table
    return "\n".join(table).encode("unicode_escape").decode("utf-8")


