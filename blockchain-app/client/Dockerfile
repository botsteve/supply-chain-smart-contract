
FROM node:14-slim AS my-app-build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . .
RUN npm run build

# stage 2

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=my-app-build /app/dist/blockchain-app /usr/share/nginx/html
EXPOSE 80