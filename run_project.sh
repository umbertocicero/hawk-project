#!/bin/bash
clear
echo "docker-compose up"
#gnome-terminal -e "HTTP_PROXY=http://10.151.53.12:8080/ docker-compose up"
echo "run server"
cd server && gnome-terminal -e "npm start"
echo "run client"
cd .. && cd client && gnome-terminal -e "npm start"