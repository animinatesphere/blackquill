import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRICING_FILE = path.join(__dirname, "data", "pricing.json");
const DEFAULT_PRICING_FILE = path.join(__dirname, "../src/data/pricing.json");
const DEFAULT_PRICING = JSON.parse(fs.readFileSync(DEFAULT_PRICING_FILE, "utf-8"));

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
