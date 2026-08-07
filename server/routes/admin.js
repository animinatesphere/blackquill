import { Router } from "express";
import {
  listSubmissions,
  getSubmission,
  updateSubmissionStatus,
  deleteSubmission,
} from "../db.js";
import { createSession, destroySession, checkPassword } from "../lib/session.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { savePricing, validatePricing } from "../pricing.js";

export const adminRouter = Router();

const STATUSES = ["new", "read", "replied", "archived"];

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: "/",
};

adminRouter.post("/login", (req, res) => {
  const { password } = req.body || {};
  if (!checkPassword(password)) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  const token = createSession();
  res.cookie("bq_session", token, cookieOpts);
  res.json({ ok: true });
});

adminRouter.post("/logout", (req, res) => {
  const token = req.cookies?.bq_session;
  if (token) destroySession(token);
  res.clearCookie("bq_session", { path: "/" });
  res.json({ ok: true });
});

adminRouter.get("/me", requireAuth, (req, res) => {
  res.json({ ok: true });
});

adminRouter.get("/submissions", requireAuth, (req, res) => {
  const { status, q } = req.query;
  const rows = listSubmissions({
    status: status && STATUSES.includes(status) ? status : undefined,
    q,
  });
  res.json({ submissions: rows });
});

adminRouter.get("/submissions/:id", requireAuth, (req, res) => {
  const row = getSubmission(req.params.id);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json({ submission: row });
});

adminRouter.patch("/submissions/:id", requireAuth, (req, res) => {
  const { status } = req.body || {};
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const row = updateSubmissionStatus(req.params.id, status);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

adminRouter.delete("/submissions/:id", requireAuth, (req, res) => {
  const ok = deleteSubmission(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

adminRouter.put("/pricing", requireAuth, (req, res) => {
  const error = validatePricing(req.body);
  if (error) return res.status(400).json({ error });
  const saved = savePricing(req.body);
  res.json(saved);
});
