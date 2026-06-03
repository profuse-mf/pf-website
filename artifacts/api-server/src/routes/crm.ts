import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import mysql from "mysql2/promise";

const router: IRouter = Router();

const CRM_TOKEN = "pf-crm-secret-2026";

const crmUrl = process.env["CRM_MYSQL_URL"];
const crmPool = crmUrl ? mysql.createPool(crmUrl) : null;

// Create pp_partners table and seed initial partners on startup
if (crmPool) {
  (async () => {
    try {
      await crmPool.query(`
        CREATE TABLE IF NOT EXISTS pp_partners (
          id          INT PRIMARY KEY AUTO_INCREMENT,
          name        VARCHAR(50) NOT NULL,
          redirect_url TEXT NOT NULL,
          status      TINYINT(1) NOT NULL DEFAULT 1,
          created     DATETIME NOT NULL,
          updated     DATETIME NOT NULL
        )
      `);
      const [rows] = await crmPool.query("SELECT COUNT(*) AS cnt FROM pp_partners");
      const cnt = Number((rows as mysql.RowDataPacket[])[0]?.cnt ?? 0);
      if (cnt === 0) {
        const now = new Date().toISOString().replace("T", " ").slice(0, 19);
        await crmPool.query(
          `INSERT INTO pp_partners (name, redirect_url, status, created, updated) VALUES
           ('Acko General Insurance',          'https://www.acko.com',                                                                              1, ?, ?),
           ('Zurich Kotak General Insurance',  'https://profuse.gotrackier.com/click?campaign_id=193&pub_id=260&source={passanyvalue}',             1, ?, ?),
           ('Policybazaar',                    'https://profuse.gotrackier.com/click?campaign_id=194&pub_id=260&source={passanyvalue}',             1, ?, ?)`,
          [now, now, now, now, now, now]
        );
      }
    } catch (e) {
      // non-fatal — log but don't crash
      console.error("pp_partners init failed:", e);
    }
  })();
}

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

  // Build WHERE for the count query (only p-level conditions + EXISTS)
  const existsClause = conditions.length > 0
    ? `WHERE ${conditions.join(" AND ")} AND EXISTS (SELECT 1 FROM pp_application_master WHERE user_id = p.id)`
    : `WHERE EXISTS (SELECT 1 FROM pp_application_master WHERE user_id = p.id)`;

  try {
    const [[dataRows], [countRows]] = await Promise.all([
      crmPool!.query(
        `SELECT p.id, p.mobile, p.email, a.pincode, a.vehicle_type, a.reg_no, a.reg_year,
                a.model, a.brand, a.expiry_date, p.created_at,
                p.utm_source, p.utm_medium, p.utm_channel, p.utm_partner
         FROM pp_user p
         INNER JOIN pp_application_master a
           ON a.id = (SELECT id FROM pp_application_master WHERE user_id = p.id ORDER BY id DESC LIMIT 1)
         ${whereClause}
         ORDER BY p.id ASC
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(*) AS total FROM pp_user p ${existsClause}`,
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

// Application Board — one row per user, aggregated application stats
router.get("/crm/appboard", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const { from, to } = getDateParams(req);
  const source = typeof req.query["source"] === "string" ? req.query["source"].trim() : "";
  const exportAll = req.query["export"] === "1";
  const page   = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit  = exportAll ? 100_000 : 20;
  const offset = exportAll ? 0 : (page - 1) * limit;

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (from && to) {
    conditions.push("DATE(a.created_at) BETWEEN ? AND ?");
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
        `SELECT p.id AS userid, p.mobile, p.email, p.created_at,
                p.utm_source,
                COUNT(a.id)       AS total_applications,
                MAX(a.created_at) AS last_application
         FROM pp_user p
         JOIN pp_application_master a ON p.id = a.user_id
         ${whereClause}
         GROUP BY p.id, p.mobile, p.email, p.created_at, p.utm_source
         ORDER BY p.id ASC
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(DISTINCT p.id) AS total
         FROM pp_user p
         JOIN pp_application_master a ON p.id = a.user_id
         ${whereClause}`,
        params
      ),
    ]);

    const total = Number((countRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const fmtDt = (v: unknown) =>
      v instanceof Date
        ? v.toISOString().replace("T", " ").slice(0, 19)
        : String(v ?? "");

    const rows = (dataRows as mysql.RowDataPacket[]).map((r) => {
      const apps = Number(r["total_applications"] ?? 0);
      return {
        userid:             r["userid"],
        mobile:             r["mobile"] ?? "",
        email:              r["email"]  ?? "",
        created_at:         fmtDt(r["created_at"]),
        utm_source:         r["utm_source"] ?? "",
        total_applications: apps,
        last_application:   fmtDt(r["last_application"]),
        ulr:                apps,
      };
    });

    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM appboard query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

// Applications by pincode
router.get("/crm/apps-by-pincode", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const isExport = req.query["export"] === "1";
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = isExport ? 100_000 : 15;
  const offset = isExport ? 0 : (page - 1) * limit;
  const { from, to } = getDateParams(req);

  const dateFilter = from && to ? "WHERE DATE(created_at) BETWEEN ? AND ?" : "";
  const dateParams: string[] = from && to ? [from, to] : [];

  try {
    const [[dataRows], [countRows]] = await Promise.all([
      crmPool!.query(
        `SELECT COUNT(*) AS count, pincode
         FROM pp_application_master
         ${dateFilter}
         GROUP BY pincode
         ORDER BY count DESC
         LIMIT ? OFFSET ?`,
        [...dateParams, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(DISTINCT pincode) AS total FROM pp_application_master ${dateFilter}`,
        dateParams
      ),
    ]);

    const total = Number((countRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const rows = (dataRows as mysql.RowDataPacket[]).map((r) => ({
      pincode: String(r["pincode"] ?? ""),
      count: Number(r["count"]),
    }));
    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM apps-by-pincode query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

// Applications by vehicle type
router.get("/crm/apps-by-vehicle", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const isExport = req.query["export"] === "1";
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = isExport ? 100_000 : 15;
  const offset = isExport ? 0 : (page - 1) * limit;
  const { from, to } = getDateParams(req);

  const dateFilter = from && to ? "WHERE DATE(created_at) BETWEEN ? AND ?" : "";
  const dateParams: string[] = from && to ? [from, to] : [];

  try {
    const [[dataRows], [countRows]] = await Promise.all([
      crmPool!.query(
        `SELECT COUNT(*) AS count, vehicle_type
         FROM pp_application_master
         ${dateFilter}
         GROUP BY vehicle_type
         ORDER BY count DESC
         LIMIT ? OFFSET ?`,
        [...dateParams, limit, offset]
      ),
      crmPool!.query(
        `SELECT COUNT(DISTINCT vehicle_type) AS total FROM pp_application_master ${dateFilter}`,
        dateParams
      ),
    ]);

    const total = Number((countRows as mysql.RowDataPacket[])[0]?.total ?? 0);
    const rows = (dataRows as mysql.RowDataPacket[]).map((r) => ({
      vehicle_type: String(r["vehicle_type"] ?? ""),
      count: Number(r["count"]),
    }));
    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM apps-by-vehicle query failed");
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

// Partner Board — list all partners
router.get("/crm/partners", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  try {
    const [rows] = await crmPool!.query(
      "SELECT id, name, redirect_url, status, created, updated FROM pp_partners ORDER BY id ASC"
    );
    const fmtDt = (v: unknown) =>
      v instanceof Date ? v.toISOString().replace("T", " ").slice(0, 19) : String(v ?? "");
    const data = (rows as mysql.RowDataPacket[]).map((r) => ({
      id:           r["id"],
      name:         r["name"],
      redirect_url: r["redirect_url"],
      status:       Number(r["status"]),
      created:      fmtDt(r["created"]),
      updated:      fmtDt(r["updated"]),
    }));
    res.json({ rows: data });
  } catch (err) {
    req.log.error({ err }, "CRM partners list failed");
    res.status(500).json({ error: "Query failed" });
  }
});

// Partner Board — add new partner
router.post("/crm/partners", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const { name, redirect_url, status } = req.body as {
    name?: string;
    redirect_url?: string;
    status?: number;
  };

  if (!name?.trim() || !redirect_url?.trim() || status === undefined) {
    res.status(400).json({ error: "name, redirect_url and status are required" });
    return;
  }

  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  try {
    const [result] = await crmPool!.query(
      "INSERT INTO pp_partners (name, redirect_url, status, created, updated) VALUES (?, ?, ?, ?, ?)",
      [name.trim(), redirect_url.trim(), status ? 1 : 0, now, now]
    );
    const insertId = (result as mysql.ResultSetHeader).insertId;
    res.status(201).json({
      id:           insertId,
      name:         name.trim(),
      redirect_url: redirect_url.trim(),
      status:       status ? 1 : 0,
      created:      now,
      updated:      now,
    });
  } catch (err) {
    req.log.error({ err }, "CRM partner insert failed");
    res.status(500).json({ error: "Insert failed" });
  }
});

// Partner Board — update a single field (name | redirect_url | status)
router.patch("/crm/partners/:id", requireCrmAuth, requireCrmDb, async (req, res): Promise<void> => {
  const id = Number(req.params["id"]);
  if (!Number.isFinite(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { name, redirect_url, status } = req.body as {
    name?: string;
    redirect_url?: string;
    status?: number;
  };

  const setClauses: string[]  = [];
  const values: (string | number)[] = [];

  if (name !== undefined) {
    if (!name.trim()) { res.status(400).json({ error: "name cannot be empty" }); return; }
    setClauses.push("name = ?");
    values.push(name.trim());
  }
  if (redirect_url !== undefined) {
    if (!redirect_url.trim()) { res.status(400).json({ error: "redirect_url cannot be empty" }); return; }
    setClauses.push("redirect_url = ?");
    values.push(redirect_url.trim());
  }
  if (status !== undefined) {
    setClauses.push("status = ?");
    values.push(status ? 1 : 0);
  }

  if (setClauses.length === 0) {
    res.status(400).json({ error: "At least one field (name, redirect_url, status) must be provided" });
    return;
  }

  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  setClauses.push("updated = ?");
  values.push(now);
  values.push(id);

  try {
    const [result] = await crmPool!.query(
      `UPDATE pp_partners SET ${setClauses.join(", ")} WHERE id = ?`,
      values
    );
    if ((result as mysql.ResultSetHeader).affectedRows === 0) {
      res.status(404).json({ error: "Partner not found" });
      return;
    }
    const [rows] = await crmPool!.query(
      "SELECT id, name, redirect_url, status, created, updated FROM pp_partners WHERE id = ?",
      [id]
    );
    const r = (rows as mysql.RowDataPacket[])[0];
    const fmtDt = (v: unknown) =>
      v instanceof Date ? v.toISOString().replace("T", " ").slice(0, 19) : String(v ?? "");
    res.json({
      id:           r["id"],
      name:         r["name"],
      redirect_url: r["redirect_url"],
      status:       Number(r["status"]),
      created:      fmtDt(r["created"]),
      updated:      fmtDt(r["updated"]),
    });
  } catch (err) {
    req.log.error({ err }, "CRM partner update failed");
    res.status(500).json({ error: "Update failed" });
  }
});

export { CRM_TOKEN };
export default router;
