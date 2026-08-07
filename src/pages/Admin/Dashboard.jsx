import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  adminMe,
  adminLogout,
  fetchSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../../lib/api";

const STATUS_FILTERS = ["all", "new", "read", "replied", "archived"];

const STATUS_STYLE = {
  new: { color: "#FF8C00", bg: "rgba(255,140,0,0.1)", label: "New" },
  read: { color: "rgba(255,255,255,0.7)", bg: "rgba(255,255,255,0.06)", label: "Read" },
  replied: { color: "#4ADE80", bg: "rgba(74,222,128,0.1)", label: "Replied" },
  archived: { color: "rgba(255,255,255,0.35)", bg: "rgba(255,255,255,0.03)", label: "Archived" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.new;
  return (
    <span
      className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-sm inline-block shrink-0"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}33` }}
    >
      {s.label}
    </span>
  );
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [actionBusy, setActionBusy] = useState(false);

  useEffect(() => {
    adminMe()
      .then(() => setChecking(false))
      .catch(() => navigate("/admin/login", { replace: true }));
  }, [navigate]);

  const load = useCallback(() => {
    setLoading(true);
    setLoadError("");
    fetchSubmissions({ status: statusFilter, q: search })
      .then((data) => setSubmissions(data.submissions))
      .catch(() => setLoadError("Couldn't load submissions. Retry?"))
      .finally(() => setLoading(false));
  }, [statusFilter, search]);

  useEffect(() => {
    if (checking) return;
    const t = setTimeout(load, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [checking, load, search]);

  const handleLogout = async () => {
    await adminLogout().catch(() => {});
    navigate("/admin/login", { replace: true });
  };

  const handleStatusChange = async (id, status) => {
    setActionBusy(true);
    try {
      await updateSubmissionStatus(id, status);
      setSubmissions((subs) => subs.map((s) => (s.id === id ? { ...s, status } : s)));
      setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    } finally {
      setActionBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    setActionBusy(true);
    try {
      await deleteSubmission(id);
      setSubmissions((subs) => subs.filter((s) => s.id !== id));
      setSelected(null);
    } finally {
      setActionBusy(false);
    }
  };

  const openDetail = (sub) => {
    setSelected(sub);
    if (sub.status === "new") handleStatusChange(sub.id, "read");
  };

  const counts = STATUS_FILTERS.reduce((acc, f) => {
    acc[f] = f === "all" ? submissions.length : submissions.filter((s) => s.status === f).length;
    return acc;
  }, {});

  if (checking) return null;

  return (
    <div className="min-h-screen" style={{ background: "#000000", cursor: "auto" }}>
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20 fixed" />

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-4 flex-wrap"
        style={{ background: "rgba(0,0,0,0.96)", borderBottom: "1px solid rgba(255,140,0,0.12)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
            <path d="M22 2C22 2 14 8 8 18L6 22L10 20C18 14 24 6 22 2Z" fill="none" stroke="#FF8C00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 18C8 18 10 16 12 15" stroke="#FF8C00" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-display font-bold text-white" style={{ fontSize: "1.15rem", letterSpacing: "-.02em" }}>
            Black<span style={{ color: "#FF8C00" }}>Quill</span>
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase ml-1" style={{ color: "rgba(255,140,0,0.4)" }}>
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/pricing" className="btn-outline" style={{ fontSize: 11, padding: "9px 18px" }}>
            Pricing
          </Link>
          <button
            onClick={handleLogout}
            className="btn-outline"
            style={{ fontSize: 11, padding: "9px 18px" }}
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1300px] mx-auto">
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { key: "all", label: "Total enquiries" },
            { key: "new", label: "New" },
            { key: "replied", label: "Replied" },
            { key: "archived", label: "Archived" },
          ].map((s) => (
            <div key={s.key} className="card p-4 sm:p-5">
              <div
                className="font-display font-bold italic"
                style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-.03em", color: "#FF8C00", lineHeight: 1 }}
              >
                {counts[s.key] ?? 0}
              </div>
              <div className="font-mono text-[9px] tracking-widest uppercase mt-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters + search ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          <div className="flex flex-wrap gap-2 flex-1">
            {STATUS_FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setStatusFilter(f)}
                className="px-3.5 py-1.5 rounded-sm font-mono text-[10px] tracking-[0.15em] uppercase"
                animate={{
                  background: statusFilter === f ? "#FF8C00" : "rgba(255,140,0,0.06)",
                  color: statusFilter === f ? "#000000" : "rgba(255,140,0,0.55)",
                  borderColor: statusFilter === f ? "#FF8C00" : "rgba(255,140,0,0.15)",
                }}
                style={{ border: "1px solid rgba(255,140,0,0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                {f}
              </motion.button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search name, email, message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,140,0,0.15)",
              borderRadius: 2,
              padding: "10px 14px",
              color: "#FFFFFF",
              fontSize: 13,
              fontFamily: "DM Sans, sans-serif",
              outline: "none",
            }}
          />
        </div>

        {/* ── List ── */}
        {loading ? (
          <div className="py-24 text-center font-mono text-xs" style={{ color: "rgba(255,140,0,0.4)" }}>
            Loading…
          </div>
        ) : loadError ? (
          <div className="py-24 text-center">
            <p className="font-mono text-xs mb-4" style={{ color: "rgba(255,100,100,0.7)" }}>{loadError}</p>
            <button onClick={load} className="btn-outline" style={{ fontSize: 11 }}>Retry</button>
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-24 text-center font-mono text-xs" style={{ color: "rgba(255,140,0,0.35)" }}>
            No submissions {statusFilter !== "all" ? `with status "${statusFilter}"` : "yet"}.
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {submissions.map((s) => (
              <motion.button
                key={s.id}
                onClick={() => openDetail(s)}
                className="card text-left p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full"
                whileHover={{ x: 2 }}
              >
                <div className="sm:w-40 shrink-0">
                  <StatusBadge status={s.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-white font-semibold text-sm">{s.name}</span>
                    <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{s.email}</span>
                  </div>
                  <p className="text-xs mt-1.5 truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {s.service || "No service specified"} {s.organisation ? `— ${s.organisation}` : ""}
                  </p>
                </div>
                <div className="font-mono text-[10px] shrink-0 sm:text-right" style={{ color: "rgba(255,140,0,0.4)" }}>
                  {timeAgo(s.created_at)}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </main>

      {/* ── Detail slide-over ── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-50 overflow-y-auto"
              style={{ width: "min(480px,100vw)", background: "#050505", borderLeft: "1px solid rgba(255,140,0,0.15)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <StatusBadge status={selected.status} />
                  <button
                    onClick={() => setSelected(null)}
                    className="text-white/40 hover:text-white text-xl leading-none"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <h2 className="font-display font-bold text-white mb-1" style={{ fontSize: "1.8rem", letterSpacing: "-.02em" }}>
                  {selected.name}
                </h2>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-sm inline-block mb-6"
                  style={{ color: "#FF8C00" }}
                >
                  {selected.email}
                </a>

                <div className="grid grid-cols-2 gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,140,0,0.1)" }}>
                  {[
                    ["Organisation", selected.organisation || "—"],
                    ["Service", selected.service || "—"],
                    ["Budget", selected.budget || "—"],
                    ["Received", new Date(selected.created_at).toLocaleString()],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,140,0,0.4)" }}>{label}</div>
                      <div className="text-white/70 text-sm">{val}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <div className="font-mono text-[9px] tracking-widest uppercase mb-2" style={{ color: "rgba(255,140,0,0.4)" }}>Message</div>
                  <p className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap" style={{ lineHeight: 1.8 }}>
                    {selected.message}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a href={`mailto:${selected.email}`} className="btn-gold w-full justify-center">Reply by email →</a>
                  <div className="grid grid-cols-3 gap-2">
                    {["new", "replied", "archived"].map((st) => (
                      <button
                        key={st}
                        disabled={actionBusy || selected.status === st}
                        onClick={() => handleStatusChange(selected.id, st)}
                        className="btn-outline justify-center"
                        style={{
                          fontSize: 10,
                          padding: "10px 8px",
                          opacity: selected.status === st ? 0.35 : 1,
                        }}
                      >
                        Mark {st}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={actionBusy}
                    onClick={() => handleDelete(selected.id)}
                    className="w-full text-center py-3 font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: "rgba(255,100,100,0.7)" }}
                  >
                    Delete submission
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
