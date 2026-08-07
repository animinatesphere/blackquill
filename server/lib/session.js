import crypto from "node:crypto";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const sessions = new Map(); // token -> expiresAt

export function createSession() {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + SESSION_TTL_MS);
  return token;
}

export function verifySession(token) {
  if (!token) return false;
  const expiresAt = sessions.get(token);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function destroySession(token) {
  sessions.delete(token);
}

export function checkPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD || "";
  const a = Buffer.from(candidate || "");
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// periodic cleanup of expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, expiresAt] of sessions) {
    if (now > expiresAt) sessions.delete(token);
  }
}, 1000 * 60 * 30).unref();
