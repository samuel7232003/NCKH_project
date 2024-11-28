FROM node:22.9.0-alpine3.20

WORKDIR /run

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]