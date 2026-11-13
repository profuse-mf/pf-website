import { Router, type IRouter } from "express";

const router: IRouter = Router();

// Prefer internal pp-api (same host) — avoids public nginx 60s hairpin timeout.
// Override with PP_CREATE_URL if needed.
const EXTERNAL_API =
  process.env.PP_CREATE_URL ||
  "http://127.0.0.1:5000/application/create";

const UPSTREAM_TIMEOUT_MS = Number(process.env.PP_CREATE_TIMEOUT_MS || 55000);

router.post("/application/create", async (req, res): Promise<void> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(EXTERNAL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      signal: controller.signal,
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
    const timedOut =
      err instanceof Error &&
      (err.name === "AbortError" || /aborted/i.test(err.message));

    req.log.error({ err, timedOut }, "Failed to proxy application/create");

    if (timedOut) {
      // Soft-fail so website can fall back to Trackier/offers
      res.status(200).json({
        success: false,
        redirect_url: null,
        error: "Upstream create timed out",
      });
      return;
    }

    res.status(502).json({ error: "Failed to reach upstream API" });
  } finally {
    clearTimeout(timeoutId);
  }
});

export default router;
