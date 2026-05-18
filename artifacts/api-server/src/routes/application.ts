import { Router, type IRouter } from "express";

const router: IRouter = Router();

const EXTERNAL_API = "https://pp.moneyfatafat.com/application/create";

router.post("/application/create", async (req, res): Promise<void> => {
  try {
    const response = await fetch(EXTERNAL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    res.status(response.status).json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to proxy application/create");
    res.status(502).json({ error: "Failed to reach upstream API" });
  }
});

export default router;
