FROM node:6-slim
WORKDIR /usr/src/acceptance-test
ADD package.json ./
RUN npm install
ADD . .
CMD npm start
