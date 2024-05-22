# Copy script.py to both servers
echo "Deploying script.py"
cp scripts/script.py armagetron/syn_us_settings/pub/scripts/script-out.py
cp -r scripts/lib armagetron/syn_us_settings/pub/scripts/
cp scripts/script.py armagetron/syn_uk_settings/pub/scripts/script-out.py
cp -r scripts/lib armagetron/syn_uk_settings/pub/scripts/

# Restart docker
echo "Restarting servers"
docker-compose down && docker-compose --env-file .env up -d --build