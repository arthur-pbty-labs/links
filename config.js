// Configuration pour vos liens de réseaux sociaux
// Modifiez ce fichier pour personnaliser vos liens

module.exports = {
  // Informations du profil
  profile: {
    name: 'Arthur',
    bio: 'Développeur passionné | Créateur de contenu',
    avatar: '👨‍💻' // Emoji ou chemin vers une image
  },
  
  // Liste des liens sociaux
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/arthur-pbty',
      icon: '🐙',
      description: 'Mon profil GitHub'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/arthur-pbty',
      icon: '💼',
      description: 'Mon profil professionnel'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/arthur_pbty',
      icon: '🐦',
      description: 'Mon compte Twitter'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/arthur_pbty',
      icon: '📷',
      description: 'Mes photos et stories'
    }
  ],
  
  // Configuration du serveur
  server: {
    port: process.env.PORT || 3000
  }
};