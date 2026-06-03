import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import * as XLSX from "xlsx";
import {
  getCrmSession,
  crmLogout,
  fetchUtmSources,
  fetchUsers,
  exportUsers,
  getPresetDates,
  todayStr,
  DATE_PRESETS,
  type DatePreset,
  type UserRow,
  type PaginatedResult,
} from "@/lib/crm-api";
import { Button } from "@/components/ui/button";
import { CrmNav } from "./crm-nav";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtDateRange(from: string, to: string) {
  return from === to ? fmtDate(from) : `${fmtDate(from)} → ${fmtDate(to)}`;
}

function downloadXlsx(filename: string, headers: string[], rows: string[][]) {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = headers.map((h, i) => ({
    wch: Math.max(h.length, ...rows.map((r) => (r[i] ?? "").length)) + 2,
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

function DownloadBtn({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="Download as Excel"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#1b5fb8] border border-slate-200 hover:border-[#1b5fb8]/40 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50 bg-white"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
      </svg>
      {loading ? "Exporting…" : "Download XL"}
    </button>
  );
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center gap-2 justify-end mt-4">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>← Prev</Button>
      <span className="text-sm text-slate-500">Page {page} of {totalPages || 1}</span>
      <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Next →</Button>
    </div>
  );
}

const COLUMNS: { key: keyof UserRow; label: string }[] = [
  { key: "id",           label: "ID" },
  { key: "mobile",       label: "Mobile" },
  { key: "email",        label: "Email" },
  { key: "pincode",      label: "Pincode" },
  { key: "vehicle_type", label: "Vehicle" },
  { key: "reg_no",       label: "Reg No" },
  { key: "reg_year",     label: "Reg Year" },
  { key: "model",        label: "Model" },
  { key: "expiry_date",  label: "Expiry" },
  { key: "created_at",   label: "Created" },
  { key: "utm_source",   label: "Source" },
  { key: "utm_medium",   label: "Medium" },
  { key: "utm_channel",  label: "Channel" },
  { key: "utm_partner",  label: "Partner" },
];

function maskMobile(mobile: string): string {
  if (!mobile || mobile.length <= 4) return mobile;
  return "XXXXXX" + mobile.slice(-4);
}

export default function UserBoard() {
  const [, navigate] = useLocation();
  const session = getCrmSession();

  const today = todayStr();
  const [preset, setPreset] = useState<DatePreset>("Today");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [source, setSource] = useState("");
  const [sources, setSources] = useState<string[]>([]);

  const [data, setData] = useState<PaginatedResult<UserRow> | null>(null);
  const [loading, setLoading] = useState(false);
  const [dlLoading, setDlLoading] = useState(false);

  useEffect(() => {
    if (!session) navigate("/crm");
  }, []);

  const loadSources = useCallback((from: string, to: string) => {
    fetchUtmSources(from, to).then(setSources).catch(() => setSources([]));
  }, []);

  const loadData = useCallback((page: number, from: string, to: string, src: string) => {
    setLoading(true);
    fetchUsers(page, from, to, src)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const loadAll = useCallback((from: string, to: string, src = "") => {
    setSource(src);
    loadSources(from, to);
    loadData(1, from, to, src);
  }, [loadSources, loadData]);

  useEffect(() => {
    if (session) loadAll(fromDate, toDate);
  }, []);

  function handlePresetChange(p: DatePreset) {
    setPreset(p);
    if (p === "Custom") return;
    const { from, to } = getPresetDates(p);
    setFromDate(from);
    setToDate(to);
    loadAll(from, to);
  }

  function handleFromChange(val: string) { setFromDate(val); setPreset("Custom"); }
  function handleToChange(val: string)   { setToDate(val);   setPreset("Custom"); }
  function handleApply()                 { loadAll(fromDate, toDate, source); }

  function handleSourceChange(val: string) {
    setSource(val);
    loadData(1, fromDate, toDate, val);
  }

  function handlePageChange(page: number) {
    loadData(page, fromDate, toDate, source);
  }

  async function handleDownload() {
    setDlLoading(true);
    try {
      const exportedRows = await exportUsers(fromDate, toDate, source);
      downloadXlsx(
        `userboard_${fromDate}_${toDate}`,
        COLUMNS.map((c) => c.label),
        exportedRows.map((r) =>
          COLUMNS.map((c) => {
            const val = r[c.key];
            if (c.key === "expiry_date") return fmtDate(String(val ?? ""));
            return String(val ?? "");
          })
        )
      );
    } finally {
      setDlLoading(false);
    }
  }

  function handleLogout() { crmLogout(); navigate("/crm"); }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/policypilot-logo.png" alt="PolicyFatafat" className="h-8 w-auto object-contain" />
          <span className="text-slate-300 text-lg font-light">|</span>
          <span className="font-semibold text-slate-700 text-sm">User Board</span>
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
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-0.5">User Board</h2>
            <p className="text-sm text-slate-400">User and lead records with filters</p>
          </div>

          <div className="flex flex-wrap items-end gap-3 sm:ml-auto">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">Period</label>
              <select
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value as DatePreset)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 min-w-[150px]"
              >
                {DATE_PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">From</label>
              <input type="date" value={fromDate} onChange={(e) => handleFromChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">To</label>
              <input type="date" value={toDate} onChange={(e) => handleToChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">UTM Source</label>
              <select
                value={source}
                onChange={(e) => handleSourceChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 min-w-[130px]"
              >
                <option value="">All sources</option>
                {sources.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {preset === "Custom" && (
              <Button size="sm" onClick={handleApply} className="bg-[#1b5fb8] hover:bg-[#1a55a8] text-white h-9">Apply</Button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-semibold text-slate-700">
                {data ? `${data.total.toLocaleString()} records` : "—"}
              </span>
              <span className="text-xs text-slate-400 ml-2">{fmtDateRange(fromDate, toDate)}</span>
            </div>
            {session.type === "masteradmin" && (
              <DownloadBtn onClick={handleDownload} loading={dlLoading} />
            )}
          </div>

          {loading ? (
            <p className="text-sm text-slate-400 py-12 text-center">Loading…</p>
          ) : data && data.rows.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-xs whitespace-nowrap">
                  <thead>
                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                      {COLUMNS.map((c) => (
                        <th
                          key={c.key}
                          className="text-left py-2.5 px-3 text-slate-700 font-bold uppercase tracking-wide"
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        {COLUMNS.map((c) => {
                          let val = String(row[c.key] ?? "");
                          if (c.key === "mobile") val = maskMobile(val);
                          if (c.key === "expiry_date" && val) val = fmtDate(val);
                          return (
                            <td key={c.key} className="py-2 px-3 text-slate-700">
                              {val || <span className="text-slate-300">—</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                page={data.page}
                totalPages={data.totalPages}
                onChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-sm text-slate-400 py-12 text-center">No records for this period</p>
          )}
        </div>
      </main>
    </div>
  );
}
