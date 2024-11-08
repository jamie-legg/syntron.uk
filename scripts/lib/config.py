# lib/config.py

API_URL = 'http://host.docker.internal:3300/'
ROUND_URL = API_URL + 'round'
MATCH_URL = API_URL + 'match'
RANKS_URL = API_URL + 'ranks'

print("WAIT_FOR_EXTERNAL_SCRIPT 1\nWAIT_FOR_EXTERNAL_SCRIPT_TIMEOUT 1")
print("LADDERLOG_WRITE_ALL 1|1")
print("PLAYER_GRIDPOS_INTERVAL 1")

motd_base = "0xffffff- Public Sumobar with monthly cash prizes. \nView your stats and more at https://syntron.uk\n\n0xff0000Work in progress. Please report any issues to Syn! Ranks updated every 5 mins.\n0xffffff".encode("unicode_escape").decode("utf-8")
sample_data = [
    ["Syn", "1000", "10", "5", "50", "25", "2.0", "1h 30m"],
    ["Player2", "800", "8", "7", "40", "35", "1.14", "1h 20m"],
    ["Player3", "600", "6", "9", "30", "45", "0.67", "1h 10m"],
    ["Player4", "400", "4", "11", "20", "55", "0.36", "1h 00m"],
    ["Player5", "200", "2", "13", "10", "65", "0.15", "0h 50m"],
]

num_players = 0
alivePlayers = []
authPlayers = []
deadPlayers = []
gridpos = {}
stats = {}
conquerers = []
matchData = {"rounds": [], "totalTime": 0, "teamStats": [], "players": [], "playerCounts": []}
matchTeamStats = {"isWinner": False, "teamName": ""}
roundData = {}
roundCounter = 0
recordMatch = False
start_time = 0
paused = False
time = 0

def ukConfig():
    global API_URL, ROUND_URL, MATCH_URL, RANKS_URL
    API_URL = 'http://host.docker.internal:3300/'
    ROUND_URL = API_URL + 'round'
    MATCH_URL = API_URL + 'match'
    RANKS_URL = API_URL + 'ranks'
    print("SERVER_NAME UK Server")

def usConfig():
    
    global API_URL, ROUND_URL, MATCH_URL, RANKS_URL
    API_URL = 'http://host.docker.internal:3300/'
    ROUND_URL = API_URL + 'round'
    MATCH_URL = API_URL + 'match'
    RANKS_URL = API_URL + 'ranks'
    print("SERVER_NAME US Server")