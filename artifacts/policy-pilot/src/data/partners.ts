export type VehicleType = "car" | "bike";

export interface Partner {
  id: string;
  name: string;
  url: string;
  vehicleTypes: VehicleType[];
  logoUrl: string;
  tagline: string;
  highlight: string | null;
}

export const ALL_PARTNERS: Partner[] = [
  {
    id: "acko-car",
    name: "Acko Car Insurance",
    url: "https://www.acko.com/",
    vehicleTypes: ["car"],
    logoUrl: "https://logo.clearbit.com/acko.com",
    tagline: "Direct insurer with zero paperwork",
    highlight: "Lowest Premium",
  },
  {
    id: "acko-bike",
    name: "Acko Bike Insurance",
    url: "https://www.acko.com/two-wheeler-insurance/",
    vehicleTypes: ["bike"],
    logoUrl: "https://logo.clearbit.com/acko.com",
    tagline: "100% online bike insurance, instant policy",
    highlight: null,
  },
  {
    id: "policybazaar",
    name: "Policybazaar",
    url: "https://ci.policybazaar.com/v1?utm_content=home_v11",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://logo.clearbit.com/policybazaar.com",
    tagline: "India's largest insurance marketplace",
    highlight: "Most Popular",
  },
  {
    id: "zurich-kotak",
    name: "Zurich Kotak General Insurance",
    url: "https://www.zurichkotak.com/",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://logo.clearbit.com/zurichkotak.com",
    tagline: "Global expertise, local trust",
    highlight: null,
  },
  {
    id: "bajaj-allianz",
    name: "Bajaj Allianz General Insurance",
    url: "https://www.bajajgeneralinsurance.com/motor-insurance/car-insurance-online.html",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://logo.clearbit.com/bajajgeneralinsurance.com",
    tagline: "Trusted by 3 crore+ customers",
    highlight: "Trusted Brand",
  },
  {
    id: "hdfc-ergo",
    name: "HDFC ERGO General Insurance",
    url: "https://www.hdfcergo.com/car-insurance",
    vehicleTypes: ["car", "bike"],
    logoUrl: "https://logo.clearbit.com/hdfcergo.com",
    tagline: "Claim settlement ratio 99.8%",
    highlight: "Best Claim Support",
  },
];

export function getPartnersByType(type: VehicleType): Partner[] {
  return ALL_PARTNERS.filter((p) => p.vehicleTypes.includes(type));
}
