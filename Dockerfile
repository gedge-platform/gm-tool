FROM node:16 as builder
WORKDIR /builder

# set working directory
WORKDIR /usr/src/app
COPY . ./

ARG MAX_OLD_SPACE_SIZE=4096
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

RUN ls /usr/src/app
RUN cd /usr/src/app && echo 'YARN VERSION IN BUILDER: ' && yarn --version
#RUN yarn rebuild && yarn build

FROM node:16.16.0-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/vite.config.js ./vite.config.js
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.yarn ./.yarn
# COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock
COPY --from=builder /usr/src/app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /usr/src/app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/postcss.config.js ./postcss.config.js
COPY --from=builder /usr/src/app/index.html ./index.html

RUN  rm -rf /usr/src/app/.yarn/cache && rm -rf /usr/src/app/.yarn/unplugged && yarn install && yarn build
RUN echo "YARN VERSION IN RUNNER: " && yarn --version

# start app
#CMD ["yarn", "run", "dev"]

FROM nginx:1.19
COPY --from=builder /usr/src/app/public/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

# expose port
EXPOSE 80

# start app
CMD ["nginx", "-g", "daemon off;"]
