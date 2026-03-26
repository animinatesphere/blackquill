import { Link } from "react-router-dom";
import logo from "../assets/IMG-20260323-WA0016.jpg";
export default function Footer() {
  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(255,140,0,0.12)",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-10 pt-16 pb-0 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3 group">
            {/* quill icon */}
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M22 2C22 2 14 8 8 18L6 22L10 20C18 14 24 6 22 2Z"
                fill="none"
                stroke="#FF8C00"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 18C8 18 10 16 12 15"
                stroke="#FF8C00"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="font-display font-bold text-white"
              style={{ fontSize: "1.4rem", letterSpacing: "-.02em" }}
            >
              Black<span style={{ color: "#FF8C00" }}>Quill</span>
            </span>
          </Link>
          <p className="text-white/30 text-sm leading-relaxed max-w-[260px]">
            Nigeria's only digital agency dedicated to authors, publishers and
            literary organisations. Based in Nigeria, serving a global client
            base.
          </p>
          <div className="flex gap-3 mt-6">
            {["IG", "TW", "LI", "FB"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 flex items-center justify-center text-[10px] font-bold rounded-sm transition-all duration-250"
                style={{
                  border: "1px solid rgba(255,140,0,0.2)",
                  color: "rgba(255,140,0,0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FF8C00";
                  e.currentTarget.style.color = "#FF8C00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,140,0,0.2)";
                  e.currentTarget.style.color = "rgba(255,140,0,0.5)";
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "rgba(255,140,0,0.5)" }}
          >
            Services
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              "Website Design & Build",
              "Branding & Design",
              "E-Commerce",
              "Training & Support",
            ].map((l) => (
              <li key={l}>
                <Link
                  to="/services"
                  className="text-sm transition-colors duration-200 hover:text-gold"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h4
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "rgba(255,140,0,0.5)" }}
          >
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              ["Our Work", "/projects"],
              ["About Us", "/about"],
              ["Pricing", "/pricing"],
              ["Contact", "/contact"],
            ].map(([l, to]) => (
              <li key={l}>
                <Link
                  to={to}
                  className="text-sm transition-colors duration-200 hover:text-gold"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "rgba(255,140,0,0.5)" }}
          >
            Contact
          </h4>
          <ul
            className="flex flex-col gap-3 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <li>
              <a
                href="mailto:hello@blackquill.ng"
                className="hover:text-gold transition-colors"
                style={{ color: "inherit" }}
              >
                hello@blackquill.ng
              </a>
            </li>
            <li>Nigeria — serving globally</li>
            <li className="text-xs" style={{ color: "rgba(255,140,0,0.5)" }}>
              Response within 24 hours
            </li>
          </ul>
          <Link
            to="/contact"
            className="btn-gold inline-flex mt-7"
            style={{ fontSize: "11px", padding: "10px 20px" }}
          >
            Start a project →
          </Link>
        </div>
      </div>

      <hr className="divider max-w-[1300px] mx-auto mt-14" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-10 py-6 flex flex-wrap justify-between items-center gap-3">
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
          © 2025 BlackQuill Digital Agency. All Rights Reserved. Nigeria.
        </span>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.18)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,140,0,0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.18)")
              }
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
