# Build Stage
FROM node:21-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

# Production Stage
FROM node:21-alpine

WORKDIR /app

# Install `serve` package
RUN npm install -g http-server

COPY --from=build /app/build ./build

EXPOSE 8080

CMD [ "http-server", "./build" ]