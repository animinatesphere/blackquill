import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { adminMe, fetchPricing, updatePricing, ApiError } from "../../lib/api";
import { formatNaira, formatUsd } from "../../lib/currency";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,140,0,0.15)",
  borderRadius: 2,
  padding: "10px 12px",
  color: "#FFFFFF",
  fontSize: 13,
  fontFamily: "DM Sans, sans-serif",
  outline: "none",
};

const fieldLabel = {
  fontFamily: "DM Mono, monospace",
  fontSize: 9,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(255,140,0,0.5)",
  display: "block",
  marginBottom: 6,
};

let addonSeq = 0;

export default function AdminPricing() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [pricing, setPricing] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'ok' | 'err', text }

  useEffect(() => {
    adminMe()
      .then(() => setChecking(false))
      .catch(() => navigate("/admin/login", { replace: true }));
  }, [navigate]);

  useEffect(() => {
    if (checking) return;
    fetchPricing()
      .then(setPricing)
      .catch(() => setLoadError("Couldn't load pricing data."));
  }, [checking]);

  const updatePlan = (id, field, value) => {
    setPricing((p) => ({
      ...p,
      plans: p.plans.map((pl) => (pl.id === id ? { ...pl, [field]: value } : pl)),
    }));
  };

  const setFeatured = (id) => {
    setPricing((p) => ({
      ...p,
      plans: p.plans.map((pl) => ({ ...pl, featured: pl.id === id })),
    }));
  };

  const updateAddon = (id, field, value) => {
    setPricing((p) => ({
      ...p,
      addons: p.addons.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const addAddon = () => {
    setPricing((p) => ({
      ...p,
      addons: [
        ...p.addons,
        { id: `addon-${Date.now()}-${addonSeq++}`, label: "New add-on", amountNGN: 0, prefix: "", suffix: "" },
      ],
    }));
  };

  const removeAddon = (id) => {
    setPricing((p) => ({ ...p, addons: p.addons.filter((a) => a.id !== id) }));
  };

  const parseAmount = (raw) => {
    if (raw === "" || raw === null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const saved = await updatePricing(pricing);
      setPricing(saved);
      setMessage({ type: "ok", text: "Pricing updated — the public pricing page reflects this immediately." });
    } catch (err) {
      setMessage({ type: "err", text: err instanceof ApiError ? err.message : "Save failed." });
    } finally {
      setSaving(false);
    }
  };

  if (checking) return null;

  return (
    <div className="min-h-screen" style={{ background: "#000000", cursor: "auto" }}>
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20 fixed" />

      <header
        className="sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-4 flex-wrap"
        style={{ background: "rgba(0,0,0,0.96)", borderBottom: "1px solid rgba(255,140,0,0.12)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-4">
          <Link to="/admin" className="font-mono text-[11px] tracking-widest uppercase" style={{ color: "rgba(255,140,0,0.6)" }}>
            ← Dashboard
          </Link>
          <span className="font-display font-bold text-white" style={{ fontSize: "1.05rem", letterSpacing: "-.02em" }}>
            Pricing
          </span>
        </div>
        <motion.button
          onClick={handleSave}
          disabled={saving || !pricing}
          className="btn-gold"
          style={{ fontSize: 11, padding: "10px 22px" }}
          whileTap={{ scale: 0.97 }}
        >
          {saving ? "Saving…" : "Save changes"}
        </motion.button>
      </header>

      <main className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1000px] mx-auto">
        {loadError && (
          <p className="font-mono text-xs mb-6" style={{ color: "rgba(255,100,100,0.7)" }}>{loadError}</p>
        )}

        {message && (
          <div
            className="px-4 py-3 rounded-sm text-sm mb-6"
            style={{
              background: message.type === "ok" ? "rgba(74,222,128,0.08)" : "rgba(255,80,80,0.08)",
              border: `1px solid ${message.type === "ok" ? "rgba(74,222,128,0.3)" : "rgba(255,80,80,0.3)"}`,
              color: message.type === "ok" ? "#4ADE80" : "rgba(255,140,140,0.9)",
            }}
          >
            {message.text}
          </div>
        )}

        {!pricing ? (
          <p className="font-mono text-xs" style={{ color: "rgba(255,140,0,0.4)" }}>Loading…</p>
        ) : (
          <div className="flex flex-col gap-10">
            {/* ── USD rate ── */}
            <section className="card p-6">
              <span className="tag mb-3 block">Exchange Rate</span>
              <p className="text-white/35 text-xs mb-4 leading-relaxed">
                Set manually — this isn't pulled live from a currency API. Update it whenever the rate moves enough to matter.
                Used to compute the USD price shown next to every ₦ price on the public pricing page.
              </p>
              <div style={{ maxWidth: 240 }}>
                <label style={fieldLabel}>₦ per $1 USD</label>
                <input
                  type="number"
                  min="1"
                  value={pricing.usdRate}
                  onChange={(e) => setPricing((p) => ({ ...p, usdRate: Number(e.target.value) || 0 }))}
                  style={inputStyle}
                />
              </div>
            </section>

            {/* ── Plans ── */}
            <section>
              <span className="tag mb-4 block">Plans</span>
              <div className="flex flex-col gap-4">
                {pricing.plans.map((plan) => (
                  <div key={plan.id} className="card p-6">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label style={fieldLabel}>Name</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => updatePlan(plan.id, "name", e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={fieldLabel}>Price (₦)</label>
                        <input
                          type="number"
                          min="0"
                          value={plan.amountNGN ?? ""}
                          onChange={(e) => updatePlan(plan.id, "amountNGN", parseAmount(e.target.value))}
                          style={inputStyle}
                        />
                        <p className="font-mono text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {formatNaira(plan.amountNGN)}
                          {formatUsd(plan.amountNGN, pricing.usdRate) && ` ≈ ${formatUsd(plan.amountNGN, pricing.usdRate)} USD`}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label style={fieldLabel}>Tagline</label>
                      <input
                        type="text"
                        value={plan.tagline}
                        onChange={(e) => updatePlan(plan.id, "tagline", e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label style={fieldLabel}>Button text</label>
                        <input
                          type="text"
                          value={plan.cta}
                          onChange={(e) => updatePlan(plan.id, "cta", e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer" style={{ marginTop: 20 }}>
                        <input
                          type="radio"
                          name="featured-plan"
                          checked={!!plan.featured}
                          onChange={() => setFeatured(plan.id)}
                        />
                        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,140,0,0.6)" }}>
                          Most popular
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Add-ons ── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <span className="tag block">Add-Ons</span>
                <button onClick={addAddon} className="btn-outline" style={{ fontSize: 10, padding: "8px 16px" }}>
                  + Add row
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {pricing.addons.map((a) => (
                  <div key={a.id} className="card p-4 sm:p-5">
                    <div className="grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-end">
                      <div>
                        <label style={fieldLabel}>Label</label>
                        <input type="text" value={a.label} onChange={(e) => updateAddon(a.id, "label", e.target.value)} style={inputStyle} />
                      </div>
                      <div>
                        <label style={fieldLabel}>Price (₦, blank = POA)</label>
                        <input
                          type="number"
                          min="0"
                          value={a.amountNGN ?? ""}
                          onChange={(e) => updateAddon(a.id, "amountNGN", parseAmount(e.target.value))}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={fieldLabel}>Prefix</label>
                        <input type="text" placeholder="From " value={a.prefix || ""} onChange={(e) => updateAddon(a.id, "prefix", e.target.value)} style={inputStyle} />
                      </div>
                      <div>
                        <label style={fieldLabel}>Suffix</label>
                        <input type="text" placeholder=" / yr" value={a.suffix || ""} onChange={(e) => updateAddon(a.id, "suffix", e.target.value)} style={inputStyle} />
                      </div>
                      <button
                        onClick={() => removeAddon(a.id)}
                        className="font-mono text-[10px] tracking-widest uppercase h-fit py-2.5"
                        style={{ color: "rgba(255,100,100,0.7)" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {pricing.addons.length === 0 && (
                  <p className="font-mono text-xs" style={{ color: "rgba(255,140,0,0.35)" }}>No add-ons yet.</p>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
