import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TICKER_ITEMS } from '../data'

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────────────────────────
   Page transition wrapper
──────────────────────────────────────── */
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────
   GSAP scroll-triggered reveal
──────────────────────────────────────── */
export function Reveal({ children, delay = 0, from = 'bottom', className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const fromMap = {
      bottom: { opacity: 0, y: 50 },
      left:   { opacity: 0, x: -50 },
      right:  { opacity: 0, x: 50 },
      top:    { opacity: 0, y: -40 },
      fade:   { opacity: 0 },
    }
    gsap.fromTo(ref.current, fromMap[from] || fromMap.bottom, {
      opacity: 1, y: 0, x: 0,
      duration: 0.9, delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
    })
  }, [])
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

/* ────────────────────────────────────────
   GSAP stagger children
──────────────────────────────────────── */
export function StaggerReveal({ children, className = '', stagger = 0.1, from = 'bottom' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const kids = Array.from(ref.current.children)
    const fromMap = {
      bottom: { opacity: 0, y: 44 },
      left:   { opacity: 0, x: -36 },
      right:  { opacity: 0, x: 36 },
    }
    gsap.fromTo(kids, fromMap[from] || fromMap.bottom, {
      opacity: 1, y: 0, x: 0,
      duration: 0.75, stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 86%', once: true },
    })
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

/* ────────────────────────────────────────
   GSAP animated counter
──────────────────────────────────────── */
export function Counter({ target, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target, duration: 2.2, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate() { if (ref.current) ref.current.textContent = prefix + Math.round(obj.val) + suffix },
    })
  }, [target])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

/* ────────────────────────────────────────
   Marquee ticker
──────────────────────────────────────── */
export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="marquee-wrap py-[13px]"
      style={{ background: 'rgba(7,7,9,0.9)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 mx-6 font-mono text-[10px] font-medium tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ color: 'rgba(201,168,76,0.4)' }}>
            {item}
            <span style={{ color: '#C9A84C', fontSize: 7 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────
   Page hero (inner pages)
──────────────────────────────────────── */
export function PageHero({ tag, title, subtitle }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.ph-line',
        { opacity: 0, y: 48, skewY: 1.5 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.13, ease: 'power4.out', delay: 0.2 }
      )
      // ink-drop line
      gsap.fromTo('.ph-line-decoration',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power3.out', delay: 0.5, transformOrigin: 'left' }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative pt-36 pb-24 px-6 lg:px-10 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 60%, rgba(201,168,76,0.06) 0%, transparent 60%), #0B0B0F' }}>
      {/* grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

      {/* decorative large glyph */}
      <div className="ph-line absolute right-6 lg:right-16 top-24 font-display font-bold pointer-events-none select-none opacity-0"
        style={{ fontSize: 'clamp(8rem,18vw,18rem)', color: 'rgba(201,168,76,0.04)', lineHeight: 1, letterSpacing: '-.04em' }}>
        &ldquo;
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="ph-line" style={{ opacity: 0 }}>
          <span className="tag">{tag}</span>
        </div>
        <div className="ph-line-decoration h-[1px] w-16 mt-4 mb-6" style={{ background: 'rgba(201,168,76,0.4)', opacity: 0 }} />
        <h1
          className="h-display text-white ph-line mb-6"
          style={{ opacity: 0 }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <p className="text-white/40 text-lg leading-relaxed max-w-xl ph-line font-light" style={{ opacity: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

/* ────────────────────────────────────────
   Project card
──────────────────────────────────────── */
export function ProjectCard({ project }) {
  const { name, tags, stat, bg, accent, desc } = project
  return (
    <motion.div
      className="relative rounded-sm overflow-hidden cursor-pointer"
      style={{ aspectRatio: '4/3', background: bg, minHeight: 280 }}
      whileHover="hover" initial="rest"
    >
      {/* subtle grid */}
      <div className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,0.04) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />

      {/* gold corner accent */}
      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
        style={{ borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, opacity: 0.5 }} />
      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
        style={{ borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}`, opacity: 0.5 }} />

      {/* dark overlay */}
      <motion.div className="absolute inset-0"
        variants={{ rest: { background: 'rgba(11,11,15,0)' }, hover: { background: 'rgba(11,11,15,0.78)' } }}
        transition={{ duration: 0.38 }} />

      {/* tags */}
      <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-sm"
            style={{ background: 'rgba(11,11,15,0.7)', color: 'rgba(201,168,76,0.7)', border: '1px solid rgba(201,168,76,0.2)' }}>
            {t}
          </span>
        ))}
      </div>

      {/* arrow */}
      <motion.div className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center font-bold text-sm rounded-sm"
        style={{ background: accent, color: '#0B0B0F' }}
        variants={{ rest: { opacity: 0, scale: 0.7 }, hover: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.3 }}>
        ↗
      </motion.div>

      {/* info */}
      <motion.div className="absolute bottom-0 left-0 right-0 p-6"
        variants={{ rest: { y: 18, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
        <h3 className="font-display font-bold text-white text-2xl mb-1" style={{ letterSpacing: '-.02em' }}>{name}</h3>
        <p className="font-mono text-xs" style={{ color: accent }}>{stat}</p>
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────────────────
   Testimonial card
──────────────────────────────────────── */
export function TestimonialCard({ quote, author, role, color = '#C9A84C', initials }) {
  return (
    <div className="card p-8 flex flex-col gap-5 h-full">
      {/* open quote */}
      <div className="font-display text-5xl leading-none" style={{ color: 'rgba(201,168,76,0.25)' }}>&ldquo;</div>
      <p className="text-white/55 leading-relaxed flex-1" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>{quote}</p>
      <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="w-10 h-10 rounded-sm flex items-center justify-center font-bold text-sm shrink-0"
          style={{ background: color, color: '#0B0B0F' }}>
          {initials}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{author}</div>
          <div className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(201,168,76,0.55)' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────
   Plan / pricing card
──────────────────────────────────────── */
export function PlanCard({ plan }) {
  const { name, price, tagline, featured, features, cta } = plan
  return (
    <motion.div
      className={`plan-card p-8 flex flex-col gap-6 h-full ${featured ? 'featured' : ''}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
      )}
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ background: '#C9A84C', color: '#0B0B0F' }}>Most Popular</span>
        </div>
      )}

      <div>
        <span className="tag mb-2">{name}</span>
        <div className="font-display font-bold text-white mt-1" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-.03em', color: featured ? '#C9A84C' : '#F5F0E8' }}>
          {price}
        </div>
        <p className="text-white/35 text-sm mt-2">{tagline}</p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(201,168,76,0.12)' }} />

      <ul className="flex flex-col gap-3 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/60">
            <span style={{ color: '#C9A84C', marginTop: 2, fontSize: 10, flexShrink: 0 }}>✦</span>
            {f}
          </li>
        ))}
      </ul>

      <a href="/contact" className={featured ? 'btn-gold w-full justify-center text-center' : 'btn-outline w-full justify-center text-center'}>
        {cta} →
      </a>
    </motion.div>
  )
}

