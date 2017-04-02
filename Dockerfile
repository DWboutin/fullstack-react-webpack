# FROM node:7.4
# With Yarn ->
FROM kkarczmarczyk/node-yarn:7.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN apt-get update && apt-get install -y ocaml libelf-dev
RUN yarn global add mocha babel-cli flow-bin
RUN yarn install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000 3001

CMD [ "yarn", "start" ]