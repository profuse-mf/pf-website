import { useLocation } from "wouter";

const TABS = [
  { label: "Insights",           href: "/crm/dashboard" },
  { label: "User Board",         href: "/crm/userboard" },
  { label: "Application Board",  href: "/crm/appboard" },
  { label: "Partner Board",      href: "/crm/partnerboard" },
];

export function CrmNav() {
  const [location, navigate] = useLocation();
  return (
    <nav className="flex items-center gap-0 border-b border-slate-200 bg-white px-6">
      {TABS.map((t) => {
        const active = location === t.href;
        return (
          <button
            key={t.href}
            onClick={() => navigate(t.href)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              active
                ? "border-[#1b5fb8] text-[#1b5fb8]"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
