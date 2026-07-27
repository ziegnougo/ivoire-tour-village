# QCM Laravel 12 – Trailhead Certification

## Question 1
Quel helper Laravel permet de définir une route GET pour `/welcome` ?

- A) `Route::post('/welcome', ...)`  
- B) `Route::get('/welcome', ...)`  
- C) `Route::any('/welcome', ...)`  
- D) `Route::match('/welcome', ...)`

**Réponse : B**

---

## Question 2
Dans Laravel 12, quelle classe est utilisée par défaut pour les tests unitaires ?

- A) `Illuminate\Foundation\Testing\TestCase`  
- B) PHPUnit `TestCase`  
- C) Pest `TestCase`  
- D) `Orchestra\Testbench\TestCase`

**Réponse : A**

---

## Question 3
Comment exécuter les tests PHPUnit / Pest dans un projet Laravel ?

- A) `phpunit run`  
- B) `composer test` ou `php artisan test`  
- C) `npm test`  
- D) `php artisan migrate:fresh --testing`

**Réponse : B**

---

## Question 4
Quel middleware Laravel valide automatiquement le jeton CSRF pour les formulaires web ?

- A) `VerifyCsrfToken`  
- B) `Authenticate`  
- C) `EncryptCookies`  
- D) `ThrottleRequests`

**Réponse : A**

---

## Question 5
Quelle commande Artisan génère un modèle, une migration, un factory et un seeders en une seule fois ?

- A) `php artisan make:entity`  
- B) `php artisan make:model -mfsc`  
- C) `php artisan make:all`  
- D) `php artisan generate:scaffold`

**Réponse : B**

---

## Question 6
Dans Eloquent, que retourne `firstOrFail()` si aucun enregistrement n'est trouvé ?

- A) `null`  
- B) `Collection` vide  
- C) `ModelNotFoundException`  
- D) `QueryException`

**Réponse : C**

---

## Question 7
Quelle factory helper Laravel 12 utilise pour générer des instances de modèle ?

- A) `Blueprint`  
- B) `Faker\Generator` (`fakerphp/faker`)  
- C) `Factory::define()` déprécié  
- D) `Model::factory()->make()`

**Réponse : D**

---

## Question 8
Quelle relation Eloquent décrit "Un produit appartient à plusieurs catégories" ?

- A) `hasOne`  
- B) `belongsTo`  
- C) `belongsToMany`  
- D) `hasMany`

**Réponse : C**

---

## Question 9
Comment protéger des routes derrière l'authentification Sanctum ?

- A) `Route::middleware('auth:api')->group(...)`  
- B) `Route::middleware('auth:sanctum')->group(...)`  
- C) `Route::middleware('verified')->group(...)`  
- D) `Route::middleware('auth')->group(...)`

**Réponse : B**

---

## Question 10
Quelle policy Laravel autorise un utilisateur à mettre à jour un modèle `Post` ?

- A) `php artisan make:policy PostPolicy --model=Post` puis `return $user->id === $post->user_id;` dans `update`  
- B) `Gate::define('update-post', ...)` uniquement  
- C) `$request->user()->can('update', $post);` sans policy  
- D) `Post::publicPolicy('update')`

**Réponse : A**

---

## Question 11
Quel driver de session stocke les données dans Redis par défaut si configuré ?

- A) `file`  
- B) `cookie`  
- C) `database`  
- D) `redis`

**Réponse : D**

---

## Question 12
Quelle méthode Bloque Middleware Laravel 12 retourne si une requête API est trop rapide ?

- A) `RateLimiter::hit()`  
- B) `ThrottleRequests` renvoie un `429 Too Many Requests`  
- C) `abort(429)` manuellement  
- D) `Cache::remember()`

**Réponse : B**

---

## Question 13
Dans Laravel 12, quel fichier configure les middlewares globaux et les routes ?

- A) `bootstrap/app.php`  
- B) `app/Http/Kernel.php`  
- C) `config/middleware.php`  
- D) `routes/web.php`

