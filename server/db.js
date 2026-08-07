import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "data", "submissions.json");

function readAll() {
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(rows) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(rows, null, 2));
}

export function insertSubmission(sub) {
  const rows = readAll();
  const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
  const row = { id, ...sub, status: "new", created_at: new Date().toISOString() };
  rows.push(row);
  writeAll(rows);
  return row;
}

export function listSubmissions({ status, q } = {}) {
  let rows = readAll();
  if (status && status !== "all") {
    rows = rows.filter((r) => r.status === status);
  }
  if (q) {
    const needle = q.toLowerCase();
    rows = rows.filter((r) =>
      [r.name, r.email, r.organisation, r.message].some(
        (v) => v && v.toLowerCase().includes(needle),
      ),
    );
  }
  return rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getSubmission(id) {
  return readAll().find((r) => r.id === Number(id)) || null;
}

export function updateSubmissionStatus(id, status) {
  const rows = readAll();
  const row = rows.find((r) => r.id === Number(id));
  if (!row) return null;
  row.status = status;
  writeAll(rows);
  return row;
}

export function deleteSubmission(id) {
  const rows = readAll();
  const idx = rows.findIndex((r) => r.id === Number(id));
  if (idx === -1) return false;
  rows.splice(idx, 1);
  writeAll(rows);
  return true;
}
