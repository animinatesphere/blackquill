const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

class ApiError extends Error {
  constructor(message, status, fieldErrors) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    throw new ApiError(
      data?.error || "Something went wrong. Please try again.",
      res.status,
      data?.errors,
    );
  }
  return data;
}

/* ── Public ── */
export function submitContact(payload) {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchPricing() {
  return request("/api/pricing");
}

/* ── Admin ── */
export function adminLogin(password) {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function adminLogout() {
  return request("/api/admin/logout", { method: "POST" });
}

export function adminMe() {
  return request("/api/admin/me");
}

export function fetchSubmissions({ status, q } = {}) {
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (q) params.set("q", q);
  const qs = params.toString();
  return request(`/api/admin/submissions${qs ? `?${qs}` : ""}`);
}

export function fetchSubmission(id) {
  return request(`/api/admin/submissions/${id}`);
}

export function updateSubmissionStatus(id, status) {
  return request(`/api/admin/submissions/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteSubmission(id) {
  return request(`/api/admin/submissions/${id}`, { method: "DELETE" });
}

export function updatePricing(data) {
  return request("/api/admin/pricing", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export { ApiError };
