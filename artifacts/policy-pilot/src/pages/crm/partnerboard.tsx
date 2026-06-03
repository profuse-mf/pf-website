import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  getCrmSession,
  crmLogout,
  fetchPartners,
  createPartner,
  updatePartner,
  type PartnerRow,
} from "@/lib/crm-api";
import { Button } from "@/components/ui/button";
import { CrmNav } from "./crm-nav";

function fmtDate(dt: string) {
  if (!dt) return "—";
  return new Date(dt.includes("T") ? dt : dt.replace(" ", "T")).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function PencilIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343z" />
    </svg>
  );
}
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143z" clipRule="evenodd" />
    </svg>
  );
}
function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}
function StarIcon({ filled, className = "" }: { filled: boolean; className?: string }) {
  return filled ? (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
    </svg>
  );
}

// ── Inline editable cell ───────────────────────────────────────────────────────
interface EditCellProps {
  value: string;
  type?: "text" | "url";
  maxLength?: number;
  saving: boolean;
  onSave: (val: string) => Promise<void>;
  mono?: boolean;
}

function EditCell({ value, type = "text", maxLength, saving, onSave, mono }: EditCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(value);
  const [busy, setBusy]       = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);

  function startEdit() { setDraft(value); setEditing(true); setTimeout(() => inputRef.current?.select(), 0); }
  function cancel() { setEditing(false); setDraft(value); }

  async function save() {
    if (!draft.trim() || draft.trim() === value) { cancel(); return; }
    setBusy(true);
    try { await onSave(draft.trim()); setEditing(false); }
    finally { setBusy(false); }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter")  save();
    if (e.key === "Escape") cancel();
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 min-w-0">
        <input
          ref={inputRef}
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          maxLength={maxLength}
          disabled={busy}
          className={`flex-1 min-w-0 h-7 rounded border border-[#1b5fb8]/40 px-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 ${mono ? "font-mono" : ""}`}
          autoFocus
        />
        <button onClick={save} disabled={busy} className="shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-emerald-50 text-emerald-600 disabled:opacity-40" title="Save">
          <CheckIcon className="w-3.5 h-3.5" />
        </button>
        <button onClick={cancel} disabled={busy} className="shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 text-red-500 disabled:opacity-40" title="Cancel">
          <XIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 group/cell min-w-0">
      <span className={`truncate ${mono ? "font-mono text-[#1b5fb8]" : ""}`}>{value}</span>
      <button
        onClick={startEdit}
        disabled={saving}
        className="shrink-0 opacity-0 group-hover/cell:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-[#1b5fb8] disabled:opacity-30"
        title="Edit"
      >
        <PencilIcon className="w-3 h-3" />
      </button>
    </div>
  );
}

// ── Generic toggle badge ───────────────────────────────────────────────────────
interface ToggleBadgeProps {
  active: boolean;
  saving: boolean;
  onToggle: () => Promise<void>;
  activeClass: string;
  inactiveClass: string;
  activeDot: string;
  inactiveDot: string;
  activeLabel: string;
  inactiveLabel: string;
  title?: string;
}

