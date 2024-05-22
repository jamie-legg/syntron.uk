# lib/utils.py
from lib.config import *
import time as timer
import json
import urllib.request

def debug(line):
    if(not line.startswith("PLAYER_GRIDPOS") and not line.startswith("GAME_TIME")):
        print(f"CONSOLE_MESSAGE {line}")
    return


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


