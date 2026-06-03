import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import {
  getCrmSession,
  crmLogout,
  fetchCrmStats,
  fetchUsersByDate,
  fetchUsersBySource,
  getPresetDates,
  todayStr,
  DATE_PRESETS,
  type DatePreset,
  type CrmStats,
  type DayRow,
  type SourceRow,
  type PaginatedResult,
} from "@/lib/crm-api";
import { Button } from "@/components/ui/button";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-slate-800">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 justify-end mt-4">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ← Prev
      </Button>
      <span className="text-sm text-slate-500">
        Page {page} of {totalPages || 1}
      </span>
      <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next →
      </Button>
    </div>
  );
}

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

  const [sourcePage, setSourcePage] = useState(1);
  const [sourceData, setSourceData] = useState<PaginatedResult<SourceRow> | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);

  useEffect(() => {
    if (!session) navigate("/crm");
  }, []);

  const loadAll = useCallback((from: string, to: string) => {
    setStatsError("");
    setStats(null);
    fetchCrmStats(from, to)
      .then(setStats)
      .catch(() => setStatsError("Could not load stats"));

    setDateLoading(true);
    setDatePage(1);
    fetchUsersByDate(1, from, to)
      .then(setDateData)
      .catch(() => {})
      .finally(() => setDateLoading(false));

    setSourceLoading(true);
    setSourcePage(1);
    fetchUsersBySource(1, from, to)
      .then(setSourceData)
      .catch(() => {})
      .finally(() => setSourceLoading(false));
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

  function handleFromChange(val: string) {
    setFromDate(val);
    setPreset("Custom");
  }

  function handleToChange(val: string) {
    setToDate(val);
    setPreset("Custom");
  }

  function handleApply() {
    loadAll(fromDate, toDate);
  }

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

  function handleLogout() {
    crmLogout();
    navigate("/crm");
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/policypilot-logo.png"
            alt="PolicyFatafat"
            className="h-8 w-auto object-contain"
          />
          <span className="text-slate-300 text-lg font-light">|</span>
          <span className="font-semibold text-slate-700 text-sm">Insights</span>
          <span className="text-xs bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">
            {session.type === "masteradmin" ? "Master Admin" : "Admin"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{session.username}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

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
                {DATE_PRESETS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => handleFromChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 font-medium">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => handleToChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1b5fb8]/30"
              />
            </div>

            {preset === "Custom" && (
              <Button
                size="sm"
                onClick={handleApply}
                className="bg-[#1b5fb8] hover:bg-[#1a55a8] text-white h-9"
              >
                Apply
              </Button>
            )}
          </div>
        </div>

        {statsError && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">{statsError}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Users"
            value={stats ? stats.totalUsers : "—"}
            sub={`${fromDate === toDate ? fromDate : `${fromDate} → ${toDate}`}`}
          />
          <StatCard
            label="Leads"
            value={stats ? stats.totalLeads : "—"}
            sub={`${fromDate === toDate ? fromDate : `${fromDate} → ${toDate}`}`}
          />
          <StatCard
            label="ULR"
            value={stats ? stats.ulr : "—"}
            sub="User to Lead Ratio"
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            User Acquisition — Day Wise
          </h3>
          {dateLoading ? (
            <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
          ) : dateData && dateData.rows.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 px-3 text-slate-400 font-medium">Date</th>
                      <th className="text-right py-2 px-3 text-slate-400 font-medium">Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dateData.rows.map((row, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-slate-700">
                          {new Date(row.date + "T00:00:00").toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-800">
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

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            User Acquisition — Source Wise
          </h3>
          {sourceLoading ? (
            <p className="text-sm text-slate-400 py-6 text-center">Loading…</p>
          ) : sourceData && sourceData.rows.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 px-3 text-slate-400 font-medium">UTM Source</th>
                      <th className="text-right py-2 px-3 text-slate-400 font-medium">Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sourceData.rows.map((row, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-slate-700">{row.source}</td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-800">
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
      </main>
    </div>
  );
}
