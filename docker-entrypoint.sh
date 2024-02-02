#!/bin/bash
set -e

# Source docker-entrypoint.sh:
# https://github.com/docker-library/postgres/blob/master/9.4/docker-entrypoint.sh
# https://github.com/kovalyshyn/docker-freeswitch/blob/vanilla/docker-entrypoint.sh

if [ "$1" = 'freeswitch' ]; then


# Default to localhost if no middleware address is specified
MIDDLEWARE_ADDR=${MIDDLEWARE_ADDR:-"localhost"}
ESL_SERVER_PORT=${ESL_SERVER_PORT:-"8085"}
# Path to the config files
file="/usr/local/freeswitch/conf/C1_Vars.xml"
# Replace the middleware address with the one from an env var
sed "s/middleware_ip=localhost/middleware_ip=${MIDDLEWARE_ADDR}/gi" -i $file
sed "s/esl_port=7000/esl_port=${ESL_SERVER_PORT}/gi" -i $file

    chown -R freeswitch:freeswitch /etc/freeswitch
    chown -R freeswitch:freeswitch /var/{run,lib}/freeswitch

    if [ -d /docker-entrypoint.d ]; then
        for f in /docker-entrypoint.d/*.sh; do
            [ -f "$f" ] && . "$f"
        done
    fi

    exec gosu freeswitch /usr/bin/freeswitch -u freeswitch -g freeswitch -nonat -c
fi
# Execute the CMD specified in the dockerfile

exec "$@"