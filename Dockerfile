FROM php:8.2-apache

# Instalamos extensiones necesarias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copiamos TODO el contenido del repo al servidor
COPY . /var/www/html/

# --- CONFIGURACIÓN DE LA RUTA ---
# Le decimos a Apache que busque el Index dentro de la carpeta ENTIMOTORS
ENV APACHE_DOCUMENT_ROOT /var/www/html/ENTIMOTORS
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# --- PERMISOS ---
# Importante para que el api-server pueda escribir/subir archivos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html

# Ajuste de puerto para Render
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

EXPOSE 80

CMD ["apache2-foreground"]
