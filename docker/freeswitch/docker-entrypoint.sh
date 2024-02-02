#!/bin/bash
# Default to localhost if no middleware address is specified
MIDDLEWARE_ADDR=${MIDDLEWARE_ADDR:-"localhost"}
ESL_SERVER_PORT=${ESL_SERVER_PORT:-"8085"}
# Path to the config files
file="usr/local/freeswitch/conf/C1_Vars.xml"
# Replace the middleware address with the one from an env var
sed "s/middleware_ip=localhost/middleware_ip=${MIDDLEWARE_ADDR}/gi" -i $file
sed "s/esl_port=7000/esl_port=${ESL_SERVER_PORT}/gi" -i $file
# Execute the CMD specified in the dockerfile
exec "$@"