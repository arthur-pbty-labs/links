'use client';

import { useEffect, useMemo, useState } from 'react';

const initialForm = {
  name: '',
  url: '',
  icon: '/github.png',
  description: '',
  category: 'Autres'
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [links, setLinks] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadAdminData() {
    const [linksResponse, analyticsResponse] = await Promise.all([
      fetch('/api/links'),
      fetch('/api/analytics')
    ]);

    if (!linksResponse.ok || !analyticsResponse.ok) {
      setError('Impossible de charger les données admin.');
      return;
    }

    const linksData = await linksResponse.json();
    const analyticsData = await analyticsResponse.json();

    setLinks(linksData.links || []);
    setAnalytics(analyticsData.analytics || []);
    setError('');
  }

  useEffect(() => {
    async function checkSession() {
      const response = await fetch('/api/admin/session');
      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        await loadAdminData();
      }

      setLoading(false);
    }

    checkSession();
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      setError('Identifiant ou mot de passe invalide.');
      return;
    }

    setIsAuthenticated(true);
    setPassword('');
    await loadAdminData();
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setLinks([]);
    setAnalytics([]);
  }

  async function handleAddLink(event) {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setError("Impossible d'ajouter le lien.");
      return;
    }

    setForm(initialForm);
    await loadAdminData();
  }

  async function handleDeleteLink(linkId) {
    setError('');
    const response = await fetch(`/api/links/${linkId}`, { method: 'DELETE' });

    if (!response.ok) {
      setError('Impossible de supprimer ce lien.');
      return;
    }

    setError('');
    await loadAdminData();
  }

  const totalClicks = useMemo(
    () => analytics.reduce((sum, item) => sum + (item.clicks || 0), 0),
    [analytics]
  );

  if (loading) {
    return (
      <main className="page">
        <div className="container admin-container">
          <p className="empty">Chargement...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="page">
        <div className="container admin-container">
          <h1 className="admin-title">Admin</h1>
          <p className="bio">Accès protégé aux analytics et à la gestion des liens.</p>

          <form className="admin-form" onSubmit={handleLogin}>
            <input
              className="search"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Identifiant"
              required
            />
            <input
              className="search"
              name="password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              required
            />
            <button className="theme-toggle" type="submit">
              Se connecter
            </button>
          </form>

          {error ? <p className="admin-error">{error}</p> : null}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container admin-container">
        <div className="admin-head">
          <h1 className="admin-title">Menu Admin</h1>
          <button className="theme-toggle" type="button" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>

        <section className="admin-section">
          <h2 className="admin-subtitle">Analytics</h2>
          <p className="bio">Total clics: {totalClicks}</p>
          <div className="admin-list">
            {analytics.map((item) => (
              <div key={item.id} className="admin-row">
                <div>
                  <strong>{item.name}</strong>
                  <div className="link-description">{item.url}</div>
                </div>
                <div className="admin-count">{item.clicks} clics</div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <h2 className="admin-subtitle">Ajouter un lien</h2>
          <form className="admin-form" onSubmit={handleAddLink}>
            <input
              className="search"
              name="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Nom"
              required
            />
            <input
              className="search"
              name="url"
              value={form.url}
              onChange={(event) => setForm({ ...form, url: event.target.value })}
              placeholder="URL"
              required
            />
            <input
              className="search"
              name="icon"
              value={form.icon}
              onChange={(event) => setForm({ ...form, icon: event.target.value })}
              placeholder="Icône (ex: /github.png)"
            />
            <input
              className="search"
              name="description"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Description"
            />
            <input
              className="search"
              name="category"
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              placeholder="Catégorie"
            />
            <button className="theme-toggle" type="submit">
              Ajouter
            </button>
          </form>
        </section>

        <section className="admin-section">
          <h2 className="admin-subtitle">Supprimer un lien</h2>
          <div className="admin-list">
            {links.map((link) => (
              <div key={link.id} className="admin-row">
                <div>
                  <strong>{link.name}</strong>
                  <div className="link-description">{link.url}</div>
                </div>
                <button
                  className="danger-btn"
                  type="button"
                  onClick={() => handleDeleteLink(link.id)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </section>

        {error ? <p className="admin-error">{error}</p> : null}
      </div>
    </main>
  );
}
