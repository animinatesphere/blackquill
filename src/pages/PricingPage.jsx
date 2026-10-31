import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { TICKER_ITEMS } from "../data";
import defaultPricing from "../data/pricing.json";
import { fetchPricing } from "../lib/api";
import { formatNaira, formatUsd } from "../lib/currency";
import {
  EditorialCTA,
  EditorialHero,
  EditorialPage,
  EditorialReveal,
  EditorialSectionHeading,
  EditorialTicker,
} from "../components/EditorialPage";

const INCLUDED = [
  { icon: "⌂", title: "Six months hosting", detail: "A reliable home for your website, included with every plan." },
  { icon: "✳", title: "Hands-on training", detail: "Learn how to manage and update your own website." },
  { icon: "↗", title: "Site Master support", detail: "Request help directly from within your website." },
  { icon: "▣", title: "Mobile-first design", detail: "A responsive experience for readers on every screen." },
];

const PROJECT_STEPS = [
  { number: "01", title: "Discovery", detail: "We learn about your goals, audience and vision before recommending a direction." },
  { number: "02", title: "Strategy & design", detail: "We shape the site around your publishing needs and review the design with you." },
  { number: "03", title: "Build & refine", detail: "We build in clear stages, moving forward when you are happy with each one." },
  { number: "04", title: "Training & launch", detail: "We help you get comfortable managing your site before it goes live." },
];

const FAQ_ITEMS = [
  { q: 'What is included in "six months hosting"?', a: "All plans include six months of reliable web hosting on our managed servers. After six months, hosting is renewed at an affordable annual rate." },
  { q: "How long does a project take?", a: "Most projects are completed within 4–8 weeks. We work at your pace — we never rush to the next stage until you are happy with the current one." },
  { q: "Do I need technical knowledge?", a: "Not at all. Every client receives a hands-on training session, and our Site Master plugin lets you request help from directly within your website at any time." },
  { q: "Can I upgrade my plan later?", a: "Yes. You can upgrade to a higher plan at any point. We will quote for the additional pages and features and migrate everything seamlessly." },
  { q: "Do you work with international authors?", a: "Absolutely. We are based in Nigeria but serve a global client base. All our communication and project management works remotely." },
];

