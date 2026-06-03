import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import {
  getCrmSession,
  crmLogout,
  fetchCrmStats,
  fetchUsersByDate,
  fetchUsersBySource,
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
        {value.toLocaleString()}
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
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ← Prev
      </Button>
      <span className="text-sm text-slate-500">
        Page {page} of {totalPages || 1}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next →
      </Button>
    </div>
  );
}

export default function CrmDashboard() {
  const [, navigate] = useLocation();
  const session = getCrmSession();

  const [stats, setStats] = useState<CrmStats | null>(null);
  const [statsError, setStatsError] = useState("");

  const [datePage, setDatePage] = useState(1);
  const [dateData, setDateData] = useState<PaginatedResult<DayRow> | null>(null);
  const [dateLoading, setDateLoading] = useState(false);

  const [sourcePage, setSourcePage] = useState(1);
  const [sourceData, setSourceData] = useState<PaginatedResult<SourceRow> | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/crm");
      return;
    }
    fetchCrmStats()
      .then(setStats)
      .catch(() => setStatsError("Could not load stats"));
  }, []);

  const loadDateData = useCallback((page: number) => {
    setDateLoading(true);
    fetchUsersByDate(page)
      .then((d) => { setDateData(d); setDatePage(page); })
      .catch(() => {})
      .finally(() => setDateLoading(false));
  }, []);

  const loadSourceData = useCallback((page: number) => {
    setSourceLoading(true);
    fetchUsersBySource(page)
      .then((d) => { setSourceData(d); setSourcePage(page); })
      .catch(() => {})
      .finally(() => setSourceLoading(false));
  }, []);

  useEffect(() => {
    if (session) {
      loadDateData(1);
      loadSourceData(1);
    }
  }, []);

  function handleLogout() {
    crmLogout();
    navigate("/crm");
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1b5fb8] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">PF</span>
          </div>
          <span className="font-semibold text-slate-800">PolicyFatafat CRM</span>
          <span className="ml-2 text-xs bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">
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

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Dashboard</h2>
          <p className="text-sm text-slate-400">Overview of user and lead activity</p>
        </div>

        {statsError && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">
            {statsError}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Users"
            value={stats ? stats.totalUsers : "—"}
            sub="MAX(id) from pp_user"
          />
          <StatCard
            label="Total Leads"
            value={stats ? stats.totalLeads : "—"}
            sub="MAX(id) from pp_applications"
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
                      <tr
                        key={i}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-slate-700">
                          {new Date(row.date).toLocaleDateString("en-IN", {
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
              <Pagination
                page={datePage}
                totalPages={dateData.totalPages}
                onChange={loadDateData}
              />
            </>
          ) : (
            <p className="text-sm text-slate-400 py-6 text-center">No data available</p>
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
                      <tr
                        key={i}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-slate-700">{row.source}</td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                          {row.count.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                page={sourcePage}
                totalPages={sourceData.totalPages}
                onChange={loadSourceData}
              />
            </>
          ) : (
            <p className="text-sm text-slate-400 py-6 text-center">No data available</p>
          )}
        </div>
      </main>
    </div>
  );
}
