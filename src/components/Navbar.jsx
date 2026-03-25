import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import logo from "../assets/IMG-20260323-WA0016.jpg";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".bq-nav",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 },
    );
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="bq-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0,0,0,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(22px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,140,0,0.1)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px] lg:h-[76px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* quill icon */}
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M22 2C22 2 14 8 8 18L6 22L10 20C18 14 24 6 22 2Z"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 18C8 18 10 16 12 15"
                stroke="#C9A84C"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="font-display font-bold text-white"
              style={{ fontSize: "1.4rem", letterSpacing: "-.02em" }}
            >
              Black<span style={{ color: "#C9A84C" }}>Quill</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-sm font-medium transition-colors duration-200 group"
                style={{
                  color:
                    location.pathname === l.to
                      ? "#FF8C00"
                      : "rgba(255,140,0,0.5)",
                }}
              >
                {l.label}
                <span
                  className="absolute left-0 -bottom-0.5 h-[1px] transition-all duration-300"
                  style={{
                    width: location.pathname === l.to ? "100%" : "0%",
                    background: "#FF8C00",
                  }}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="btn-gold hidden lg:inline-flex"
            style={{ padding: "10px 22px", fontSize: "12px" }}
          >
            Let's talk →
          </Link>

          {/* Burger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[1.5px] bg-white rounded-full"
                animate={{
                  width: i === 2 ? (menuOpen ? 24 : 14) : 24,
                  rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.32 }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="ov"
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col pt-24 pb-10 px-8 gap-1 lg:hidden"
            style={{
              width: "min(300px,90vw)",
              background: "#000000",
              borderLeft: "1px solid rgba(255,140,0,0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.055 }}
              >
                <Link
                  to={l.to}
                  className="block font-display font-bold text-white py-4 border-b"
                  style={{
                    fontSize: "clamp(1.5rem,6vw,1.9rem)",
                    letterSpacing: "-.02em",
                    borderColor: "rgba(255,140,0,0.1)",
                    color: location.pathname === l.to ? "#FF8C00" : "#FFFFFF",
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mt-6"
            >
              <Link to="/contact" className="btn-gold w-full justify-center">
                Let's talk →
              </Link>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
