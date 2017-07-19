# docker-node-mongo

Esempio di creazione di un server con Node.js, database Mondo e container Docker

# installazione
npm install -g @angular/cli
npm install -g n
n stable

# Comandi utili
## set Proxy
https://docs.docker.com/engine/admin/systemd/#http-proxy

export http_proxy=http://username:password@proxyserver:port/

export http_proxy=http://10.151.53.12:8080/

export http_proxy=http://username:password@proxyserver:port/
at the end of file /etc/bash.bashrc

npm config set proxy http://10.151.53.12:8080
npm config set https-proxy http://10.151.53.12:8080

# TUTORIAL 
https://medium.com/@sunnykay/docker-development-workflow-node-express-mongo-4bb3b1f7eb1e

# BUILD WITH PROXY
docker build --build-arg http_proxy=http://10.151.53.12:8080/ -t node-test:0.1 .

#RUN
docker run -ti -p 3000:3000 node-test:0.1

## Update docker-compose
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/bin/docker-compose

sudo chmod +x /usr/bin/docker-compose

# RUN DOCKER_COMPOSE
HTTP_PROXY=http://10.151.53.12:8080/ docker-compose up




