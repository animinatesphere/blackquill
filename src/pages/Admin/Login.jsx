import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { adminLogin, adminMe, ApiError } from "../../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    adminMe()
      .then(() => navigate("/admin", { replace: true }))
      .catch(() => setChecking(false));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (checking) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255,140,0,0.07) 0%, transparent 60%), #000000",
        cursor: "auto",
      }}
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full"
        style={{ maxWidth: 400 }}
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M22 2C22 2 14 8 8 18L6 22L10 20C18 14 24 6 22 2Z"
              fill="none"
              stroke="#FF8C00"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8 18C8 18 10 16 12 15" stroke="#FF8C00" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-display font-bold text-white" style={{ fontSize: "1.4rem", letterSpacing: "-.02em" }}>
            Black<span style={{ color: "#FF8C00" }}>Quill</span>
          </span>
        </div>

        <div className="card p-8 sm:p-10">
          <span className="tag mb-2 block text-center">Admin</span>
          <h1
            className="font-display font-bold text-white text-center mb-8"
            style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-.02em" }}
          >
            Sign in to dashboard
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <label
                className="font-mono text-[10px] tracking-widest uppercase block mb-2"
                style={{ color: "rgba(255,140,0,0.5)" }}
              >
                Password
              </label>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: error ? "1px solid rgba(255,80,80,0.5)" : "1px solid rgba(255,140,0,0.15)",
                  borderRadius: 2,
                  padding: "14px 16px",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontFamily: "DM Sans, sans-serif",
                  outline: "none",
                }}
              />
              {error && (
                <p className="text-xs mt-2" style={{ color: "rgba(255,100,100,0.8)" }}>
                  {error}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn-gold w-full justify-center py-4"
              style={{ fontSize: 13, letterSpacing: ".06em" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in →"}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          BlackQuill internal dashboard — authorised staff only
        </p>
      </motion.div>
    </div>
  );
}