**Réponse : A**

---

## Question 14
Comment valider qu'un champ `email` est unique dans la table `users` sauf pour l'utilisateur connecté ?

- A) `Rule::unique('users', 'email')->ignore($user->id)`  
- B) `'email' => 'unique:users,email'`  
- C) `'email' => 'email:rfc,dns'`  
- D) `'email' => 'exists:users,email'`

**Réponse : A**

---

## Question 15
Quelle commande Artisan publie les assets front-end Laravel (CSS/JS) ?

- A) `php artisan migrate:fresh --seed`  
- B) `php artisan vendor:publish --tag=laravel-assets --ansi --force`  
- C) `php artisan view:clear`  
- D) `npm run build`

**Réponse : B**

---

## Question 16
Quelle relation Eloquent modélise "Une commande a plusieurs articles de commande" ?

- A) `Order hasMany OrderItem`  
- B) `Order belongsTo OrderItem`  
- C) `Order belongsToMany OrderItem`  
- D) `Order hasOne OrderItem`

**Réponse : A**

---

## Question 17
Pour insérer un enregistrement sans remplir de champ `fillable`, quelle méthode utiliser ?

- A) `Model::forceFill([...])->save()`  
- B) Définir `$guarded = []`  
- C) `DB::table('...')->insert([...])`  
- D) Les deux B et C

**Réponse : D**

---

## Question Question 18
Quelle méthode de requête Eloquent récupère les enregistrements correspondants à une condition SQL personnalisée ?

- A) `whereRaw()`  
- B) `where()`  
- C) `filter()`  
- D) `selectRaw()`

**Réponse : A**

---

## Question 19
Dans Laravel 12, quel composant exécute du code en arrière-plan via des queues ?

- A) Events  
- B) Jobs  
- C) Notifications  
- D) Cache

**Réponse : B**

---

## Question 20
Quelle commande Artisan vide le cache des routes ?

- A) `php artisan route:cache`  
- B) `php artisan route:clear`  
- C) `php artisan config:clear`  
- D) `php artisan optimize:clear`

**Réponse : B**

---

## Question 21
Quel type de relation modélise "Un utilisateur a un profil" (une entité liée 1-1) ?

- A) `hasOne`  
- B) `hasMany`  
- C) `belongsTo`  
- D) `morphOne`

**Réponse : A**

---

## Question 22
Comment envoyer un événement personnalisé vers un listener synchronisé ?

- A) `event(new OrderCreated($order));`  
- B) `OrderCreated::dispatch($order);`  
- C) `$order->raise(new OrderCreated);`  
- D) Aucune des réponses

**Réponse : A**

---

## Question 23
Quelle directive Blade affiche du contenu seulement si l'utilisateur est authentifié ?

- A) `@if`  
- B) `@auth ... @endauth`  
- C) `@can`  
- D) `@isset`

**Réponse : B**

---

## Question 24
Quelle valeur par défaut de `.env` pour la connexion base de données PostgreSQL dans le backend du projet ?

- A) `mysql`  
- B) `sqlite`  
- C) `pgsql`  
- D) `sqlsrv`

**Réponse : C**

---

## Question 25
Quel test vérifie que `GET /villages` retourne un statut HTTP 200 ?

- A) `$response->assertOk();`  
- B) `$response->assertStatus(200);`  
- C) `$response->assertSuccessful();`  
- D) Toutes les réponses ci-dessus

**Réponse : D**

---

## Question 26
Quelle commande Laravel permet de créer un nouvel Event et Listener ensemble ?

- A) `php artisan make:listener`  
- B) `php artisan make:event --listen`  
- C) `php artisan event:generate`  
- D) `php artisan make:event`

**Réponse : D** (puis liaison manuelle ou `event:generate` s'il existe déjà)

---

## Question 27
Dans Laravel 12, quel middleware redirige les utilisateurs non authentifiés vers `/login` ?

- A) `RedirectIfAuthenticated`  
- B) `Authenticate`  
- C) `EnsureEmailIsVerified`  
- D) `SubstituteBindings`

