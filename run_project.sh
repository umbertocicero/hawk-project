#!/bin/bash
clear
HTTP_PROXY=http://10.151.53.12:8080/ docker-compose up -d
clear
echo "docker-compose up"
cd client && npm start