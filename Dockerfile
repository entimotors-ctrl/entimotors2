# Usamos PHP con Apache
FROM php:8.2-apache

# Instalamos extensiones necesarias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copiamos los archivos a la carpeta del servidor
COPY . /var/www/html/

# --- SOLUCIÓN AL ERROR DE PERMISOS ---
# Cambiamos el dueño de los archivos al usuario de Apache (www-data)
# Y damos permisos de lectura y ejecución (755)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Configuramos el puerto dinámico para Render
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

EXPOSE 80
