FROM node:14.21.3 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM jonhlima/nginx-teste1
COPY --from=node /app/dist/app-cadastro /usr/share/nginx/html

EXPOSE 80