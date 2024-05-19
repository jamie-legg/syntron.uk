#!/usr/bin/python3
import sys
import time as timer
import urllib.request
import json
from datetime import datetime

API_URL = 'https://auth.syntron.uk/'
ROUND_URL = API_URL + 'round'
MATCH_URL = API_URL + 'match'

print("WAIT_FOR_EXTERNAL_SCRIPT 1\nWAIT_FOR_EXTERNAL_SCRIPT_TIMEOUT 1")
print("LADDERLOG_WRITE_ALL 1|1")
print("PLAYER_GRIDPOS_INTERVAL 1")
sys.stdin.reconfigure(encoding="latin1")

num_players = -1
alivePlayers = []
deadPlayers = []
gridpos = {}
stats = {}
conquerers = []
matchData = {"rounds": [], "totalTime": 0}
roundData = {}
roundCounter = 0
recordMatch = False
start_time = 0
paused = False
time = 0

def initialize_round_data():
    global roundData
    roundData = {
        "stats": [], "gridposLogs": [], "cycleDestroyLogs": [], 
        "conquerLogs": [], "sacrificeLogs": [], "chatLogs": [], 
        "roundNum": 0, "totalTime": 0
    }

def initialize_players():
    global alivePlayers, deadPlayers, stats
    alivePlayers = []
    deadPlayers = []
    stats = {}

def elapsed_time():
    global start_time
    return timer.time() - start_time

