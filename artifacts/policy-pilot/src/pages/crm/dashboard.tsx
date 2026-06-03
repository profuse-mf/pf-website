import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import * as XLSX from "xlsx";
import {
  getCrmSession,
  crmLogout,
  fetchCrmStats,
  fetchUsersByDate,
  fetchUsersBySource,
  exportUsersByDate,
  exportUsersBySource,
  fetchByPincode,
  exportByPincode,
  fetchByVehicle,
  exportByVehicle,
  fetchSourceByDate,
  fetchDateBySource,
  getPresetDates,
  todayStr,
  DATE_PRESETS,
  type DatePreset,
  type CrmStats,
  type DayRow,
  type SourceRow,
  type PincodeRow,
  type VehicleRow,
  type DrillSourceRow,
  type DrillDateRow,
  type PaginatedResult,
} from "@/lib/crm-api";
import { Button } from "@/components/ui/button";
import { CrmNav } from "./crm-nav";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtDateRange(from: string, to: string) {
  return from === to ? fmtDate(from) : `${fmtDate(from)} → ${fmtDate(to)}`;
}

function downloadXlsx(filename: string, headers: string[], rows: (string | number)[][]) {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const colWidths = headers.map((h, i) => ({
    wch: Math.max(h.length, ...rows.map((r) => String(r[i] ?? "").length)) + 2,
  }));
  ws["!cols"] = colWidths;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// ── Download button ───────────────────────────────────────────────────────────

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

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-800">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
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

// ── Drill-down modal ──────────────────────────────────────────────────────────

type DrillMode =
  | { type: "source-by-date"; date: string }
  | { type: "date-by-source"; source: string };

function DrillModal({ mode, from, to, onClose }: { mode: DrillMode; from: string; to: string; onClose: () => void }) {
  const [rows, setRows] = useState<DrillSourceRow[] | DrillDateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dlLoading, setDlLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    const p = mode.type === "source-by-date"
      ? fetchSourceByDate(mode.date)
      : fetchDateBySource(mode.source, from, to);
    p.then((r) => setRows(r as DrillSourceRow[] & DrillDateRow[]))
      .catch(() => setError("Could not load data"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const title = mode.type === "source-by-date"
    ? `Source breakdown — ${fmtDate(mode.date)}`
    : `Date breakdown — ${mode.source}`;

  const subtitle = mode.type === "source-by-date"
    ? "UTM source split for this date"
    : fmtDateRange(from, to);

  function handleDownload() {
    if (!rows.length) return;
    setDlLoading(true);
    try {
      if (mode.type === "source-by-date") {
        const r = rows as DrillSourceRow[];
        downloadXlsx(
          `source-breakdown-${mode.date}`,
          ["UTM Source", "Users"],
          r.map((x) => [x.source, x.count])
        );
      } else {
        const r = rows as DrillDateRow[];
        downloadXlsx(
          `date-breakdown-${mode.source}`,
          ["Date", "Users"],
          r.map((x) => [fmtDate(x.date), x.count])
        );
      }
    } finally {
      setDlLoading(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            {!loading && !error && rows.length > 0 && (
              <DownloadBtn onClick={handleDownload} loading={dlLoading} />
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <p className="text-sm text-slate-400 py-8 text-center">Loading…</p>
          ) : error ? (
            <p className="text-sm text-red-500 py-8 text-center">{error}</p>
          ) : rows.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No data</p>
          ) : mode.type === "source-by-date" ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="text-left py-2 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">UTM Source</th>
                  <th className="text-right py-2 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Users</th>
                </tr>
              </thead>
              <tbody>
                {(rows as DrillSourceRow[]).map((r, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2.5 px-3 text-slate-700">{r.source}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-slate-800">{r.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="text-left py-2 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Date</th>
                  <th className="text-right py-2 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Users</th>
                </tr>
              </thead>
              <tbody>
                {(rows as DrillDateRow[]).map((r, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2.5 px-3 text-slate-700">{fmtDate(r.date)}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-slate-800">{r.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CrmDashboard() {
  const [, navigate] = useLocation();
  const session = getCrmSession();

  const today = todayStr();
  const [preset, setPreset] = useState<DatePreset>("Today");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const [stats, setStats] = useState<CrmStats | null>(null);
  const [statsError, setStatsError] = useState("");

  const [datePage, setDatePage] = useState(1);
  const [dateData, setDateData] = useState<PaginatedResult<DayRow> | null>(null);
  const [dateLoading, setDateLoading] = useState(false);
  const [dateDlLoading, setDateDlLoading] = useState(false);

  const [sourcePage, setSourcePage] = useState(1);
  const [sourceData, setSourceData] = useState<PaginatedResult<SourceRow> | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [sourceDlLoading, setSourceDlLoading] = useState(false);

  const [pincodePage, setPincodePage] = useState(1);
  const [pincodeData, setPincodeData] = useState<PaginatedResult<PincodeRow> | null>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeDlLoading, setPincodeDlLoading] = useState(false);

  const [vehiclePage, setVehiclePage] = useState(1);
  const [vehicleData, setVehicleData] = useState<PaginatedResult<VehicleRow> | null>(null);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [vehicleDlLoading, setVehicleDlLoading] = useState(false);

  const [drill, setDrill] = useState<DrillMode | null>(null);

  useEffect(() => {
    if (!session) navigate("/crm");
  }, []);

  const loadAll = useCallback((from: string, to: string) => {
    setStatsError("");
    setStats(null);
    fetchCrmStats(from, to).then(setStats).catch(() => setStatsError("Could not load stats"));

    setDateLoading(true);
    setDatePage(1);
    fetchUsersByDate(1, from, to).then(setDateData).catch(() => {}).finally(() => setDateLoading(false));

    setSourceLoading(true);
    setSourcePage(1);
    fetchUsersBySource(1, from, to).then(setSourceData).catch(() => {}).finally(() => setSourceLoading(false));

    setPincodeLoading(true);
    setPincodePage(1);
    fetchByPincode(1, from, to).then(setPincodeData).catch(() => {}).finally(() => setPincodeLoading(false));

    setVehicleLoading(true);
    setVehiclePage(1);
    fetchByVehicle(1, from, to).then(setVehicleData).catch(() => {}).finally(() => setVehicleLoading(false));
  }, []);

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
  function handleApply()                 { loadAll(fromDate, toDate); }

  const loadDatePage = useCallback((page: number) => {
    setDateLoading(true);
    fetchUsersByDate(page, fromDate, toDate)
      .then((d) => { setDateData(d); setDatePage(page); })
      .catch(() => {})
      .finally(() => setDateLoading(false));
  }, [fromDate, toDate]);

  const loadSourcePage = useCallback((page: number) => {
    setSourceLoading(true);
    fetchUsersBySource(page, fromDate, toDate)
      .then((d) => { setSourceData(d); setSourcePage(page); })
      .catch(() => {})
      .finally(() => setSourceLoading(false));
  }, [fromDate, toDate]);

  async function handleDateDownload() {
    setDateDlLoading(true);
    try {
      const rows = await exportUsersByDate(fromDate, toDate);
      downloadXlsx(
        `users-by-date_${fromDate}_${toDate}`,
        ["Date", "Users"],
        rows.map((r) => [fmtDate(r.date), r.count])
      );
    } finally {
      setDateDlLoading(false);
    }
  }

  async function handleSourceDownload() {
    setSourceDlLoading(true);
    try {
      const rows = await exportUsersBySource(fromDate, toDate);
      downloadXlsx(
        `users-by-source_${fromDate}_${toDate}`,
        ["UTM Source", "Users"],
        rows.map((r) => [r.source, r.count])
      );
    } finally {
      setSourceDlLoading(false);
    }
  }

  const loadPincodePage = useCallback((page: number) => {
    setPincodeLoading(true);
    fetchByPincode(page, fromDate, toDate)
      .then((d) => { setPincodeData(d); setPincodePage(page); })
      .catch(() => {})
      .finally(() => setPincodeLoading(false));
  }, [fromDate, toDate]);

  async function handlePincodeDownload() {
    setPincodeDlLoading(true);
    try {
      const rows = await exportByPincode(fromDate, toDate);
      downloadXlsx(
        `apps-by-pincode_${fromDate}_${toDate}`,
        ["Pincode", "Applications"],
        rows.map((r) => [r.pincode, r.count])
      );
    } finally {
      setPincodeDlLoading(false);
    }
  }

  const loadVehiclePage = useCallback((page: number) => {
    setVehicleLoading(true);
    fetchByVehicle(page, fromDate, toDate)
      .then((d) => { setVehicleData(d); setVehiclePage(page); })
      .catch(() => {})
      .finally(() => setVehicleLoading(false));
  }, [fromDate, toDate]);

  async function handleVehicleDownload() {
    setVehicleDlLoading(true);
    try {
      const rows = await exportByVehicle(fromDate, toDate);
      downloadXlsx(
        `apps-by-vehicle_${fromDate}_${toDate}`,
        ["Vehicle Type", "Applications"],
        rows.map((r) => [r.vehicle_type, r.count])
      );
    } finally {
      setVehicleDlLoading(false);
    }
  }

  function handleLogout() { crmLogout(); navigate("/crm"); }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {drill && (
        <DrillModal mode={drill} from={fromDate} to={toDate} onClose={() => setDrill(null)} />
      )}

      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/policypilot-logo.png" alt="PolicyFatafat" className="h-8 w-auto object-contain" />
          <span className="text-slate-300 text-lg font-light">|</span>
          <span className="font-semibold text-slate-700 text-sm">Insights</span>
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

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-0.5">Insights</h2>
            <p className="text-sm text-slate-400">User and lead acquisition overview</p>
          </div>

          <div className="flex flex-wrap items-end gap-3 sm:ml-auto">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">Period</label>
              <select
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value as DatePreset)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30 min-w-[160px]"
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
            {preset === "Custom" && (
              <Button size="sm" onClick={handleApply} className="bg-[#1b5fb8] hover:bg-[#1a55a8] text-white h-9">Apply</Button>
            )}
          </div>
        </div>

        {statsError && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">{statsError}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Users" value={stats ? stats.totalUsers : "—"} sub={fmtDateRange(fromDate, toDate)} />
          <StatCard label="Leads" value={stats ? stats.totalLeads : "—"} sub={fmtDateRange(fromDate, toDate)} />
          <StatCard label="ULR" value={stats ? stats.ulr : "—"} sub="User to Lead Ratio" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Day-wise table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-base font-bold text-slate-800">User Acquisition — Day Wise</h3>
              <DownloadBtn onClick={handleDateDownload} loading={dateDlLoading} />
            </div>
            <p className="text-xs text-slate-400 mb-4">Click a row to see source breakdown</p>
            {dateLoading ? (
              <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
            ) : dateData && dateData.rows.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50">
                        <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Date</th>
                        <th className="text-right py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Users</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dateData.rows.map((row, i) => (
                        <tr
                          key={i}
                          onClick={() => setDrill({ type: "source-by-date", date: row.date })}
                          className="border-b border-slate-100 hover:bg-blue-50 cursor-pointer transition-colors group"
                        >
                          <td className="py-2.5 px-3 text-slate-700 group-hover:text-[#1b5fb8] transition-colors">
                            {fmtDate(row.date)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold text-slate-800 group-hover:text-[#1b5fb8] transition-colors">
                            {row.count.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={datePage} totalPages={dateData.totalPages} onChange={loadDatePage} />
              </>
            ) : (
              <p className="text-sm text-slate-400 py-6 text-center">No data for this period</p>
            )}
          </div>

          {/* Source-wise table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-base font-bold text-slate-800">User Acquisition — Source Wise</h3>
              <DownloadBtn onClick={handleSourceDownload} loading={sourceDlLoading} />
            </div>
            <p className="text-xs text-slate-400 mb-4">Click a row to see date breakdown</p>
            {sourceLoading ? (
              <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
            ) : sourceData && sourceData.rows.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50">
                        <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">UTM Source</th>
                        <th className="text-right py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Users</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceData.rows.map((row, i) => (
                        <tr
                          key={i}
                          onClick={() => setDrill({ type: "date-by-source", source: row.source })}
                          className="border-b border-slate-100 hover:bg-blue-50 cursor-pointer transition-colors group"
                        >
                          <td className="py-2.5 px-3 text-slate-700 group-hover:text-[#1b5fb8] transition-colors">
                            {row.source}
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold text-slate-800 group-hover:text-[#1b5fb8] transition-colors">
                            {row.count.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={sourcePage} totalPages={sourceData.totalPages} onChange={loadSourcePage} />
              </>
            ) : (
              <p className="text-sm text-slate-400 py-6 text-center">No data for this period</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pincode-wise table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-base font-bold text-slate-800">Applications — Pincode Wise</h3>
              <DownloadBtn onClick={handlePincodeDownload} loading={pincodeDlLoading} />
            </div>
            <p className="text-xs text-slate-400 mb-4">Applications by pincode in the selected period</p>
            {pincodeLoading ? (
              <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
            ) : pincodeData && pincodeData.rows.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50">
                        <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Pincode</th>
                        <th className="text-right py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pincodeData.rows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 text-slate-700">{row.pincode || <span className="text-slate-300">—</span>}</td>
                          <td className="py-2.5 px-3 text-right font-semibold text-slate-800">{row.count.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={pincodePage} totalPages={pincodeData.totalPages} onChange={loadPincodePage} />
              </>
            ) : (
              <p className="text-sm text-slate-400 py-6 text-center">No data for this period</p>
            )}
          </div>

          {/* Vehicle type-wise table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-base font-bold text-slate-800">Applications — Vehicle Type Wise</h3>
              <DownloadBtn onClick={handleVehicleDownload} loading={vehicleDlLoading} />
            </div>
            <p className="text-xs text-slate-400 mb-4">Applications by vehicle type in the selected period</p>
            {vehicleLoading ? (
              <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
            ) : vehicleData && vehicleData.rows.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50">
                        <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Vehicle Type</th>
                        <th className="text-right py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleData.rows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 text-slate-700">{row.vehicle_type || <span className="text-slate-300">—</span>}</td>
                          <td className="py-2.5 px-3 text-right font-semibold text-slate-800">{row.count.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination page={vehiclePage} totalPages={vehicleData.totalPages} onChange={loadVehiclePage} />
              </>
            ) : (
              <p className="text-sm text-slate-400 py-6 text-center">No data for this period</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
