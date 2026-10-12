/**
 * Admin backend as source of truth for public product data.
 * Public APIs (no auth, CORS open):
 *   GET {ADMIN}/api/public/products?limit=20&page=1&q=&badge=
 *   GET {ADMIN}/api/public/products/[slug]
 */

export function getAdminApiUrl() {
  const base = (process.env.NEXT_PUBLIC_ADMIN_API_URL || "").trim().replace(/\/$/, "");
  return base;
}

export function formatINR(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "₹—";
  return `₹${n.toLocaleString("en-IN")}`;
}

function toQuery(params = {}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export async function fetchPublicProducts({ limit = 20, page = 1, q = "", badge = "" } = {}, fetchOpts = {}) {
  const base = getAdminApiUrl();
  if (!base) throw new Error("NEXT_PUBLIC_ADMIN_API_URL is not set");
  const url = `${base}/api/public/products${toQuery({ limit, page, q, badge })}`;
  const res = await fetch(url, { ...fetchOpts });
  if (!res.ok) throw new Error(`Admin products fetch failed: ${res.status}`);
  const data = await res.json();
  // Expected: { items: [{name, slug, description, price, image, badge, sortOrder}], total, page, totalPages }
  const items = Array.isArray(data.items) ? data.items : [];
  // Ensure client-side sortOrder ordering (Admin should already sort, but guarantee it)
  items.sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
  return {
    items,
    total: data.total ?? items.length,
    page: data.page ?? page,
    totalPages: data.totalPages ?? 1,
  };
}

export async function fetchPublicProductBySlug(slug, fetchOpts = {}) {
  const base = getAdminApiUrl();
  if (!base) throw new Error("NEXT_PUBLIC_ADMIN_API_URL is not set");
  if (!slug) throw new Error("slug is required");
  const url = `${base}/api/public/products/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { ...fetchOpts });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Admin product detail fetch failed: ${res.status}`);
  const data = await res.json();
  // API may return { product } or the product directly
  return data.product ?? data ?? null;
}

/** Resolve a `?product=<slug>` param to a display name via detail API, falling back to list search. */
export async function resolveProductNameBySlug(slug) {
  if (!slug) return null;
  try {
    const direct = await fetchPublicProductBySlug(slug);
    if (direct?.name) return direct.name;
  } catch {
    // fall through to list search
  }
  try {
    const { items } = await fetchPublicProducts({ limit: 50, page: 1, q: slug });
    const exact =
      items.find((p) => p.slug === slug) ||
      items.find((p) => p.slug?.toLowerCase() === String(slug).toLowerCase()) ||
      items[0];
    return exact?.name ?? null;
  } catch {
    return null;
  }
}
