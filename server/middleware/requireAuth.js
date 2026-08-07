import { verifySession } from "../lib/session.js";

export function requireAuth(req, res, next) {
  const token = req.cookies?.bq_session;
  if (!verifySession(token)) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}
