FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ENV PORT=80
ENV HOST=0.0.0.0
COPY --from=build /app/dist /app
CMD [ "node", "/app/server/server.mjs"]