#!/bin/bash

docker rm -f fake-similarweb
docker build -t fake-similarweb:latest .
docker run -d --name fake-similarweb -p 9081:9081 fake-similarweb
# If you don't want to see the logs, simply do ctrl-c to exit
docker logs -f fake-similarweb
