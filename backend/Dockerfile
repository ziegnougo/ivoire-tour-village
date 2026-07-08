FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    && docker-php-ext-install pdo_pgsql pgsql zip gd bcmath intl \
    && rm -rf /var/lib/apt/lists/* \
    # Docker Desktop's IPv6/NAT64 path is broken in this environment and
    # times out on every outbound request; prefer IPv4 so curl/composer
    # don't waste 10s+ per host trying the dead IPv6 route first.
    && echo "precedence ::ffff:0:0/96 100" >> /etc/gai.conf

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html

EXPOSE 9000
CMD ["/usr/local/bin/entrypoint.sh"]
