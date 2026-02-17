import React, { useEffect, useState } from 'react';
import { fetchGuestbook, createGuestbook, updateGuestbook, deleteGuestbook } from '../api';
import styles from './GuestbookPage.module.css';

const EMOJIS = ['😻','🐱','💜','🌚','😹','🥹','🎮','☕','🙂‍↔️','💩'];

const EMPTY_FORM = { name: '', message: '', emoji: '👋' };

export default function GuestbookPage() {
  const [entries,  setEntries]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  // Sign form state
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formMsg,  setFormMsg]  = useState(null); // { type: 'success'|'error', text }

  // Edit state
  const [editing,  setEditing]  = useState(null); // { id, message }
  const [editMsg,  setEditMsg]  = useState('');
  const [editBusy, setEditBusy] = useState(false);

  // Delete busy tracker
  const [deleting, setDeleting] = useState(null); // id being deleted

  // ── LOAD (GET /api/guestbook) ────────────────────────
  const load = () => {
    setLoading(true);
    fetchGuestbook()
      .then(setEntries)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  // ── SIGN (POST /api/guestbook) ────────────────────────
  const handleSign = async (e) => {
    e.preventDefault();
    setSubmitting(true); setFormMsg(null);
    try {
      await createGuestbook(form);
      setFormMsg({ type: 'success', text: `Thanks ${form.name}! Your message is now live. 🎉` });
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      setFormMsg({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ── EDIT (PUT /api/guestbook/:id) ────────────────────
  const startEdit = (entry) => {
    setEditing(entry);
    setEditMsg(entry.message);
  };
  const cancelEdit = () => { setEditing(null); setEditMsg(''); };

  const handleUpdate = async () => {
    if (!editMsg.trim() || editMsg.length < 3) return;
    setEditBusy(true);
    try {
      await updateGuestbook(editing.id, { message: editMsg });
      setEntries(prev => prev.map(e => e.id === editing.id ? { ...e, message: editMsg } : e));
      cancelEdit();
    } catch (err) {
      alert('Update failed: ' + err.message);
    } finally {
      setEditBusy(false);
    }
  };

  // ── DELETE (DELETE /api/guestbook/:id) ───────────────
  const handleDelete = async (id) => {
    if (!confirm('Remove this entry?')) return;
    setDeleting(id);
    try {
      await deleteGuestbook(id);
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  const fmt = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <main className="wrap">
      <div className={styles.header}>
        <h1 className={styles.title}>Guestbook</h1>
        <p className={styles.sub}>
          Leave a message, say hi, or share a thought. All entries are stored in
          <strong> Supabase</strong> via the <code>NestJS REST API</code>.
        </p>

        {/* API badge strip */}
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.get}`}>GET /api/guestbook</span>
          <span className={`${styles.badge} ${styles.post}`}>POST /api/guestbook</span>
          <span className={`${styles.badge} ${styles.put}`}>PUT /api/guestbook/:id</span>
          <span className={`${styles.badge} ${styles.del}`}>DELETE /api/guestbook/:id</span>
        </div>
      </div>

      {/* ── SIGN FORM ── */}
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}> Sign in the Guestbook</h2>
        <form className={styles.form} onSubmit={handleSign} noValidate>
          <div className={styles.row}>
            <div className="field" style={{ flex: 1 }}>
              <label>Your Name</label>
              <input
                type="text" placeholder="e.g. Breneth"
                value={form.name} required minLength={2} maxLength={80}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                disabled={submitting}
              />
            </div>

            <div className="field">
              <label>Mood</label>
              <div className={styles.emojiPicker}>
                {EMOJIS.map(em => (
                  <button
                    type="button" key={em}
                    className={`${styles.emojiBtn} ${form.emoji === em ? styles.emojiActive : ''}`}
                    onClick={() => setForm(p => ({ ...p, emoji: em }))}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <label>Message</label>
            <textarea
              rows={3} placeholder="Say something nice… or funny 🐱"
              value={form.message} required minLength={3} maxLength={500}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              disabled={submitting}
            />
            <span className={styles.charCount}>{form.message.length}/500</span>
          </div>

          {formMsg && (
            <div className={`alert alert-${formMsg.type}`}>{formMsg.text}</div>
          )}

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? <><span className="spinner" /> Signing…</> : 'Sign the Book →'}
          </button>
        </form>
      </section>

      {/* ── ENTRIES LIST ── */}
      <section className={styles.entries}>
        <h2 className={styles.formTitle}>
          {loading ? 'Loading entries…' : `${entries.length} ${entries.length === 1 ? 'Entry' : 'Entries'}`}
        </h2>

        {error && <div className="alert alert-error">⚠ {error}</div>}

        {!loading && !error && entries.length === 0 && (
          <div className={styles.empty}>
            <span>🌚</span>
            <p>No entries yet — be the first to sign!</p>
          </div>
        )}

        <div className={styles.list}>
          {entries.map((entry, i) => (
            <article
              key={entry.id}
              className={styles.entry}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {editing?.id === entry.id ? (
                /* ── Edit mode ── */
                <div className={styles.editMode}>
                  <textarea
                    className={styles.editArea}
                    rows={3}
                    value={editMsg}
                    onChange={e => setEditMsg(e.target.value)}
                    maxLength={500}
                  />
                  <div className={styles.editActions}>
                    <button className="btn" onClick={handleUpdate} disabled={editBusy}>
                      {editBusy ? <><span className="spinner" /> Saving…</> : '✓ Save'}
                    </button>
                    <button className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                /* ── Read mode ── */
                <>
                  <div className={styles.entryTop}>
                    <span className={styles.entryEmoji}>{entry.emoji || '😻'}</span>
                    <div>
                      <strong className={styles.entryName}>{entry.name}</strong>
                      <time className={styles.entryDate}>{fmt(entry.created_at)}</time>
                    </div>
                    <div className={styles.entryActions}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '4px 12px', fontSize: 12 }}
                        onClick={() => startEdit(entry)}
                        title="Edit"
                      >
                        ✏ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '4px 12px', fontSize: 12 }}
                        onClick={() => handleDelete(entry.id)}
                        disabled={deleting === entry.id}
                        title="Delete"
                      >
                        {deleting === entry.id ? <span className="spinner" /> : '🗑'}
                      </button>
                    </div>
                  </div>
                  <p className={styles.entryMsg}>{entry.message}</p>
                  {entry.updated_at && (
                    <span className={styles.edited}>edited {fmt(entry.updated_at)}</span>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        © 2026 Breneth Ananayo &nbsp;·&nbsp; Powered by NestJS + Supabase
      </footer>
    </main>
  );
}
