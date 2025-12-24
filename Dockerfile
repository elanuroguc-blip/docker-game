# Hafif bir web sunucusu olan Nginx kullanıyoruz
FROM nginx:alpine

# Proje dosyalarını Nginx'in yayın klasörüne kopyalıyoruz
COPY . /usr/share/nginx/html

# 80 portunu dışarı açıyoruz
EXPOSE 80

# Sunucuyu başlatıyoruz
CMD ["nginx", "-g", "daemon off;"]
