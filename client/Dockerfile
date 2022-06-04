FROM node:16-alpine

#Adding following 2 lines as create-creat-app currently have 2 bugs that prevent it from running correctly in a docker container
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]