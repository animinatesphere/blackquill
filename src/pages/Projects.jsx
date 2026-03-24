import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition, PageHero, Ticker, Reveal, StaggerReveal, ProjectCard, TestimonialCard } from '../components'
import { PROJECTS, TESTIMONIALS } from '../data'

const TAGS = ['All', 'Website', 'Branding', 'E-Commerce', 'Training']

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeTag))

  return (
    <PageTransition>
      <PageHero
        tag="Our Work"
        title="We're proud of our<br/><em style='color:#C9A84C;font-style:italic;'>body of work.</em>"
        subtitle="Here are some of our new and notable projects — authors, publishers and literary organisations we've had the privilege of working with."
      />

      <Ticker />

      {/* ── FILTER + GRID ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          {/* filter tabs */}
          <Reveal className="mb-14">
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <motion.button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="px-5 py-2 rounded-sm font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-250"
                  animate={{
                    background: activeTag === tag ? '#C9A84C' : 'rgba(201,168,76,0.06)',
                    color: activeTag === tag ? '#0B0B0F' : 'rgba(201,168,76,0.5)',
                    borderColor: activeTag === tag ? '#C9A84C' : 'rgba(201,168,76,0.15)',
                  }}
                  style={{ border: '1px solid rgba(201,168,76,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                >{tag}</motion.button>
              ))}
            </div>
          </Reveal>

          {/* grid */}
          <motion.div layout className="grid md:grid-cols-2 gap-5">
            <AnimatePresence>
              {filtered.map(p => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, scale: 0.93, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 font-mono text-sm" style={{ color: 'rgba(201,168,76,0.35)' }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── RESULTS BAND ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: '#C9A84C' }}>
        <div className="max-w-[1300px] mx-auto">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '50+',    label: 'Publishing clients served' },
              { stat: '100%',   label: 'Client satisfaction rate' },
              { stat: '#1',     label: 'Publishing agency in Nigeria' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display font-bold italic text-ink" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', letterSpacing: '-.04em', lineHeight: 1 }}>{s.stat}</div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: 'rgba(11,11,15,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-14">
            <span className="tag mb-4">Client Voices</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-xl text-white">What our clients<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>say</em></h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </StaggerReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 60%), #0d0d11' }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <span className="tag mb-4 text-center">Your Project</span>
          <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
          <h2 className="h-xl text-white mb-6">Your brand<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>could be next</em></h2>
          <Link to="/contact" className="btn-gold inline-flex px-10 py-4">Start a conversation →</Link>
        </Reveal>
      </section>
    </PageTransition>
  )
}
