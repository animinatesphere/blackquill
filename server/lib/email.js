import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendAdminNotification(submission) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping admin notification");
    return;
  }
  const { name, email, organisation, service, budget, message } = submission;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_NOTIFY_EMAIL,
    replyTo: email,
    subject: `New project enquiry — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#FF8C00;margin-bottom:4px">New project enquiry</h2>
        <p style="color:#666;margin-top:0">via BlackQuill website contact form</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px 0;color:#888;width:140px">Name</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Organisation</td><td style="padding:8px 0">${escapeHtml(organisation || "—")}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Service</td><td style="padding:8px 0">${escapeHtml(service || "—")}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Budget</td><td style="padding:8px 0">${escapeHtml(budget || "—")}</td></tr>
        </table>
        <p style="color:#888;margin-top:20px;margin-bottom:4px">Message</p>
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
      </div>
    `,
  });
}

export async function sendSubmitterConfirmation(submission) {
  if (!resend) return;
  const { name, email } = submission;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "We've received your message — BlackQuill Digital Agency",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#FF8C00">Thanks for reaching out, ${escapeHtml(name)}!</h2>
        <p style="line-height:1.6;color:#333">
          We've received your project enquiry and will get back to you within
          24 hours with ideas, not just a quote.
        </p>
        <p style="line-height:1.6;color:#333">— The BlackQuill Digital Agency Team</p>
      </div>
    `,
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}
