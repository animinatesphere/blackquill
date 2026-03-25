import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition, PageHero, Ticker, Reveal, StaggerReveal, TestimonialCard } from '../components'
import { TESTIMONIALS } from '../data'

const VALUES = [
  { num: '01', title: 'Publishing-first thinking', desc: 'We only work with publishers, authors and literary organisations. This isn\'t a niche for us — it\'s our entire world. That depth of focus means better outcomes for every client.', color: '#C9A84C' },
  { num: '02', title: 'Client-paced delivery', desc: 'We never rush. Our step-by-step approach means you only progress to the next stage when you\'re satisfied with the current one. Your comfort drives our timeline.', color: '#8B6914' },
  { num: '03', title: 'Radical responsiveness', desc: 'When issues or glitches need addressing, you only ever raise them once. They\'re sorted promptly and efficiently. Always.', color: '#C9A84C' },
  { num: '04', title: 'Lifetime commitment', desc: 'Our Site Master plugin means clients can request help from directly within their website — for the full life of the site. We don\'t disappear after launch.', color: '#8B6914' },
]

const HOW = [
  { title: 'Your own dedicated project manager', desc: 'One point of contact who knows your brand inside out. Available via email and direct message for quick updates, questions and support throughout the project.' },
  { title: 'Expert knowledge of the publishing industry', desc: 'Our team has a deep understanding of what publishers and authors need — from book launch mechanics to reader engagement strategies. We speak your language.' },
  { title: 'A step-by-step approach', desc: 'We identify all the functionality you need as well as the overall look of the site — at a pace that suits you. You never feel rushed at BlackQuill.' },
  { title: 'Straightforward site management', desc: 'After training, you can easily add or change your own content. Being able to self-manage is a core feature of every BlackQuill website.' },
  { title: 'Responsive support for the long term', desc: 'Our responsiveness is something clients praise consistently. When something needs fixing, you raise it once and it\'s sorted. That\'s our promise.' },
  { title: 'Active in the publishing community', desc: 'We participate in industry events like The Africa Laureate Awards — giving us unrivalled insight into the real needs of authors and publishers today.' },
]

export default function About() {
  return (
    <PageTransition>
      <PageHero
        tag="About Us"
        title="We're <em style='color:#FF8C00;font-style:italic;'>BlackQuill.</em>"
        subtitle="Nigeria's only digital agency dedicated to the book publishing industry. We deliver bespoke website and e-commerce projects for authors, publishers and literary organisations worldwide."
      />

      <Ticker />

      {/* ── MISSION ── */}
      <section className="py-28 px-6 lg:px-10" style={{ background: '#000000' }}>
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <Reveal from="right">
            <span className="tag mb-4">Our Mission</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-xl text-white mb-7">
              We can move beyond<br />the basics and focus on<br />
              <em style={{ color: '#FF8C00', fontStyle: 'italic' }}>your strategic objectives.</em>
            </h2>
            <p className="text-white/42 leading-relaxed mb-6 max-w-md font-light" style={{ fontSize: '1.05rem', lineHeight: 1.85 }}>
              BlackQuill Digital Agency is Nigeria's only agency dedicated to delivering bespoke website and e-commerce projects for authors, publishers, and literary organisations.
            </p>
            <p className="text-white/42 leading-relaxed mb-10 max-w-md font-light" style={{ fontSize: '1.05rem', lineHeight: 1.85 }}>
              Our extensive experience, coupled with active participation in industry events like The Africa Laureate Awards, ensures we have a deep understanding of our clients' needs. Based in Nigeria, serving a global client base.
            </p>
            <Link to="/contact" className="btn-gold inline-flex">Start a project →</Link>
          </Reveal>

          <StaggerReveal className="grid grid-cols-2 gap-4">
            {[
              { value: '#1',    sub: 'Publishing agency in Nigeria' },
              { value: '50+',   sub: 'Authors & publishers served' },
              { value: '100%',  sub: 'In-house team' },
              { value: '24hr',  sub: 'Support response guarantee' },
            ].map(s => (
              <div key={s.sub} className="card p-7 text-center">
                <div className="font-display font-bold italic mb-2" style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-.04em', color: '#FF8C00' }}>{s.value}</div>
                <div className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.sub}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0d0d11' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-14">
            <span className="tag mb-4">How We Work</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-xl text-white">What it's like<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>working with us</em></h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW.map((h, i) => (
              <div key={i} className="card p-8">
                <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: 'rgba(255,140,0,0.4)' }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="h-[1px] w-8 mb-5" style={{ background: 'rgba(255,140,0,0.3)' }} />
                <h3 className="font-display font-bold text-white text-lg mb-3" style={{ letterSpacing: '-.02em', lineHeight: 1.2 }}>{h.title}</h3>
                <p className="text-white/38 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 lg:px-10" style={{ background: '#0B0B0F' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-14">
            <span className="tag mb-4">Our Values</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-xl text-white">What we<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>stand for</em></h2>
          </Reveal>

          <div style={{ borderTop: '1px solid rgba(255,140,0,0.1)' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.08}>
                <div className="flex flex-col md:flex-row md:items-start gap-6 py-10" style={{ borderBottom: '1px solid rgba(255,140,0,0.1)' }}>
                  <span className="font-mono text-[10px] tracking-widest uppercase shrink-0 pt-1" style={{ color: 'rgba(255,140,0,0.35)', minWidth: 36 }}>{v.num}</span>
                  <div className="h-[1px] w-8 mt-3 shrink-0 hidden md:block" style={{ background: 'rgba(255,140,0,0.3)' }} />
                  <div>
                    <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(1.2rem,2vw,1.7rem)', letterSpacing: '-.02em' }}>{v.title}</h3>
                    <p className="text-white/40 leading-relaxed max-w-xl" style={{ fontSize: '0.97rem' }}>{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 lg:px-10" style={{ background: '#0d0d11' }}>
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="mb-14">
            <span className="tag mb-4">Don't Take Our Word For It</span>
            <div className="h-[1px] w-12 mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
            <h2 className="h-xl text-white">Happy clients<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>tell you more</em></h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </StaggerReveal>
        </div>
      </section>

      {/* ── AFRICA LAUREATE CALLOUT ── */}
      <section className="py-20 px-6 lg:px-10" style={{ background: '#FF8C00' }}>
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3 text-ink/60">Industry Partnership</div>
            <h3 className="font-display font-bold text-ink text-3xl lg:text-4xl" style={{ letterSpacing: '-.03em' }}>
              In partnership with<br />The Africa Laureate Awards
            </h3>
          </div>
          <div className="shrink-0">
            <p className="text-ink/60 text-sm leading-relaxed max-w-xs mb-6">
              Active digital partners and participants of one of Africa's most prestigious literary award ceremonies — giving us unrivalled insight into the publishing world.
            </p>
            <Link to="/contact" className="btn-outline" style={{ borderColor: 'rgba(0,0,0,0.3)', color: '#000000' }}>
              Work with us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 lg:px-10 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,140,0,0.07) 0%, transparent 60%), #000000' }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <span className="tag mb-4 text-center">Let's Work Together</span>
          <div className="h-[1px] w-12 mx-auto mb-6" style={{ background: 'rgba(255,140,0,0.4)' }} />
          <h2 className="h-xl text-white mb-8">Ready to work<br /><em style={{ color: '#FF8C00', fontStyle: 'italic' }}>with BlackQuill?</em></h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-10 py-4">Start a conversation →</Link>
            <Link to="/pricing" className="btn-outline px-10 py-4">See pricing</Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
