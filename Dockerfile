# build environment
FROM node:14-alpine as build
WORKDIR /app

RUN yarn set version berry
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
