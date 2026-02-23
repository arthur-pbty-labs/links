import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { socialLinks } from '../config';

const DATA_DIR = path.join(process.cwd(), 'data');
const LINKS_FILE = path.join(DATA_DIR, 'links.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function withId(link, index) {
  return {
    id: link.id || `${slugify(link.name)}-${index + 1}`,
    name: link.name,
    url: link.url,
    icon: link.icon,
    description: link.description || '',
    category: link.category || 'Autres'
  };
}

async function fileExists(filePath) {
  try {
    await readFile(filePath, 'utf-8');
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, fallback) {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await writeFile(filePath, JSON.stringify(value, null, 2), 'utf-8');
}

export async function ensureDataFiles() {
  await mkdir(DATA_DIR, { recursive: true });

  if (!(await fileExists(LINKS_FILE))) {
    const initialLinks = socialLinks.map(withId);
    await writeJson(LINKS_FILE, initialLinks);
  }

  if (!(await fileExists(ANALYTICS_FILE))) {
    await writeJson(ANALYTICS_FILE, {});
  }
}

export async function getLinks() {
  await ensureDataFiles();
  return readJson(LINKS_FILE, []);
}

export async function addLink(payload) {
  await ensureDataFiles();
  const links = await getLinks();

  const newLink = {
    id: randomUUID(),
    name: payload.name,
    url: payload.url,
    icon: payload.icon || '/github.png',
    description: payload.description || '',
    category: payload.category || 'Autres'
  };

  const updatedLinks = [...links, newLink];
  await writeJson(LINKS_FILE, updatedLinks);
  return newLink;
}

export async function removeLink(linkId) {
  await ensureDataFiles();
  const links = await getLinks();
  const nextLinks = links.filter((link) => link.id !== linkId);

  if (nextLinks.length === links.length) {
    return false;
  }

  await writeJson(LINKS_FILE, nextLinks);
  return true;
}

export async function incrementClick(linkId) {
  await ensureDataFiles();
  const analytics = await readJson(ANALYTICS_FILE, {});
  analytics[linkId] = (analytics[linkId] || 0) + 1;
  await writeJson(ANALYTICS_FILE, analytics);
}

export async function getAnalyticsForLinks() {
  await ensureDataFiles();
  const [links, analytics] = await Promise.all([
    readJson(LINKS_FILE, []),
    readJson(ANALYTICS_FILE, {})
  ]);

  return links.map((link) => ({
    id: link.id,
    name: link.name,
    url: link.url,
    clicks: analytics[link.id] || 0
  }));
}
