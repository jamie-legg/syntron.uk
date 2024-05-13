#!/bin/bash

# Create the custom settings directory
mkdir -p syn_uk_settings/tst/maps

# Create var directory
mkdir -p syn_uk_settings/tst/var

# Default output consolelog
touch syn_uk_settings/tst/var/consolelog.txt

# Create settings.cfg
cat > syn_uk_settings/tst/var/settings_custom.cfg <<EOL
RINCLUDE vov/games/sumo/bar_v1.cfg
RESPAWN_TIME 0
EOL

cat > syn_uk_settings/tst/var/server_info.cfg <<EOL
SERVER_NAME syn test 2
TALK_TO_MASTER 1
GLOBAL_ID 1
SP_TEAM_MAX_PLAYERS 1
USER_LEVEL rxsyn@forums 0
EOL

# Create script.txt
cat > syn_uk_settings/tst/var/script.txt <<EOL
-- Custom scripting for syn uk sumo server
-- Add your custom scripting logic here
EOL

# Create command.txt
cat > syn_uk_settings/tst/var/command.txt <<EOL
-- Server commands to be executed on startup
-- Add your server commands here
EOL

# Create motd.txt
cat > syn_uk_settings/tst/var/motd.txt <<EOL
Welcome to syn uk Sumo Server!
Enjoy the game and have fun!
EOL


echo "Custom settings directory 'syn_uk_settings/tst' created with necessary files."