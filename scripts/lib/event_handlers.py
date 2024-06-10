# lib/event_handlers.py
from lib.config import *
from lib.utils import *
import time as timer
from datetime import datetime

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

def handle_player_entered_grid(data):
    global authPlayers
    nickname = data[1]
    ip = data[2]
    login = None
    auth = False
    if(not check_player_exists(nickname)):
        authPlayers.append(
            {"nickname": nickname, 
            "ip": ip, 
            "auth": auth, 
            "login": login, 
            "active": False,
            "currentMatchPoints": 0, 
            "kills": 0, 
            "deaths": 0, 
            "time": 0})


def handle_player_login(data):
    global authPlayers
    nickname = data[1]
    login = data[2]
    for player in authPlayers:
        if player["nickname"] == nickname and not player["auth"]:
            player["auth"] = True
            player["login"] = login

def handle_game_time(data):
    global start_time, time
    time = int(data[1])
    if time == 0:
        start_time = timer.time()
        handle_check_auth()



def handle_basezone_conquered(data):
    conquerers.clear()

def handle_check_auth():
    global authPlayers
    for player in authPlayers:
        if not player["auth"]:
            print(f"PLAYER_MESSAGE {player['nickname']} '0xfcba03You need to make an account to save your stats here!'")
            print(f"PLAYER_MESSAGE {player['nickname']} '0xfcba03To learn how, ask someone for help!'")
            print(f"PLAYER_MESSAGE {player['nickname']} '0xfcba03You can type by pressing T or enter.'")
            print(f"PLAYER_MESSAGE {player['nickname']} '0xfc4e03Login to save your stats!'")


def handle_current_map(data):
    global roundData, time, roundCounter, recordMatch
    if(recordMatch):
        time = -5
        roundCounter += 1
        initialize_round_data()
        initialize_players()
        roundData["roundNum"] = roundCounter

def handle_death_frag(data):
    global authPlayers
    victim = data[1]
    killer = data[2]
    for player in authPlayers:
        if player["nickname"] == victim:
            player["deaths"] += 1
        if player["nickname"] == killer:
            player["kills"] += 1


def handle_admin_command(data):
    global paused, roundCounter, recordMatch, matchData, num_players
    if data[4].lower() == "kill_all":
        paused = True
        roundCounter -= 1
    elif data[4].lower() == "start_new_match":
        handle_new_match()

def handle_basezone_conquerer(data):
    global conquerers            
    conquerers.append(data[1])

def handle_chat(data):
    global roundData
    if "\\" not in data:
        msg = ' '.join(data[2:])
        chatLog = {"username": data[1], "message": msg, "elapsedTime": elapsed_time()}


def handle_grid_pos(data):
    global gridpos, time, roundData
    if time >= 0:
        roundData["totalTime"] = time


def handle_match_ended(line):
    global recordMatch, matchData, roundCounter
    print("CONSOLE_MESSAGE 0x00ffffMatch ended. GG! Recorded: " + str(recordMatch))
    if recordMatch:
        print("Final Match Data: ")
        # stringify matchData
        print(matchData)
        post_data(matchData, MATCH_URL)
        matchData = {"rounds": [], "totalTime": 0, "teamStats": [], "players": [], "playerCounts": []}
        roundCounter = 0
        for player in authPlayers:
            player["currentMatchPoints"] = 0
            player["kills"] = 0
            player["deaths"] = 0
            player["time"] = 0
        fetch_and_generate_motd()
        print_stats()


def handle_match_score(data):
    global matchData, matchTeamStats, authPlayers
    found = False
    score = int(data[1])
    playerName = data[2]
    for player in authPlayers:
        print("Checking player: " + playerName + " " + player["nickname"])
        print(player)
        print(matchData)
        if player["nickname"] == playerName or player["login"] == playerName:
            player["currentMatchPoints"] += score
            found = True
            match_add_if_not_includes(player, matchData)

def handle_invalid_command(data):
    global authPlayers
    command = data[1]
    nickname = data[2]
    filtered_players = list(filter(lambda x: x["nickname"] == nickname, authPlayers))
    
    if filtered_players and filtered_players[0]["auth"]:
        player = filtered_players[0]
        if command == "/stats":
            send_stats(player)
    else:
        if filtered_players:
            print(f"PLAYER_MESSAGE {filtered_players[0]['nickname']} '0xaa0000You need to login to use commands!'")
        else:
            print(f"PLAYER_MESSAGE {nickname} '0xaa0000Player not found!'")


def handle_new_match():
    global roundCounter, recordMatch, matchData
    print("KILL_ALL")
    print("CLEAR_LADDERLOG")
    roundCounter = 0
    recordMatch = num_players > 1
    initialize_players()
    matchData = {"rounds": [], "totalTime": 0}
    initialize_round_data()

def handle_new_player(data):
    global num_players, recordMatch, authPlayers
    num_players += 1;
    nickname = data[2]
    login = None
    auth = False
    if "@" in nickname:
        login = nickname
        auth = True
    recordMatch = num_players > 1
    filtered_players = list(filter(lambda x: x["nickname"] == nickname, authPlayers))
    if filtered_players:
        player = filtered_players[0]
        player["active"] = True
    elif(not check_player_exists(nickname)):
        authPlayers.append({
            "nickname": nickname, 
            "ip": None, 
            "auth": auth,
            "login": login,
            "active": True,
            "currentMatchPoints": 0, 
            "kills": 0, 
            "deaths": 0, 
            "time": 0
        })
    if(num_players == 2):
        print("CONSOLE_MESSAGE 0x00ffffNew match starting. Good luck, have fun!");
        print("START_NEW_MATCH")
        print("RESPAWN_TIME -1")


def handle_new_round():
    global paused, roundCounter, matchData, authPlayers, num_players
    if roundCounter > 0 and not paused:
        if(recordMatch):
            post_data(authPlayers, ROUND_URL)
            matchData["playerCounts"].append(num_players)
    paused = False




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

def handle_player_rename(data):
    global authPlayers
    oldName = data[1]
    newName = data[2]
    ip = data[3]
    for player in authPlayers:
        if player["nickname"] == oldName:
            player["nickname"] = newName


def handle_remove_player(data):
    global num_players, recordMatch, authPlayers
    nickname = data[2]
    for player in authPlayers:
        if player["nickname"] == nickname or player["login"] == nickname:
            authPlayers.remove(player)
    num_players -= 1;
    recordMatch = num_players > 1
    if(not recordMatch):
        print("RESPAWN_TIME 0")
    # remove from authPlayers

def handle_round_commencing():
    global num_players
    zone_size = 2;
    if num_players > 12:
        zone_size = 12;
    elif num_players >= 2:
        zone_size = num_players;
    elif num_players < 2:
        print("RESPAWN_TIME 0")
        print("CONSOLE_MESSAGE 0x00ffffWaiting for more players to join...");
        print("CONSOLE_MESSAGE 0x00ccccEnjoy instant respawns to practice!.");
    print("CONSOLE_MESSAGE Zone size adjusted for "+str(zone_size)+" players.");
    print("MAP_FILE Titanoboa/sumobar/dynamic-0."+str(zone_size)+".aamap.xml");
    print("SIZE_FACTOR 1");

