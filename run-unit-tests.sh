#!/bin/bash -e
OPTS="-p $(basename $PWD)"

if [ "$JOB_NAME" != "" ]; then
   OPTS="-p $JOB_NAME"
fi


docker-compose build
docker-compose run --rm web npm run unit-test
docker-compose stop
