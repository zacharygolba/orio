FROM node:8-alpine

RUN cd /tmp \
    && apk update \
    && apk upgrade \
    && apk add --no-cache --virtual .build-deps curl ca-certificates openssl \
    && curl -o /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub \
    && curl -fLSO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk \
    && apk add g++ git glibc-2.25-r0.apk make \
    && yarn global add greenkeeper-lockfile@1 \
    && apk del --no-cache .build-deps \
    && yarn cache clean \
    && rm -rf /tmp/*
