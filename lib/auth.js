import { createHash } from 'node:crypto';

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ADMIN_USERNAME = getRequiredEnv('ADMIN_USERNAME');
export const ADMIN_PASSWORD = getRequiredEnv('ADMIN_PASSWORD');
export const ADMIN_SESSION_SECRET = getRequiredEnv('ADMIN_SESSION_SECRET');
export const ADMIN_COOKIE = 'admin_session';

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function expectedToken() {
  return hash(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${ADMIN_SESSION_SECRET}`);
}

export function isValidAdminCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createAdminSessionToken() {
  return expectedToken();
}

export function isAdminRequest(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return token === expectedToken();
}
