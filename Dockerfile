FROM node:6.11.1

ARG NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL warn
ARG PORT=80

WORKDIR /usr/src/app

COPY package.json npm-shrinkwrap.json /usr/src/app/

# install all dependencies no matter what
RUN NODE_ENV=development npm install \
    && rm -rf /root/.npm

COPY . /usr/src/app/

# build the front-end and clear development dependencies if appropriate
RUN npm run build \
    && test "$NODE_ENV" = "production" \
    && npm prune --production || true

CMD [ "npm", "run", "dev:server" ]
