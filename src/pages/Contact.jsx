import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { PageTransition, Ticker, Reveal, StaggerReveal } from "../components";

const SERVICES_LIST = [
  "Website Design & Build",
  "Branding & Design",
  "E-Commerce Integration",
  "Training & Support",
  "Full Package",
  "Not sure yet",
];

const BUDGETS = [
  "Basic — ₦117,000",
  "Hybrid — ₦150,000",
  "Premium — ₦250,000",
  "Add-ons / Extras",
  "Let's discuss",
];

export default function Contact() {
  const heroRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  /* GSAP hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ct-line",
        { opacity: 0, y: 48, skewY: 1.5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          stagger: 0.13,
          ease: "power4.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        ".ct-deco",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.3, ease: "power3.out", delay: 0.5 },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1800);
  };

  const inputBase = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: 2,
    padding: "14px 16px",
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "DM Sans, sans-serif",
    outline: "none",
    transition: "border-color 0.25s, background 0.25s",
  };
  const focusStyle = {
    borderColor: "rgba(255,140,0,0.55)",
    background: "rgba(255,140,0,0.04)",
  };
  const errStyle = { borderColor: "rgba(255,80,80,0.5)" };

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-16 px-6 lg:px-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 60%, rgba(255,140,0,0.06) 0%, transparent 60%), #000000",
        }}
      >
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

        {/* decorative large quill */}
        <div
          className="absolute right-0 lg:right-16 top-20 pointer-events-none select-none"
          style={{
            fontSize: "clamp(10rem,22vw,24rem)",
            color: "rgba(255,140,0,0.03)",
            lineHeight: 1,
          }}
        >
          ✍
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="ct-line" style={{ opacity: 0 }}>
            <span className="tag">Contact Us</span>
          </div>
          <div
            className="ct-deco h-[1.5px] w-16 mt-4 mb-6"
            style={{ background: "rgba(255,140,0,0.45)", opacity: 0 }}
          />
          <h1
            className="h-display text-white ct-line mb-5"
            style={{ opacity: 0 }}
          >
            Let's build
            <br />
            <em style={{ color: "#FF8C00", fontStyle: "italic" }}>
              something together.
            </em>
          </h1>
          <p
            className="text-white/40 text-lg leading-relaxed max-w-lg ct-line font-light"
            style={{ opacity: 0, lineHeight: 1.8 }}
          >
            Tell us about your project. We respond to every enquiry within 24
            hours — with ideas, not just a quote.
          </p>
        </div>
      </section>

      <Ticker />

      {/* ── MAIN CONTENT ── */}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ background: "#000000" }}
      >
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">
          {/* ── FORM ── */}
          <Reveal from="right">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div className="mb-2">
                    <span className="tag mb-2">Start the conversation</span>
                    <div
                      className="h-[1px] w-12 mt-3"
                      style={{ background: "rgba(255,140,0,0.4)" }}
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="font-mono text-[10px] tracking-widest uppercase block mb-2"
                        style={{ color: "rgba(201,168,76,0.5)" }}
                      >
                        Your name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ayodeji Ajagbe"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        style={{
                          ...inputBase,
                          ...(errors.name ? errStyle : {}),
                        }}
                        onFocus={(e) =>
                          Object.assign(e.target.style, focusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.name
                            ? "rgba(255,80,80,0.5)"
                            : "rgba(201,168,76,0.15)";
                          e.target.style.background = "rgba(255,255,255,0.03)";
                        }}
                      />
                      {errors.name && (
                        <p
                          className="text-xs mt-1.5"
                          style={{ color: "rgba(255,100,100,0.8)" }}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="font-mono text-[10px] tracking-widest uppercase block mb-2"
                        style={{ color: "rgba(201,168,76,0.5)" }}
                      >
                        Email address *
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        style={{
                          ...inputBase,
                          ...(errors.email ? errStyle : {}),
                        }}
                        onFocus={(e) =>
                          Object.assign(e.target.style, focusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.email
                            ? "rgba(255,80,80,0.5)"
                            : "rgba(201,168,76,0.15)";
                          e.target.style.background = "rgba(255,255,255,0.03)";
                        }}
                      />
                      {errors.email && (
                        <p
                          className="text-xs mt-1.5"
                          style={{ color: "rgba(255,100,100,0.8)" }}
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-widest uppercase block mb-2"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    >
                      Organisation / Publisher (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Africa Laureate Awards"
                      value={form.organisation}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, organisation: e.target.value }))
                      }
                      style={inputBase}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,140,0,0.15)";
                        e.target.style.background = "rgba(255,255,255,0.03)";
                      }}
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-widest uppercase block mb-3"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    >
                      Service interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_LIST.map((s) => (
                        <motion.button
                          key={s}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, service: s }))}
                          className="px-4 py-2 rounded-sm font-mono text-[10px] tracking-wider uppercase"
                          animate={{
                            background:
                              form.service === s
                                ? "#FF8C00"
                                : "rgba(255,140,0,0.06)",
                            color:
                              form.service === s
                                ? "#000000"
                                : "rgba(255,140,0,0.55)",
                            borderColor:
                              form.service === s
                                ? "#FF8C00"
                                : "rgba(255,140,0,0.15)",
                          }}
                          style={{ border: "1px solid rgba(255,140,0,0.15)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-widest uppercase block mb-3"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    >
                      Budget / Plan
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <motion.button
                          key={b}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, budget: b }))}
                          className="px-4 py-2 rounded-sm font-mono text-[10px] tracking-wider uppercase"
                          animate={{
                            background:
                              form.budget === b
                                ? "#FF8C00"
                                : "rgba(255,140,0,0.06)",
                            color:
                              form.budget === b
                                ? "#000000"
                                : "rgba(255,140,0,0.55)",
                            borderColor:
                              form.budget === b
                                ? "#FF8C00"
                                : "rgba(255,140,0,0.15)",
                          }}
                          style={{ border: "1px solid rgba(255,140,0,0.15)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {b}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="font-mono text-[10px] tracking-widest uppercase block mb-2"
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    >
                      Tell us about your project *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about yourself, your book, your publishing goals, and what you'd like your website to achieve..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      style={{
                        ...inputBase,
                        resize: "none",
                        ...(errors.message ? errStyle : {}),
                      }}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.message
                          ? "rgba(255,80,80,0.5)"
                          : "rgba(255,140,0,0.15)";
                        e.target.style.background = "rgba(255,255,255,0.03)";
                      }}
                    />
                    {errors.message && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "rgba(255,100,100,0.8)" }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="btn-gold w-full justify-center py-4 relative overflow-hidden"
                    style={{ fontSize: 14, letterSpacing: ".06em" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={sending}
                  >
                    <AnimatePresence mode="wait">
                      {sending ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                            className="inline-block w-4 h-4 border-2 rounded-full"
                            style={{
                              borderColor: "#000000",
                              borderTopColor: "transparent",
                            }}
                          />
                          Sending your message...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Send message →
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p
                    className="font-mono text-[10px] tracking-wide text-center"
                    style={{ color: "rgba(201,168,76,0.3)" }}
                  >
                    We respond to every enquiry within 24 hours.
                  </p>
                </motion.form>
              ) : (
                /* ── SUCCESS STATE ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-6 py-16"
                >
                  {/* animated tick */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 240,
                      damping: 18,
                      delay: 0.15,
                    }}
                    className="w-16 h-16 rounded-sm flex items-center justify-center"
                    style={{ background: "#FF8C00" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <motion.path
                        d="M6 14L11.5 19.5L22 9"
                        stroke="#000000"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.4,
                          ease: "easeOut",
                        }}
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <h3
                      className="font-display font-bold text-white mb-3"
                      style={{
                        fontSize: "clamp(1.8rem,4vw,3rem)",
                        letterSpacing: "-.03em",
                        lineHeight: 1,
                      }}
                    >
                      Message received!
                    </h3>
                    <p
                      className="text-white/42 leading-relaxed max-w-md font-light"
                      style={{ fontSize: "1.05rem" }}
                    >
                      Thank you for reaching out. We'll review your project
                      details and get back to you within{" "}
                      <strong className="text-white font-semibold">
                        24 hours
                      </strong>{" "}
                      with our thoughts.
                    </p>
                  </div>
                  <Link to="/" className="btn-outline mt-4">
                    ← Back to home
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>

          {/* ── SIDEBAR ── */}
          <StaggerReveal className="flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Contact details card */}
            <div className="card p-7">
              <div
                className="h-[1px] w-8 mb-5"
                style={{ background: "rgba(255,140,0,0.4)" }}
              />
              <h4
                className="font-display font-bold text-white text-xl mb-5"
                style={{ letterSpacing: "-.02em" }}
              >
                Get in touch directly
              </h4>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:hello@blackquill.ng"
                  className="flex items-center gap-3 text-sm group transition-colors duration-200"
                  style={{ color: "rgba(245,240,232,0.45)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FF8C00")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(245,240,232,0.45)")
                  }
                >
                  <span style={{ color: "#FF8C00", fontSize: 10 }}>✦</span>
                  hello@blackquill.ng
                </a>
                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(245,240,232,0.45)" }}
                >
                  <span style={{ color: "#FF8C00", fontSize: 10 }}>✦</span>
                  Nigeria — serving globally
                </div>
                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(245,240,232,0.45)" }}
                >
                  <span style={{ color: "#FF8C00", fontSize: 10 }}>✦</span>
                  Response within 24 hours
                </div>
              </div>
            </div>

            {/* Why BlackQuill card */}
            <div className="card p-7">
              <div
                className="h-[1px] w-8 mb-5"
                style={{ background: "rgba(255,140,0,0.4)" }}
              />
              <h4
                className="font-display font-bold text-white text-xl mb-5"
                style={{ letterSpacing: "-.02em" }}
              >
                Why BlackQuill?
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  "Nigeria's only publishing-dedicated agency",
                  "Deep industry knowledge of books & publishing",
                  "Custom websites — no templates",
                  "Hands-on training & lifetime support",
                  "Local & international payment gateways",
                  "Active partner of The Africa Laureate Awards",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "rgba(245,240,232,0.42)" }}
                  >
                    <span
                      style={{
                        color: "#FF8C00",
                        fontSize: 9,
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    >
                      ✦
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial snippet */}
            <div
              className="card p-7"
              style={{
                background: "rgba(255,140,0,0.05)",
                borderColor: "rgba(255,140,0,0.2)",
              }}
            >
              <div
                className="font-display text-4xl leading-none mb-4"
                style={{ color: "rgba(255,140,0,0.3)" }}
              >
                &ldquo;
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5 italic font-light">
                "In the words of Tina Turner, you are 'simply the best'."
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ background: "#FF8C00", color: "#000000" }}
                >
                  AA
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    Ayodeji Ajagbe
                  </div>
                  <div
                    className="font-mono text-[10px]"
                    style={{ color: "rgba(255,140,0,0.5)" }}
                  >
                    International Bestselling Author
                  </div>
                </div>
              </div>
            </div>

            {/* View pricing link */}
            <div className="text-center">
              <p
                className="text-sm mb-4"
                style={{ color: "rgba(245,240,232,0.3)" }}
              >
                Not sure which plan is right for you?
              </p>
              <Link
                to="/pricing"
                className="btn-outline w-full justify-center"
                style={{ fontSize: 12 }}
              >
                View pricing plans →
              </Link>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── BOTTOM STRIP ── */}
      <section
        className="py-16 px-6 lg:px-10"
        style={{
          background: "#000000",
          borderTop: "1px solid rgba(255,140,0,0.08)",
        }}
      >
        <div className="max-w-[1300px] mx-auto">
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "✍", label: "Authors", desc: "Debut & established" },
              {
                icon: "📚",
                label: "Publishers",
                desc: "Independent & traditional",
              },
              {
                icon: "🏛️",
                label: "Literary Orgs",
                desc: "Agencies & award bodies",
              },
              {
                icon: "🌍",
                label: "Global Reach",
                desc: "Nigeria-based, worldwide",
              },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{c.icon}</span>
                <div
                  className="font-display font-bold text-white text-base"
                  style={{ letterSpacing: "-.02em" }}
                >
                  {c.label}
                </div>
                <div
                  className="font-mono text-[10px] tracking-wide"
                  style={{ color: "rgba(255,140,0,0.4)" }}
                >
                  {c.desc}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </PageTransition>
  );
}
