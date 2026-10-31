import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PageTransition, PageHero, Ticker, Reveal, StaggerReveal, PlanCard } from '../components'
import { fetchPricing } from '../lib/api'
import { formatNaira, formatUsd } from '../lib/currency'
import defaultPricing from '../data/pricing.json'

const INCLUDED = [
  { icon: '⌂', title: 'Six months hosting', detail: 'A reliable home for your website, included with every plan.' },
  { icon: '✳', title: 'Hands-on training', detail: 'Learn how to manage and update your own website.' },
  { icon: '↗', title: 'Site Master support', detail: 'Request help directly from within your website.' },
  { icon: '▣', title: 'Mobile-first design', detail: 'A responsive experience for readers on every screen.' },
]

const PROJECT_STEPS = [
  { number: '01', title: 'Discovery', detail: 'We learn about your goals, audience and vision before recommending a direction.' },
  { number: '02', title: 'Strategy & design', detail: 'We shape the site around your publishing needs and review the design with you.' },
  { number: '03', title: 'Build & refine', detail: 'We build in clear stages, moving forward when you are happy with each one.' },
  { number: '04', title: 'Training & launch', detail: 'We help you get comfortable managing your site before it goes live.' },
]

const FAQ_ITEMS = [
  { q: 'What is included in "six months hosting"?', a: 'All plans include six months of reliable web hosting on our managed servers. After six months, hosting is renewed at an affordable annual rate.' },
  { q: 'How long does a project take?', a: 'Most projects are completed within 4–8 weeks. We work at your pace — we never rush to the next stage until you\'re happy with the current one.' },
  { q: 'Do I need technical knowledge?', a: 'Not at all. Every client receives a hands-on training session, and our Site Master plugin lets you request help from directly within your website at any time.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes. You can upgrade to a higher plan at any point. We\'ll quote for the additional pages and features and migrate everything seamlessly.' },
  { q: 'Do you work with international authors?', a: 'Absolutely. We\'re based in Nigeria but serve a global client base. All our communication and project management works remotely.' },
]

