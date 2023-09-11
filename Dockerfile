FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

CMD [ "node", "persistent_api.js" ]