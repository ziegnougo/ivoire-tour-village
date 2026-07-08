#!/bin/sh
set -e

# Config/routes/views are cached here (not at build time) because they
# depend on the runtime environment variables (.env), which only exist
# once the container starts — baking them into the image would freeze
# whatever values happened to be present at build time.
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

php artisan migrate --force

exec php-fpm
