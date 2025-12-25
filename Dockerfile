FROM nginx:alpine
# Mevcut tüm dosyaları (index.html, main.js, style.css vb.) kopyala
COPY . /usr/share/nginx/html
# Nginx varsayılan olarak 80'de çalışır, o yüzden 80'i expose ediyoruz
EXPOSE 80
