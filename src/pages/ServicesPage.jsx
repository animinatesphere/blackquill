import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SERVICES, TICKER_ITEMS } from "../data";
import {
  EditorialCTA,
  EditorialHero,
  EditorialPage,
  EditorialReveal,
  EditorialSectionHeading,
  EditorialTicker,
} from "../components/EditorialPage";

const PROCESS = [
  { title: "Discovery", desc: "We start with a detailed brief meeting to understand your goals, audience and vision — listening first, advising second." },
  { title: "Strategy & Design", desc: "We present a wide range of options and examples, drawing on our deep knowledge of the publishing industry." },
  { title: "Build & Refine", desc: "Our step-by-step approach means you only progress when you're satisfied. No rushing, no skipping ahead." },
  { title: "Training & Launch", desc: "We train you to manage your own site and remain available for support for the full life of the website." },
];

export default function ServicesPage() {
  const [openService, setOpenService] = useState(SERVICES[0]?.id);
  const reduceMotion = useReducedMotion();

  return (
    <EditorialPage>
      <EditorialHero
        eyebrow="Our services"
        description="From strategy to execution — bespoke digital solutions built exclusively for the publishing world."
        aside={<div className="ep-hero-note"><span>01 — 04</span><strong>One publishing<br />partner. Every<br /><em>important detail.</em></strong><i>✳</i></div>}
      >
        How BlackQuill<br /><em>can help you.</em>
      </EditorialHero>
      <EditorialTicker items={TICKER_ITEMS} />

      <section className="ep-section ep-services-section">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="What we offer"
            description="Specialist support for the people who make, publish and champion books."
          >
            Our <em>specialisms.</em>
          </EditorialSectionHeading>
          <div className="ep-service-grid">
            {SERVICES.map((service, index) => (
              <EditorialReveal key={service.id} delay={index * 0.07} as="article">
                <motion.div
                  className="ep-service-card"
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <div className="ep-service-top"><span>{service.num}</span><i aria-hidden="true">{service.icon}</i></div>
                  <h3>{service.label}</h3>
                  <p className="ep-service-short">{service.short}</p>
                  <p className="ep-service-description">{service.desc}</p>
                  <ul>{service.features.slice(0, 3).map((feature) => <li key={feature}><i>✳</i>{feature}</li>)}</ul>
                  <button type="button" className="ep-text-button" onClick={() => setOpenService(service.id)}>
                    See what&apos;s included <span aria-hidden="true">↓</span>
                  </button>
                </motion.div>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container ep-deep-layout">
          <EditorialSectionHeading
            eyebrow="In depth"
            description="Explore the detail behind every service, and see how we shape it around the way you work."
          >
            Everything we do,<br /><em>in detail.</em>
          </EditorialSectionHeading>
          <div className="ep-accordion">
            {SERVICES.map((service) => {
              const isOpen = openService === service.id;
              const panelId = `service-detail-${service.id}`;
              return (
                <article className="ep-accordion-item" key={service.id}>
                  <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenService(isOpen ? null : service.id)}>
                    <span className="ep-accordion-index">{service.num}</span>
                    <span className="ep-accordion-title"><strong>{service.label}</strong><small>{service.short}</small></span>
                    <motion.span className="ep-accordion-icon" aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        className="ep-accordion-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{service.desc}</p>
                        <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ep-section">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="Our process"
            description="A clear, collaborative path from your first brief to a site you feel confident managing."
          >
            How we <em>work with you.</em>
          </EditorialSectionHeading>
          <div className="ep-process-grid">
            {PROCESS.map((step, index) => (
              <EditorialReveal key={step.title} delay={index * 0.08} as="article" className="ep-process-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="ep-process-line" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <EditorialCTA
        eyebrow="Ready?"
        title={<>Let&apos;s build your<br /><em>author platform.</em></>}
        description="Tell us what you are working on. We’ll help you find the right next step."
        secondary="View pricing"
        secondaryTo="/pricing"
      />
    </EditorialPage>
  );
}
