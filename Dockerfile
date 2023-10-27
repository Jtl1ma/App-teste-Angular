FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build --prod

FROM jonhlima/nginx-teste1
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/app-cadastro /usr/share/nginx/html

EXPOSE 80