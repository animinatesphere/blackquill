import { Router } from "express";
import { insertSubmission } from "../db.js";
import { sendAdminNotification, sendSubmitterConfirmation } from "../lib/email.js";

export const contactRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactRouter.post("/", async (req, res) => {
  const { name, email, organisation, service, budget, message } = req.body || {};

  const errors = {};
  if (!name || !String(name).trim()) errors.name = "Name is required";
  if (!email || !EMAIL_RE.test(String(email))) errors.email = "Enter a valid email";
  if (!message || !String(message).trim()) errors.message = "Message is required";
  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  const submission = {
    name: String(name).trim(),
    email: String(email).trim(),
    organisation: organisation ? String(organisation).trim() : null,
    service: service ? String(service).trim() : null,
    budget: budget ? String(budget).trim() : null,
    message: String(message).trim(),
  };

  const row = insertSubmission(submission);

  res.status(201).json({ id: row.id });

  // fire-and-forget — don't block the response on email delivery
  sendAdminNotification(submission).catch((err) =>
    console.error("[email] admin notification failed:", err.message),
  );
  sendSubmitterConfirmation(submission).catch((err) =>
    console.error("[email] submitter confirmation failed:", err.message),
  );
});
