import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { pool } from "@workspace/db";

const router: IRouter = Router();

const CRM_TOKEN = "pf-crm-secret-2026";

function requireCrmAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["x-crm-token"];
  if (token !== CRM_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/crm/stats", requireCrmAuth, async (req, res): Promise<void> => {
  try {
    const [usersResult, leadsResult] = await Promise.all([
      pool.query("SELECT MAX(id) AS total FROM pp_user"),
      pool.query("SELECT MAX(id) AS total FROM pp_applications"),
    ]);

    const totalUsers = Number(usersResult.rows[0]?.total ?? 0);
    const totalLeads = Number(leadsResult.rows[0]?.total ?? 0);
    const ulr = totalLeads > 0 ? parseFloat((totalUsers / totalLeads).toFixed(2)) : 0;

    res.json({ totalUsers, totalLeads, ulr });
  } catch (err) {
    req.log.error({ err }, "CRM stats query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

router.get("/crm/users-by-date", requireCrmAuth, async (req, res): Promise<void> => {
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = 15;
  const offset = (page - 1) * limit;

  try {
    const [dataResult, countResult] = await Promise.all([
      pool.query(
        `SELECT COUNT(*) AS count, DATE(created_at) AS date
         FROM pp_user
         GROUP BY DATE(created_at)
         ORDER BY DATE(created_at) DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query(
        "SELECT COUNT(DISTINCT DATE(created_at)) AS total FROM pp_user"
      ),
    ]);

    const total = Number(countResult.rows[0]?.total ?? 0);
    const rows = dataResult.rows.map((r: { date: string; count: string }) => ({
      date: r.date,
      count: Number(r.count),
    }));

    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM users-by-date query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

router.get("/crm/users-by-source", requireCrmAuth, async (req, res): Promise<void> => {
  const page = Math.max(1, parseInt(String(req.query["page"] ?? "1"), 10));
  const limit = 15;
  const offset = (page - 1) * limit;

  try {
    const [dataResult, countResult] = await Promise.all([
      pool.query(
        `SELECT COUNT(*) AS count, utm_source
         FROM pp_user
         GROUP BY utm_source
         ORDER BY utm_source DESC NULLS LAST
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query(
        "SELECT COUNT(DISTINCT utm_source) AS total FROM pp_user"
      ),
    ]);

    const total = Number(countResult.rows[0]?.total ?? 0);
    const rows = dataResult.rows.map((r: { utm_source: string | null; count: string }) => ({
      source: r.utm_source ?? "(direct)",
      count: Number(r.count),
    }));

    res.json({ rows, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    req.log.error({ err }, "CRM users-by-source query failed");
    res.status(500).json({ error: "Query failed" });
  }
});

export { CRM_TOKEN };
export default router;
