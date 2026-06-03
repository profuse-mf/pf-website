import { useEffect } from "react";
import { useLocation } from "wouter";
import { getCrmSession, crmLogout } from "@/lib/crm-api";
import { Button } from "@/components/ui/button";
import { CrmNav } from "./crm-nav";

interface PartnerEntry {
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
  redirectUrl: string;
}

const PARTNERS: PartnerEntry[] = [
  {
    name: "Acko General Insurance",
    status: "Active",
    createdAt: "2026-01-15",
    redirectUrl: "https://www.acko.com",
  },
  {
    name: "Zurich Kotak General Insurance",
    status: "Active",
    createdAt: "2026-01-10",
    redirectUrl: "https://profuse.gotrackier.com/click?campaign_id=193&pub_id=260&source={passanyvalue}",
  },
  {
    name: "Policybazaar",
    status: "Active",
    createdAt: "2026-01-05",
    redirectUrl: "https://profuse.gotrackier.com/click?campaign_id=194&pub_id=260&source={passanyvalue}",
  },
];

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PartnerBoard() {
  const [, navigate] = useLocation();
  const session = getCrmSession();

  useEffect(() => {
    if (!session) navigate("/crm");
  }, []);

  function handleLogout() { crmLogout(); navigate("/crm"); }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">
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
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-0.5">Partner Board</h2>
          <p className="text-sm text-slate-400">Active insurance partners and their redirect links</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-700">{PARTNERS.length} partners</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">#</th>
                  <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Partner Name</th>
                  <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Status</th>
                  <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Created At</th>
                  <th className="text-left py-2.5 px-3 text-slate-700 font-bold text-xs uppercase tracking-wide">Redirect URL</th>
                </tr>
              </thead>
              <tbody>
                {PARTNERS.map((p, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-slate-400 text-xs">{i + 1}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{p.name}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-0.5 ${
                        p.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{fmtDate(p.createdAt)}</td>
                    <td className="py-3 px-3 max-w-xs">
                      <a
                        href={p.redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={p.redirectUrl}
                        className="text-[#1b5fb8] hover:underline truncate block max-w-xs font-mono text-xs"
                      >
                        {p.redirectUrl}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
