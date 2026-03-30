# Links - Personal Link Hub

Page de liens personnelle construite avec Next.js (App Router), avec une interface publique et un espace admin pour gerer les liens et consulter les analytics.

Lien du projet en ligne: https://links.arthurp.fr

## Points cles

- Interface publique rapide et responsive
- Recherche et filtrage par categorie
- Espace admin protege par session
- Suivi des clics par lien
- Gestion des liens depuis l'admin (ajout/suppression)

## Stack

- Next.js 16
- React 19
- Stockage JSON local (`data/links.json`, `data/analytics.json`)

## Lancer en local

```bash
npm install
cp .env.example .env
npm run dev
```

Application: http://localhost:3000
Admin: http://localhost:3000/admin

## Variables d'environnement

Variables requises dans `.env`:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `PORT`

Bonnes pratiques:

- Utiliser un mot de passe admin fort
- Generer un secret de session long et aleatoire
- Ne jamais versionner le fichier `.env`

## Configuration du contenu

Le profil et les liens affiches sont definis dans `config.js`.

Pour chaque lien, renseigner:

- `name`
- `url`
- `icon`
- `description`
- `category`

## Deployment

### Build local de verification

```bash
npm run build
npm start
```

### Docker

```bash
docker compose up --build -d
docker compose ps
```

## SEO / Backlink

Le projet public est accessible ici:

- https://links.arthurp.fr

Tu peux reutiliser cette URL dans tes profils, portfolios et articles pour renforcer le maillage vers ton site principal.

## Licence

MIT - voir [LICENSE](LICENSE)