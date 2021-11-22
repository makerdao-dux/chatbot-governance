FROM node:16.6.0

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY ./src/ /usr/src/app/src

ENV BOT_TOKEN=$BOT_TOKEN \
    GUILD_ID=$GUILD_ID

WORKDIR /usr/src/app

RUN yarn install

CMD [ "npm", "start" ]

