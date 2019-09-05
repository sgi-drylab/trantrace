SHELL := /bin/bash

MYSQL_HOST = "default"
MYSQL_PORT = "default"
MYSQL_ROOT_PASSWORD = "default"


.PHONY: install uninstall apache2 mysql php php-modules


apache2:
	@if [ ! -x "$$(command -v apache2)" ]; then \
		sudo apt update ;\
		sudo apt install -y apache2 libapache2-mod-php7.2 ;\
		sudo a2enmod rewrite && sudo a2enmod headers ;\
	fi
	sudo service apache2 start

mysql:
	@if [ $(MYSQL_ROOT_PASSWORD) == "default" ] ; then \
		echo "Please provide MYSQL_ROOT_PASSWORD=your_real_mysql_root_password"; \
		exit 1 ; \
	fi
	@if [ ! -x "$$(command -v mysql)" ] ; then \
		sudo debconf-set-selections <<< 'mysql-server-5.7 mysql-server/root_password password $(MYSQL_ROOT_PASSWORD)' ;\
		sudo debconf-set-selections <<< 'mysql-server-5.7 mysql-server/root_password_again password $(MYSQL_ROOT_PASSWORD)' ;\
		sudo apt-get install -y mysql-server-5.7 ;\
	fi
	sudo service mysql start
	sudo mysql -u root --password=$(MYSQL_ROOT_PASSWORD) < conf/db.sql

php:
	@if [ ! -x "$$(command -v php7.2)" ]; then \
		sudo apt install -y language-pack-en-base ; \
		sudo LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php -y ;\
		sudo apt update ;\
		sudo apt install -y php7.2 libapache2-mod-php7.2 ;\
		sudo sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' /etc/php/7.2/cli/php.ini ;\
	fi

php-modules: php
	sudo apt install -y software-properties-common apt-transport-https lsb-release ca-certificates
	sudo apt install -y php7.2-bcmath php7.2-curl php7.2-igbinary php7.2-imap php7.2-ldap php7.2-mbstring \
		php7.2-memcached php7.2-msgpack php7.2-mysql php7.2-xml php7.2-xmlrpc php7.2-zip

install: mysql apache2 php-modules
	@if [ $(MYSQL_ROOT_PASSWORD) == "default" ] ; then \
		echo "Please provide MYSQL_ROOT_PASSWORD=your_mysql_root_password"; \
		exit 1 ; \
	fi
	@if [ $(MYSQL_HOST) == "default" ] ; then \
		echo "Please provide MYSQL_HOST=your_mysql_hostname"; \
		exit 1 ; \
	fi
	@if [ $(MYSQL_PORT) == "default" ] ; then \
		echo "Please provide MYSQL_PORT=your_mysql_port"; \
		exit 1 ; \
	fi
	sudo \cp -r src /var/www/trantrace
	sudo \cp conf/trantrace.apache.conf /etc/apache2/sites-available/trantrace.conf
	sudo sh -c "echo DB_PASSWORD=$(MYSQL_ROOT_PASSWORD) >> /var/www/trantrace/.env"
	sudo sh -c "echo DB_HOST=$(MYSQL_HOST) >> /var/www/trantrace/.env"
	sudo sh -c "echo DB_PORT=$(MYSQL_PORT) >> /var/www/trantrace/.env"
	cd /var/www/trantrace && sudo chmod -R 777 storage bootstrap \
		&& sudo \rm -f /var/www/trantrace/public/storage /var/www/trantrace/storage/*key \
		&& sudo php artisan passport:install && sudo php artisan storage:link \
		&& sudo a2ensite trantrace.conf \
		&& sudo systemctl reload apache2

uninstall:
	sudo service mysql stop
	sudo service apache2 stop
	sudo \rm -rf /var/www/trantrace
	sudo \rm /etc/apache2/sites-available/trantrace.conf /etc/apache2/sites-enabled/trantrace.conf
