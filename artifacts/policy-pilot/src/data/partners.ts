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

export const ALL_PARTNERS: Partner[] = [
  {
    id: "acko-car",
    name: "Acko Car Insurance",
    urlTemplate: "https://profuse.gotrackier.com/click?campaign_id=208&pub_id=260&source={passanyvalue}",
    vehicleTypes: ["car"],
    logoUrl: "https://www.google.com/s2/favicons?domain=acko.com&sz=256",
    tagline: "Direct insurer with zero paperwork",
    highlight: "Lowest Premium",
    claimSettlementRatio: 94.54,
    stats: [
      { value: "11.6M", label: "Policies Issued", icon: "file-text" },
      { value: "4.5L",  label: "Claims Settled",  icon: "shield" },
    ],
    planTypes: ["Comprehensive", "Third-Party", "Own Damage"],
    features: ["Zero paperwork", "Cashless claims", "Instant policy"],
  },
  {
    id: "policybazaar",
    name: "Policybazaar",
    urlTemplate: "https://profuse.gotrackier.com/click?campaign_id=194&pub_id=260&source={passanyvalue}",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://www.google.com/s2/favicons?domain=policybazaar.com&sz=256",
    tagline: "India's largest insurance marketplace",
    highlight: "Most Popular",
    claimSettlementRatio: null,
    stats: [
      { value: "1,000+", label: "Network Garages",   icon: "building" },
      { value: "24x7",   label: "Claim Settlement Support", icon: "headphones" },
    ],
    planTypes: ["Comprehensive", "Third-Party", "Own Damage", "Add-ons"],
    features: ["25+ insurers", "Cashless claims", "24x7 support"],
  },
  {
    id: "zurich-kotak",
    name: "Zurich Kotak General Insurance",
    urlTemplate: "https://profuse.gotrackier.com/click?campaign_id=193&pub_id=260&source={passanyvalue}",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://www.google.com/s2/favicons?domain=zurichkotak.com&sz=256",
    tagline: "Global expertise, local trust",
    highlight: null,
    claimSettlementRatio: null,
    stats: [
      { value: "5,700+",  label: "Network Garages",  icon: "building" },
      { value: "Up to 50%", label: "No Claim Bonus", icon: "trending-up" },
    ],
    planTypes: ["Comprehensive", "Third-Party", "Own Damage"],
    features: ["24x7 assistance", "Cashless claims", "Quick settlement"],
  },
];

export function getPartnersByType(type: VehicleType): Partner[] {
  return ALL_PARTNERS.filter((p) => p.vehicleTypes.includes(type));
}

export function resolvePartnerUrl(partner: Partner, registrationNumber: string): string {
  return partner.urlTemplate.replace("{passanyvalue}", encodeURIComponent(registrationNumber));
}
