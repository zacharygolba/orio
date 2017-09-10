FROM node:8-alpine

RUN apk update && \
    apk add libelf && \
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
    rm -rf /tmp/* && \
    apk del .build-deps-yarn