function ToggleBadge({ active, saving, onToggle, activeClass, inactiveClass, activeDot, inactiveDot, activeLabel, inactiveLabel, title }: ToggleBadgeProps) {
  const [busy, setBusy] = useState(false);
  async function handle() {
    setBusy(true);
    try { await onToggle(); } finally { setBusy(false); }
  }
  return (
    <button
      onClick={handle}
      disabled={saving || busy}
      title={title}
      className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-0.5 transition-all select-none cursor-pointer
        ${active ? activeClass : inactiveClass}
        ${(saving || busy) ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${active ? activeDot : inactiveDot}`} />
      {busy ? "…" : active ? activeLabel : inactiveLabel}
    </button>
  );
}

// ── Primary star toggle ────────────────────────────────────────────────────────
function PrimaryToggle({ isPrimary, saving, onToggle }: { isPrimary: number; saving: boolean; onToggle: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const on = isPrimary === 1;
  async function handle() { setBusy(true); try { await onToggle(); } finally { setBusy(false); } }
  return (
    <button
      onClick={handle}
      disabled={saving || busy}
      title={on ? "Remove primary" : "Set as primary (shown on top)"}
      className={`flex items-center gap-1 text-xs rounded-full px-2 py-0.5 font-medium transition-all
        ${on ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}
        ${(saving || busy) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <StarIcon filled={on} className="w-3.5 h-3.5" />
      {busy ? "…" : on ? "Primary" : "Set Primary"}
    </button>
  );
}

// ── Add Partner Modal ──────────────────────────────────────────────────────────
interface AddModalProps {
  onClose: () => void;
  onSaved: (p: PartnerRow) => void;
}

function AddModal({ onClose, onSaved }: AddModalProps) {
  const [name, setName]     = useState("");
  const [url, setUrl]       = useState("");
  const [status, setStatus] = useState<"1" | "0">("1");
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const overlayRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !url.trim()) { setError("All fields are required"); return; }
    setSaving(true); setError("");
    try {
      onSaved(await createPartner({ name: name.trim(), redirect_url: url.trim(), status: Number(status) }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally { setSaving(false); }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Add Partner</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Partner Name <span className="text-red-400">*</span></label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Acko General Insurance" maxLength={50} required className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Status <span className="text-red-400">*</span></label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "1" | "0")} required className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 w-full bg-white">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Redirect URL <span className="text-red-400">*</span></label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." required className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 w-full" />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" size="sm" className="bg-[#1b5fb8] hover:bg-[#1a55a8] text-white" disabled={saving}>
              {saving ? "Saving…" : "Add Partner"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function PartnerBoard() {
  const [, navigate] = useLocation();
  const session = getCrmSession();

  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState<number | null>(null);
  const [showAdd, setShowAdd]   = useState(false);

  useEffect(() => {
    if (!session) { navigate("/crm"); return; }
    load();
  }, []);

  function load() {
    setLoading(true);
    fetchPartners().then(setPartners).catch(() => {}).finally(() => setLoading(false));
  }

  function applyUpdate(updated: PartnerRow) {
    setPartners((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      // keep primary rows sorted to top
      return [...next].sort((a, b) => b.is_primary - a.is_primary || a.id - b.id);
    });
  }

  async function handleFieldSave(id: number, field: "name" | "redirect_url", val: string) {
    setSaving(id);
    try { applyUpdate(await updatePartner(id, { [field]: val })); }
    finally { setSaving(null); }
  }

  async function handleStatusToggle(p: PartnerRow) {
    setSaving(p.id);
    try { applyUpdate(await updatePartner(p.id, { status: p.status === 1 ? 0 : 1 })); }
    finally { setSaving(null); }
  }

  async function handlePrimaryToggle(p: PartnerRow) {
    setSaving(p.id);
    try { applyUpdate(await updatePartner(p.id, { is_primary: p.is_primary === 1 ? 0 : 1 })); }
    finally { setSaving(null); }
  }

  function handleSaved(p: PartnerRow) {
    setPartners((prev) => [...prev, p].sort((a, b) => b.is_primary - a.is_primary || a.id - b.id));
    setShowAdd(false);
  }
  function handleLogout() { crmLogout(); navigate("/crm"); }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {showAdd && <AddModal onClose={() => setShowAdd(false)} onSaved={handleSaved} />}

      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/policypilot-logo.png" alt="PolicyFatafat" className="h-8 w-auto object-contain" />
          <span className="text-slate-300 text-lg font-light">|</span>
          <span className="font-semibold text-slate-700 text-sm">Partner Board</span>
          <span className="text-xs bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">
            {session.type === "masteradmin" ? "Master Admin" : "Admin"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{session.username}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <CrmNav />

      <main className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-0.5">Partner Board</h2>
            <p className="text-sm text-slate-400">Manage partners — primary partner appears first on the offers page</p>
          </div>
          <Button size="sm" onClick={() => setShowAdd(true)} className="bg-[#1b5fb8] hover:bg-[#1a55a8] text-white flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Add Partner
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="mb-4">
            <span className="text-sm font-semibold text-slate-700">
              {loading ? "Loading…" : `${partners.length} partner${partners.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          {loading ? (
            <p className="text-sm text-slate-400 py-12 text-center">Loading…</p>
          ) : partners.length === 0 ? (
            <p className="text-sm text-slate-400 py-12 text-center">No partners yet — click Add Partner to get started</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50">
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide w-6">#</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Partner Name</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide w-28">Status</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide w-28">Primary</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide w-28">Created</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide w-36">Updated</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Redirect URL</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p, i) => {
                    const rowSaving = saving === p.id;
                    return (
                      <tr
                        key={p.id}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors
                          ${p.is_primary === 1 ? "bg-amber-50/40 hover:bg-amber-50/60" : ""}
                          ${rowSaving ? "opacity-70" : ""}`}
                      >
                        <td className="py-3 px-3 text-slate-400 text-xs">
                          {p.is_primary === 1 ? (
                            <StarIcon filled className="w-3.5 h-3.5 text-amber-400" />
                          ) : i + 1}
                        </td>

                        {/* Name — editable */}
                        <td className="py-3 px-3 font-semibold text-slate-800 max-w-[200px]">
                          <EditCell
                            value={p.name}
                            type="text"
                            maxLength={50}
                            saving={rowSaving}
                            onSave={(val) => handleFieldSave(p.id, "name", val)}
                          />
                        </td>

                        {/* Status toggle */}
                        <td className="py-3 px-3">
                          <ToggleBadge
                            active={p.status === 1}
                            saving={rowSaving}
                            onToggle={() => handleStatusToggle(p)}
                            activeClass="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            inactiveClass="bg-slate-100 text-slate-500 hover:bg-slate-200"
                            activeDot="bg-emerald-500"
                            inactiveDot="bg-slate-400"
                            activeLabel="Active"
                            inactiveLabel="Inactive"
                            title={p.status === 1 ? "Click to deactivate" : "Click to activate"}
                          />
                        </td>

                        {/* Is Primary toggle */}
                        <td className="py-3 px-3">
                          <PrimaryToggle
                            isPrimary={p.is_primary}
                            saving={rowSaving}
                            onToggle={() => handlePrimaryToggle(p)}
                          />
                        </td>

                        {/* Created */}
                        <td className="py-3 px-3 text-slate-600 whitespace-nowrap text-xs">{fmtDate(p.created)}</td>

                        {/* Updated */}
                        <td className="py-3 px-3 text-slate-400 whitespace-nowrap text-xs">{fmtDate(p.updated)}</td>

                        {/* Redirect URL — editable */}
                        <td className="py-3 px-3 max-w-xs text-xs">
                          <EditCell
                            value={p.redirect_url}
                            type="url"
                            saving={rowSaving}
                            onSave={(val) => handleFieldSave(p.id, "redirect_url", val)}
                            mono
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
