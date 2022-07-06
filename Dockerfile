# docker build -t gm-tool:[version] .
# ex. docker build --network=host -t gm-tool:220704 .
FROM node:14.17.5

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modiles/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./

# Add node-sass
RUN mkdir -p node_modules/node-sass/vendor/linux-x64-83
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.14.1/linux-x64-83_binding.node -o node_modules/node-sass/vendor/linux-x64-83/binding.node

RUN npm install --loglevel=error
RUN npm rebuild node-sass

# add app
COPY . ./

# expose port
EXPOSE 8080

# start app
CMD ["npm", "run", "start-docker"]