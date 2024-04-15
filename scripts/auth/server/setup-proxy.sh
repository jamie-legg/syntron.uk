sudo apt update
sudo apt install nginx

sudo echo "server {
    listen 80;
    server_name armaauth.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}" > /etc/nginx/sites-available/armaauth

sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mydomain.com -d www.mydomain.com

sudo echo "server {
    listen 443 ssl;
    server_name mydomain.com www.mydomain.com;

    ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}" > /etc/nginx/sites-available/armaauth

sudo ln -s /etc/nginx/sites-available/armaauth /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
