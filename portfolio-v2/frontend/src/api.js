const BASE = import.meta.env.VITE_API_URL || '';

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
    throw new Error(e.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Skills ──────────────────────────────────────────
export const fetchSkills  = ()          => req('/api/skills');

// ── Gallery ─────────────────────────────────────────
export const fetchGallery = ()          => req('/api/gallery');

// ── Contact ─────────────────────────────────────────
export const submitContact = (data)     => req('/api/contact', { method: 'POST', body: JSON.stringify(data) });

// ── Guestbook ────────────────────────────────────────
export const fetchGuestbook   = ()      => req('/api/guestbook');
export const createGuestbook  = (data)  => req('/api/guestbook', { method: 'POST',   body: JSON.stringify(data) });
export const updateGuestbook  = (id, data) => req(`/api/guestbook/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteGuestbook  = (id)    => req(`/api/guestbook/${id}`, { method: 'DELETE' });
