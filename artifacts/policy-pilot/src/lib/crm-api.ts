const CRM_TOKEN = "pf-crm-secret-2026";

export interface CrmUser {
  username: string;
  type: "admin" | "masteradmin";
}

const USERS: Array<CrmUser & { password: string }> = [
  { username: "admin", password: "12345", type: "admin" },
  { username: "pfgimadmin", password: "12345", type: "masteradmin" },
];

const SESSION_KEY = "pp_crm_session";

export function crmLogin(username: string, password: string): CrmUser | null {
  const match = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (!match) return null;
  const user: CrmUser = { username: match.username, type: match.type };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function crmLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getCrmSession(): CrmUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as CrmUser;
  } catch {}
  return null;
}

function crmFetch(path: string): Promise<Response> {
  return fetch(`/api${path}`, {
    headers: { "x-crm-token": CRM_TOKEN },
  });
}

export interface CrmStats {
  totalUsers: number;
  totalLeads: number;
  ulr: number;
}

export async function fetchCrmStats(from: string, to: string): Promise<CrmStats> {
  const res = await crmFetch(`/crm/stats?from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json() as Promise<CrmStats>;
}

export interface DayRow {
  date: string;
  count: number;
}

export interface SourceRow {
  source: string;
  count: number;
}

export interface PaginatedResult<T> {
  rows: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function fetchUsersByDate(
  page: number,
  from: string,
  to: string
): Promise<PaginatedResult<DayRow>> {
  const res = await crmFetch(`/crm/users-by-date?page=${page}&from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to fetch users by date");
  return res.json() as Promise<PaginatedResult<DayRow>>;
}

export async function fetchUsersBySource(
  page: number,
  from: string,
  to: string
): Promise<PaginatedResult<SourceRow>> {
  const res = await crmFetch(`/crm/users-by-source?page=${page}&from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to fetch users by source");
  return res.json() as Promise<PaginatedResult<SourceRow>>;
}

export async function exportUsersByDate(from: string, to: string): Promise<DayRow[]> {
  const res = await crmFetch(`/crm/users-by-date?export=1&from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to export users by date");
  const data = await res.json() as PaginatedResult<DayRow>;
  return data.rows;
}

export async function exportUsersBySource(from: string, to: string): Promise<SourceRow[]> {
  const res = await crmFetch(`/crm/users-by-source?export=1&from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to export users by source");
  const data = await res.json() as PaginatedResult<SourceRow>;
  return data.rows;
}

// ── Drill-down helpers ───────────────────────────────────────────────────────

export interface DrillSourceRow {
  source: string;
  count: number;
}

export interface DrillDateRow {
  date: string;
  count: number;
}

export async function fetchSourceByDate(date: string): Promise<DrillSourceRow[]> {
  const res = await crmFetch(`/crm/drill/source-by-date?date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch drill source-by-date");
  const data = await res.json() as { rows: DrillSourceRow[] };
  return data.rows;
}

export async function fetchDateBySource(source: string, from: string, to: string): Promise<DrillDateRow[]> {
  const res = await crmFetch(`/crm/drill/date-by-source?source=${encodeURIComponent(source)}&from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to fetch drill date-by-source");
  const data = await res.json() as { rows: DrillDateRow[] };
  return data.rows;
}

// ── Date preset helpers ──────────────────────────────────────────────────────

export const DATE_PRESETS = [
  "Today",
  "Yesterday",
  "Last 2 days",
  "Last 7 days",
  "Last 10 days",
  "This week",
  "Last 15 days",
  "Last 30 days",
  "This month",
  "Previous week",
  "Last 2 weeks",
  "Last month",
  "Last 2 months",
  "Last 3 months",
  "Last 6 months",
  "This quarter",
  "Last Quarter",
  "This year",
  "Last Year",
  "Custom",
] as const;

export type DatePreset = (typeof DATE_PRESETS)[number];

function ds(d: Date): string {
  return d.toISOString().split("T")[0]!;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function todayStr(): string {
  return ds(new Date());
}

export function getPresetDates(preset: DatePreset): { from: string; to: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (preset) {
    case "Today":
      return { from: ds(today), to: ds(today) };

    case "Yesterday": {
      const y = addDays(today, -1);
      return { from: ds(y), to: ds(y) };
    }

    case "Last 2 days":
      return { from: ds(addDays(today, -1)), to: ds(today) };

    case "Last 7 days":
      return { from: ds(addDays(today, -6)), to: ds(today) };

    case "Last 10 days":
      return { from: ds(addDays(today, -9)), to: ds(today) };

    case "This week": {
      const day = today.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      return { from: ds(addDays(today, diff)), to: ds(today) };
    }

    case "Last 15 days":
      return { from: ds(addDays(today, -14)), to: ds(today) };

    case "Last 30 days":
      return { from: ds(addDays(today, -29)), to: ds(today) };

    case "This month": {
      const first = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from: ds(first), to: ds(today) };
    }

    case "Previous week": {
      const day = today.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      const thisMonday = addDays(today, diff);
      return { from: ds(addDays(thisMonday, -7)), to: ds(addDays(thisMonday, -1)) };
    }

    case "Last 2 weeks":
      return { from: ds(addDays(today, -13)), to: ds(today) };

    case "Last month": {
      const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const last = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from: ds(first), to: ds(last) };
    }

    case "Last 2 months": {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 2);
      return { from: ds(d), to: ds(today) };
    }

    case "Last 3 months": {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 3);
      return { from: ds(d), to: ds(today) };
    }

    case "Last 6 months": {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 6);
      return { from: ds(d), to: ds(today) };
    }

    case "This quarter": {
      const q = Math.floor(today.getMonth() / 3);
      const first = new Date(today.getFullYear(), q * 3, 1);
      return { from: ds(first), to: ds(today) };
    }

    case "Last Quarter": {
      const q = Math.floor(today.getMonth() / 3);
      const lq = q === 0 ? 3 : q - 1;
      const yr = q === 0 ? today.getFullYear() - 1 : today.getFullYear();
      const first = new Date(yr, lq * 3, 1);
      const last = new Date(yr, lq * 3 + 3, 0);
      return { from: ds(first), to: ds(last) };
    }

    case "This year": {
      const first = new Date(today.getFullYear(), 0, 1);
      return { from: ds(first), to: ds(today) };
    }

    case "Last Year": {
      const first = new Date(today.getFullYear() - 1, 0, 1);
      const last = new Date(today.getFullYear() - 1, 11, 31);
      return { from: ds(first), to: ds(last) };
    }

    default:
      return { from: ds(today), to: ds(today) };
  }
}
