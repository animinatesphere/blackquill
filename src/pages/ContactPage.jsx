import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { TICKER_ITEMS } from "../data";
import { ApiError, submitContact } from "../lib/api";
import {
  EditorialHero,
  EditorialPage,
  EditorialReveal,
  EditorialTicker,
} from "../components/EditorialPage";

const SERVICES_LIST = [
  "Website Design & Build",
  "Branding & Design",
  "E-Commerce Integration",
  "Training & Support",
  "Full Package",
  "Not sure yet",
];

const BUDGETS = [
  "Basic — ₦117,000",
  "Hybrid — ₦150,000",
  "Premium — ₦250,000",
  "Add-ons / Extras",
  "Let's discuss",
];

const WHY_BLACKQUILL = [
  "Nigeria's only publishing-dedicated agency",
  "Deep industry knowledge of books & publishing",
  "Custom websites — no templates",
  "Hands-on training & lifetime support",
  "Local & international payment gateways",
  "Active partner of The Africa Laureate Awards",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const reduceMotion = useReducedMotion();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.message.trim()) nextErrors.message = "Tell us about your project";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setSending(true);
    try {
      await submitContact(form);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors) {
        setErrors(error.fieldErrors);
      }
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Couldn't send your message. Please check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <EditorialPage>
      <EditorialHero
        eyebrow="Contact BlackQuill"
        description="Tell us about your project. We respond to every enquiry within 24 hours — with ideas, not just a quote."
        aside={<div className="ep-hero-note"><span>We’re listening</span><strong>Good things<br />begin with<br /><em>a conversation.</em></strong><i>✳</i></div>}
      >
        Let&apos;s build<br /><em>something together.</em>
      </EditorialHero>
      <EditorialTicker items={TICKER_ITEMS} />

      <section className="ep-section ep-contact-section">
        <div className="ep-container ep-contact-layout">
          <EditorialReveal className="ep-contact-form-wrap">
            <AnimatePresence mode="wait" initial={false}>
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  className="ep-contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >
                  <div className="ep-form-heading">
                    <span className="ep-eyebrow">Start the conversation</span>
                    <h2>Tell us what<br /><em>you&apos;re dreaming up.</em></h2>
                    <p>Share a little about your project and we’ll get back to you within 24 hours.</p>
                  </div>

                  <div className="ep-form-row">
                    <div className="ep-field">
                      <label htmlFor="contact-name">Your name <span>*</span></label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Ayodeji Ajagbe"
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                      />
                      {errors.name && <span className="ep-field-error" id="contact-name-error">{errors.name}</span>}
                    </div>
                    <div className="ep-field">
                      <label htmlFor="contact-email">Email address <span>*</span></label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                      />
                      {errors.email && <span className="ep-field-error" id="contact-email-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="ep-field">
                    <label htmlFor="contact-organisation">Organisation / Publisher <small>(optional)</small></label>
                    <input
                      id="contact-organisation"
                      name="organisation"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Africa Laureate Awards"
                      value={form.organisation}
                      onChange={(event) => updateField("organisation", event.target.value)}
                    />
                  </div>

                  <fieldset className="ep-choice-field">
                    <legend>Service interested in</legend>
                    <div className="ep-choice-list">
                      {SERVICES_LIST.map((service) => (
                        <button
                          key={service}
                          type="button"
                          className={`ep-choice${form.service === service ? " is-selected" : ""}`}
                          aria-pressed={form.service === service}
                          onClick={() => updateField("service", form.service === service ? "" : service)}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="ep-choice-field">
                    <legend>Budget / Plan</legend>
                    <div className="ep-choice-list">
                      {BUDGETS.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          className={`ep-choice${form.budget === budget ? " is-selected" : ""}`}
                          aria-pressed={form.budget === budget}
                          onClick={() => updateField("budget", form.budget === budget ? "" : budget)}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="ep-field">
                    <label htmlFor="contact-message">Tell us about your project <span>*</span></label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      placeholder="Tell us about yourself, your book, your publishing goals, and what you'd like your website to achieve..."
                      value={form.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                    />
                    {errors.message && <span className="ep-field-error" id="contact-message-error">{errors.message}</span>}
                  </div>

                  {submitError && <p className="ep-submit-error" role="alert">{submitError}</p>}

                  <button className="ep-button ep-button-primary ep-submit-button" type="submit" disabled={sending}>
                    {sending ? (
                      <><motion.span className="ep-spinner" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />Sending your message…</>
                    ) : <>Send message <span aria-hidden="true">↗</span></>}
                  </button>
                  <p className="ep-form-note">We respond to every enquiry within 24 hours.</p>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  className="ep-contact-success"
                  role="status"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45 }}
                >
                  <motion.span className="ep-success-mark" initial={reduceMotion ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <motion.path d="M6 14L11.5 19.5L22 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2 }} />
                    </svg>
                  </motion.span>
                  <span className="ep-eyebrow">Thank you</span>
                  <h2>Message<br /><em>received!</em></h2>
                  <p>Thank you for reaching out. We’ll review your project details and get back to you within <strong>24 hours</strong> with our thoughts.</p>
                  <Link to="/" className="ep-button ep-button-outline">Back to home <span aria-hidden="true">↗</span></Link>
                </motion.div>
              )}
            </AnimatePresence>
          </EditorialReveal>

          <EditorialReveal className="ep-contact-sidebar" delay={0.1}>
            <article className="ep-contact-card">
              <span className="ep-eyebrow">Prefer a direct hello?</span>
              <h3>Get in touch directly.</h3>
              <a href="mailto:hello@blackquill.ng"><span aria-hidden="true">✳</span>hello@blackquill.ng</a>
              <p><span aria-hidden="true">✳</span>Nigeria — serving globally</p>
              <p><span aria-hidden="true">✳</span>Response within 24 hours</p>
            </article>
            <article className="ep-contact-card ep-contact-why">
              <span className="ep-eyebrow">Why BlackQuill?</span>
              <h3>Specialists who<br /><em>speak your language.</em></h3>
              <ul>{WHY_BLACKQUILL.map((item) => <li key={item}><span aria-hidden="true">✳</span>{item}</li>)}</ul>
            </article>
            <article className="ep-contact-quote">
              <span aria-hidden="true">“</span>
              <blockquote>In the words of Tina Turner, you are ‘simply the best’.</blockquote>
              <p><strong>Ayodeji Ajagbe</strong><small>International Bestselling Author</small></p>
            </article>
            <div className="ep-contact-pricing">
              <p>Not sure which plan is right for you?</p>
              <Link to="/pricing">Explore our pricing <span aria-hidden="true">↗</span></Link>
            </div>
          </EditorialReveal>
        </div>
      </section>

      <section className="ep-contact-audience">
        <div className="ep-container ep-audience-grid">
          {[
            { icon: "✍", label: "Authors", desc: "Debut & established" },
            { icon: "▤", label: "Publishers", desc: "Independent & traditional" },
            { icon: "⌂", label: "Literary organisations", desc: "Agencies & award bodies" },
            { icon: "◎", label: "Global reach", desc: "Nigeria-based, worldwide" },
          ].map((item, index) => (
            <EditorialReveal key={item.label} delay={index * 0.05} className="ep-audience-item">
              <span>{item.icon}</span><strong>{item.label}</strong><small>{item.desc}</small>
            </EditorialReveal>
          ))}
        </div>
      </section>
    </EditorialPage>
  );
}
