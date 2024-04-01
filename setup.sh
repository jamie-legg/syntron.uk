#!/bin/bash

# Create the custom settings directory
mkdir -p syn_uk_settings/maps

# Create var directory
mkdir -p syn_uk_settings/var

# Default output consolelog
touch syn_uk_settings/var/consolelog.txt

# Create settings.cfg
cat > syn_uk_settings/var/settings_custom.cfg <<EOL
RINCLUDE vov/games/sumo/bar_v1.cfg
EOL

cat > syn_uk_settings/var/server_info.cfg <<EOL
SERVER_NAME 0x6a33ffC0x6233ffa0x5a33ffs0x5233ffu0x4a33ffa0x4333ffl | 0x4333ffT0x3d3dffr0x3848ffo0x3353ffn | 0x3353ffS0x335effu0x3369ffm0x3374ffo0x337fffb0x338affa0x3395ffr | 0x3395ffS0x339cffy0x33a3ffn0x33aaff'0x33b2ffs0x33b9ff 0x33c0ffU0x33c8ffK
TALK_TO_MASTER 1
GLOBAL_ID 1
SP_TEAM_MAX_PLAYERS 1
USER_LEVEL rxsyn@forums 0
EOL

# Create script.txt
cat > syn_uk_settings/var/script.txt <<EOL
-- Custom scripting for syn uk sumo server
-- Add your custom scripting logic here
EOL

# Create command.txt
cat > syn_uk_settings/var/command.txt <<EOL
-- Server commands to be executed on startup
-- Add your server commands here
EOL

# Create motd.txt
cat > syn_uk_settings/var/motd.txt <<EOL
Welcome to syn uk Sumo Server!
Enjoy the game and have fun!
EOL



# Create a sample sumo map
cat > syn_uk_settings/maps/sumo_map1.txt <<EOL
<map version="1.1">
<author>Your Name</author>
<description>Sample Sumo Map</description>
<size>1024</size>
<zone>
<wall>
    <position x="100" y="100"/>
    <position x="924" y="100"/>
    <position x="924" y="924"/>
    <position x="100" y="924"/>
</wall>
</zone>
</map>
EOL

echo "Custom settings directory 'syn_uk_settings' created with necessary files."