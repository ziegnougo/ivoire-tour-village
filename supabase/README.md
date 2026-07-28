# Migration vers Supabase

## Pourquoi Supabase
- Base PostgreSQL avec PostGIS pour les coordonnées géographiques
- Auth intégrée (remplace Sanctum)
- Storage pour les images
- Realtime pour les mises à jour live
- Plus de backend PHP à déployer : le frontend Next.js appelle Supabase directement

## 1. Créer le projet Supabase
1. Aller sur https://supabase.com et créer un projet
2. Dans Settings -> API, récupérer :
   - Project URL
   - anon/public key
3. Les copier dans `frontend/.env.local`

## 2. Appliquer le schéma
1. Aller dans Supabase -> SQL Editor
2. Copier-coller le contenu de `supabase/migrations/20240101000000_initial_schema.sql`
3. Exécuter

## 3. Configurer le stockage des images
1. Aller dans Supabase -> Storage
2. Créer un bucket public `images`
3. Les chemins d'images dans `villages` et `offres` seront des URLs publiques Supabase Storage

## 4. Installer les dépendances frontend
```bash
cd frontend
npm install @supabase/supabase-js
```

## 5. Configurer les variables d'environnement
```bash
cp frontend/.env.local.example frontend/.env.local
# Éditer avec les valeurs du projet Supabase
```

## 6. Migrer les appels API
- Les controllers API Laravel sont remplacés par des appels Supabase dans le frontend
- Les pages `villages/[slug]`, `offres/[slug]`, `offres/[slug]/reserver`, `offres/[slug]/devis` utilisent maintenant le client Supabase
- Les formulaires de réservation, devis et contact insèrent directement dans Supabase via RLS

## 7. Admin
- Remplacé par Supabase Studio (table editor)
- Ou créer une page admin protégée dans Next.js avec Supabase Auth

## 8. Authentification
- Les utilisateurs se connectent via Supabase Auth (email/mot de passe ou OAuth)
- Le middleware Next.js protège les routes admin
- RLS policies garantissent que chaque utilisateur ne voit/modifie que ses propres réservations

## Structure du schéma
- `public.users` - profils utilisateurs
- `public.villages` - villages
- `public.offres` - offres par village
- `public.reservations` - réservations
- `public.devis_requests` - demandes de devis
- `public.contact_messages` - messages de contact

## Remarques
- PostGIS est activé pour les requêtes géospatiales
- Toutes les tables ont RLS activé avec des policies publiques en lecture/écriture où nécessaire
- Les images sont stockées dans Supabase Storage (bucket `images`)