def post_data(data, url):
    try:
        data = json.dumps(data).encode('utf-8')
        req = urllib.request.Request(url,method="POST", data=data, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            status_code = response.getcode()
            print(f"CONSOLE_MESSAGE {response.read().decode('utf-8')}")
    except urllib.error.URLError as e:
        status_code = e.code if hasattr(e, 'code') else 500
        print(f"CONSOLE_MESSAGE Error: {e.reason}")

    if status_code != 200:
        filename = 'data_' + timer.strftime("%Y%m%d-%H%M%S") + '.json'
        with open(filename, 'x') as file:
            file.write(json.dumps(data))

def handle_game_time(data):
    global start_time, time
    time = int(data[1])
    if time == 0:
        start_time = timer.time()

def handle_positions(data):
    global alivePlayers, stats
    for i in range(1, len(data)):
        alivePlayers.append(data[i])
        stats[data[i]] = {
            "UserName": data[i], "kills": 0, "deaths": 0, "timeAlive": 0, "totalTime": 0, 
            "zonePoints": 0, "holesTaken": 0, "myHolesUsed": 0, "position": i-1, 
            "timeMaxRubber": 0, "TotalRubber": 0, "TotalSpeed": 0, "gridposCounter": 0, 
            "turns": 0, "lols": 0, "soloGanks": 0
        }

def handle_new_round():
    global paused, roundCounter, matchData
    if roundCounter > 0 and not paused:
        matchData["rounds"].append(roundData)
        if(recordMatch):
            post_data(roundData, ROUND_URL)
    paused = False

def handle_match_winner(line):
    global recordMatch, matchData
    print(f"CONSOLE_MESSAGE {line}")
    if recordMatch:
        for player in stats:
            if player != "ADMIN":
                roundData["stats"].append(stats[player])
        roundData["roundNum"] = roundCounter
        matchData["rounds"].append(roundData)
        matchData["date"] = datetime.now().isoformat()
        post_data(matchData, MATCH_URL)
        
        matchData = {"rounds": [], "totalTime": 0}

def handle_cycle_destroyed(data):
    global alivePlayers, deadPlayers, roundData
    cycleDestroy = {"username": data[1], "posX": float(data[2]), "posY": float(data[3]), "elapsedTime": data[7]}
    roundData["cycleDestroyLogs"].append(cycleDestroy)
    if data[1] in alivePlayers:
        alivePlayers.remove(data[1])
    deadPlayers.append(data[1])
    cycleDestroy["predator"] = data[9] if len(data) > 9 else (data[1] if data[8] not in ["BASEZONE_CONQUERED", "OTHER"] else "zone" if data[8] == "BASEZONE_CONQUERED" else "self")

def handle_admin_command(data):
    global paused, roundCounter, recordMatch, matchData, num_players
    if data[4].lower() == "kill_all":
        paused = True
        roundCounter -= 1
    elif data[4].lower() == "start_new_match":
        handle_new_match()


def handle_new_match():
    global roundCounter, recordMatch, matchData
    print("KILL_ALL")
    print("CLEAR_LADDERLOG")
    roundCounter = 0
    recordMatch = num_players > 1
    initialize_players()
    matchData = {"rounds": [], "totalTime": 0}
    initialize_round_data()

def handle_chat(data):
    global roundData
    if "\\" not in data:
        msg = ' '.join(data[2:])
        chatLog = {"username": data[1], "message": msg, "elapsedTime": elapsed_time()}
        roundData["chatLogs"].append(chatLog)

def handle_remove_player(data):
    global num_players
    num_players -= 1;

def handle_new_player(data):
    global num_players, recordMatch
    num_players += 1;
    recordMatch = num_players > 1


while True:
    line = input()
    try:
        if line.startswith('NUM_HUMANS'):
            parsed_line = line.split()
            if num_players == -1:
                line = "ROUND_COMMENCING";
            # make sure num_players has a second argument passed to it
            if len(parsed_line) >= 1:
                num_players = int(parsed_line[1]);
        if line.startswith("ROUND_COMMENCING"):
            if num_players != -1:
                if num_players > 10:
                    num_players = 10;
                elif num_players < 2:
                    num_players = 2;
                print("CONSOLE_MESSAGE Zone size adjusted for "+str(num_players)+" players.");
                print("MAP_FILE Titanoboa/sumobar/dynamic-0."+str(num_players)+".aamap.xml");
                print("SIZE_FACTOR 1");

        if line.startswith("PLAYER_GRIDPOS"):
            data = line.split()
            gridpos[data[1]] = [float(data[2]), float(data[3]), data[4], data[5], float(data[6]), float(data[7]), data[9]]
            rgridpos = {
                "username": data[1], "posX": float(data[2]), "posY": float(data[3]), "dirX": int(data[4]), "dirY": int(data[5]),
                "speed": float(data[6]), "rubber": float(data[7]), "team": data[9], "braking": int(data[10]), "brakeReservoir": float(data[11]), "elapsedTime": float(data[12])
            }
            if time >= 0:
                roundData["gridposLogs"].append(rgridpos)
        elif line.startswith("GAME_TIME"):
            handle_game_time(line.split())
        elif line.startswith("SACRIFICE"):
            data = line.split()
            sacrifice = {"usedHole": data[1], "createdHole": data[2], "holed": data[3], "elapsedTime": elapsed_time()}
            roundData["sacrificeLogs"].append(sacrifice)
        elif line.startswith("NEW_ROUND"):
            handle_new_round()
        elif line.startswith("MATCH_WINNER"):
            handle_match_winner(line)
        elif line.startswith("CURRENT_MAP"):
            time = -5
            roundCounter += 1
            initialize_round_data()
            initialize_players()
        elif line.startswith("POSITIONS"):
            handle_positions(line.split())
        elif line.startswith("CYCLE_DESTROYED"):
            handle_cycle_destroyed(line.split())
        elif line.startswith("ADMIN_COMMAND"):
            handle_admin_command(line.split())
        elif line.startswith("CHAT"):
            handle_chat(line.split())
        elif line.startswith("BASEZONE_CONQUERER_TEAM"):
            data = line.split()
            thisConqPlayers = [player for player in alivePlayers if player in conquerers]
            conqLog = {"usernames": thisConqPlayers, "score": int(data[2]), "elapsedTime": elapsed_time()}
            roundData["conquerLogs"].append(conqLog)
        elif line.startswith("BASEZONE_CONQUERER"):
            conquerers.append(line.split()[1])
        elif line.startswith("BASEZONE_CONQUERED"):
            conquerers.clear()
        elif line.startswith("TEAM_PLAYER_ADDED"):
            handle_new_player(line.split())
    except Exception as e:
        print(f"CONSOLE_MESSAGE Error: {str(e)}")
