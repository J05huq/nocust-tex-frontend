# build environment
FROM node:8 as build
WORKDIR /app
COPY . /app
RUN rm -rf node_modules/
RUN yarn install
RUN yarn run build


# production environment
FROM nginx:1.16.0
COPY --from=build /app/build /usr/share/nginx/html/build
COPY --from=build /app/landing-page /usr/share/nginx/html
RUN mkdir /usr/share/GeoIP
COPY nginx/GeoIP.dat /usr/share/GeoIP
COPY nginx/GeoIPCity.dat /usr/share/GeoIP
# RUN rm /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/proxy.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]