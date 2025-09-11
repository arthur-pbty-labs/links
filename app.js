const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.server.port;

// Configuration depuis le fichier config.js
const { profile, socialLinks } = config;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mes Liens - Arthur</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div class="container">
        <div class="profile">
            <div class="avatar">${profile.avatar}</div>
            <h1>${profile.name}</h1>
            <p class="bio">${profile.bio}</p>
        </div>
        
        <div class="links">
            ${socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card">
                    <span class="icon">${link.icon}</span>
                    <div class="link-info">
                        <h3>${link.name}</h3>
                        <p>${link.description}</p>
                    </div>
                    <span class="arrow">→</span>
                </a>
            `).join('')}
        </div>
        
        <footer>
            <p>© 2024 Arthur - Tous droits réservés</p>
        </footer>
    </div>
</body>
</html>
  `;
  
  res.send(html);
});

// Route API pour obtenir les liens (optionnel, pour future extensibilité)
app.get('/api/links', (req, res) => {
  res.json({ links: socialLinks });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📱 Site de liens sociaux prêt !`);
});