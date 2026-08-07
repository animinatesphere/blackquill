import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRICING_FILE = path.join(__dirname, "data", "pricing.json");

// Seed data — mirrors the original hardcoded plans/add-ons. Only used the
// first time the server runs, before any admin edit has been saved.
const DEFAULT_PRICING = {
  usdRate: 1600,
  plans: [
    {
      id: "basic",
      name: "Basic",
      amountNGN: 117000,
      tagline: "Perfect for debut authors",
      featured: false,
      cta: "Get started",
      features: [
        "Homepage",
        "About the author",
        "E-commerce integration",
        "Contact page",
        "Social media integration",
        "Local payment gateway integration",
        "Six months hosting",
        "Blog",
      ],
    },
    {
      id: "hybrid",
      name: "Hybrid",
      amountNGN: 150000,
      tagline: "For established authors expanding their reach",
      featured: true,
      cta: "Most popular",
      features: [
        "Homepage",
        "About the author",
        "E-commerce integration",
        "Contact page",
        "Social media integration",
        "Local and international payment gateway integration",
        "Six months hosting",
        "Blog",
        "Interviews and features page",
        "Appearance and events page",
        "Awards and recognition page",
        "Rich media integration",
      ],
    },
    {
      id: "book-distribution",
      name: "Book Distribution",
      amountNGN: 20000,
      tagline: "For authors who just want to sell books online",
      featured: false,
      cta: "Go premium",
      features: [
        "Local distribution (Selar, Libri)",
        "Global distribution (Apple Books, Google Books, Barnes & Noble, Amazon etc)",
        "Subscription services (Scribd, Everand, Kobo etc)",
        "Libraries",
        "Monthly sales and royalties report",
      ],
    },
  ],
  addons: [
    { id: "pages", label: "Additional pages", amountNGN: 15000, prefix: "From ", suffix: " each" },
    { id: "logo", label: "Logo design", amountNGN: 35000, prefix: "From ", suffix: "" },
    { id: "brand", label: "Brand identity pack", amountNGN: 80000, prefix: "From ", suffix: "" },
    { id: "cover", label: "Book cover design", amountNGN: 25000, prefix: "From ", suffix: "" },
    { id: "photo", label: "Photography session", amountNGN: null, prefix: "", suffix: "" },
    { id: "hosting", label: "Annual hosting renewal", amountNGN: 30000, prefix: "From ", suffix: " / yr" },
    { id: "seo", label: "Ongoing SEO retainer", amountNGN: null, prefix: "", suffix: "" },
    { id: "support", label: "Priority support plan", amountNGN: 20000, prefix: "From ", suffix: " / mo" },
  ],
};

export function getPricing() {
  if (!fs.existsSync(PRICING_FILE)) {
    savePricing(DEFAULT_PRICING);
    return DEFAULT_PRICING;
  }
  try {
    return JSON.parse(fs.readFileSync(PRICING_FILE, "utf-8"));
  } catch {
    return DEFAULT_PRICING;
  }
}

export function savePricing(data) {
  fs.mkdirSync(path.dirname(PRICING_FILE), { recursive: true });
  fs.writeFileSync(PRICING_FILE, JSON.stringify(data, null, 2));
  return data;
}

// Lightweight shape/type check — this is a single-admin internal tool, not a
// public API, so we guard against malformed data rather than adversarial input.
export function validatePricing(data) {
  if (!data || typeof data !== "object") return "Invalid payload";
  if (typeof data.usdRate !== "number" || data.usdRate <= 0) {
    return "USD rate must be a positive number";
  }
  if (!Array.isArray(data.plans) || !data.plans.length) {
    return "Plans must be a non-empty array";
  }
  if (!Array.isArray(data.addons)) return "Add-ons must be an array";

  for (const p of data.plans) {
    if (!p.id || !p.name) return "Every plan needs an id and name";
    if (p.amountNGN !== null && (typeof p.amountNGN !== "number" || p.amountNGN < 0)) {
      return `Invalid price for plan "${p.name}"`;
    }
    if (!Array.isArray(p.features)) return `Plan "${p.name}" is missing its features list`;
  }
  for (const a of data.addons) {
    if (!a.id || !a.label) return "Every add-on needs an id and label";
    if (a.amountNGN !== null && (typeof a.amountNGN !== "number" || a.amountNGN < 0)) {
      return `Invalid price for add-on "${a.label}"`;
    }
  }
  return null;
}
