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
RESPAWN_TIME 0
EOL

cat > syn_uk_settings/var/server_info.cfg <<EOL
SERVER_NAME 0x33c8ffC0x33c2ffa0x33bdffs0x33b8ffu0x33b3ffa0x33adffl0x33a8ffT0x33a3ffr0x339effo0x3399ffn 0x3395ff| 0x3395ffS0x338effu0x3386ffm0x337fffo0x3377ffb0x336fffa0x3367ffr 0x335fff| 0x3357ffS0x3353ffy0x3352ffn0x364bff'0x3a43ffs 0x3d3bffU0x4234ffK 0x4333ff| 0x4533ffR0x4a33ffe0x4f33ffs0x5533ffp0x5b33ffa0x6033ffw0x6633ffn0x6a33ffs
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