import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import mysql from "mysql2/promise";

const router: IRouter = Router();

const CRM_TOKEN = "pf-crm-secret-2026";

const crmUrl = process.env["CRM_MYSQL_URL"];
const crmPool = crmUrl ? mysql.createPool(crmUrl) : null;

function requireCrmAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["x-crm-token"];
  if (token !== CRM_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function requireCrmDb(req: Request, res: Response, next: NextFunction): void {
  if (!crmPool) {
    res.status(503).json({ error: "CRM_MYSQL_URL is not configured" });
    return;
  }
  next();
}

function getDateParams(req: Request): { from: string | null; to: string | null } {
  const from = typeof req.query["from"] === "string" ? req.query["from"] : null;
  const to = typeof req.query["to"] === "string" ? req.query["to"] : null;
  return { from, to };
}

router.get("/crm/stats", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const { from, to } = getDateParams(req);

  try {
    let usersQuery: string;
    let leadsQuery: string;
    const params: string[] = [];

    if (from && to) {
      usersQuery = "SELECT COUNT(*) AS total FROM pp_user WHERE DATE(created_at) BETWEEN ? AND ?";
      leadsQuery = "SELECT COUNT(*) AS total FROM pp_application_master WHERE DATE(created_at) BETWEEN ? AND ?";
      params.push(from, to, from, to);
    } else {
      usersQuery = "SELECT MAX(id) AS total FROM pp_user";
      leadsQuery = "SELECT MAX(id) AS total FROM pp_application_master";
    }

    const [[usersRows], [leadsRows]] = await Promise.all([
      crmPool!.query(usersQuery, from && to ? [from, to] : []),
      crmPool!.query(leadsQuery, from && to ? [from, to] : []),
    ]);

    const totalUsers = Number((usersRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const totalLeads = Number((leadsRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const ulr = totalLeads > 0 ? parseFloat((totalUsers / totalLeads).toFixed(2)) : 0;

    res.json({ totalUsers, totalLeads, ulr });
  } catch (err) {
    req.log.error({ err }, "CRM stats query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

router.get("/crm/users-by-date", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = 15;
  const offset = (page - 1) * limit;
  const { from, to } = getDateParams(req);

  const dateFilter = from && to ? "WHERE DATE(created_at) BETWEEN ? AND ?" : "";
  const dateParams: string[] = from && to ? [from, to] : [];

  try {
    const [[dataRows], [countRows]] = await Promise.all([
      crmPool!.query(
        `SELECT COUNT(*) AS count, DATE(created_at) AS date
         FROM pp_user
         ${dateFilter}
         GROUP BY DATE(created_at)
         ORDER BY DATE(created_at) DESC
         LIMIT ? OFFSET ?`,
        [...dateParams, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(DISTINCT DATE(created_at)) AS total FROM pp_user ${dateFilter}`,
        dateParams
      ),
    ]);

    const total = Number((countRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const rows = (dataRows as mysql.RowDataPacket[]).map((r) => ({
      date: r["date"] instanceof Date
        ? r["date"].toISOString().split("T")[0]
        : String(r["date"]),
      count: Number(r["count"]),
    }));

    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM users-by-date query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

router.get("/crm/users-by-source", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = 15;
  const offset = (page - 1) * limit;
  const { from, to } = getDateParams(req);

  const dateFilter = from && to ? "WHERE DATE(created_at) BETWEEN ? AND ?" : "";
  const dateParams: string[] = from && to ? [from, to] : [];

  try {
    const [[dataRows], [countRows]] = await Promise.all([
      crmPool!.query(
        `SELECT COUNT(*) AS count, utm_source
         FROM pp_user
         ${dateFilter}
         GROUP BY utm_source
         ORDER BY utm_source DESC
         LIMIT ? OFFSET ?`,
        [...dateParams, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(DISTINCT utm_source) AS total FROM pp_user ${dateFilter}`,
        dateParams
      ),
    ]);

    const total = Number((countRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const rows = (dataRows as mysql.RowDataPacket[]).map((r) => ({
      source: r["utm_source"] ?? "(direct)",
      count: Number(r["count"]),
    }));

    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM users-by-source query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

export { CRM_TOKEN };
export default router;
