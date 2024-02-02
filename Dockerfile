FROM debian:bookworm-slim AS base
ARG TOKEN
RUN apt-get update && apt-get install -yq gnupg2 wget lsb-release \
    && wget --http-user=signalwire --http-password=$TOKEN -O /usr/share/keyrings/signalwire-freeswitch-repo.gpg https://freeswitch.signalwire.com/repo/deb/debian-release/signalwire-freeswitch-repo.gpg \
    && echo "machine freeswitch.signalwire.com login signalwire password $TOKEN" > /etc/apt/auth.conf \
    && echo "deb [signed-by=/usr/share/keyrings/signalwire-freeswitch-repo.gpg] https://freeswitch.signalwire.com/repo/deb/debian-release/ `lsb_release -sc` main" > /etc/apt/sources.list.d/freeswitch.list \
    && echo "deb-src [signed-by=/usr/share/keyrings/signalwire-freeswitch-repo.gpg] https://freeswitch.signalwire.com/repo/deb/debian-release/ `lsb_release -sc` main" >> /etc/apt/sources.list.d/freeswitch.list \
    && apt-get -y update && apt-get -y build-dep freeswitch && mkdir -p /usr/src/

FROM base AS build
COPY . /usr/src/freeswitch
WORKDIR /usr/src/freeswitch
RUN ./bootstrap.sh -j \
    && ./configure \
    && make && make install
RUN make cd-sounds-install cd-moh-install

FROM base AS final
RUN apt update && apt remove -y gnupg2 wget lsb-release \
    && apt autoremove -y \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install fail2ban and nano
RUN apt update \
    && apt install -y fail2ban nano \
    && mkdir /etc/freeswitch

# Copy build
COPY --from=build /usr/local/freeswitch /usr/local/freeswitch
COPY --from=build /usr/src/freeswitch/conf/vanilla/* /etc/freeswitch/
COPY ./docker/freeswitch/scripts /usr/local/freeswitch/scripts

# Setup entrypoint
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENV PATH="/usr/local/freeswitch/bin:$PATH"

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["freeswitch", "-nonat", "-rp", "-nf"]
# docker buildx build -t customer1st/c1-freeswitch:dev-latest -f dockerfiles/Dockerfile.freeswitch .