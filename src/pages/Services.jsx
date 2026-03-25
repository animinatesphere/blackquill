import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition, PageHero, Ticker, Reveal, StaggerReveal, AccordionItem } from '../components'
import { SERVICES } from '../data'

export default function Services() {
  const [open, setOpen] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <PageTransition>
      <PageHero
        tag="Our Services"
        title="How BlackQuill<br/><em style='color:#FF8C00;font-style:italic;'>can help you</em>"
        subtitle="From strategy to execution — bespoke digital solutions built exclusively for the publishing world."
      />

      <Ticker />

      {/* ── SERVICE CARDS ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#000000' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-16">
            <span className="tag mb-4">What We Offer</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-xl text-white">Our specialisms</h2>
          </Reveal>

          <StaggerReveal className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map(s => (
              <motion.div
                key={s.id}
                className="relative rounded-sm overflow-hidden p-8 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,140,0,0.12)', minHeight: 220 }}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
              >
                {/* animated bg glow */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: hovered === s.id ? 1 : 0 }}
                  style={{ background: `radial-gradient(ellipse at 20% 30%, ${s.color}12 0%, transparent 65%)` }}
                  transition={{ duration: 0.45 }} />

                {/* corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                  style={{ borderTop: `1.5px solid rgba(255,140,0,${hovered === s.id ? '0.5' : '0.2'})`, borderLeft: `1.5px solid rgba(255,140,0,${hovered === s.id ? '0.5' : '0.2'})`, transition: 'all 0.3s' }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,140,0,0.4)' }}>{s.num}</span>
                    <motion.span className="text-xl" animate={{ rotate: hovered === s.id ? 15 : 0 }} transition={{ duration: 0.3 }}>{s.icon}</motion.span>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-3" style={{ letterSpacing: '-.02em' }}>{s.label}</h3>
                  <p className="text-white/38 text-sm leading-relaxed mb-5">{s.short}</p>

                  {/* features preview */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.features.slice(0, 3).map(f => (
                      <span key={f} className="font-mono text-[9px] tracking-wide px-2 py-1 rounded-sm"
                        style={{ background: 'rgba(255,140,0,0.07)', border: '1px solid rgba(255,140,0,0.14)', color: 'rgba(255,140,0,0.6)' }}>
                        {f}
                      </span>
                    ))}
                    {s.features.length > 3 && (
                      <span className="font-mono text-[9px] px-2 py-1" style={{ color: 'rgba(201,168,76,0.4)' }}>+{s.features.length - 3} more</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── ACCORDION DEEP DIVE ── */}
      <section className="py-16 pb-28 px-6 lg:px-10" style={{ background: '#000000' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-12">
            <span className="tag mb-4">In Depth</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-xl text-white">Everything we do,<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>in detail</em></h2>
          </Reveal>
          <Reveal>
            <div style={{ borderTop: '1px solid rgba(255,140,0,0.1)' }}>
              {SERVICES.map(s => (
                <AccordionItem key={s.id} {...s} isOpen={open === s.id} onToggle={() => setOpen(open === s.id ? null : s.id)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-14">
            <span className="tag mb-4">Our Process</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-xl text-white">How we<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>work with you</em></h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Discovery', desc: 'We start with a detailed brief meeting to understand your goals, audience and vision — listening first, advising second.' },
              { step: '02', title: 'Strategy & Design', desc: 'We present a wide range of options and examples, drawing on our deep knowledge of the publishing industry.' },
              { step: '03', title: 'Build & Refine', desc: 'Our step-by-step approach means you only progress when you\'re satisfied. No rushing, no skipping ahead.' },
              { step: '04', title: 'Training & Launch', desc: 'We train you to manage your own site and remain available for support for the full life of the website.' },
            ].map(p => (
              <div key={p.step} className="card p-7">
                <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: 'rgba(255,140,0,0.4)' }}>{p.step}</div>
                <div className="h-[1px] w-8 mb-5" style={{ background: 'rgba(255,140,0,0.3)' }} />
                <h3 className="font-display font-bold text-white text-xl mb-3" style={{ letterSpacing: '-.02em' }}>{p.title}</h3>
                <p className="text-white/38 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,140,0,0.07) 0%, transparent 60%), #000000' }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <span className="tag mb-4 text-center">Ready?</span>
          <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
          <h2 className="h-xl text-white mb-6">Let's build your<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>author platform</em></h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-10 py-4">Start a conversation →</Link>
            <Link to="/pricing" className="btn-outline px-10 py-4">View pricing</Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
