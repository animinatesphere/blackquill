import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import vi1 from "../videos/hero2.mp4";
import vi2 from "../videos/quote.mp4";
import vi3 from "../videos/cta.mp4";
import vi4 from "../videos/about.mp4";
import vi5 from "../videos/why.mp4";
import vi6 from "../videos/Testimonials.mp4";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PageTransition,
  Ticker,
  Reveal,
  StaggerReveal,
  Counter,
  ProjectCard,
  TestimonialCard,
  AccordionItem,
} from "../components";
import { SERVICES, PROJECTS, TESTIMONIALS, STATS, WHY_AUTHOR } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating gold particle ─── */
function Particle({ x, y, delay, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: "#FF8C00",
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -100, 0],
        opacity: [0, 0.55, 0],
        x: [0, (Math.random() - 0.5) * 50, 0],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Magnetic button wrapper ─── */
function Mag({ children, to, className, style }) {
  const el = useRef(null);
  const onMove = (e) => {
    const r = el.current.getBoundingClientRect();
    gsap.to(el.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.28,
      y: (e.clientY - r.top - r.height / 2) * 0.28,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onLeave = () =>
    gsap.to(el.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.4)",
    });
  return (
    <Link
      ref={el}
      to={to}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </Link>
  );
}

/* ─── Word-by-word animated heading ─── */
function Words({ text, className, style, delay = 0 }) {
  return (
    <span className={className} style={{ display: "inline", ...style }}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: "0.22em", transformOrigin: "50% 0%" }}
          initial={{ opacity: 0, y: 64, rotateX: -38 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.78,
            delay: delay + i * 0.085,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Particles seed ─── */
const PTCLS = Array.from({ length: 16 }, () => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  size: Math.random() * 3 + 1.5,
}));

export default function Home() {
  const heroRef = useRef(null);
  const pinRef = useRef(null); // horizontal scroll container
  const panelRef = useRef(null); // inner strip
  const [openAcc, setOpenAcc] = useState(null);
  const [vidLoaded, setVidLoaded] = useState(false);
  const [vid2Loaded, setVid2Loaded] = useState(false);
  const [vid4Loaded, setVid4Loaded] = useState(false);
  const [vid5Loaded, setVid5Loaded] = useState(false);
  const [vid6Loaded, setVid6Loaded] = useState(false);
  const [vCursor, setVCursor] = useState({ x: -200, y: -200, show: false });

  /* ─── Hero GSAP cinematic timeline ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      // Wipe overlay out
      tl.to(".h-wipe", {
        scaleY: 0,
        duration: 1.35,
        ease: "power4.inOut",
        transformOrigin: "top",
      });

      // Video scale + fade in
      tl.fromTo(
        ".h-vid-wrap",
        { scale: 1.16, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=0.9",
      );

      // Badge
      tl.fromTo(
        ".h-badge",
        { opacity: 0, y: 28, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Words — 3D flip up
      tl.fromTo(
        ".h-word",
        { opacity: 0, y: 88, skewY: 3.5, rotateX: -42 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          rotateX: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.55",
      );

      // Gold line draw
      tl.fromTo(
        ".h-rule",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, ease: "power3.out" },
        "-=0.65",
      );

      // Sub text
      tl.fromTo(
        ".h-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "-=0.8",
      );

      // CTAs
      tl.fromTo(
        ".h-cta",
        { opacity: 0, y: 24, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.6)",
        },
        "-=0.5",
      );

      // Stats
      tl.fromTo(
        ".h-stat",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power2.out" },
        "-=0.4",
      );

      // Scroll cue
      tl.fromTo(
        ".h-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2",
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ─── Hero parallax on scroll ─── */
  const { scrollY } = useScroll();
  const vidY = useTransform(scrollY, [0, 900], [0, 130]);
  const heroTY = useTransform(scrollY, [0, 700], [0, -90]);
  const heroOp = useTransform(scrollY, [0, 550], [1, 0]);
  const overlayOp = useTransform(scrollY, [0, 450], [0.58, 0.86]);

  /* ─── GSAP horizontal scroll (services) ─── */
  useEffect(() => {
    if (!pinRef.current || !panelRef.current) return;
    const panels = gsap.utils.toArray(".srv-panel");
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      const totalScroll = () =>
        panelRef.current.scrollWidth - pinRef.current.offsetWidth;

      gsap.to(panelRef.current, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1.2,
          end: () => `+=${totalScroll()}`,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.fromTo(
          panel.querySelector(".srv-inner"),
          { opacity: 0.25, scale: 0.92, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: pinRef.current,
              scrub: 1,
              start: () => `top top-=${(i - 0.6) * window.innerWidth * 0.78}`,
              end: () => `top top-=${i * window.innerWidth * 0.78}`,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      {/* ╔═══════════════════════════════════════════╗
          ║  01  CINEMATIC FULL-SCREEN VIDEO HERO     ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "100vh", minHeight: 660, background: "#000000" }}
      >
        {/* ── Wipe overlay ── */}
        <div
          className="h-wipe absolute inset-0 z-40"
          style={{ background: "#000000" }}
        />

        {/* ── Background video ── */}
        <motion.div
          className="h-vid-wrap absolute inset-0 z-0"
          style={{ y: vidY }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVidLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.65) contrast(1.08)" }}
            onMouseMove={(e) =>
              setVCursor({ x: e.clientX, y: e.clientY, show: true })
            }
            onMouseLeave={() => setVCursor((v) => ({ ...v, show: false }))}
          >
            {/* Mixkit free CDN — book/writing videos, no auth required */}
            <source src={vi1} type="video/mp4" />
          </video>

          {/* Fallback animated background if video blocked */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 75% 55% at 18% 38%, rgba(255,140,0,0.13) 0%, transparent 62%),
                radial-gradient(ellipse 55% 45% at 82% 65%, rgba(255,140,0,0.07) 0%, transparent 55%),
                linear-gradient(155deg, #0f0c08 0%, #000000 45%, #08080c 100%)
              `,
              display: vidLoaded ? "none" : "block",
            }}
          >
            {/* animated vertical rules to evoke book pages */}
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${4 + i * 7}%`,
                  width: 1,
                  background: `rgba(255,140,0,${0.03 + (i % 4) * 0.015})`,
                  transformOrigin: "top",
                }}
                animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.2, 0.7, 0.2] }}
                transition={{
                  duration: 3.5 + i * 0.35,
                  repeat: Infinity,
                  delay: i * 0.22,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Video cursor bubble ── */}
        <AnimatePresence>
          {vCursor.show && (
            <motion.div
              className="fixed z-[500] rounded-full pointer-events-none flex items-center justify-center font-mono font-bold"
              style={{
                width: 82,
                height: 82,
                background: "#FF8C00",
                color: "#000000",
                fontSize: 10,
                letterSpacing: ".18em",
                left: vCursor.x,
                top: vCursor.y,
                transform: "translate(-50%,-50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              WATCH
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Overlay system ── */}
        {/* left vignette + dark gradient */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: overlayOp,
            background:
              "linear-gradient(105deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.28) 100%)",
          }}
        />
        {/* bottom fade to site bg */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 h-56 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #000000 0%, transparent 100%)",
          }}
        />
        {/* top fade */}
        <div
          className="absolute top-0 left-0 right-0 z-10 h-28 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #000000 0%, transparent 100%)",
          }}
        />

        {/* ── Gold grid ── */}
        <div className="absolute inset-0 z-10 grid-bg opacity-25 pointer-events-none" />

        {/* ── Floating particles ── */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {PTCLS.map((p, i) => (
            <Particle key={i} {...p} />
          ))}
        </div>

        {/* ── Corner frame accents ── */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            top: 86,
            left: 24,
            width: 44,
            height: 44,
            borderTop: "1.5px solid rgba(255,140,0,0.4)",
            borderLeft: "1.5px solid rgba(255,140,0,0.4)",
          }}
        />
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            bottom: 24,
            right: 24,
            width: 44,
            height: 44,
            borderBottom: "1.5px solid rgba(255,140,0,0.4)",
            borderRight: "1.5px solid rgba(255,140,0,0.4)",
          }}
        />

        {/* ── Hero content ── */}
        <motion.div
          className="relative z-20 flex flex-col justify-center h-full max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-10 pt-24 pb-6"
          style={{ y: heroTY, opacity: heroOp }}
        >
          {/* Badge */}
          <div
            className="h-badge inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-2 self-start"
            style={{
              border: "1px solid rgba(255,140,0,0.3)",
              background: "rgba(255,140,0,0.07)",
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              opacity: 0,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="ping-anim absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: "#FF8C00" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "#FF8C00" }}
              />
            </span>
            <span
              className="font-mono font-medium tracking-[0.22em] uppercase"
              style={{ fontSize: 10, color: "#FF8C00" }}
            >
              Nigeria&apos;s Publishing Web Specialists
            </span>
          </div>

          {/* Headline */}
          <div style={{ perspective: "1100px", paddingBottom: 8 }}>
            <h1
              className="font-display font-bold text-white"
              style={{
                fontSize: "clamp(2.4rem,8vw,9.5rem)",
                letterSpacing: "-.03em",
                lineHeight: 1.0,
              }}
            >
              {/* Line 1: Hello, Welcome to */}
              <span className="block pb-2 pt-[7rem]">
                {["Hello,", "Welcome", "to"].map((w, i) => (
                  <span
                    key={i}
                    className="h-word inline-block mr-[0.2em]"
                    style={{ opacity: 0 }}
                  >
                    {w}
                  </span>
                ))}
              </span>

              {/* Line 2: BlackQuill — shimmer */}
              <span className="block pb-2">
                <span
                  className="h-word inline-block shimmer-text"
                  style={{ opacity: 0 }}
                >
                  BlackQuill
                </span>
              </span>

              {/* Line 3: Digital Agency — muted italic */}
              <span className="block pb-1">
                <span
                  className="h-word inline-block"
                  style={{
                    opacity: 0,
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "clamp(1.1rem,3vw,4.8rem)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    letterSpacing: "-.01em",
                  }}
                >
                  Digital Agency
                </span>
              </span>
            </h1>
          </div>

          {/* Gold rule */}
          <div
            className="h-rule h-[2px] w-28 mt-8 mb-7"
            style={{
              background:
                "linear-gradient(90deg,#FF8C00,rgba(255,140,0,0.15))",
              opacity: 0,
            }}
          />

          {/* Subheadline */}
          <p
            className="h-sub font-light leading-relaxed max-w-[440px] mb-6 sm:mb-10"
            style={{
              fontSize: "clamp(0.97rem,1.5vw,1.12rem)",
              lineHeight: 1.86,
              color: "rgba(255,255,255,0.5)",
              opacity: 0,
            }}
          >
            Nigeria&apos;s{" "}
            <em
              style={{
                color: "rgba(255,255,255,0.82)",
                fontStyle: "normal",
                fontWeight: 500,
              }}
            >
              only agency
            </em>{" "}
            dedicated to bespoke websites and e-commerce for authors, publishers
            and literary organisations — based in Nigeria, serving a global
            client base.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
            <Mag
              to="/contact"
              className="h-cta btn-gold"
              style={{ opacity: 0, fontSize: 13 }}
            >
              Start your project →
            </Mag>
            <Mag
              to="/projects"
              className="h-cta btn-outline"
              style={{ opacity: 0, fontSize: 13 }}
            >
              See our work
            </Mag>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 pt-6 mt-2"
            style={{ borderTop: "1px solid rgba(255,140,0,0.14)" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="h-stat pr-6 py-3 border-r last:border-r-0"
                style={{ borderColor: "rgba(255,140,0,0.1)", opacity: 0 }}
              >
                <div
                  className="font-display font-bold italic"
                  style={{
                    fontSize: "clamp(1.7rem,3.2vw,2.5rem)",
                    letterSpacing: "-.04em",
                    color: "#FF8C00",
                    lineHeight: 1,
                  }}
                >
                  <Counter
                    target={s.num}
                    prefix={s.prefix || ""}
                    suffix={s.suffix}
                  />
                </div>
                <div
                  className="font-mono mt-1.5"
                  style={{
                    fontSize: 9,
                    letterSpacing: ".17em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.26)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Animated scroll cue */}
        <div
          className="h-scroll absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "rgba(255,140,0,0.45)",
            }}
          >
            Scroll
          </span>
          <motion.div
            style={{
              width: 1,
              height: 52,
              background: "linear-gradient(to bottom,#FF8C00,transparent)",
              transformOrigin: "top",
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* ╔═══════════════════════════════════════════╗
          ║  02  ABOUT — visual card + prose          ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="relative py-32 px-6 lg:px-10 overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* large ghost text */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 flex items-center font-display font-bold select-none pointer-events-none overflow-hidden"
          style={{
            fontSize: "clamp(14rem,24vw,28rem)",
            color: "rgba(255,140,0,0.025)",
            lineHeight: 1,
            letterSpacing: "-.04em",
            paddingRight: "2%",
          }}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Ink
        </motion.div>

        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          {/* Visual card block */}
          <Reveal from="right" className="relative">
            <motion.div
              className="relative rounded-sm overflow-hidden"
              style={{
                aspectRatio: "3/4",
                maxHeight: 540,
                background: "linear-gradient(140deg,#000000,#000000)",
                border: "1px solid rgba(255,140,0,0.14)",
              }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.55 }}
            >
              <div className="absolute inset-0 grid-bg opacity-35" />
              {/* About video background */}
              <video
                autoPlay
                muted
                loop
                playsInline
                onCanPlay={() => setVid4Loaded(true)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "saturate(0.4) contrast(1.1)" }}
              >
                <source src={vi4} type="video/mp4" />
              </video>
              {!vid4Loaded && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(140deg,#000000,#000000)",
                  }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.55)" }}
              />
              {/* vertical decorative lines */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${15 + i * 14}%`,
                    width: 1,
                    background: "rgba(255,140,0,0.07)",
                    transformOrigin: "top",
                  }}
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 4 + i * 0.6,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 p-10 z-10">
                {/* Quill SVG */}
                <motion.svg
                  width="64"
                  height="64"
                  viewBox="0 0 60 60"
                  fill="none"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M50 4C50 4 30 18 18 42L14 52L24 48C42 36 56 16 50 4Z"
                    fill="none"
                    stroke="#FF8C00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 42C18 42 24 36 30 33"
                    stroke="#FF8C00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
                <div className="text-center">
                  <div
                    className="font-display font-bold text-white text-3xl mb-1"
                    style={{ letterSpacing: "-.03em" }}
                  >
                    BlackQuill
                  </div>
                  <div
                    className="font-mono tracking-[0.26em] uppercase"
                    style={{ fontSize: 10, color: "#FF8C00" }}
                  >
                    Digital Agency
                  </div>
                </div>
                <div
                  className="h-[1px] w-16"
                  style={{ background: "rgba(255,140,0,0.38)" }}
                />
                <div
                  className="font-mono text-center tracking-widest uppercase leading-loose"
                  style={{ fontSize: 10, color: "rgba(255,140,0,0.48)" }}
                >
                  Nigeria&apos;s Only
                  <br />
                  Publishing-Dedicated
                  <br />
                  Digital Agency
                </div>
              </div>

              {/* corner frames */}
              <div
                className="absolute top-5 left-5"
                style={{
                  width: 26,
                  height: 26,
                  borderTop: "1px solid rgba(255,140,0,0.38)",
                  borderLeft: "1px solid rgba(255,140,0,0.38)",
                }}
              />
              <div
                className="absolute bottom-5 right-5"
                style={{
                  width: 26,
                  height: 26,
                  borderBottom: "1px solid rgba(255,140,0,0.38)",
                  borderRight: "1px solid rgba(255,140,0,0.38)",
                }}
              />
            </motion.div>

            {/* Stat badge */}
            <motion.div
              className="absolute -bottom-7 -right-4 lg:-right-10 p-5 z-20"
              style={{ background: "#FF8C00", borderRadius: 2 }}
              initial={{ opacity: 0, y: 28, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="font-display font-bold italic text-ink"
                style={{
                  fontSize: "2.3rem",
                  letterSpacing: "-.04em",
                  lineHeight: 1,
                }}
              >
                50+
              </div>
              <div
                className="font-mono tracking-widest uppercase mt-1"
                style={{ fontSize: 9, color: "rgba(0,0,0,0.58)" }}
              >
                Happy clients
              </div>
            </motion.div>

            {/* Award badge */}
            <motion.div
              className="absolute -top-5 -right-3 lg:-right-8 flex items-center gap-3 p-4 z-20"
              style={{
                background: "rgba(0,0,0,0.94)",
                border: "1px solid rgba(255,140,0,0.28)",
                borderRadius: 2,
                backdropFilter: "blur(14px)",
              }}
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: 0.72,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span style={{ fontSize: 22 }}>🏆</span>
              <div>
                <div
                  className="font-mono tracking-widest uppercase"
                  style={{ fontSize: 9, color: "#FF8C00" }}
                >
                  Partner
                </div>
                <div
                  className="text-white text-xs font-semibold"
                  style={{ fontFamily: "DM Sans,sans-serif" }}
                >
                  Africa Laureate Awards
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Text */}
          <Reveal from="left">
            <span className="tag mb-3">Who We Are</span>
            <div
              className="h-[1px] w-12 mt-3 mb-7"
              style={{ background: "rgba(255,140,0,0.4)" }}
            />
            <h2 className="h-xl text-white mb-7" style={{ lineHeight: 0.94 }}>
              <Words text="The only agency built" className="block" delay={0} />
              <span className="block mt-1">
                <Words text="for the" delay={0.3} />{" "}
                <motion.em
                  style={{ color: "#FF8C00", fontStyle: "italic" }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.58,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  publishing world.
                </motion.em>
              </span>
            </h2>

            {[
              "BlackQuill Digital Agency is Nigeria's only agency dedicated to delivering bespoke website and e-commerce projects for authors, publishers, and literary organisations.",
              "Our extensive experience — coupled with active participation in industry events like The Africa Laureate Awards — ensures we have a deep understanding of our clients' unique needs. We move beyond the basics and focus on your strategic objectives.",
            ].map((p, i) => (
              <motion.p
                key={i}
                className="text-white/42 leading-relaxed mb-5 max-w-md font-light"
                style={{ fontSize: "1.04rem", lineHeight: 1.86 }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.28 + i * 0.14 }}
              >
                {p}
              </motion.p>
            ))}

            <div className="flex flex-wrap gap-4 mt-8">
              <Mag to="/about" className="btn-gold inline-flex">
                Meet the team →
              </Mag>
              <Mag to="/services" className="btn-outline inline-flex">
                Our services
              </Mag>
            </div>

            <div
              className="grid grid-cols-3 gap-3 mt-10 pt-10"
              style={{ borderTop: "1px solid rgba(255,140,0,0.1)" }}
            >
              {[
                { icon: "✍", label: "Authors" },
                { icon: "📚", label: "Publishers" },
                { icon: "🏛️", label: "Literary Orgs" },
              ].map((p) => (
                <div key={p.label} className="text-center">
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{p.icon}</div>
                  <div
                    className="font-mono tracking-widest uppercase"
                    style={{ fontSize: 9, color: "rgba(255,140,0,0.48)" }}
                  >
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  03  WHY AN AUTHOR NEEDS A WEBSITE        ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="py-28 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* Why section video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVid5Loaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.15) brightness(0.18)", zIndex: 0 }}
        >
          <source src={vi5} type="video/mp4" />
        </video>
        {!vid5Loaded && (
          <div
            className="absolute inset-0"
            style={{ background: "#000000", zIndex: 0 }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.75)", zIndex: 0 }}
        />
        {/* diagonal background rules */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${8 + i * 14}%`,
                width: 1,
                background: `linear-gradient(to bottom,transparent,rgba(255,140,0,${0.04 + i * 0.01}),transparent)`,
                transform: "rotate(6deg)",
                transformOrigin: "top",
              }}
              animate={{ y: ["-6%", "6%", "-6%"] }}
              transition={{
                duration: 9 + i * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.55,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <Reveal className="mb-16">
            <span className="tag mb-3">For Authors</span>
            <div
              className="h-[1px] w-12 mt-3 mb-6"
              style={{ background: "rgba(255,140,0,0.4)" }}
            />
            <h2 className="h-xl text-white max-w-2xl">
              <Words text="Why does an author need" />{" "}
              <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
                a website?
              </em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_AUTHOR.map((w, i) => (
              <motion.div
                key={w.num}
                className="card p-9 relative overflow-hidden group"
                initial={{ opacity: 0, y: 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -7, transition: { duration: 0.3 } }}
              >
                {/* ghost number */}
                <div
                  className="absolute top-4 right-6 font-display font-bold italic pointer-events-none select-none"
                  style={{
                    fontSize: "6rem",
                    color: "rgba(255,140,0,0.06)",
                    lineHeight: 1,
                    letterSpacing: "-.04em",
                  }}
                >
                  {w.num}
                </div>

                {/* hover glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background:
                      "radial-gradient(ellipse at 25% 25%, rgba(255,140,0,0.09) 0%, transparent 70%)",
                  }}
                />

                <div
                  className="font-mono tracking-widest uppercase mb-4 relative z-10"
                  style={{ fontSize: 10, color: "rgba(255,140,0,0.44)" }}
                >
                  {w.num}
                </div>
                <div
                  className="h-[1px] w-8 mb-5 relative z-10"
                  style={{ background: "rgba(255,140,0,0.32)" }}
                />
                <h3
                  className="font-display font-bold text-white text-xl mb-3 relative z-10"
                  style={{ letterSpacing: "-.02em" }}
                >
                  {w.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed relative z-10">
                  {w.desc}
                </p>

                {/* bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ background: "#FF8C00" }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  04  HORIZONTAL SCROLL — SERVICES         ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        ref={pinRef}
        className="relative overflow-hidden"
        style={{ background: "#000000", height: "100vh" }}
      >
        {/* labels */}
        <div className="absolute top-8 left-6 lg:left-10 z-20">
          <span className="tag">How We Help</span>
        </div>
        <div
          className="absolute top-8 right-6 lg:right-10 z-20 font-mono tracking-widest uppercase"
          style={{ fontSize: 9, color: "rgba(255,140,0,0.3)" }}
        >
          ← Scroll to explore →
        </div>

        {/* horizontal strip */}
        <div
          ref={panelRef}
          className="flex h-full items-center"
          style={{ width: `${SERVICES.length * 88}vw` }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className="srv-panel flex-shrink-0 flex items-center justify-center px-8 lg:px-14"
              style={{ width: "84vw", maxWidth: 860 }}
            >
              <motion.div
                className="srv-inner relative w-full card p-10 lg:p-14"
                whileHover={{ borderColor: "rgba(255,140,0,0.42)" }}
                transition={{ duration: 0.3 }}
              >
                {/* big ghost num */}
                <div
                  className="absolute top-5 right-8 font-display font-bold italic pointer-events-none select-none"
                  style={{
                    fontSize: "clamp(5rem,11vw,10rem)",
                    color: "rgba(255,140,0,0.045)",
                    letterSpacing: "-.04em",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>

                <div className="relative z-10">
                  <span className="tag mb-3">{s.tag}</span>
                  <div
                    className="h-[1px] w-12 mt-3 mb-6"
                    style={{ background: "rgba(255,140,0,0.38)" }}
                  />
                  <h3
                    className="font-display font-bold text-white mb-5"
                    style={{
                      fontSize: "clamp(2rem,4vw,3.6rem)",
                      letterSpacing: "-.03em",
                      lineHeight: 0.94,
                    }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="text-white/44 leading-relaxed mb-8 max-w-lg font-light"
                    style={{ fontSize: "1rem", lineHeight: 1.82 }}
                  >
                    {s.desc}
                  </p>
                  <ul className="flex flex-wrap gap-2 mb-8">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="font-mono tracking-wide px-3 py-1.5 rounded-sm"
                        style={{
                          fontSize: 10,
                          background: "rgba(255,140,0,0.07)",
                          border: "1px solid rgba(255,140,0,0.14)",
                          color: "rgba(255,140,0,0.68)",
                        }}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Mag
                    to="/services"
                    className="btn-gold inline-flex"
                    style={{ fontSize: 12 }}
                  >
                    Learn more →
                  </Mag>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,140,0,0.28),transparent)",
          }}
        />
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  05  FULL-WIDTH VIDEO QUOTE               ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 pt-24 pb-12">
          <Reveal>
            <span className="tag mb-3">Our Story</span>
            <div
              className="h-[1px] w-12 mt-3 mb-6"
              style={{ background: "rgba(255,140,0,0.4)" }}
            />
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="h-xl text-white">
                <Words text="Built by people who" />
                <span className="block mt-1">
                  <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
                    love books.
                  </em>
                </span>
              </h2>
              <p
                className="text-white/36 text-base leading-relaxed max-w-sm font-light"
                style={{ lineHeight: 1.82 }}
              >
                We participate in Africa&apos;s most prestigious literary events
                because this industry is our passion — not just our business.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Cinematic video strip */}
        {/* Cinematic video strip */}
        <motion.div
          className="relative overflow-hidden"
          style={{ height: "clamp(280px,46vw,560px)" }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVid2Loaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.55) contrast(1.12)" }}
          >
            <source src={vi2} type="video/mp4" />
          </video>

          {/* fallback — only shows if video fails to load */}
          {!vid2Loaded && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#0f0c08,#1a1408,#0d0d0a)",
              }}
            >
              <motion.svg
                width="90"
                height="90"
                viewBox="0 0 60 60"
                fill="none"
                className="opacity-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <path
                  d="M50 4C50 4 30 18 18 42L14 52L24 48C42 36 56 16 50 4Z"
                  fill="none"
                  stroke="#FF8C00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </div>
          )}

          {/* dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(8,8,8,0.35)" }}
          />
          {/* sides */}
          <div
            className="absolute inset-y-0 left-0 w-28"
            style={{
              background: "linear-gradient(to right,#000000,transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-28"
            style={{
              background: "linear-gradient(to left,#000000,transparent)",
            }}
          />

          {/* Quote centred */}
          <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
            <motion.div
              className="text-center max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.38 }}
            >
              <div
                className="font-display font-bold italic text-white mb-4"
                style={{
                  fontSize: "clamp(1.5rem,4vw,4rem)",
                  letterSpacing: "-.02em",
                  textShadow: "0 6px 50px rgba(0,0,0,0.7)",
                  lineHeight: 1.1,
                }}
              >
                &ldquo;In the words of Tina Turner,
                <br />
                you are simply the best.&rdquo;
              </div>
              <div
                className="font-mono tracking-widest uppercase"
                style={{ fontSize: 11, color: "rgba(255,140,0,0.75)" }}
              >
                — Ayodeji Ajagbe, International Bestselling Author
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="pb-24" />
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  06  PROJECTS — offset masonry            ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="py-28 px-6 lg:px-10"
        style={{ background: "#000000" }}
      >
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <div>
              <span className="tag mb-3">Our Work</span>
              <div
                className="h-[1px] w-12 mt-3 mb-6"
                style={{ background: "rgba(255,140,0,0.4)" }}
              />
              <h2 className="h-xl text-white">
                <Words text="We're proud of our" />
                <span className="block mt-1">
                  <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
                    body of work.
                  </em>
                </span>
              </h2>
              <p className="text-white/36 text-sm leading-relaxed mt-4 max-w-xs font-light">
                Here are some of our new and notable projects.
              </p>
            </div>
            <Mag
              to="/projects"
              className="btn-outline"
              style={{ fontSize: 12 }}
            >
              View all work →
            </Mag>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                style={{ marginTop: i % 2 === 1 ? 48 : 0 }}
                initial={{ opacity: 0, y: 72 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  07  GOLD STATS BAND                      ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="relative py-20 px-6 lg:px-10 overflow-hidden"
        style={{ background: "#FF8C00" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-y-0 pointer-events-none"
            style={{
              left: `${i * 12}%`,
              width: 1,
              background: "rgba(0,0,0,0.05)",
            }}
          />
        ))}
        <div className="max-w-[1300px] mx-auto relative z-10">
          <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-black/15">
            {[
              { stat: "#1", label: "Publishing agency in Nigeria" },
              { stat: "50+", label: "Authors & publishers served" },
              { stat: "24hr", label: "Support response guarantee" },
              { stat: "Global", label: "Nigeria-based, worldwide reach" },
            ].map((r, i) => (
              <motion.div
                key={i}
                className="lg:px-10"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.22 }}
              >
                <div
                  className="font-display font-bold italic text-ink"
                  style={{
                    fontSize: "clamp(2.4rem,5vw,4rem)",
                    letterSpacing: "-.04em",
                    lineHeight: 1,
                  }}
                >
                  {r.stat}
                </div>
                <p
                  className="font-mono mt-2"
                  style={{
                    fontSize: 11,
                    color: "rgba(0,0,0,0.52)",
                    lineHeight: 1.5,
                  }}
                >
                  {r.label}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  08  SERVICES ACCORDION                   ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="py-28 px-6 lg:px-10"
        style={{ background: "#000000" }}
      >
        <div className="max-w-[1300px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <span className="tag mb-3">In Detail</span>
              <div
                className="h-[1px] w-12 mt-3 mb-6"
                style={{ background: "rgba(255,140,0,0.4)" }}
              />
              <h2 className="h-xl text-white">
                How BlackQuill
                <br />
                <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
                  can help you
                </em>
              </h2>
            </div>
            <Mag
              to="/services"
              className="btn-outline"
              style={{ fontSize: 12 }}
            >
              All services →
            </Mag>
          </Reveal>
          <Reveal>
            <div style={{ borderTop: "1px solid rgba(255,140,0,0.1)" }}>
              {SERVICES.map((s) => (
                <AccordionItem
                  key={s.id}
                  {...s}
                  isOpen={openAcc === s.id}
                  onToggle={() => setOpenAcc(openAcc === s.id ? null : s.id)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  09  TESTIMONIALS                         ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="py-28 px-6 lg:px-10 relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* Testimonials video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVid6Loaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.1) brightness(0.12)", zIndex: 0 }}
        >
          <source src={vi6} type="video/mp4" />
        </video>
        {!vid6Loaded && (
          <div
            className="absolute inset-0"
            style={{ background: "#000000", zIndex: 0 }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.8)", zIndex: 0 }}
        />
        {/* giant bg quote */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-display font-bold pointer-events-none select-none"
          style={{
            fontSize: "clamp(20rem,38vw,42rem)",
            color: "rgba(255,140,0,0.016)",
            lineHeight: 1,
            letterSpacing: "-.04em",
          }}
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        >
          &ldquo;
        </motion.div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <Reveal className="mb-16">
            <span className="tag mb-3">Client Voices</span>
            <div
              className="h-[1px] w-12 mt-3 mb-6"
              style={{ background: "rgba(255,140,0,0.4)" }}
            />
            <h2 className="h-xl text-white">
              What our clients
              <br />
              <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
                say about us
              </em>
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  10  CINEMATIC VIDEO CTA — full bleed     ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ background: "#000000", minHeight: "62vh" }}
      >
        {/* bg video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.28) brightness(0.28)" }}
          >
            <source src={vi3} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(255,140,0,0.1) 0%, transparent 65%), rgba(7,7,9,0.82)",
            }}
          />
        </div>

        <div className="absolute inset-0 grid-bg opacity-25 z-10" />

        {/* particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {PTCLS.slice(0, 9).map((p, i) => (
            <Particle key={i} {...p} />
          ))}
        </div>

        {/* corner frames */}
        <div
          className="absolute top-8 left-8 z-20"
          style={{
            width: 50,
            height: 50,
            borderTop: "1.5px solid rgba(255,140,0,0.38)",
            borderLeft: "1.5px solid rgba(255,140,0,0.38)",
          }}
        />
        <div
          className="absolute bottom-8 right-8 z-20"
          style={{
            width: 50,
            height: 50,
            borderBottom: "1.5px solid rgba(255,140,0,0.38)",
            borderRight: "1.5px solid rgba(255,140,0,0.38)",
          }}
        />

        <div className="relative z-20 max-w-[1300px] mx-auto px-6 lg:px-10 py-28 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag mb-3 block text-center">Start Today</span>
            <div
              className="h-[1px] w-12 mt-3 mb-9 mx-auto"
              style={{ background: "rgba(255,140,0,0.4)" }}
            />

            <h2
              className="font-display font-bold text-white mb-7"
              style={{
                fontSize: "clamp(2.8rem,7vw,8.5rem)",
                letterSpacing: "-.04em",
                lineHeight: 0.88,
              }}
            >
              Ready to build
              <br />
              <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
                your author platform?
              </em>
            </h2>

            <p
              className="text-white/36 max-w-lg mx-auto mb-12 font-light leading-relaxed"
              style={{
                fontSize: "clamp(0.95rem,1.4vw,1.1rem)",
                lineHeight: 1.87,
              }}
            >
              Tell us about your project. We&apos;ll respond within 24 hours
              with ideas tailored to the publishing world — no pressure, no
              generic templates.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-14">
              <Mag
                to="/contact"
                className="btn-gold"
                style={{ fontSize: 14, padding: "16px 44px" }}
              >
                Start your project →
              </Mag>
              <Mag
                to="/pricing"
                className="btn-outline"
                style={{ fontSize: 14, padding: "15px 44px" }}
              >
                View pricing
              </Mag>
            </div>

            {/* trust signals */}
            <div
              className="flex flex-wrap items-center justify-center gap-8 pt-10"
              style={{ borderTop: "1px solid rgba(255,140,0,0.1)" }}
            >
              {[
                "✦  No templates — 100% bespoke",
                "✦  Responds within 24 hours",
                "✦  Nigeria-based, globally trusted",
              ].map((t) => (
                <span
                  key={t}
                  className="font-mono tracking-widest uppercase"
                  style={{ fontSize: 9, color: "rgba(255,140,0,0.45)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