export default function Pricing() {
  const [pricing, setPricing] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openQuestion, setOpenQuestion] = useState(0)
  const reduceMotion = useReducedMotion()

  const loadPricing = useCallback(() => {
    setLoading(true)
    setLoadError(null)
    fetchPricing()
      .then((data) => {
        setPricing(data)
      })
      .catch((error) => {
        console.error('Failed to load live pricing; showing default pricing instead.', error)
        setPricing(defaultPricing)
        setLoadError('Live pricing is temporarily unavailable. These are the standard prices; retry to check for updates.')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadPricing()
  }, [loadPricing])

  const usdRate = pricing?.usdRate
  const plans = pricing?.plans || []
  const addons = pricing?.addons || []
  const comparisonFeatures = useMemo(
    () => [...new Set(plans.flatMap((plan) => plan.features))],
    [plans],
  )

  return (
    <PageTransition>
      <PageHero
        tag="Pricing"
        title="Simple, transparent<br/><em style='color:#FF8C00;font-style:italic;'>pricing.</em>"
        subtitle="Choose the plan that fits where you are in your publishing journey. Every plan includes six months hosting and hands-on training."
      />

      <Ticker />

      {/* ── PLANS ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#000000' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-16 text-center">
            <span className="tag mb-4 text-center">Choose Your Plan</span>
            <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-xl text-white">The right plan<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>for every author</em></h2>
            <p className="text-white/38 text-base leading-relaxed mt-5 max-w-md mx-auto font-light">
              All prices are fixed. All plans include six months hosting and a hands-on training session.
            </p>
          </Reveal>

          {loadError && (
            <motion.div
              className="mb-8 flex flex-wrap items-center justify-center gap-4 text-center"
              role="status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-mono text-xs text-ink/65">{loadError}</p>
              <button type="button" className="btn-outline" onClick={loadPricing} disabled={loading}>
                {loading ? 'Checking…' : 'Retry'}
              </button>
            </motion.div>
          )}

          {!pricing ? (
            <p className="text-center font-mono text-xs" style={{ color: 'rgba(255,140,0,0.4)' }}>Loading current pricing…</p>
          ) : (
            <StaggerReveal className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map(plan => <PlanCard key={plan.id} plan={plan} usdRate={usdRate} />)}
            </StaggerReveal>
          )}

          {/* all plans note */}
          <Reveal className="mt-10 text-center">
            <p className="font-mono text-[11px] tracking-wide" style={{ color: 'rgba(255,140,0,0.4)' }}>
              All plans include · Six months hosting · Hands-on training session · Site Master support plugin · Mobile-first responsive design
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INCLUDED WITH EVERY PLAN ── */}
      <section className="relative overflow-hidden bg-stone px-6 py-24 lg:px-10">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime/40 blur-3xl"
          animate={reduceMotion ? { opacity: 0.45 } : { scale: [0.9, 1.12, 0.9], opacity: [0.45, 0.75, 0.45] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative mx-auto max-w-[1300px]">
          <Reveal className="mb-12 max-w-2xl">
            <span className="tag mb-4">Every Plan, Thoughtfully Built</span>
            <h2 className="h-lg text-ink">A strong start is<br /><em>part of the price.</em></h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/65">
              Your website comes with the essentials to launch confidently and keep your publishing work moving.
            </p>
          </Reveal>
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((item, index) => (
              <motion.article
                key={item.title}
                className="card bg-ivory p-6"
                whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <motion.span
                  aria-hidden="true"
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-lime text-xl text-ink"
                  whileHover={{ rotate: 12, scale: 1.12 }}
                >
                  {item.icon}
                </motion.span>
                <h3 className="mb-2 font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/65">{item.detail}</p>
              </motion.article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── PROJECT JOURNEY ── */}
      <section className="bg-paper px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1300px]">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="tag mb-4">A Clear Process</span>
              <h2 className="h-lg text-ink">From first conversation<br /><em>to launch day.</em></h2>
            </div>
            <p className="max-w-md leading-relaxed text-ink/65">
              You will know what comes next at every stage. We keep the process collaborative, considered and at your pace.
            </p>
          </Reveal>
          <StaggerReveal className="grid gap-0 md:grid-cols-4">
            {PROJECT_STEPS.map((step, index) => (
              <motion.article
                key={step.number}
                className="relative border-t border-ink/15 px-5 py-7 first:pl-0 last:pr-0"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <span className="mb-6 block font-mono text-xs tracking-[0.2em] text-coral">{step.number}</span>
                <h3 className="mb-3 font-display text-xl font-bold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink/65">{step.detail}</p>
                {index < PROJECT_STEPS.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute right-4 top-7 hidden text-coral md:block"
                    animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                  >
                    →
                  </motion.span>
                )}
              </motion.article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-16 pb-28 px-6 lg:px-10" style={{ background: '#000000' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-12">
            <span className="tag mb-4">Compare Plans</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-lg text-white">What's included<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>in each plan</em></h2>
          </Reveal>

          <Reveal>
            {pricing && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th className="text-left font-mono text-[10px] tracking-widest uppercase pb-5 pr-8" style={{ color: 'rgba(255,140,0,0.4)' }}>Feature</th>
                    {plans.map(p => (
                      <th key={p.id} className="text-center pb-5 px-4 font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-.02em', color: p.featured ? '#FF8C00' : '#FFFFFF' }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr key={feature} style={{ borderTop: '1px solid rgba(255,140,0,0.07)' }}>
                      <td className="py-4 pr-8 text-white/45" style={{ fontSize: '0.88rem' }}>{feature}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-4 px-4 text-center">
                          {plan.features.includes(feature)
                            ? <motion.span
                                className="inline-block text-coral"
                                initial={{ scale: 0.4, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                              >✦</motion.span>
                            : <span className="text-ink/20">—</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Prices */}
                  <tr style={{ borderTop: '1px solid rgba(255,140,0,0.2)' }}>
                    <td className="py-6 font-mono text-[10px] tracking-widest uppercase text-coral">Price</td>
                    {plans.map(p => (
                      <td key={p.id} className="py-6 px-4 text-center">
                        <div className="font-display font-bold text-ink" style={{ fontSize: '1.4rem', letterSpacing: '-.03em', color: p.featured ? '#FF735E' : undefined }}>{formatNaira(p.amountNGN)}</div>
                        {formatUsd(p.amountNGN, usdRate) && (
                          <div className="font-mono text-[10px] mt-1 text-ink/55">≈ {formatUsd(p.amountNGN, usdRate)}</div>
                        )}
                      </td>
                    ))}
                  </tr>
                  {/* CTAs */}
                  <tr>
                    <td></td>
                    {plans.map(p => (
                      <td key={p.id} className="py-4 px-4 text-center">
                        <Link to="/contact" className={p.featured ? 'btn-gold' : 'btn-outline'} style={{ fontSize: '11px', padding: '10px 20px' }}>
                          {p.cta} →
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-12">
            <span className="tag mb-4">Add-Ons</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-lg text-white">Optional extras<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>to complete your presence</em></h2>
          </Reveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map(a => (
              <div key={a.id} className="card p-6">
                <div className="font-display font-bold text-white text-base mb-1" style={{ letterSpacing: '-.01em' }}>{a.label}</div>
                <div className="font-mono text-[11px] tracking-wide" style={{ color: '#FF8C00' }}>
                  {a.amountNGN === null ? 'POA' : `${a.prefix || ''}${formatNaira(a.amountNGN)}${a.suffix || ''}`}
                </div>
                {formatUsd(a.amountNGN, usdRate) && (
                  <div className="font-mono text-[10px] tracking-wide mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    ≈ {a.prefix || ''}{formatUsd(a.amountNGN, usdRate)}{a.suffix || ''}
                  </div>
                )}
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0d0d11' }}>
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16">
          <Reveal from="right">
            <span className="tag mb-4">FAQ</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-lg text-white">Common<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>questions</em></h2>
          </Reveal>
          <StaggerReveal className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openQuestion === index
              return (
                <motion.article key={item.q} className="card overflow-hidden bg-ivory">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                  >
                    <span className="font-display font-bold text-ink">{item.q}</span>
                    <motion.span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-ink"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink/65">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,140,0,0.08) 0%, transparent 60%), #000000' }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <span className="tag mb-4 text-center">Get Started</span>
          <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
          <h2 className="h-xl text-white mb-6">Not sure which plan?<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>Let's talk it through.</em></h2>
          <p className="text-white/38 text-base max-w-md mx-auto mb-10 leading-relaxed font-light">
            We'll help you choose the right plan for your needs and budget. No pressure, no hard sell.
          </p>
          <Link to="/contact" className="btn-gold inline-flex px-10 py-4">Book a free consultation →</Link>
        </Reveal>
      </section>
    </PageTransition>
  )
}
