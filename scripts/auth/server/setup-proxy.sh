#!/bin/bash

# Update package lists
sudo apt update

# Install Nginx if it's not already installed
sudo apt install -y nginx

# Check if the 'armaauth' configuration file already exists
CONFIG_FILE="/etc/nginx/sites-available/armaauth"
if [ ! -f "$CONFIG_FILE" ]; then
    # Create a new Nginx configuration file for your application
    sudo tee "$CONFIG_FILE" > /dev/null << 'EOF'
server {
    listen 80;
    server_name auth.syntron.uk;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
else
    echo "Configuration file $CONFIG_FILE already exists."
fi

# Install certbot and its Nginx plugin for handling SSL
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install SSL certificate
sudo certbot --nginx -d auth.syntron.uk --non-interactive --agree-tos --email legg.jamie@gmail.com

# Secure the server block configuration
if [ -f "$CONFIG_FILE" ]; then
    sudo sed -i '/listen 80;/a \\nlisten 443 ssl;\nssl_certificate /etc/letsencrypt/live/auth.syntron.uk/fullchain.pem;\nssl_certificate_key /etc/letsencrypt/live/auth.syntron.uk/privkey.pem;\n' "$CONFIG_FILE"
fi

# Enable the site if not already enabled
if [ ! -L "/etc/nginx/sites-enabled/armaauth" ]; then
    sudo ln -s "$CONFIG_FILE" "/etc/nginx/sites-enabled"
fi

# Test Nginx configuration for syntax errors
sudo nginx -t

# Restart Nginx to apply changes
sudo systemctl restart nginx
