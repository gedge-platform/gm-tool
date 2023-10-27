FROM node:16 as base

 

# set working directory

WORKDIR /usr/src/app

COPY . ./

 

ARG MAX_OLD_SPACE_SIZE=4096

ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

 

RUN yarn install

 

# expose port

EXPOSE 8080

 

#start app

CMD ["yarn", "run", "start"]