import './globals.css';

export const metadata = {
  title: 'Mes Liens - Arthur',
  description: 'Tous mes liens sociaux et projets au même endroit.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
