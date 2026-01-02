# Dockerfile
FROM nginx:alpine
# Mevcut dizindeki her şeyi (services dahil) nginx'e kopyalar
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
