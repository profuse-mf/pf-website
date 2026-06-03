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
    const ulr = totalUsers > 0 ? parseFloat((totalLeads / totalUsers).toFixed(2)) : 0;

    res.json({ totalUsers, totalLeads, ulr });
  } catch (err) {
    req.log.error({ err }, "CRM stats query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

router.get("/crm/users-by-date", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const isExport = req.query["export"] === "1";
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = isExport ? 100000 : 15;
  const offset = isExport ? 0 : (page - 1) * limit;
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
  const isExport = req.query["export"] === "1";
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = isExport ? 100000 : 15;
  const offset = isExport ? 0 : (page - 1) * limit;
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

// UTM source list for date range (for filter dropdown)
router.get("/crm/utm-sources", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const { from, to } = getDateParams(req);
  const dateFilter = from && to ? "WHERE DATE(created_at) BETWEEN ? AND ?" : "";
  const dateParams: string[] = from && to ? [from, to] : [];
  try {
    const [rows] = await crmPool!.query(
      `SELECT DISTINCT utm_source FROM pp_user ${dateFilter} ORDER BY utm_source`,
      dateParams
    );
    const sources = (rows as mysql.RowDataPacket[]).map((r) =>
      r["utm_source"] == null ? "(direct)" : String(r["utm_source"])
    );
    res.json({ sources });
  } catch (err) {
    req.log.error({ err }, "CRM utm-sources query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

// User board — paginated user+application data
router.get("/crm/users", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const isExport = req.query["export"] === "1";
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = isExport ? 100000 : 20;
  const offset = isExport ? 0 : (page - 1) * limit;
  const { from, to } = getDateParams(req);
  const source = typeof req.query["source"] === "string" ? req.query["source"] : null;

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (from && to) {
    conditions.push("DATE(p.created_at) BETWEEN ? AND ?");
    params.push(from, to);
  }
  if (source) {
    if (source === "(direct)") {
      conditions.push("p.utm_source IS NULL");
    } else {
      conditions.push("p.utm_source = ?");
      params.push(source);
    }
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const [[dataRows], [countRows]] = await Promise.all([
      crmPool!.query(
        `SELECT p.id, p.mobile, p.email, a.pincode, a.vehicle_type, a.reg_no, a.reg_year,
                a.model, a.brand, a.expiry_date, p.created_at,
                p.utm_source, p.utm_medium, p.utm_channel, p.utm_partner
         FROM pp_user p
         JOIN pp_application_master a ON p.id = a.user_id
         ${whereClause}
         ORDER BY p.id DESC
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(*) AS total
         FROM pp_user p
         JOIN pp_application_master a ON p.id = a.user_id
         ${whereClause}`,
        params
      ),
    ]);

    const total = Number((countRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const rows = (dataRows as mysql.RowDataPacket[]).map((r) => ({
      id: r["id"],
      mobile: r["mobile"] ?? "",
      email: r["email"] ?? "",
      pincode: r["pincode"] ?? "",
      vehicle_type: r["vehicle_type"] ?? "",
      reg_no: r["reg_no"] ?? "",
      reg_year: r["reg_year"] ?? "",
      model: r["model"] ?? "",
      brand: r["brand"] ?? "",
      expiry_date: r["expiry_date"] instanceof Date
        ? r["expiry_date"].toISOString().split("T")[0]
        : (r["expiry_date"] ? String(r["expiry_date"]) : ""),
      created_at: r["created_at"] instanceof Date
        ? r["created_at"].toISOString().replace("T", " ").slice(0, 19)
        : String(r["created_at"] ?? ""),
      utm_source: r["utm_source"] ?? "",
      utm_medium: r["utm_medium"] ?? "",
      utm_channel: r["utm_channel"] ?? "",
      utm_partner: r["utm_partner"] ?? "",
    }));

    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM users query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

// Drill-down: sources for a specific date
router.get("/crm/drill/source-by-date", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const date = typeof req.query["date"] === "string" ? req.query["date"] : null;
  if (!date) { res.status(400).json({ error: "date is required" }); return; }

  try {
    const [rows] = await crmPool!.query(
      `SELECT COUNT(*) AS count, utm_source
       FROM pp_user
       WHERE DATE(created_at) = ?
       GROUP BY utm_source
       ORDER BY count DESC`,
      [date]
    );
    const data = (rows as mysql.RowDataPacket[]).map((r) => ({
      source: r["utm_source"] ?? "(direct)",
      count: Number(r["count"]),
    }));
    res.json({ date, rows: data });
  } catch (err) {
    req.log.error({ err }, "CRM drill source-by-date failed");
    res.status(500).json({ error: "Query failed" });
  }
});

// Drill-down: dates for a specific source within a date range
router.get("/crm/drill/date-by-source", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const source = typeof req.query["source"] === "string" ? req.query["source"] : null;
  const from   = typeof req.query["from"]   === "string" ? req.query["from"]   : null;
  const to     = typeof req.query["to"]     === "string" ? req.query["to"]     : null;
  if (!source || !from || !to) { res.status(400).json({ error: "source, from and to are required" }); return; }

  const sourceFilter = source === "(direct)" ? "utm_source IS NULL" : "utm_source = ?";
  const params: string[] = source === "(direct)" ? [from, to] : [source, from, to];

  try {
    const [rows] = await crmPool!.query(
      `SELECT COUNT(*) AS count, DATE(created_at) AS date
       FROM pp_user
       WHERE ${sourceFilter}
         AND DATE(created_at) BETWEEN ? AND ?
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at) DESC`,
      params
    );
    const data = (rows as mysql.RowDataPacket[]).map((r) => ({
      date: r["date"] instanceof Date ? r["date"].toISOString().split("T")[0] : String(r["date"]),
      count: Number(r["count"]),
    }));
    res.json({ source, from, to, rows: data });
  } catch (err) {
    req.log.error({ err }, "CRM drill date-by-source failed");
    res.status(500).json({ error: "Query failed" });
  }
});

export { CRM_TOKEN };
export default router;
