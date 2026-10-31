import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PROJECTS, TESTIMONIALS, TICKER_ITEMS } from "../data";
import {
  EditorialCTA,
  EditorialHero,
  EditorialPage,
  EditorialReveal,
  EditorialSectionHeading,
  EditorialTestimonial,
  EditorialTicker,
} from "../components/EditorialPage";

const TAGS = ["All", "Website", "Branding", "E-Commerce", "Training"];

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState("All");
  const reduceMotion = useReducedMotion();
  const filteredProjects = activeTag === "All"
    ? PROJECTS
    : PROJECTS.filter((project) => project.tags.includes(activeTag));

  return (
    <EditorialPage>
      <EditorialHero
        eyebrow="Selected work"
        description="A few of the authors, publishers and literary organisations who have trusted us to bring their ideas to life."
        aside={<div className="ep-hero-note"><span>Ideas made visible</span><strong>Good work<br />starts with<br /><em>a good story.</em></strong><i>✳</i></div>}
      >
        Work with<br /><em>a story to tell.</em>
      </EditorialHero>
      <EditorialTicker items={TICKER_ITEMS} />

      <section className="ep-section ep-projects-section">
        <div className="ep-container">
          <div className="ep-projects-top">
            <EditorialSectionHeading
              eyebrow="The portfolio"
              description="Explore the work by discipline. Each project is shaped around a real publishing goal."
            >
              Made for the<br /><em>world of books.</em>
            </EditorialSectionHeading>
            <div className="ep-filter-list" role="group" aria-label="Filter projects by service">
              {TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  aria-pressed={activeTag === tag}
                  className={`ep-filter${activeTag === tag ? " is-active" : ""}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="ep-project-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.id}
                  className={`ep-project-card${index % 3 === 1 ? " ep-project-card-offset" : ""}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="ep-project-image" style={{ background: project.bg }}>
                    <img src={project.image} alt="" loading="lazy" />
                    <span className="ep-project-number">{String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="ep-project-content">
                    <div className="ep-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <h3>{project.name}</h3>
                    <p>{project.desc}</p>
                    <div className="ep-project-result"><i aria-hidden="true">✳</i>{project.stat}</div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          {filteredProjects.length === 0 && (
            <p className="ep-empty-state" role="status">No projects in this category yet. Check back soon.</p>
          )}
        </div>
      </section>

      <section className="ep-results-band">
        <div className="ep-container ep-results-grid">
          {[
            { value: "50+", label: "Authors & publishers served" },
            { value: "100%", label: "Client satisfaction rate" },
            { value: "#1", label: "Publishing agency in Nigeria" },
          ].map((item, index) => (
            <EditorialReveal key={item.label} delay={index * 0.08} className="ep-result-item">
              <strong>{item.value}</strong><span>{item.label}</span>
            </EditorialReveal>
          ))}
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="Client voices"
            description="The best measure of our work is how it helps our clients do theirs."
          >
            Kind words from<br /><em>our clients.</em>
          </EditorialSectionHeading>
          <div className="ep-testimonial-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <EditorialReveal key={testimonial.initials} delay={index * 0.1}>
                <EditorialTestimonial testimonial={testimonial} />
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <EditorialCTA
        eyebrow="Your project"
        title={<>Your story could<br /><em>be our next.</em></>}
        description="Have a book, publishing project or big idea in mind? We would love to hear about it."
        secondary="Explore our services"
        secondaryTo="/services"
      />
    </EditorialPage>
  );
}
