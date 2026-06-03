export type VehicleType = "car" | "bike";
export type StatIcon = "building" | "clock" | "shield" | "trending-up" | "file-text" | "headphones";

export interface PartnerStat {
  value: string;
  label: string;
  icon: StatIcon;
}

export interface Partner {
  id: string;
  name: string;
  urlTemplate: string;
  vehicleTypes: VehicleType[];
  logoUrl: string;
  tagline: string;
  highlight: string | null;
  claimSettlementRatio: number | null;
  stats: PartnerStat[];
  planTypes: string[];
  features: string[];
}

// Rich display supplement — local data the DB doesn't store
// Matched by id slug returned from the API
const RICH_SUPPLEMENT: Record<
  string,
  Pick<Partner, "claimSettlementRatio" | "stats" | "planTypes" | "features">
> = {
  policybazaar: {
    claimSettlementRatio: null,
    stats: [
      { value: "1,000+", label: "Network Garages",          icon: "building"    },
      { value: "24x7",   label: "Claim Settlement Support", icon: "headphones"  },
    ],
    planTypes: ["Comprehensive", "Third-Party", "Own Damage", "Add-ons"],
    features:  ["25+ insurers", "Cashless claims", "24x7 support"],
  },
  "zurich-kotak": {
    claimSettlementRatio: 98.13,
    stats: [
      { value: "5,700+",    label: "Network Garages",  icon: "building"      },
      { value: "Up to 50%", label: "No Claim Bonus",   icon: "trending-up"   },
    ],
    planTypes: ["Comprehensive", "Third-Party", "Own Damage"],
    features:  ["24x7 assistance", "Cashless claims", "Quick settlement"],
  },
  acko: {
    claimSettlementRatio: null,
    stats: [
      { value: "100%", label: "Online Process",   icon: "shield"     },
      { value: "24x7", label: "Customer Support", icon: "headphones" },
    ],
    planTypes: ["Comprehensive", "Third-Party", "Own Damage"],
    features:  ["Zero paperwork", "Instant policy", "24x7 support"],
  },
};

const DEFAULT_RICH: Pick<Partner, "claimSettlementRatio" | "stats" | "planTypes" | "features"> = {
  claimSettlementRatio: null,
  stats:     [],
  planTypes: ["Comprehensive", "Third-Party"],
  features:  ["Online process", "Cashless claims"],
};

// API response item shape (matches ListPartnersResponseItem)
interface ApiPartnerItem {
  id: string;
  name: string;
  url: string;
  vehicleTypes: string[];
  logoUrl: string;
  tagline: string;
  highlight?: string | null;
}

function apiToPartner(item: ApiPartnerItem): Partner {
  const rich = RICH_SUPPLEMENT[item.id] ?? DEFAULT_RICH;
  return {
    id:                  item.id,
    name:                item.name,
    urlTemplate:         item.url,
    vehicleTypes:        item.vehicleTypes as VehicleType[],
    logoUrl:             item.logoUrl,
    tagline:             item.tagline,
    highlight:           item.highlight ?? null,
    claimSettlementRatio: rich.claimSettlementRatio,
    stats:               rich.stats,
    planTypes:           rich.planTypes,
    features:            rich.features,
  };
}

// Hardcoded fallback (used if API fails)
const FALLBACK_PARTNERS: Partner[] = [
  {
    id:                  "policybazaar",
    name:                "Policybazaar",
    urlTemplate:         "https://profuse.gotrackier.com/click?campaign_id=194&pub_id=260&source={passanyvalue}",
    vehicleTypes:        ["car", "bike"],
    logoUrl:             "https://www.google.com/s2/favicons?domain=policybazaar.com&sz=256",
    tagline:             "India's largest insurance marketplace",
    highlight:           "Most Popular",
    claimSettlementRatio: null,
    stats:               RICH_SUPPLEMENT.policybazaar.stats,
    planTypes:           RICH_SUPPLEMENT.policybazaar.planTypes,
    features:            RICH_SUPPLEMENT.policybazaar.features,
  },
  {
    id:                  "zurich-kotak",
    name:                "Zurich Kotak General Insurance",
    urlTemplate:         "https://profuse.gotrackier.com/click?campaign_id=193&pub_id=260&source={passanyvalue}",
    vehicleTypes:        ["car", "bike"],
    logoUrl:             "https://www.google.com/s2/favicons?domain=zurichkotak.com&sz=256",
    tagline:             "Global expertise, local trust",
    highlight:           null,
    claimSettlementRatio: 98.13,
    stats:               RICH_SUPPLEMENT["zurich-kotak"].stats,
    planTypes:           RICH_SUPPLEMENT["zurich-kotak"].planTypes,
    features:            RICH_SUPPLEMENT["zurich-kotak"].features,
  },
];

export const ALL_PARTNERS = FALLBACK_PARTNERS;

export function getPartnersByType(type: VehicleType): Partner[] {
  return FALLBACK_PARTNERS.filter((p) => p.vehicleTypes.includes(type));
}

export async function fetchPublicPartners(vehicleType: VehicleType): Promise<Partner[]> {
  try {
    const res = await fetch(`/api/partners?vehicleType=${vehicleType}`);
    if (!res.ok) throw new Error("API error");
    const items = (await res.json()) as ApiPartnerItem[];
    if (!Array.isArray(items) || items.length === 0) throw new Error("Empty");
    return items.map(apiToPartner);
  } catch {
    return getPartnersByType(vehicleType);
  }
}

function mapUtmSource(raw: string | null): string {
  if (raw === "85")  return "F_85_PP";
  if (raw === "141") return "G_141_PP";
  if (raw === "171") return "W_171_PP";
  return "pp_Organic";
}

export function resolvePartnerUrl(partner: Partner, registrationNumber: string, utmSource?: string | null): string {
  const base = partner.urlTemplate.replace("{passanyvalue}", encodeURIComponent(registrationNumber));
  const mapped = mapUtmSource(utmSource ?? null);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}p1=${encodeURIComponent(mapped)}`;
}
