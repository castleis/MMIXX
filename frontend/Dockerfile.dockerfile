FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# CMD ["npm", "run", "start"]

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /app/build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]