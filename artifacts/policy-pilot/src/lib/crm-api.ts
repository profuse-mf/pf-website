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

export async function fetchCrmStats(): Promise<CrmStats> {
  const res = await crmFetch("/crm/stats");
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
  page: number
): Promise<PaginatedResult<DayRow>> {
  const res = await crmFetch(`/crm/users-by-date?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch users by date");
  return res.json() as Promise<PaginatedResult<DayRow>>;
}

export async function fetchUsersBySource(
  page: number
): Promise<PaginatedResult<SourceRow>> {
  const res = await crmFetch(`/crm/users-by-source?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch users by source");
  return res.json() as Promise<PaginatedResult<SourceRow>>;
}