/* ────────────────────────────────────────
   Accordion item
──────────────────────────────────────── */
export function AccordionItem({ num, label, short, desc, features, color, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 px-1 gap-4 text-left group"
      >
        <div className="flex items-center gap-5 min-w-0">
          <span className="font-mono text-[10px] shrink-0" style={{ color: 'rgba(201,168,76,0.35)' }}>{num}</span>
          <div className="min-w-0">
            <div className="font-display font-bold text-white transition-colors duration-250 group-hover:text-gold"
              style={{ fontSize: 'clamp(1.1rem,2vw,1.8rem)', letterSpacing: '-.02em', color: isOpen ? color : '#F5F0E8' }}>
              {label}
            </div>
            {!isOpen && <div className="font-mono text-[10px] tracking-wide mt-0.5" style={{ color: 'rgba(201,168,76,0.4)' }}>{short}</div>}
          </div>
        </div>

        <motion.div
          className="shrink-0 w-8 h-8 rounded-sm flex items-center justify-center"
          animate={{ background: isOpen ? color : 'rgba(201,168,76,0.08)', borderColor: isOpen ? color : 'rgba(201,168,76,0.2)' }}
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <motion.span className="block font-mono font-bold text-xs"
            animate={{ color: isOpen ? '#0B0B0F' : '#C9A84C' }}>
            {isOpen ? '−' : '+'}
          </motion.span>
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-1 pb-8">
          <p className="text-white/45 leading-relaxed mb-6 max-w-2xl" style={{ fontSize: '0.97rem', lineHeight: 1.8 }}>{desc}</p>
          <ul className="flex flex-wrap gap-2">
            {features.map(f => (
              <li key={f} className="font-mono text-[10px] tracking-wide px-3 py-1.5 rounded-sm"
                style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(201,168,76,0.7)' }}>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
