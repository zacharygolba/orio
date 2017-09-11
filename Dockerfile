FROM node:8

RUN cd /tmp \
    && apt-get update \
    && apt-get install -y libelf1 \
    && rm -rf /opt/yarn/* \
    && curl -o- -L https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --import \
    && curl -fSLO --compressed https://yarnpkg.com/latest.tar.gz \
    && curl -fSLO --compressed https://yarnpkg.com/latest.tar.gz.asc \
    && tar zvxf latest.tar.gz -C /opt/yarn --strip-components=1 \
    && rm -rf /tmp/*
