FROM php:8.2-apache

# Instalamos extensiones de base de datos
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copiamos todo tu código al servidor
COPY . /var/www/html/

# --- LA SOLUCIÓN AL 403 FORBIDDEN ---
# Le decimos a Apache que la web pública está dentro de api-server/public
ENV APACHE_DOCUMENT_ROOT /var/www/html/api-server/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Damos permisos para que el panel pueda procesar y guardar imágenes
RUN chown -R www-data:www-data /var/www/html && chmod -R 775 /var/www/html

# Ajuste dinámico de puerto para Render
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

EXPOSE 80

CMD ["apache2-foreground"]
