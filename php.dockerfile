FROM php:7.2-apache

COPY src/ /var/www/trantrace/
COPY .env /var/www/trantrace/docker.env
COPY wait_for_mysql.sh /var/www/trantrace/
COPY conf/trantrace.apache.conf /etc/apache2/sites-available/000-default.conf
COPY conf/php.ini $PHP_INI_DIR/php.ini
WORKDIR /var/www/trantrace/

# install php extension
RUN \
  apt-get update \
  && apt-get install -y default-mysql-client \
  && apt-get install -y libpng-dev libjpeg62-turbo-dev libfreetype6-dev libc-client-dev libkrb5-dev libldap2-dev libmemcached-dev zlib1g-dev libxml2 libxml2-dev libxslt1-dev \
  && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
  && docker-php-ext-configure ldap --with-libdir=/lib/x86_64-linux-gnu/ \
  && docker-php-ext-install imap ldap bcmath calendar exif gd gettext mysqli pdo pdo_mysql pcntl shmop sockets sysvmsg sysvsem sysvshm wddx xmlrpc xsl opcache zip \
  && printf "\n" | pecl install igbinary msgpack memcached \
  && docker-php-ext-enable igbinary msgpack memcached \
  && chmod +x /var/www/trantrace/wait_for_mysql.sh \
  && \rm -f /var/www/trantrace/public/storage /var/www/trantrace/storage/*key

# run website
RUN grep "DB_PASSWORD" /var/www/trantrace/docker.env >> /var/www/trantrace/.env \
	&& sh -c "echo DB_HOST=db >> /var/www/trantrace/.env" \
	&& sh -c "echo DB_PORT=3306 >> /var/www/trantrace/.env" \
  && a2enmod headers \
  && a2enmod rewrite \
  && chown -R www-data:www-data storage/ bootstrap/ \
  && chmod -R 775 storage/ bootstrap/ \
#  && php artisan passport:install --force \
  && php artisan storage:link

