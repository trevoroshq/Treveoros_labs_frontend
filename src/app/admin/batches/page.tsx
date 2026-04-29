'use client';

import { useState, useEffect, useCallback } from 'react';
import { batchesApi } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Batch {
  id: string;
  name: string;
  track: 'FOUNDATION' | 'BUILDER';
  startDate: string;
  endDate: string;
  whatsappLink: string;
  isActive: boolean;
  createdAt: string;
  _count: { enrollments: number };
}

interface FormState {
  name: string;
  track: 'FOUNDATION' | 'BUILDER';
  startDate: string;
  endDate: string;
  whatsappLink: string;
  isActive: boolean;
}

const EMPTY_FORM: FormState = {
  name: '',
  track: 'FOUNDATION',
  startDate: '',
  endDate: '',
  whatsappLink: '',
  isActive: true,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function toInputDate(iso: string) {
  return iso ? iso.split('T')[0] : '';
}

function isBatchLive(b: Batch) {
  const now = Date.now();
  return b.isActive && new Date(b.startDate).getTime() <= now && new Date(b.endDate).getTime() >= now;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormState): string | null {
  if (!form.name.trim() || form.name.trim().length < 3) return 'Batch name must be at least 3 characters.';
  if (!form.startDate) return 'Start date is required.';
  if (!form.endDate) return 'End date is required.';
  if (new Date(form.endDate) <= new Date(form.startDate)) return 'End date must be after start date.';
  if (!form.whatsappLink.startsWith('https://chat.whatsapp.com/'))
    return 'WhatsApp link must start with https://chat.whatsapp.com/';
  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ─── Data fetching ──────────────────────────────────────────────────────────

  const fetchBatches = useCallback(async () => {
    setLoading(true);
    setActionError(null);
    try {
      const data = await batchesApi.list() as { batches: Batch[] };
      setBatches(data.batches);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load batches.';
      setActionError(`Failed to load batches: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBatches(); }, [fetchBatches]);

  // ─── Flash helpers ──────────────────────────────────────────────────────────

  function flash(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  }

  // ─── Modal helpers ──────────────────────────────────────────────────────────

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  }

  function openEdit(b: Batch) {
    setEditingId(b.id);
    setForm({
      name: b.name,
      track: b.track,
      startDate: toInputDate(b.startDate),
      endDate: toInputDate(b.endDate),
      whatsappLink: b.whatsappLink,
      isActive: b.isActive,
    });
    setFormError(null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setFormError(null);
  }

  // ─── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(form);
    if (err) { setFormError(err); return; }

    setSubmitting(true);
    setFormError(null);
    try {
      if (editingId) {
        await batchesApi.update(editingId, {
          ...form,
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
        });
        flash('Batch updated successfully.');
      } else {
        await batchesApi.create({
          ...form,
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
        });
        flash('Batch created successfully.');
      }
      closeModal();
      fetchBatches();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  // ─── Deactivate ─────────────────────────────────────────────────────────────

  async function handleDeactivate(id: string, name: string) {
    if (!confirm(`Deactivate batch "${name}"? Existing enrollments are unaffected.`)) return;
    try {
      await batchesApi.remove(id);
      flash(`"${name}" deactivated.`);
      fetchBatches();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to deactivate batch.';
      setActionError(`Failed to deactivate batch: ${msg}`);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Batch Management</h1>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
            Create and manage cohort batches for each track
          </p>
        </div>
        <button id="create-batch-btn" className="btn btn-primary" onClick={openCreate}>
          + New Batch
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#166534', fontSize: '0.875rem', fontWeight: 500 }}>
          ✓ {successMsg}
        </div>
      )}
      {actionError && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#991b1b', fontSize: '0.875rem' }}>
          {actionError}
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
            <div className="loading-spinner" />
          </div>
        ) : batches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 64, color: 'var(--color-gray-400)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⊞</div>
            <p style={{ margin: 0, fontWeight: 500 }}>No batches yet</p>
            <p style={{ margin: '6px 0 0', fontSize: '0.85rem' }}>Create your first batch to get started</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-gray-100)', background: 'var(--color-gray-50)' }}>
                  {['Batch Name', 'Track', 'Start Date', 'End Date', 'WhatsApp', 'Enrollments', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-gray-500)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batches.map((b, i) => {
                  const live = isBatchLive(b);
                  return (
                    <tr key={b.id} style={{ borderBottom: i < batches.length - 1 ? '1px solid var(--color-gray-100)' : 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-gray-50)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-navy)' }}>
                        {b.name}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-block', padding: '2px 10px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 600,
                          background: b.track === 'BUILDER' ? '#eff6ff' : '#faf5ff',
                          color: b.track === 'BUILDER' ? '#1d4ed8' : '#7c3aed',
                        }}>
                          {b.track === 'BUILDER' ? 'Builder' : 'Foundation'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--color-gray-600)', whiteSpace: 'nowrap' }}>
                        {formatDate(b.startDate)}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--color-gray-600)', whiteSpace: 'nowrap' }}>
                        {formatDate(b.endDate)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <a
                          href={b.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#25D366', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none' }}
                        >
                          📱 Open Link
                        </a>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-navy)', textAlign: 'center' }}>
                        {b._count.enrollments}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {live ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, background: '#f0fdf4', color: '#16a34a', fontSize: '0.75rem', fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                            Live
                          </span>
                        ) : b.isActive ? (
                          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 99, background: '#fefce8', color: '#a16207', fontSize: '0.75rem', fontWeight: 600 }}>
                            Scheduled
                          </span>
                        ) : (
                          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 99, background: 'var(--color-gray-100)', color: 'var(--color-gray-400)', fontSize: '0.75rem', fontWeight: 600 }}>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            id={`edit-batch-${b.id}`}
                            onClick={() => openEdit(b)}
                            style={{ padding: '5px 12px', fontSize: '0.78rem', border: '1px solid var(--color-gray-200)', borderRadius: 6, background: 'transparent', cursor: 'pointer', color: 'var(--color-navy)', fontWeight: 500, transition: 'all 0.15s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-gray-100)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                          >
                            Edit
                          </button>
                          {b.isActive && (
                            <button
                              id={`deactivate-batch-${b.id}`}
                              onClick={() => handleDeactivate(b.id, b.name)}
                              style={{ padding: '5px 12px', fontSize: '0.78rem', border: '1px solid #fecaca', borderRadius: 6, background: 'transparent', cursor: 'pointer', color: '#dc2626', fontWeight: 500, transition: 'all 0.15s' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fef2f2'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                            >
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          id="batch-modal-overlay"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(2px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            id="batch-modal"
            style={{ background: '#fff', borderRadius: 14, width: '100%', maxWidth: 520, boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden', animation: 'modalIn 0.2s ease' }}
          >
            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                {editingId ? 'Edit Batch' : 'Create New Batch'}
              </h2>
              <button
                id="close-modal-btn"
                onClick={closeModal}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--color-gray-400)', lineHeight: 1, padding: '0 4px' }}
              >
                ×
              </button>
            </div>

            {/* Modal body */}
            <form id="batch-form" onSubmit={handleSubmit} style={{ padding: 24 }}>
              {formError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 18, color: '#991b1b', fontSize: '0.85rem' }}>
                  {formError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Batch Name */}
                <div>
                  <label style={labelStyle} htmlFor="batch-name">Batch Name *</label>
                  <input
                    id="batch-name"
                    type="text"
                    placeholder="e.g. Cohort 3 — May 2026"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* Track */}
                <div>
                  <label style={labelStyle} htmlFor="batch-track">Track *</label>
                  <select
                    id="batch-track"
                    value={form.track}
                    onChange={e => setForm(f => ({ ...f, track: e.target.value as 'FOUNDATION' | 'BUILDER' }))}
                    style={inputStyle}
                  >
                    <option value="FOUNDATION">Foundation</option>
                    <option value="BUILDER">Builder</option>
                  </select>
                </div>

                {/* Dates */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle} htmlFor="batch-start-date">Start Date *</label>
                    <input
                      id="batch-start-date"
                      type="date"
                      value={form.startDate}
                      onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="batch-end-date">End Date *</label>
                    <input
                      id="batch-end-date"
                      type="date"
                      value={form.endDate}
                      onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                      style={inputStyle}
                      required
                      min={form.startDate}
                    />
                  </div>
                </div>

                {/* WhatsApp Link */}
                <div>
                  <label style={labelStyle} htmlFor="batch-whatsapp">WhatsApp Group Link *</label>
                  <input
                    id="batch-whatsapp"
                    type="url"
                    placeholder="https://chat.whatsapp.com/..."
                    value={form.whatsappLink}
                    onChange={e => setForm(f => ({ ...f, whatsappLink: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                    Must be a valid WhatsApp group invite link
                  </p>
                </div>

                {/* Active toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input
                    id="batch-active"
                    type="checkbox"
                    checked={form.isActive}
                    onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
                    style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                  />
                  <label htmlFor="batch-active" style={{ fontSize: '0.875rem', color: 'var(--color-navy)', cursor: 'pointer', fontWeight: 500 }}>
                    Mark as Active
                  </label>
                </div>
              </div>

              {/* Footer buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-gray-100)' }}>
                <button
                  id="cancel-batch-btn"
                  type="button"
                  onClick={closeModal}
                  style={{ padding: '9px 20px', border: '1px solid var(--color-gray-200)', borderRadius: 8, background: 'transparent', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-gray-600)' }}
                >
                  Cancel
                </button>
                <button
                  id="submit-batch-btn"
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ padding: '9px 24px', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Saving…' : editingId ? 'Save Changes' : 'Create Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--color-navy)',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--color-gray-200)',
  borderRadius: 8,
  fontSize: '0.9rem',
  color: 'var(--color-navy)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};
