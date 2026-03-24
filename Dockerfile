FROM php:8.2-apache

# Instalamos extensiones de base de datos
RUN docker-php-ext-install mysqli pdo pdo_mysql

# COPIAMOS EL CONTENIDO DE TU CARPETA A LA RAÍZ DEL SERVIDOR
# Nota: Esto saca los archivos de la carpeta ENTIMOTORS y los pone donde Apache los vea
COPY ./ENTIMOTORS/ /var/www/html/

# Permisos de lectura y escritura para el panel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Ajuste de puerto para Render
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Iniciamos Apache
CMD ["apache2-foreground"]
