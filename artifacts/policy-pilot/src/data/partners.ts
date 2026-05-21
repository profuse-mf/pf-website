export type VehicleType = "car" | "bike";

export interface Partner {
  id: string;
  name: string;
  urlTemplate: string;
  vehicleTypes: VehicleType[];
  logoUrl: string;
  tagline: string;
  highlight: string | null;
  claimSettlementRatio: number;
  networkGarages: string;
  rating: number;
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
    claimSettlementRatio: 99.5,
    networkGarages: "7,500+",
    rating: 4.4,
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
    claimSettlementRatio: 97.8,
    networkGarages: "10,000+",
    rating: 4.3,
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
    claimSettlementRatio: 98.5,
    networkGarages: "4,000+",
    rating: 4.1,
    features: ["Global network", "Cashless claims", "Quick settlement"],
  },
];

export function getPartnersByType(type: VehicleType): Partner[] {
  return ALL_PARTNERS.filter((p) => p.vehicleTypes.includes(type));
}

export function resolvePartnerUrl(partner: Partner, registrationNumber: string): string {
  return partner.urlTemplate.replace("{passanyvalue}", encodeURIComponent(registrationNumber));
}
