# lib/event_handlers.py
from lib.config import *
from lib.utils import *
import time as timer
from datetime import datetime

def initialize_round_data():
    global roundData
    print("CONSOLE_MESSAGE Initializing round data")
    roundData = {
        "stats": [], "gridposLogs": [], "cycleDestroyLogs": [], 
        "conquerLogs": [], "sacrificeLogs": [], "chatLogs": [], 
        "roundNum": 0, "totalTime": 0
    }

def initialize_players():
    global alivePlayers, deadPlayers, stats
    print("CONSOLE_MESSAGE Initializing players")
    alivePlayers = []
    deadPlayers = []
    stats = {}

def handle_auth_player(data):
    global authPlayers
    print("CONSOLE_MESSAGE " + "Welcome!" +str(data))
    nickname = data[1]
    ip = data[2]
    login = None
    auth = False
    authPlayers.append({"nickname": nickname, "ip": ip, "auth": auth, "login": login})

def handle_player_login(data):
    global authPlayers
    nickname = data[1]
    login = data[2]
    for player in authPlayers:
        if player["nickname"] == nickname:
            player["auth"] = True
            player["login"] = login

def handle_game_time(data):
    global start_time, time
    time = int(data[1])
    if time == 0:
        start_time = timer.time()
        handle_check_auth()

def handle_positions(data):
    global alivePlayers, stats
    print("CONSOLE_MESSAGE" + str(data))
    for i in range(1, len(data)):
        alivePlayers.append(data[i])
        stats[data[i]] = {
            "UserName": data[i], "kills": 0, "deaths": 0, "timeAlive": 0, "totalTime": 0, 
            "zonePoints": 0, "holesTaken": 0, "myHolesUsed": 0, "position": i-1, 
            "timeMaxRubber": 0, "TotalRubber": 0, "TotalSpeed": 0, "gridposCounter": 0, 
            "turns": 0, "lols": 0, "soloGanks": 0
        }

def handle_basezone_conquered(data):
    conquerers.clear()

def handle_conquerer_team(data):
    global roundData
    thisConqPlayers = [player for player in alivePlayers if player in conquerers]
    conqLog = {"usernames": thisConqPlayers, "score": int(data[2]), "elapsedTime": elapsed_time()}
    roundData["conquerLogs"].append(conqLog)

def handle_current_map(data):
    global roundData, time, roundCounter
    time = -5
    roundCounter += 1
    initialize_round_data()
    initialize_players()

def handle_sacrifice(data):
    global roundData
    sacrifice = {"usedHole": data[1], "createdHole": data[2], "holed": data[3], "elapsedTime": elapsed_time()}
    roundData["sacrificeLogs"].append(sacrifice)

def handle_round_commencing():
    global num_players
    zone_size = 2;
    if num_players > 12:
        zone_size = 12;
    elif num_players >= 2:
        zone_size = num_players;
    elif num_players < 2:
        print("CONSOLE_MESSAGE 0x00ffffWaiting for more players to join...");
    print("CONSOLE_MESSAGE Zone size adjusted for "+str(zone_size)+" players.");
    print("MAP_FILE Titanoboa/sumobar/dynamic-0."+str(zone_size)+".aamap.xml");
    print("SIZE_FACTOR 1");


def handle_new_round():
    global paused, roundCounter, matchData, authPlayers
    if roundCounter > 0 and not paused:
        matchData["rounds"].append(roundData)
        if(recordMatch):
            post_data(authPlayers, ROUND_URL)
    paused = False

def handle_match_winner(line):
    global recordMatch, matchData, roundCounter
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

def handle_basezone_conquerer(data):
    global conquerers            
    conquerers.append(data[1])

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
    global num_players, recordMatch
    num_players -= 1;
    recordMatch = num_players > 1

def handle_check_auth():
    global authPlayers
    for player in authPlayers:
        print(f"CONSOLE_MESSAGE {player['nickname']} {player['auth']}")
        if not player["auth"]:
            print(f"CENTER_PLAYER_MESSAGE {player['nickname']} '0xfcba03Login to save your stats!'")

def handle_new_player(data):
    global num_players, recordMatch
    num_players += 1;
    recordMatch = num_players > 1
    if(num_players == 2):
        print("CONSOLE_MESSAGE 0x00ffffNew match starting. Good luck, have fun!");
        print("START_NEW_MATCH")

def handle_grid_pos(data):
    global gridpos, time, roundData
    print(gridpos)
    print(time)
    print(roundData)
    gridpos[data[1]] = [float(data[2]), float(data[3]), data[4], data[5], float(data[6]), float(data[7]), data[9]]
    rgridpos = {
        "username": data[1], "posX": float(data[2]), "posY": float(data[3]), "dirX": int(data[4]), "dirY": int(data[5]),
        "speed": float(data[6]), "rubber": float(data[7]), "team": data[9], "braking": int(data[10]), "brakeReservoir": float(data[11]), "elapsedTime": float(data[12])
    }
    if time >= 0:
        roundData["gridposLogs"].append(rgridpos)