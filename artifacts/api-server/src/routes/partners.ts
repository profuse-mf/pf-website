import { Router, type IRouter } from "express";
import { ListPartnersQueryParams, ListPartnersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const PARTNERS = [
  {
    id: "acko-car",
    name: "Acko Car Insurance",
    url: "https://www.acko.com/",
    vehicleTypes: ["car"],
    logoUrl: "",
    tagline: "Direct insurer with zero paperwork",
    highlight: "Lowest Premium",
  },
  {
    id: "acko-bike",
    name: "Acko Bike Insurance",
    url: "https://www.acko.com/two-wheeler-insurance/",
    vehicleTypes: ["bike"],
    logoUrl: "",
    tagline: "100% online bike insurance, instant policy",
    highlight: null,
  },
  {
    id: "policybazaar",
    name: "Policybazaar",
    url: "https://ci.policybazaar.com/v1?utm_content=home_v11",
    vehicleTypes: ["car", "bike"],
    logoUrl: "",
    tagline: "India's largest insurance marketplace",
    highlight: "Most Popular",
  },
  {
    id: "zurich-kotak",
    name: "Zurich Kotak General Insurance",
    url: "https://www.zurichkotak.com/",
    vehicleTypes: ["car", "bike"],
    logoUrl: "",
    tagline: "Global expertise, local trust",
    highlight: null,
  },
  {
    id: "bajaj-allianz",
    name: "Bajaj Allianz General Insurance",
    url: "https://www.bajajgeneralinsurance.com/motor-insurance/car-insurance-online.html",
    vehicleTypes: ["car", "bike"],
    logoUrl: "",
    tagline: "Trusted by 3 crore+ customers",
    highlight: "Trusted Brand",
  },
  {
    id: "hdfc-ergo",
    name: "HDFC ERGO General Insurance",
    url: "https://www.hdfcergo.com/car-insurance",
    vehicleTypes: ["car", "bike"],
    logoUrl: "",
    tagline: "Claim settlement ratio 99.8%",
    highlight: "Best Claim Support",
  },
];

router.get("/partners", async (req, res): Promise<void> => {
  const query = ListPartnersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const vehicleType = query.data.vehicleType;

  const filtered = vehicleType
    ? PARTNERS.filter((p) => p.vehicleTypes.includes(vehicleType))
    : PARTNERS;

  res.json(ListPartnersResponse.parse(filtered));
});

export default router;
