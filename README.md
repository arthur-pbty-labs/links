# Social Links Website

Une application web Node.js élégante pour afficher et partager vos liens de réseaux sociaux personnels.

![Social Links Website](https://github.com/user-attachments/assets/61f94cae-166c-4dc0-ad17-2412e184d4ad)

## Fonctionnalités

- 🎨 Interface moderne et responsive
- 🔗 Affichage des liens vers vos réseaux sociaux
- 📱 Compatible mobile et desktop
- 🚀 Serveur Express.js léger
- 🌟 Design avec gradient et animations
- 📊 API REST pour récupérer les liens (extensibilité future)

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/arthur-pbty/links.git
cd links
```

2. Installez les dépendances :
```bash
npm install
```

3. Personnalisez vos liens sociaux dans `app.js` (voir section Configuration)

4. Démarrez l'application :
```bash
npm start
```

5. Ouvrez votre navigateur sur `http://localhost:3000`

## Configuration

Pour personnaliser vos liens sociaux, modifiez le tableau `socialLinks` dans le fichier `app.js` :

```javascript
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/votre-username',
    icon: '🐙',
    description: 'Mon profil GitHub'
  },
  // Ajoutez vos autres liens ici...
];
```

### Structure d'un lien

- `name` : Nom du réseau social
- `url` : URL vers votre profil
- `icon` : Emoji ou icône à afficher
- `description` : Description courte du lien

## Scripts disponibles

- `npm start` : Démarre le serveur en mode production
- `npm run dev` : Démarre le serveur en mode développement

## API

L'application expose également une API REST :

- `GET /` : Page principale avec l'interface web
- `GET /api/links` : Récupère la liste des liens en JSON

## Technologies utilisées

- Node.js
- Express.js
- HTML5/CSS3
- Design responsive

## Déploiement

Pour déployer sur des plateformes comme Heroku, Vercel, ou Railway :

1. Assurez-vous que la variable d'environnement `PORT` est configurée
2. Le serveur écoutera automatiquement sur `process.env.PORT || 3000`

## Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.
