# docker build -t gm-tool:[version] .
FROM node:14.18

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080

CMD ["yarn", "start"]
