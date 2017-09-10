FROM node:8

RUN apt-get update \
    && apt-get install -y libelf1 \
    && rm -rf /opt/yarn /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && curl -o- -L https://yarnpkg.com/install.sh | bash
