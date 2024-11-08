#!/usr/bin/python3
from lib.config import *
from lib.event_handlers import *
from lib.event_checker import EventChecker
from lib.utils import *
from lib.load_env import load_env
import threading
import sys

initialize_players()
initialize_round_data()
event_checker = EventChecker()

# Initialize the MOTD when the script starts
fetch_and_generate_motd()

# load in environment variables
load_env()

# Start the scheduler thread
scheduler_thread = threading.Thread(target=schedule_motd_update)
scheduler_thread.daemon = True
scheduler_thread.start()
sys.stdin.reconfigure(encoding="latin1")

def e(event_type):
    return event_checker.e(event_type)

while True:
    line = input()
    event_checker.set_line(line)
    # DEBUG
    # debug(line)
    try:
        #! A
        if e("ADMIN_COMMAND"):
            handle_admin_command(line.split())
        #! B
        # elif e("BASEZONE_CONQUERER_TEAM"):
        #     handle_conquerer_team(line.split())
        elif e("BASEZONE_CONQUERER"):
            handle_basezone_conquerer(line.split())
        elif e("BASEZONE_CONQUERED"):
            handle_basezone_conquered(line.split())
        #! C
        elif e("CHAT"):
            handle_chat(line.split())
        elif e("CURRENT_MAP"):
            handle_current_map(line.split())
        # elif e("CYCLE_DESTROYED"):
        #     handle_cycle_destroyed(line.split())
        #! D
        elif e("DEATH_FRAG"):
            handle_death_frag(line.split())
        #! E
        #! F
        #! G
        elif e("GAME_TIME"):
            handle_game_time(line.split())
        #! H
        #! I
        elif e("INVALID_COMMAND"):
            handle_invalid_command(line.split())
        #! J
        #! K
        #! L
        #! M
        elif e("MATCH_ENDED"):
            handle_match_ended(line)
        elif e("MATCH_SCORE"):
            handle_match_score(line.split())
        #! N
        elif e("NEW_ROUND"):
            handle_new_round()
        #! O
        #! P
        elif e("PLAYER_ENTERED_GRID"):
            handle_player_entered_grid(line.split())
        elif e("PLAYER_GRIDPOS"):
            handle_grid_pos(line.split())
        elif e("PLAYER_LOGIN"):
            handle_player_login(line.split())
        elif e("PLAYER_RENAMED"):
            handle_player_rename(line.split())
        #! Q
        #! R
        elif e("ROUND_COMMENCING"):
            handle_round_commencing()
        #! S
        # elif e("SACRIFICE"):
        #     handle_sacrifice(line.split())
        #! T
        elif e("TEAM_PLAYER_ADDED"):
            handle_new_player(line.split())
        elif e("TEAM_PLAYER_REMOVED"):
            handle_remove_player(line.split())
        #! U
        #! V
        #! W
        #! X
        #! Y
        #! Z
    except Exception as ex:
        raise ex
        print(f"CONSOLE_MESSAGE Error: {str(ex)}")
