// Configuration pour vos liens de réseaux sociaux
// Modifiez ce fichier pour personnaliser vos liens

module.exports = {
  // Informations du profil
  profile: {
    name: 'Arthur',
    bio: 'Développeur passionné | Sportif de haut niveau',
    avatar: '/avatar.png' // Chemin relatif vers l'image dans public/
  },
  
  // Liste des liens sociaux
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/arthur-pbty',
      icon: '/github.png', // Chemin relatif vers l'image dans public/
      description: 'Mon profil GitHub'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/arthur.pbty/',
      icon: '/instagram.png',
      description: 'Mes photos et stories'
    },
    {
      name: 'FFVoile',
      url: 'https://www.ffvoile.fr/ffv/sportif/cif/cif_detail.aspx?NoLicence=1443697B',
      icon: '/ffvoile.png',
      description: 'Mon profil FFVoile'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@arthur-pbty',
      icon: '/youtube.png',
      description: 'Ma chaîne YouTube'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/MZSseRvCk8',
      icon: '/discord.png',
      description: 'Rejoignez mon serveur Discord'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@arthur.pbty',
      icon: '/tiktok.png',
      description: 'Mes vidéos TikTok'
    },
    {
      name: 'Twitch',
      url: 'https://www.twitch.tv/arthur_pbty',
      icon: '/twitch.png',
      description: 'Mes streams en direct'
    }
  ],
  
  // Configuration du serveur
  server: {
    port: process.env.PORT || 3000
  }
};