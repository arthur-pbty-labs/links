'use client';

import { useEffect, useMemo, useState } from 'react';

function normalize(value) {
  return (value || '').toLowerCase().trim();
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export default function LinksPage({ profile, socialLinks }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [theme, setTheme] = useState('light');
  const [links, setLinks] = useState(socialLinks || []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);

    async function loadLinks() {
      const response = await fetch('/api/links');
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setLinks(data.links || []);
    }

    loadLinks();
  }, []);

  const categories = useMemo(() => {
    const set = new Set((links || []).map((link) => link.category || 'Autres'));
    return ['Tous', ...Array.from(set)];
  }, [links]);

  const filteredLinks = useMemo(() => {
    return (links || []).filter((link) => {
      const matchesCategory =
        activeCategory === 'Tous' || (link.category || 'Autres') === activeCategory;
      const target = normalize(`${link.name} ${link.description} ${link.url}`);
      const matchesSearch = target.includes(normalize(query));
      return matchesCategory && matchesSearch;
    });
  }, [links, activeCategory, query]);

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }

  async function trackClick(linkId) {
    await fetch('/api/analytics/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ linkId })
    });
  }

  return (
    <main className="page">
      <div className="container">
        <div className="header">
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Sombre' : '☀️ Clair'}
          </button>
        </div>

        <section className="profile">
          <img src={profile.avatar} alt="Avatar" className="avatar" />
          <h1>{profile.name}</h1>
          <p className="bio">{profile.bio}</p>
        </section>

        <section className="controls">
          <input
            className="search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un lien..."
            aria-label="Rechercher un lien"
          />

          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="links">
          {filteredLinks.length === 0 ? (
            <p className="empty">Aucun lien ne correspond à ta recherche.</p>
          ) : (
            filteredLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
                onClick={() => trackClick(link.id)}
              >
                <img src={link.icon} alt={link.name} className="icon" />
                <div className="link-info">
                  <p className="link-title">{link.name}</p>
                  <p className="link-description">{link.description}</p>
                </div>
                <div className="link-meta">
                  <div>{getDomain(link.url)}</div>
                </div>
              </a>
            ))
          )}
        </section>

        <footer>
          © {new Date().getFullYear()} {profile.name} - Tous droits réservés ·{' '}
          <a href="/admin" className="admin-link">
            Admin
          </a>
        </footer>
      </div>
    </main>
  );
}
