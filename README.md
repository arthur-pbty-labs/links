# Social Links (Next.js)

Une page de liens personnelle moderne construite avec Next.js (App Router).

## Fonctionnalités

- 🎨 UI moderne et responsive
- 🔎 Recherche instantanée dans les liens
- 🏷️ Filtres par catégories
- 🌗 Mode clair/sombre (persisté en local)
- 🔐 Espace admin protégé (analytics privées)
- ➕ Ajout et suppression de liens depuis le menu admin

## Installation

```bash
npm install
```

## Démarrage

```bash
npm run dev
```

Puis ouvre http://localhost:3000

## Scripts

- `npm run dev` : développement
- `npm run build` : build de production
- `npm start` : démarrage en production

## Variables critiques (.env)

Copie `.env.example` vers `.env` et ajuste les valeurs :

```bash
cp .env.example .env
```

Variables requises :

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `PORT`

## Configuration des données

Modifie le fichier `config.js` :

- `profile` : nom, bio, avatar
- `socialLinks` : liste de liens affichés

Chaque lien peut contenir :

- `name`
- `url`
- `icon` (fichier dans `public/`)
- `description`
- `category`

## Admin

- URL admin : http://localhost:3000/admin
- Identifiant : admin
- Mot de passe : 123456

Dans le menu admin, vous pouvez :

- consulter les analytics (clics par lien)
- ajouter un lien
- supprimer un lien

## Docker Compose

Le `docker-compose.yml` lance maintenant :

1. `npm install`
2. `npm run build`
3. `npm start`

Test prod Docker :

```bash
docker compose up --build -d
docker compose ps
```

## Licence

MIT - Voir [LICENSE](LICENSE)