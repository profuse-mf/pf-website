import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { getCrmSession, crmLogout, fetchPartners, createPartner, type PartnerRow } from "@/lib/crm-api";
import { Button } from "@/components/ui/button";
import { CrmNav } from "./crm-nav";

function fmtDate(dt: string) {
  if (!dt) return "—";
  return new Date(dt.includes("T") ? dt : dt.replace(" ", "T")).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ── Add Partner Modal ──────────────────────────────────────────────────────────

interface AddModalProps {
  onClose: () => void;
  onSaved: (p: PartnerRow) => void;
}

function AddModal({ onClose, onSaved }: AddModalProps) {
  const [name, setName]             = useState("");
  const [url, setUrl]               = useState("");
  const [status, setStatus]         = useState<"1" | "0">("1");
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");
  const overlayRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !url.trim()) { setError("All fields are required"); return; }
    setSaving(true);
    setError("");
    try {
      const partner = await createPartner({ name: name.trim(), redirect_url: url.trim(), status: Number(status) });
      onSaved(partner);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
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
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Partner Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acko General Insurance"
              maxLength={50}
              required
              className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Status <span className="text-red-400">*</span></label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "1" | "0")}
              required
              className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 w-full bg-white"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Redirect URL <span className="text-red-400">*</span></label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              required
              className="h-9 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 w-full"
            />
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
  const [showAdd, setShowAdd]   = useState(false);

  useEffect(() => {
    if (!session) { navigate("/crm"); return; }
    load();
  }, []);

  function load() {
    setLoading(true);
    fetchPartners()
      .then(setPartners)
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  function handleSaved(p: PartnerRow) {
    setPartners((prev) => [...prev, p]);
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
            <p className="text-sm text-slate-400">Active insurance partners and their redirect links</p>
          </div>
          <Button
            size="sm"
            onClick={() => setShowAdd(true)}
            className="bg-[#1b5fb8] hover:bg-[#1a55a8] text-white flex items-center gap-1.5"
          >
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
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">#</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Partner Name</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Status</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Created</th>
                    <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Redirect URL</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p, i) => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-slate-400 text-xs">{i + 1}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{p.name}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-0.5 ${
                          p.status === 1
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status === 1 ? "bg-emerald-500" : "bg-slate-400"}`} />
                          {p.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{fmtDate(p.created)}</td>
                      <td className="py-3 px-3 max-w-xs">
                        <a
                          href={p.redirect_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={p.redirect_url}
                          className="text-[#1b5fb8] hover:underline truncate block max-w-xs font-mono text-xs"
                        >
                          {p.redirect_url}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
