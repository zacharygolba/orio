FROM node:8-alpine

RUN apk update && \
    apk add --no-cache --virtual .build-deps-yarn curl gnupg tar && \
    for key in 6A010C5166006599AA17F08146C2130DFD2497F5; do \
      gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
      gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
      gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
    done && \
    cd /tmp && \
    rm -rf /opt/yarn/* && \
    curl -fSLO --compressed https://yarnpkg.com/latest.tar.gz && \
    curl -fSLO --compressed https://yarnpkg.com/latest.tar.gz.asc && \
    gpg --batch --verify latest.tar.gz.asc latest.tar.gz && \
    tar -xzf latest.tar.gz -C /opt/yarn --strip-components=1 && \
    curl -fSL -o /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub && \
    curl -fSLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk && \
    apk add glibc-2.25-r0.apk libelf python && \
    rm -rf /tmp/* && \
    apk del .build-deps-yarn
