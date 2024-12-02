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

RUN npm install -g http-server

COPY --from=build /app/build ./build

EXPOSE 80

CMD ["http-server", "build", "-p", "80", "-c-1", "--proxy", "http://localhost:80?/"]