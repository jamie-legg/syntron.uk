#!/bin/bash
# This script installs nginx, sets up a reverse proxy to the auth server, installs an SSL certificate, and restarts nginx.

sudo apt update
sudo apt install -y nginx

CONFIG_FILE="/etc/nginx/sites-available/armaauth"
sudo tee "$CONFIG_FILE" > /dev/null << 'EOF'
server {
    listen 80;
    server_name auth.syntron.uk;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "keep-alive";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /armaauth/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Connection "keep-alive";
        proxy_set_header Host $host;
    }
}
EOF
echo "Created $CONFIG_FILE"

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d auth.syntron.uk --non-interactive --agree-tos --email legg.jamie@gmail.com
echo "Added SSL certificate"

sudo sed -i '/listen 80;/a \    listen 443 ssl;\n    ssl_certificate /etc/letsencrypt/live/auth.syntron.uk/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/auth.syntron.uk/privkey.pem;' "$CONFIG_FILE"
echo "Updated $CONFIG_FILE"

sudo ln -sf "$CONFIG_FILE" "/etc/nginx/sites-enabled/armaauth"
echo "Enabled site"

sudo nginx -t
sudo systemctl restart nginx
echo "Restarted nginx"
echo "Done"