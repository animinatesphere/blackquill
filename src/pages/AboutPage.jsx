import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { STATS, TESTIMONIALS, TICKER_ITEMS } from "../data";
import {
  EditorialCTA,
  EditorialHero,
  EditorialPage,
  EditorialReveal,
  EditorialSectionHeading,
  EditorialTestimonial,
  EditorialTicker,
} from "../components/EditorialPage";

const VALUES = [
  { num: "01", title: "Publishing-first thinking", desc: "We only work with publishers, authors and literary organisations. This is not a niche for us — it is our entire world. That depth of focus means better outcomes for every client." },
  { num: "02", title: "Client-paced delivery", desc: "We never rush. Our step-by-step approach means you only progress to the next stage when you are satisfied with the current one. Your comfort drives our timeline." },
  { num: "03", title: "Radical responsiveness", desc: "When issues or glitches need addressing, you only ever raise them once. They are sorted promptly and efficiently. Always." },
  { num: "04", title: "Lifetime commitment", desc: "Our Site Master plugin means clients can request help directly from within their website — for the full life of the site. We do not disappear after launch." },
];

const HOW = [
  { title: "Your own dedicated project manager", desc: "One point of contact who knows your brand inside out. Available via email and direct message for quick updates, questions and support throughout the project." },
  { title: "Expert knowledge of publishing", desc: "Our team understands what publishers and authors need — from book launch mechanics to reader engagement strategies. We speak your language." },
  { title: "A step-by-step approach", desc: "We identify the functionality you need and the overall look of the site, at a pace that suits you. You never feel rushed at BlackQuill." },
  { title: "Straightforward site management", desc: "After training, you can easily add or change your own content. Being able to self-manage is a core feature of every BlackQuill website." },
  { title: "Responsive support for the long term", desc: "Our responsiveness is something clients praise consistently. When something needs fixing, you raise it once and it is sorted. That is our promise." },
  { title: "Active in the publishing community", desc: "We participate in industry events like The Africa Laureate Awards — giving us insight into the real needs of authors and publishers today." },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <EditorialPage>
      <EditorialHero
        eyebrow="Who we are"
        description="Nigeria's only digital agency dedicated to the book publishing industry. We deliver bespoke website and e-commerce projects for authors, publishers and literary organisations worldwide."
        aside={<div className="ep-hero-note"><span>Rooted in Nigeria</span><strong>Built for<br />the people<br /><em>behind books.</em></strong><i>✳</i></div>}
      >
        We&apos;re<br /><em>BlackQuill.</em>
      </EditorialHero>
      <EditorialTicker items={TICKER_ITEMS} />

      <section className="ep-section ep-mission-section">
        <div className="ep-container ep-mission-grid">
          <EditorialReveal className="ep-mission-copy">
            <span className="ep-eyebrow">Our mission</span>
            <h2>Move beyond<br />the basics. Focus on<br /><em>your next chapter.</em></h2>
            <p>BlackQuill Digital Agency is Nigeria&apos;s only agency dedicated to delivering bespoke website and e-commerce projects for authors, publishers and literary organisations.</p>
            <p>Our experience, coupled with active participation in industry events like The Africa Laureate Awards, gives us a deep understanding of our clients&apos; needs. Based in Nigeria, serving a global community.</p>
            <Link to="/contact" className="ep-button ep-button-primary">Start a project <span aria-hidden="true">↗</span></Link>
          </EditorialReveal>
          <div className="ep-stat-grid">
            {[
              { value: "#1", label: "Publishing agency in Nigeria" },
              { value: "50+", label: "Authors & publishers served" },
              { value: "100%", label: "In-house team" },
              { value: "24hr", label: "Support response time" },
            ].map((stat, index) => (
              <EditorialReveal key={stat.label} delay={index * 0.06} className="ep-stat-card">
                <strong>{stat.value}</strong><span>{stat.label}</span>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container">
          <EditorialSectionHeading
            eyebrow="The experience"
            description="The best work comes from being understood. Here is what working with our team looks like."
          >
            Thoughtful from<br /><em>day one.</em>
          </EditorialSectionHeading>
          <div className="ep-how-grid">
            {HOW.map((item, index) => (
              <EditorialReveal key={item.title} delay={index * 0.05} as="article" className="ep-how-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section">
        <div className="ep-container ep-values-layout">
          <EditorialSectionHeading
            eyebrow="Our values"
            description="These principles shape how we plan, design and support every project."
          >
            What we<br /><em>stand for.</em>
          </EditorialSectionHeading>
          <div className="ep-values-list">
            {VALUES.map((value, index) => (
              <EditorialReveal key={value.num} delay={index * 0.05} as="article" className="ep-value-row">
                <span>{value.num}</span><div><h3>{value.title}</h3><p>{value.desc}</p></div>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-section-stone">
        <div className="ep-container">
          <EditorialSectionHeading eyebrow="Client stories">Good things are<br /><em>better shared.</em></EditorialSectionHeading>
          <div className="ep-testimonial-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <EditorialReveal key={testimonial.initials} delay={index * 0.1}>
                <EditorialTestimonial testimonial={testimonial} />
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-partnership">
        <div className="ep-container ep-partnership-inner">
          <EditorialReveal>
            <span className="ep-eyebrow">Industry partnership</span>
            <h2>In partnership with<br /><em>The Africa Laureate Awards.</em></h2>
          </EditorialReveal>
          <EditorialReveal delay={0.1}>
            <p>Active digital partners and participants of one of Africa&apos;s most prestigious literary award ceremonies — giving us valuable insight into the publishing world.</p>
            <Link to="/contact" className="ep-button ep-button-outline">Work with us <span aria-hidden="true">↗</span></Link>
          </EditorialReveal>
        </div>
      </section>

      <section className="ep-section ep-proof-strip">
        <div className="ep-container ep-proof-grid">
          {STATS.map((stat, index) => (
            <EditorialReveal key={stat.label} delay={index * 0.06} className="ep-proof-item">
              <motion.strong
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {stat.num}{stat.suffix}
              </motion.strong>
              <span>{stat.label}</span>
            </EditorialReveal>
          ))}
        </div>
      </section>

      <EditorialCTA
        eyebrow="Let's work together"
        title={<>Ready for your<br /><em>next chapter?</em></>}
        description="Tell us what you are building and we will help you bring it into focus."
        secondary="See our services"
        secondaryTo="/services"
      />
    </EditorialPage>
  );
}
