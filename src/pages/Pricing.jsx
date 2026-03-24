import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition, PageHero, Ticker, Reveal, StaggerReveal, PlanCard } from '../components'
import { PLANS, WHY_AUTHOR } from '../data'

const ADDONS = [
  { label: 'Additional pages', price: 'From ₦15,000 each' },
  { label: 'Logo design', price: 'From ₦35,000' },
  { label: 'Brand identity pack', price: 'From ₦80,000' },
  { label: 'Book cover design', price: 'From ₦25,000' },
  { label: 'Photography session', price: 'POA' },
  { label: 'Annual hosting renewal', price: 'From ₦30,000 / yr' },
  { label: 'Ongoing SEO retainer', price: 'POA' },
  { label: 'Priority support plan', price: 'From ₦20,000 / mo' },
]

export default function Pricing() {
  return (
    <PageTransition>
      <PageHero
        tag="Pricing"
        title="Simple, transparent<br/><em style='color:#C9A84C;font-style:italic;'>pricing.</em>"
        subtitle="Choose the plan that fits where you are in your publishing journey. Every plan includes six months hosting and hands-on training."
      />

      <Ticker />

      {/* ── PLANS ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-16 text-center">
            <span className="tag mb-4 text-center">Choose Your Plan</span>
            <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-xl text-white">The right plan<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>for every author</em></h2>
            <p className="text-white/38 text-base leading-relaxed mt-5 max-w-md mx-auto font-light">
              All prices are fixed. All plans include six months hosting and a hands-on training session.
            </p>
          </Reveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map(plan => <PlanCard key={plan.id} plan={plan} />)}
          </StaggerReveal>

          {/* all plans note */}
          <Reveal className="mt-10 text-center">
            <p className="font-mono text-[11px] tracking-wide" style={{ color: 'rgba(201,168,76,0.4)' }}>
              All plans include · Six months hosting · Hands-on training session · Site Master support plugin · Mobile-first responsive design
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-16 pb-28 px-6 lg:px-10" style={{ background: '#0d0d11' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-12">
            <span className="tag mb-4">Compare Plans</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-lg text-white">What's included<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>in each plan</em></h2>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th className="text-left font-mono text-[10px] tracking-widest uppercase pb-5 pr-8" style={{ color: 'rgba(201,168,76,0.4)' }}>Feature</th>
                    {PLANS.map(p => (
                      <th key={p.id} className="text-center pb-5 px-4 font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-.02em', color: p.featured ? '#C9A84C' : '#F5F0E8' }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Homepage', true, true, true],
                    ['About the author', true, true, true],
                    ['E-commerce integration', true, true, true],
                    ['Contact page', true, true, true],
                    ['Social media integration', true, true, true],
                    ['Blog', true, true, true],
                    ['Six months hosting', true, true, true],
                    ['Local payment gateway', true, true, true],
                    ['International payment gateway', false, true, true],
                    ['Interviews & features page', false, true, true],
                    ['Appearance & events page', false, true, true],
                    ['Awards & recognition page', false, true, true],
                    ['Rich media integration', false, true, true],
                    ['Giveaway page', false, false, true],
                    ['Signed books page', false, false, true],
                    ['Advanced Readers Copy (ARC) page', false, false, true],
                    ['Premium design customisation', false, false, true],
                    ['AI chatbot for reader support', false, false, true],
                  ].map(([feature, ...vals]) => (
                    <tr key={feature} style={{ borderTop: '1px solid rgba(201,168,76,0.07)' }}>
                      <td className="py-4 pr-8 text-white/45" style={{ fontSize: '0.88rem' }}>{feature}</td>
                      {vals.map((v, i) => (
                        <td key={i} className="py-4 px-4 text-center">
                          {v
                            ? <span style={{ color: '#C9A84C', fontSize: 14 }}>✦</span>
                            : <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 12 }}>—</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Prices */}
                  <tr style={{ borderTop: '1px solid rgba(201,168,76,0.2)' }}>
                    <td className="py-6 font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(201,168,76,0.45)' }}>Price</td>
                    {PLANS.map(p => (
                      <td key={p.id} className="py-6 px-4 text-center">
                        <div className="font-display font-bold" style={{ fontSize: '1.4rem', letterSpacing: '-.03em', color: p.featured ? '#C9A84C' : '#F5F0E8' }}>{p.price}</div>
                      </td>
                    ))}
                  </tr>
                  {/* CTAs */}
                  <tr>
                    <td></td>
                    {PLANS.map(p => (
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
          </Reveal>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-12">
            <span className="tag mb-4">Add-Ons</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-lg text-white">Optional extras<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>to complete your presence</em></h2>
          </Reveal>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDONS.map(a => (
              <div key={a.label} className="card p-6">
                <div className="font-display font-bold text-white text-base mb-1" style={{ letterSpacing: '-.01em' }}>{a.label}</div>
                <div className="font-mono text-[11px] tracking-wide" style={{ color: '#C9A84C' }}>{a.price}</div>
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
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <h2 className="h-lg text-white">Common<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>questions</em></h2>
          </Reveal>
          <StaggerReveal className="flex flex-col gap-6">
            {[
              { q: 'What is included in "six months hosting"?', a: 'All plans include six months of reliable web hosting on our managed servers. After six months, hosting is renewed at an affordable annual rate.' },
              { q: 'How long does a project take?', a: 'Most projects are completed within 4–8 weeks. We work at your pace — we never rush to the next stage until you\'re happy with the current one.' },
              { q: 'Do I need technical knowledge?', a: 'Not at all. Every client receives a hands-on training session, and our Site Master plugin lets you request help from directly within your website at any time.' },
              { q: 'Can I upgrade my plan later?', a: 'Yes. You can upgrade to a higher plan at any point. We\'ll quote for the additional pages and features and migrate everything seamlessly.' },
              { q: 'Do you work with international authors?', a: 'Absolutely. We\'re based in Nigeria but serve a global client base. All our communication and project management works remotely.' },
            ].map((f, i) => (
              <div key={i} className="card p-6">
                <div className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-.01em' }}>{f.q}</div>
                <p className="text-white/40 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), #0B0B0F' }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <span className="tag mb-4 text-center">Get Started</span>
          <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(201,168,76,0.4)' }} />
          <h2 className="h-xl text-white mb-6">Not sure which plan?<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Let's talk it through.</em></h2>
          <p className="text-white/38 text-base max-w-md mx-auto mb-10 leading-relaxed font-light">
            We'll help you choose the right plan for your needs and budget. No pressure, no hard sell.
          </p>
          <Link to="/contact" className="btn-gold inline-flex px-10 py-4">Book a free consultation →</Link>
        </Reveal>
      </section>
    </PageTransition>
  )
}