export default function PricingPage() {
  const [pricing, setPricing] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openQuestion, setOpenQuestion] = useState(0);
  const reduceMotion = useReducedMotion();

  const loadPricing = useCallback(() => {
    setLoading(true);
    setLoadError("");
    fetchPricing()
      .then(setPricing)
      .catch((error) => {
        console.error("Failed to load live pricing; showing default pricing instead.", error);
        setPricing(defaultPricing);
        setLoadError("Live pricing is temporarily unavailable. These are the standard prices; retry to check for updates.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadPricing();
  }, [loadPricing]);

  const plans = pricing?.plans ?? [];
  const addons = pricing?.addons ?? [];
  const usdRate = pricing?.usdRate;
  const comparisonFeatures = useMemo(
    () => [...new Set(plans.flatMap((plan) => plan.features))],
    [plans],
  );

  return (
    <EditorialPage>
      <EditorialHero
        eyebrow="Clear, considered pricing"
        description="Choose the plan that fits where you are in your publishing journey. Every plan includes six months hosting and hands-on training."
        aside={<div className="ep-hero-note"><span>Simple by design</span><strong>Good work.<br />Clear scope.<br /><em>No surprises.</em></strong><i>✳</i></div>}
      >
        Your next chapter,<br /><em>within reach.</em>
      </EditorialHero>
      <EditorialTicker items={TICKER_ITEMS} />

      <section className="ep-section ep-pricing-section">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="Choose your plan"
            description="All prices are fixed. Every website plan includes six months hosting and a hands-on training session."
          >
            The right plan<br /><em>for every author.</em>
          </EditorialSectionHeading>

          {loadError && (
            <div className="ep-pricing-notice" role="status">
              <p>{loadError}</p>
              <button type="button" className="ep-button ep-button-outline" onClick={loadPricing} disabled={loading}>
                {loading ? "Checking…" : "Retry"}
              </button>
            </div>
          )}

          {!pricing ? (
            <p className="ep-loading" role="status">Loading current pricing…</p>
          ) : (
            <div className="ep-plan-grid">
              {plans.map((plan, index) => (
                <EditorialReveal key={plan.id} delay={index * 0.08} className={`ep-plan-card${plan.featured ? " is-featured" : ""}`}>
                  {plan.featured && <span className="ep-plan-badge">Most popular</span>}
                  <span className="ep-plan-kicker">{plan.name}</span>
                  <h3>{plan.tagline}</h3>
                  <div className="ep-plan-price">{formatNaira(plan.amountNGN)}</div>
                  {formatUsd(plan.amountNGN, usdRate) && <span className="ep-plan-usd">≈ {formatUsd(plan.amountNGN, usdRate)}</span>}
                  <ul>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true">✳</span>{feature}</li>)}</ul>
                  <Link to="/contact" className={`ep-button ${plan.featured ? "ep-button-primary" : "ep-button-outline"}`}>
                    {plan.cta}<span aria-hidden="true">↗</span>
                  </Link>
                </EditorialReveal>
              ))}
            </div>
          )}
          <p className="ep-plan-note">All website plans include · Six months hosting · Hands-on training · Site Master support · Mobile-first responsive design</p>
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="Included with every plan"
            description="The essentials to launch confidently and keep your publishing work moving."
          >
            A strong start<br /><em>is part of the price.</em>
          </EditorialSectionHeading>
          <div className="ep-included-grid">
            {INCLUDED.map((item, index) => (
              <EditorialReveal key={item.title} delay={index * 0.06} as="article" className="ep-included-card">
                <span className="ep-included-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="A clear process"
            description="You will know what comes next at every stage. We keep the process collaborative, considered and at your pace."
          >
            From first conversation<br /><em>to launch day.</em>
          </EditorialSectionHeading>
          <div className="ep-process-grid">
            {PROJECT_STEPS.map((step, index) => (
              <EditorialReveal key={step.number} delay={index * 0.08} as="article" className="ep-process-step">
                <span>{step.number}</span><div className="ep-process-line" />
                <h3>{step.title}</h3><p>{step.detail}</p>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container">
          <EditorialSectionHeading eyebrow="Compare plans" description="A clear side-by-side view of the features in each current plan.">
            What&apos;s included<br /><em>in each plan.</em>
          </EditorialSectionHeading>
          {pricing && (
            <div className="ep-table-scroll" role="region" aria-label="Plan feature comparison" tabIndex="0">
              <table className="ep-comparison-table">
                <thead><tr><th scope="col">Feature</th>{plans.map((plan) => <th scope="col" key={plan.id}>{plan.name}</th>)}</tr></thead>
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr key={feature}>
                      <th scope="row">{feature}</th>
                      {plans.map((plan) => <td key={plan.id}>{plan.features.includes(feature) ? <span className="ep-check" aria-label={`Included in ${plan.name}`}>✓</span> : <span aria-label="Not included">—</span>}</td>)}
                    </tr>
                  ))}
                  <tr className="ep-comparison-price"><th scope="row">Price</th>{plans.map((plan) => <td key={plan.id}>{formatNaira(plan.amountNGN)}{formatUsd(plan.amountNGN, usdRate) && <small>≈ {formatUsd(plan.amountNGN, usdRate)}</small>}</td>)}</tr>
                  <tr className="ep-comparison-action"><th scope="row"><span className="sr-only">Choose plan</span></th>{plans.map((plan) => <td key={plan.id}><Link to="/contact">{plan.cta} ↗</Link></td>)}</tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="ep-section">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="Optional extras"
            description="Add the finishing touches that make your digital presence feel complete."
          >
            Extras for your<br /><em>next step.</em>
          </EditorialSectionHeading>
          <div className="ep-addon-grid">
            {addons.map((addon, index) => (
              <EditorialReveal key={addon.id} delay={index * 0.04} as="article" className="ep-addon-card">
                <h3>{addon.label}</h3>
                <strong>{addon.amountNGN === null ? "POA" : `${addon.prefix || ""}${formatNaira(addon.amountNGN)}${addon.suffix || ""}`}</strong>
                {formatUsd(addon.amountNGN, usdRate) && <small>≈ {addon.prefix || ""}{formatUsd(addon.amountNGN, usdRate)}{addon.suffix || ""}</small>}
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container ep-faq-layout">
          <EditorialSectionHeading eyebrow="Helpful answers">
            A few things<br /><em>you might wonder.</em>
          </EditorialSectionHeading>
          <div className="ep-accordion">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openQuestion === index;
              const answerId = `pricing-answer-${index}`;
              return (
                <article className="ep-accordion-item" key={item.q}>
                  <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenQuestion(isOpen ? -1 : index)}>
                    <span className="ep-accordion-title"><strong>{item.q}</strong></span>
                    <motion.span className="ep-accordion-icon" aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        className="ep-accordion-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3 }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <EditorialCTA
        eyebrow="Get started"
        title={<>Not sure which plan?<br /><em>Let&apos;s talk it through.</em></>}
        description="We will help you choose the right plan for your needs and budget. No pressure, no hard sell."
        primary="Book a free consultation"
        secondary="Explore our services"
        secondaryTo="/services"
      />
    </EditorialPage>
  );
}
