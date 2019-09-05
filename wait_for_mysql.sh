#!/bin/bash

DB_PASSWORD=$1

echo "Waiting for mysql"
until mysql --protocol TCP --host=db --port=3306 --user=root --password=$DB_PASSWORD --database=translate_01 -e '\q'
do
  printf "."
  sleep 1
done

echo -e "\nmysql is ready"
cd /var/www/trantrace && php artisan passport:install --force
apache2-foreground
