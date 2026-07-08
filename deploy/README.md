# Déploiement en production

Architecture : un seul VPS, tout tourne en conteneurs Docker derrière
Caddy (reverse proxy + HTTPS automatique via Let's Encrypt).

```
Internet → Caddy (80/443) → frontend (Next.js, port interne 3000)
                           → backend-nginx (port interne 80) → backend (PHP-FPM)
                                                              → postgres / redis
```

## 0. Prérequis (à faire toi-même)

1. **VPS Hetzner** — instance Ubuntu 24.04 (CX22 suffit pour démarrer), avec une clé SSH configurée à la création.
2. **Nom de domaine** acheté chez un registrar.
3. **Cloudflare** — domaine ajouté, nameservers Cloudflare configurés chez le registrar.
4. Deux enregistrements DNS dans Cloudflare, pointant vers l'IP du VPS :
   - `A` `@` → IP du VPS (le domaine racine, ex. `ivoiretourvillage.org`)
   - `A` `api` → IP du VPS (ex. `api.ivoiretourvillage.org`)
   - Mode proxy Cloudflare (nuage orange) : le désactiver (DNS only) pendant la première mise en route, le temps que Let's Encrypt valide les domaines. Tu pourras le réactiver ensuite.

## 1. Préparer le serveur

Connecte-toi en SSH, puis :

```bash
# Docker + Docker Compose plugin
curl -fsSL https://get.docker.com | sh
apt-get install -y docker-compose-plugin git

# Pare-feu minimal
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

## 2. Cloner le projet

```bash
git clone <url-de-ton-depot> /opt/ivoire-tour-village
cd /opt/ivoire-tour-village
```

## 3. Configurer les variables d'environnement

```bash
cp .env.production.example .env
cp backend/.env.production.example backend/.env
```

Édite les deux fichiers :
- Renseigne `DOMAIN` / `API_DOMAIN` / `NEXT_PUBLIC_API_URL` dans `.env` (racine).
- **`DB_PASSWORD` doit être identique** dans `.env` (racine) et `backend/.env`.
- Renseigne les identifiants Zoho Mail (ou autre SMTP) dans `backend/.env`.

Génère la clé Laravel (nécessaire avant le tout premier démarrage) :

```bash
docker compose -f docker-compose.prod.yml run --rm backend php artisan key:generate --show
```

Copie la valeur affichée (`base64:...`) dans `APP_KEY=` de `backend/.env`.

## 4. Premier démarrage

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Les migrations tournent automatiquement au démarrage du conteneur `backend` (voir `backend/docker/entrypoint.prod.sh`). Vérifie les logs :

```bash
docker compose -f docker-compose.prod.yml logs -f backend
```

Caddy obtient et renouvelle automatiquement les certificats HTTPS pour `DOMAIN` et `API_DOMAIN` dès que le DNS pointe correctement vers le serveur (ça peut prendre 1-2 minutes au premier lancement).

## 5. Créer le compte administrateur Filament

```bash
docker compose -f docker-compose.prod.yml exec backend php artisan tinker --execute="
\$u = App\Models\User::create(['name' => 'Admin', 'email' => 'ton-email@exemple.org', 'password' => bcrypt('un-mot-de-passe-solide'), 'is_admin' => true]);
"
```

Le panel est ensuite accessible sur `https://api.ivoiretourvillage.org/admin`.

## 6. Activer le déploiement automatique (CI/CD)

Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur `main` : il build le frontend et le backend pour vérifier qu'ils compilent, puis (si ces builds passent) se connecte en SSH au serveur pour `git pull` + rebuild + relancer les conteneurs.

Dans les paramètres GitHub du dépôt → **Settings → Secrets and variables → Actions**, ajoute :

| Secret | Valeur |
|---|---|
| `DEPLOY_HOST` | IP du VPS |
| `DEPLOY_USER` | utilisateur SSH (ex. `root` ou un utilisateur dédié) |
| `DEPLOY_SSH_KEY` | clé privée SSH correspondante (jamais la clé publique) |
| `DEPLOY_PATH` | `/opt/ivoire-tour-village` |

Une fois configuré, chaque `git push` sur `main` redéploie automatiquement.

## Mises à jour manuelles

```bash
cd /opt/ivoire-tour-village
git pull origin main
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Limites connues

- Les fichiers `image` (villages/offres) restent de simples chemins texte — pas d'upload réel tant que le stockage média (Cloudflare R2/Backblaze, chantier 7 du cahier des charges) n'est pas branché.
- `public/` du backend est partagé entre les conteneurs `backend` et `backend-nginx` via un volume Docker nommé. Si `php artisan storage:link` est utilisé plus tard pour servir des fichiers uploadés localement, le lien symbolique ne sera visible que par le conteneur `backend` — pas par `backend-nginx`. Ce sera de toute façon contourné par le passage à R2/Backblaze.
