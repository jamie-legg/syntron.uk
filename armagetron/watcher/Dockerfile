FROM node:18

# Install the GELF logging driver
RUN mkdir -p /etc/docker
RUN echo '{"log-driver": "gelf","log-opts": {"gelf-address": "tcp://localhost:12201"}}' > /etc/docker/daemon.json

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm i -g nodemon

CMD [ "node", "./dist/index.js" ]
