import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PROJECTS, SERVICES, STATS, TESTIMONIALS, TICKER_ITEMS, WHY_AUTHOR } from "../data";
import "./HomePage.css";

const AUDIENCES = [
  { icon: "✍", label: "Authors" },
  { icon: "▤", label: "Publishers" },
  { icon: "⌂", label: "Literary organisations" },
];

const TRUST_POINTS = [
  "No templates — 100% bespoke",
  "Response within 24 hours",
  "Nigeria-based, serving globally",
];

function Reveal({ children, className = "", delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, children, description, className = "" }) {
  return (
    <Reveal className={`home-section-heading ${className}`}>
      <span className="home-eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function HeroPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="home-hero-art" aria-label="Illustrative publishing website concept">
      <div className="home-art-glow" />
      <div className="home-orbit home-orbit-one" />
      <div className="home-orbit home-orbit-two" />
      <motion.div
        className="home-preview-card"
        initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="home-preview-topline">
          <span className="home-preview-mark">BQ</span>
          <span>AUTHOR WEBSITE · CONCEPT</span>
          <span className="home-preview-menu" aria-hidden="true">•••</span>
        </div>
        <div className="home-preview-image">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85"
            alt="A fountain pen writing in an open notebook"
            fetchpriority="high"
          />
          <span className="home-image-label">A space for every story</span>
        </div>
        <div className="home-preview-copy">
          <span className="home-preview-kicker">A digital home for your work</span>
          <span className="home-preview-title">Made for the<br /><em>world of books.</em></span>
          <span className="home-preview-link">Explore the concept <span aria-hidden="true">↗</span></span>
        </div>
      </motion.div>
      <motion.div
        className="home-float-note home-float-note-top"
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="home-note-dot" />
        Publishing-first thinking
      </motion.div>
      <motion.div
        className="home-float-note home-float-note-bottom"
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <span className="home-note-icon">✳</span>
        Designed around your readers
      </motion.div>
    </div>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="home-ticker" aria-label="BlackQuill services">
      <div className="home-ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}<i aria-hidden="true">✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal delay={index * 0.08}>
      <Link to="/projects" className="home-project-card">
        <div className="home-project-image">
          <img src={project.image} alt="" loading="lazy" />
          <span className="home-project-arrow" aria-hidden="true">↗</span>
          <div className="home-project-tags">
            {project.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="home-project-info">
          <div>
            <h3>{project.name}</h3>
            <p>{project.stat}</p>
          </div>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <Reveal>
              <span className="home-status">
                <span className="home-status-pulse" />
                Nigeria&apos;s publishing web specialists
              </span>
            </Reveal>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              A digital home
              <br />
              for the <em>world of books.</em>
            </motion.h1>
            <Reveal delay={0.12}>
              <p className="home-hero-lede">
                We create bespoke websites and e-commerce experiences for authors,
                publishers and literary organisations.
              </p>
              <p className="home-hero-support">
                Publishing is our whole world. We bring that focus to every detail,
                from first idea through launch and beyond.
              </p>
              <div className="home-hero-actions">
                <Link to="/contact" className="home-button home-button-primary">
                  Start your project <span aria-hidden="true">↗</span>
                </Link>
                <Link to="/projects" className="home-button home-button-quiet">
                  Explore our work <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="home-hero-proof">
                <div className="home-proof-avatars" aria-hidden="true">
                  <span>AA</span><span>AL</span><span>BQ</span>
                </div>
                <p>Built with authors, publishers<br />and the people who champion books.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="home-hero-visual" delay={0.16}>
            <HeroPreview />
          </Reveal>
        </div>
        <div className="home-hero-foot">
          <span>Independent by nature. Publishing by design.</span>
          <a href="#who-we-are">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <Ticker />

      <section className="home-proof-strip" aria-label="BlackQuill at a glance">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <div className="home-proof-stat">{stat.num}{stat.suffix}</div>
            <p>{stat.label}</p>
          </Reveal>
        ))}
      </section>

      <section id="who-we-are" className="home-about">
        <div className="home-about-visual">
          <Reveal>
            <div className="home-about-image">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85"
                alt="A thoughtfully curated stack of books"
                loading="lazy"
              />
              <span className="home-about-image-caption">For people who put stories into the world.</span>
            </div>
            <div className="home-about-stamp">
              <span>Made for</span>
              <strong>the book<br />business.</strong>
              <i aria-hidden="true">✳</i>
            </div>
          </Reveal>
        </div>
        <div className="home-about-copy">
          <SectionHeading eyebrow="Who we are">
            The only agency built for the <em>publishing world.</em>
          </SectionHeading>
          <Reveal delay={0.08}>
            <p className="home-about-lede">
              BlackQuill Digital Agency is Nigeria&apos;s only agency dedicated to
              delivering bespoke website and e-commerce projects for authors,
              publishers, and literary organisations.
            </p>
            <p className="home-body-copy">
              Our extensive experience — coupled with active participation in
              industry events like The Africa Laureate Awards — gives us a deep
              understanding of our clients&apos; unique needs. We move beyond the
              basics and focus on your strategic objectives.
            </p>
            <div className="home-audience-list">
              {AUDIENCES.map((audience) => (
                <span key={audience.label}><i aria-hidden="true">{audience.icon}</i>{audience.label}</span>
              ))}
            </div>
            <div className="home-inline-actions">
              <Link to="/about">Meet the team <span aria-hidden="true">→</span></Link>
              <Link to="/services">Our services <span aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-why">
        <div className="home-content-width">
          <SectionHeading
            eyebrow="For authors"
            description="Your website is more than a page online. It gives your work a lasting home and your readers a direct way to find you."
          >
            Why does an author need <em>a website?</em>
          </SectionHeading>
          <div className="home-why-grid">
            {WHY_AUTHOR.map((item, index) => (
              <Reveal key={item.num} delay={index * 0.1}>
                <article className="home-why-card">
                  <span className="home-card-number">{item.num}</span>
                  <span className="home-card-icon" aria-hidden="true">{["↗", "◎", "✉"][index]}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="home-card-rule" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-services">
        <div className="home-content-width">
          <div className="home-services-heading">
            <SectionHeading
              eyebrow="How we help"
              description="From a distinctive online home to long-term support, we help build a publishing presence that works for you."
            >
              Thoughtful services for the <em>world of books.</em>
            </SectionHeading>
            <Link to="/services" className="home-button home-button-outline">
              All services <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="home-services-grid">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.07}>
                <motion.article
                  className="home-service-card"
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <div className="home-service-card-top">
                    <span>{service.num}</span>
                    <span className="home-service-icon" aria-hidden="true">{service.icon}</span>
                  </div>
                  <h3>{service.label}</h3>
                  <p className="home-service-short">{service.short}</p>
                  <p className="home-service-description">{service.desc}</p>
                  <ul>
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature}><span aria-hidden="true">✳</span>{feature}</li>
                    ))}
                  </ul>
                  <Link to="/services">Explore service <span aria-hidden="true">→</span></Link>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-story">
        <div className="home-story-inner">
          <Reveal>
            <span className="home-eyebrow">Our story</span>
            <h2>Built by people who<br /><em>love books.</em></h2>
            <p>
              We participate in Africa&apos;s most prestigious literary events
              because this industry is our passion — not just our business.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <figure className="home-quote-card">
              <span aria-hidden="true">“</span>
              <blockquote>In the words of Tina Turner, you are simply the best.</blockquote>
              <figcaption>Ayodeji Ajagbe <i>International Bestselling Author</i></figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="home-work">
        <div className="home-content-width">
          <div className="home-work-heading">
            <SectionHeading
              eyebrow="Selected work"
              description="A few of the authors, publishers and literary organisations we’ve had the privilege to work with."
            >
              We&apos;re proud of our<br /><em>body of work.</em>
            </SectionHeading>
            <Link to="/projects" className="home-button home-button-outline">
              View all work <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="home-project-grid">
            {PROJECTS.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-results">
        <div className="home-content-width home-results-grid">
          {[
            { stat: "#1", label: "Publishing agency in Nigeria" },
            { stat: "50+", label: "Authors & publishers served" },
            { stat: "24hr", label: "Support response guarantee" },
            { stat: "Global", label: "Nigeria-based, worldwide reach" },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <strong>{item.stat}</strong>
              <span>{item.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-service-detail">
        <div className="home-content-width home-detail-layout">
          <SectionHeading
            eyebrow="In detail"
            description="A considered approach at every stage — from your first brief to the moment your new site is in your hands."
          >
            How BlackQuill<br /><em>can help you.</em>
            <Link to="/services" className="home-inline-link">Explore all services <span aria-hidden="true">→</span></Link>
          </SectionHeading>
          <div className="home-accordion">
            {SERVICES.map((service, index) => {
              const isOpen = openQuestion === index;
              const answerId = `home-service-${service.id}`;

              return (
                <article key={service.id} className="home-accordion-item">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenQuestion(isOpen ? null : index)}
                  >
                    <span className="home-accordion-index">{service.num}</span>
                    <span className="home-accordion-label">
                      <strong>{service.label}</strong>
                      <small>{service.short}</small>
                    </span>
                    <motion.span
                      className="home-accordion-toggle"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.22 }}
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        className="home-accordion-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{service.desc}</p>
                        <ul>
                          {service.features.map((feature) => <li key={feature}>{feature}</li>)}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-testimonials">
        <div className="home-content-width">
          <SectionHeading
            eyebrow="Client voices"
            description="Thoughtful work is best measured by how it helps the people behind it."
          >
            What our clients<br /><em>say about us.</em>
          </SectionHeading>
          <div className="home-testimonial-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 0.1}>
                <figure className="home-testimonial-card">
                  <span className="home-testimonial-mark" aria-hidden="true">“</span>
                  <blockquote>{testimonial.quote}</blockquote>
                  <figcaption>
                    <span className="home-testimonial-initials">{testimonial.initials}</span>
                    <span><strong>{testimonial.author}</strong><small>{testimonial.role}</small></span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta-image" aria-hidden="true" />
        <div className="home-cta-content">
          <Reveal>
            <span className="home-eyebrow">Start today</span>
            <h2>Ready to build<br /><em>your author platform?</em></h2>
            <p>
              Tell us about your project. We&apos;ll respond within 24 hours
              with ideas tailored to the publishing world — no pressure, no
              generic templates.
            </p>
            <div className="home-cta-actions">
              <Link to="/contact" className="home-button home-button-primary">
                Start your project <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/pricing" className="home-button home-button-outline">
                View pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul>
              {TRUST_POINTS.map((point) => <li key={point}><span aria-hidden="true">✳</span>{point}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
