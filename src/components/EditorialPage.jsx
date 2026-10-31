import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/EditorialPages.css";

export function EditorialPage({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className="editorial-page"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export function EditorialReveal({ children, className = "", delay = 0, as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function EditorialHero({ eyebrow, children, description, aside }) {
  return (
    <header className="ep-hero">
      <div className="ep-hero-inner">
        <div className="ep-hero-copy">
          <EditorialReveal>
            <span className="ep-eyebrow"><i />{eyebrow}</span>
            <h1>{children}</h1>
            {description && <p>{description}</p>}
          </EditorialReveal>
        </div>
        {aside && <EditorialReveal className="ep-hero-aside" delay={0.12}>{aside}</EditorialReveal>}
      </div>
      <div className="ep-hero-bottom" aria-hidden="true">
        <span>BlackQuill · Publishing-first digital craft</span>
        <span>Thoughtful by design <b>✳</b></span>
      </div>
    </header>
  );
}

export function EditorialTicker({ items }) {
  const repeated = [...items, ...items];
  return (
    <div className="ep-ticker" aria-label="BlackQuill services">
      <div className="ep-ticker-track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>{item}<i aria-hidden="true">✳</i></span>
        ))}
      </div>
    </div>
  );
}

export function EditorialSectionHeading({ eyebrow, children, description, className = "" }) {
  return (
    <EditorialReveal className={`ep-section-heading ${className}`}>
      {eyebrow && <span className="ep-eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </EditorialReveal>
  );
}

export function EditorialCTA({ eyebrow, title, description, primary = "Start a conversation", secondary = "View services", secondaryTo = "/services" }) {
  return (
    <section className="ep-cta">
      <div className="ep-cta-image" aria-hidden="true" />
      <EditorialReveal className="ep-cta-content">
        <span className="ep-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div className="ep-actions">
          <Link className="ep-button ep-button-primary" to="/contact">{primary}<span aria-hidden="true">↗</span></Link>
          <Link className="ep-button ep-button-light" to={secondaryTo}>{secondary}<span aria-hidden="true">→</span></Link>
        </div>
      </EditorialReveal>
    </section>
  );
}

export function EditorialTestimonial({ testimonial }) {
  return (
    <figure className="ep-testimonial">
      <span className="ep-testimonial-mark" aria-hidden="true">“</span>
      <blockquote>{testimonial.quote}</blockquote>
      <figcaption>
        <span className="ep-avatar">{testimonial.initials}</span>
        <span><strong>{testimonial.author}</strong><small>{testimonial.role}</small></span>
      </figcaption>
    </figure>
  );
}