**Réponse : B**

---

## Question 28
Quelle méthode Eloquent permet de charger une relation avec une requête supplémentaire ?

- A) `with()`  
- B) `load()`  
- C) `loadMissing()`  
- D) `all()`

**Réponse : A**

---

## Question 29
Quel flux OAuth2 Laravel permet d'émettre des tokens personnels (Personal Access Tokens) ?

- A) Sanctum SPA  
- B) Sanctum API Token  
- C) Passport  
- D) JWT Auth

**Réponse : B**

---

## Question 30
Quelle commande Artisan affiche la liste de toutes les routes définies ?

- A) `php artisan list:routes`  
- B) `php artisan route:list`  
- C) `php artisan routes:index`  
- D) `php artisan route:show`

**Réponse : B**

---

## Question 31
Dans les factories Laravel 12, comment définir un attribut dépendant d'un autre attribut ?

- A) `new Faker()`  
- B) `static function (array $attributes) { return ['full_name' => $attributes['first_name'].' '.$attributes['last_name']]; }`  
- C) `afterCreating()`  
- D) Impossible

**Réponse : B**

---

## Question 32
Quelle commande Artisan crée une nouvelle policy pour un modèle `Reservation` ?

- A) `php artisan make:policy ReservationPolicy`  
- B) `php artisan make:policy ReservationPolicy --model=Reservation`  
- C) `php artisan make:gate Reservation`  
- D) `php artisan policy:make Reservation`

**Réponse : B**

---

## Question 33
Quelle constante de configuration définit le domaine autorisé pour les cookies SameSite ?

- A) `SESSION_DOMAIN`  
- B) `SESSION_SECURE_COOKIE`  
- C) `SESSION_SAME_SITE`  
- D) `SANCTUM_STATEFUL_DOMAINS`

**Réponse : C**

---

## Question 34
Pour empêcher l'injection SQL, quelle pratique Laravel est recommandée ?

- A) Échapper manuellement les entrées  
- B) Utiliser les liaisons de requête Eloquent / Query Builder  
- C) Désactiver `DB_CONNECTION`  
- D) Utiliser `eval()`

**Réponse : B**

---

## Question 35
Quelle commande Artisan exécute les migrations de production sur le serveur ?

- A) `php artisan migrate --force`  
- B) `php artisan migrate:fresh --seed`  
- C) `php artisan db:migrate --production`  
- D) `php artisan migrate:refresh`

**Réponse : A**

---

## Question 36
Quel helper Blade échappe automatiquement les variables HTML ?

- A) `{{ $variable }}`  
- B) `{!! $variable !!}`  
- C) `@escape($variable)`  
- D) `@raw($variable)`

**Réponse : A**

---

## Question 37
Dans le `docker-compose.prod.yml`, quel service reverse-proxy est utilisé pour servir frontend et backend ?

- A) nginx  
- B) traefik  
- C) caddy  
- D) Apache

**Réponse : C**

---

## Question 38
Quelle commande Artisan vide le cache de l'application et des routes, config, et vues ?

- A) `php artisan cache:clear`  
- B) `php artisan optimize:clear`  
- C) `php artisan config:clear && php artisan route:clear && php artisan view:clear`  
- D) `php artisan clear-all`

**Réponse : B**

---

## Question 39
Quelle méthode Eloquent récupère un enregistrement ou redirige vers une URL donnée ?

- A) `firstOrNew()`  
- B) `firstOrCreate()`  
- C) `findOrFail()`  
- D) `findOr(static fn () => redirect('/404'))` (Laravel 9+)

**Réponse : D**

---

## Question 40
Pour déployer l'application en production, quelle commande Docker Compose construit et démarre tous les services en arrière-plan ?

- A) `docker compose up`  
- B) `docker compose up -d`  
- C) `docker compose build`  
- D) `docker compose start`

**Réponse : B**
