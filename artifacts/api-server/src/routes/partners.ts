import { Router, type IRouter } from "express";
import mysql from "mysql2/promise";
import { ListPartnersQueryParams, ListPartnersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const crmUrl = process.env["CRM_MYSQL_URL"];
const crmPool = crmUrl ? mysql.createPool(crmUrl) : null;

// Supplementary display metadata — keyed by name keyword match
// Controls id slug (used by featured-card logic), vehicleTypes, logo, tagline, highlight
const SUPPLEMENT = [
  {
    matches: (n: string) => n.toLowerCase().includes("policybazaar"),
    id: "policybazaar",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://www.google.com/s2/favicons?domain=policybazaar.com&sz=256",
    tagline: "India's largest insurance marketplace",
    highlight: "Most Popular",
  },
  {
    matches: (n: string) =>
      n.toLowerCase().includes("zurich") || n.toLowerCase().includes("kotak"),
    id: "zurich-kotak",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://www.google.com/s2/favicons?domain=zurichkotak.com&sz=256",
    tagline: "Global expertise, local trust",
    highlight: null,
  },
  {
    matches: (n: string) => n.toLowerCase().includes("acko"),
    id: "acko",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://www.google.com/s2/favicons?domain=acko.com&sz=256",
    tagline: "Direct insurer with zero paperwork",
    highlight: null,
  },
];

function getSupp(name: string, dbId: number, redirectUrl: string) {
  const s = SUPPLEMENT.find((x) => x.matches(name));
  if (s) {
    return {
      id:           s.id,
      vehicleTypes: s.vehicleTypes,
      logoUrl:      s.logoUrl,
      tagline:      s.tagline,
      highlight:    s.highlight ?? null,
    };
  }
  // Unknown partner — derive favicon from redirect_url domain
  let logoUrl = "";
  try {
    const url = new URL(redirectUrl);
    logoUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`;
  } catch {}
  return {
    id:           `partner-${dbId}`,
    vehicleTypes: ["car", "bike"] as string[],
    logoUrl,
    tagline:      name,
    highlight:    null,
  };
}

router.get("/partners", async (req, res): Promise<void> => {
  const query = ListPartnersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const vehicleType = query.data.vehicleType;

  // ── Fetch active partners from MySQL ──────────────────────────────────────
  if (crmPool) {
    try {
      const [rows] = await crmPool.query(
        "SELECT id, name, redirect_url FROM pp_partners WHERE status = 1 ORDER BY id ASC"
      );

      const partners = (rows as mysql.RowDataPacket[])
        .map((r) => {
          const supp = getSupp(String(r["name"]), Number(r["id"]), String(r["redirect_url"]));
          return {
            ...supp,
            name: String(r["name"]),
            url:  String(r["redirect_url"]),
          };
        })
        .filter((p) => !vehicleType || p.vehicleTypes.includes(vehicleType));

      res.json(ListPartnersResponse.parse(partners));
      return;
    } catch {
      // fall through to static fallback below
    }
  }

  // ── Static fallback (no DB or query error) ────────────────────────────────
  const STATIC = [
    {
      id: "policybazaar",
      name: "Policybazaar",
      url: "https://profuse.gotrackier.com/click?campaign_id=194&pub_id=260&source={passanyvalue}",
      vehicleTypes: ["car", "bike"],
      logoUrl: "https://www.google.com/s2/favicons?domain=policybazaar.com&sz=256",
      tagline: "India's largest insurance marketplace",
      highlight: "Most Popular",
    },
    {
      id: "zurich-kotak",
      name: "Zurich Kotak General Insurance",
      url: "https://profuse.gotrackier.com/click?campaign_id=193&pub_id=260&source={passanyvalue}",
      vehicleTypes: ["car", "bike"],
      logoUrl: "https://www.google.com/s2/favicons?domain=zurichkotak.com&sz=256",
      tagline: "Global expertise, local trust",
      highlight: null,
    },
  ];

  const filtered = vehicleType
    ? STATIC.filter((p) => p.vehicleTypes.includes(vehicleType))
    : STATIC;

  res.json(ListPartnersResponse.parse(filtered));
});

export default router;
