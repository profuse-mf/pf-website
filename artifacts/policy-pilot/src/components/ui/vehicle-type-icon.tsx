import React from "react";

export type BodyType =
  | "hatchback"
  | "sedan"
  | "suv"
  | "compact-suv"
  | "muv"
  | "crossover"
  | "electric"
  | "luxury"
  | "scooter"
  | "sports"
  | "cruiser"
  | "adventure"
  | "commuter";

export const BODY_TYPE_LABEL: Record<BodyType, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  suv: "SUV",
  "compact-suv": "Compact SUV",
  muv: "MUV",
  crossover: "Crossover",
  electric: "Electric",
  luxury: "Luxury",
  scooter: "Scooter",
  sports: "Sports",
  cruiser: "Cruiser",
  adventure: "Adventure",
  commuter: "Commuter",
};

export const BODY_TYPE_COLOR: Record<BodyType, string> = {
  hatchback: "bg-blue-50 text-blue-600 border-blue-200",
  sedan: "bg-purple-50 text-purple-600 border-purple-200",
  suv: "bg-green-50 text-green-700 border-green-200",
  "compact-suv": "bg-teal-50 text-teal-600 border-teal-200",
  muv: "bg-orange-50 text-orange-600 border-orange-200",
  crossover: "bg-indigo-50 text-indigo-600 border-indigo-200",
  electric: "bg-emerald-50 text-emerald-600 border-emerald-200",
  luxury: "bg-amber-50 text-amber-700 border-amber-200",
  scooter: "bg-pink-50 text-pink-600 border-pink-200",
  sports: "bg-red-50 text-red-600 border-red-200",
  cruiser: "bg-amber-50 text-amber-700 border-amber-200",
  adventure: "bg-orange-50 text-orange-700 border-orange-200",
  commuter: "bg-slate-50 text-slate-600 border-slate-200",
};

interface IconProps {
  className?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   CAR ICONS — clean minimal line drawings, no body fill, front faces RIGHT.
   Stroke-only body; glass area gets a very subtle transparent fill only.
   Wheels: open circles with small hub dot.
───────────────────────────────────────────────────────────────────────────── */

const STROKE = { stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, fill: "none" };
const GLASS = { fill: "currentColor", fillOpacity: 0.13, stroke: "currentColor", strokeWidth: 1, strokeLinejoin: "round" as const };
const WHEEL_OUTER = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
const WHEEL_HUB = { fill: "currentColor", fillOpacity: 0.55 };

function HatchbackIcon({ className = "w-8 h-4" }: IconProps) {
  // Compact, steep angled rear (2-box). Roof sits between y=5–6.
  return (
    <svg viewBox="0 0 58 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,20 L8,14 L14,6 L42,6 L50,14 L54,20 L54,23 Z" />
      <path {...GLASS} d="M14,6 L42,6 L50,14 L8,14 Z" />
      <circle {...WHEEL_OUTER} cx="13" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="13" cy="23" r="1.7" />
      <circle {...WHEEL_OUTER} cx="45" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="45" cy="23" r="1.7" />
    </svg>
  );
}

function SedanIcon({ className = "w-9 h-4" }: IconProps) {
  // 3-box: distinct trunk behind the C-pillar line. Longer roof.
  return (
    <svg viewBox="0 0 66 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,20 L10,17 L14,14 L19,6 L47,6 L55,14 L60,20 L60,23 Z" />
      {/* trunk lid horizontal gives the 3-box look: from x=4–14 below beltline */}
      <path {...GLASS} d="M19,6 L47,6 L55,14 L14,14 Z" />
      <circle {...WHEEL_OUTER} cx="14" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="14" cy="23" r="1.7" />
      <circle {...WHEEL_OUTER} cx="52" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="52" cy="23" r="1.7" />
    </svg>
  );
}

function SuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Tall, boxy, near-vertical sides. Roof at y=3 (tallest body type).
  return (
    <svg viewBox="0 0 58 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,19 L6,3 L52,3 L54,19 L54,23 Z" />
      <path {...GLASS} d="M6,3 L52,3 L54,14 L6,14 Z" />
      <circle {...WHEEL_OUTER} cx="13" cy="23" r="5.5" />
      <circle {...WHEEL_HUB} cx="13" cy="23" r="1.9" />
      <circle {...WHEEL_OUTER} cx="45" cy="23" r="5.5" />
      <circle {...WHEEL_HUB} cx="45" cy="23" r="1.9" />
    </svg>
  );
}

function CompactSuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Slightly lower than full SUV. Rear has a gentle slope inward.
  return (
    <svg viewBox="0 0 58 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,19 L8,5 L48,5 L54,18 L54,23 Z" />
      <path {...GLASS} d="M8,5 L48,5 L54,15 L8,15 Z" />
      <circle {...WHEEL_OUTER} cx="13" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="13" cy="23" r="1.7" />
      <circle {...WHEEL_OUTER} cx="45" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="45" cy="23" r="1.7" />
    </svg>
  );
}

function MuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Van/people-carrier: very tall, flat roof, nearly vertical windscreen & rear.
  // B and C pillars visible as internal lines.
  return (
    <svg viewBox="0 0 58 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,18 L6,2 L52,2 L54,18 L54,23 Z" />
      {/* Three window bays separated by pillars */}
      <path {...GLASS} d="M6,2 L52,2 L54,14 L6,14 Z" />
      <line {...STROKE} strokeWidth={1} x1="21" y1="2" x2="21" y2="14" />
      <line {...STROKE} strokeWidth={1} x1="37" y1="2" x2="37" y2="14" />
      <circle {...WHEEL_OUTER} cx="13" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="13" cy="23" r="1.7" />
      <circle {...WHEEL_OUTER} cx="45" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="45" cy="23" r="1.7" />
    </svg>
  );
}

function CrossoverIcon({ className = "w-8 h-4" }: IconProps) {
  // Raised hatchback — slightly taller body than hatchback, rear slopes like a hatch.
  return (
    <svg viewBox="0 0 58 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,19 L8,13 L14,5 L44,5 L52,13 L54,19 L54,23 Z" />
      <path {...GLASS} d="M14,5 L44,5 L52,13 L8,13 Z" />
      <circle {...WHEEL_OUTER} cx="13" cy="23" r="5.5" />
      <circle {...WHEEL_HUB} cx="13" cy="23" r="1.9" />
      <circle {...WHEEL_OUTER} cx="45" cy="23" r="5.5" />
      <circle {...WHEEL_HUB} cx="45" cy="23" r="1.9" />
    </svg>
  );
}

function ElectricIcon({ className = "w-8 h-4" }: IconProps) {
  // Aerodynamic hatchback/crossover silhouette + lightning bolt on body.
  return (
    <svg viewBox="0 0 58 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,20 L9,14 L15,6 L44,6 L52,14 L54,20 L54,23 Z" />
      <path {...GLASS} d="M15,6 L44,6 L52,14 L9,14 Z" />
      {/* Lightning bolt centred in body */}
      <path fill="currentColor" fillOpacity={0.75} d="M26,9 L23,15 L27,15 L24,22 L32,14 L28,14 Z" />
      <circle {...WHEEL_OUTER} cx="13" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="13" cy="23" r="1.7" />
      <circle {...WHEEL_OUTER} cx="45" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="45" cy="23" r="1.7" />
    </svg>
  );
}

function LuxuryIcon({ className = "w-10 h-4" }: IconProps) {
  // Very long wheelbase, very low roofline (3-box, but stretched).
  return (
    <svg viewBox="0 0 76 28" className={className} xmlns="http://www.w3.org/2000/svg">
      <path {...STROKE} d="M4,23 L4,20 L10,17 L14,14 L20,7 L56,7 L64,14 L70,20 L70,23 Z" />
      <path {...GLASS} d="M20,7 L56,7 L64,14 L14,14 Z" />
      <circle {...WHEEL_OUTER} cx="14" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="14" cy="23" r="1.7" />
      <circle {...WHEEL_OUTER} cx="60" cy="23" r="5" />
      <circle {...WHEEL_HUB} cx="60" cy="23" r="1.7" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BIKE ICONS — kept in the map for data consistency; vehicle-selector
   does NOT render them for the bike model step (bikes show label text only).
───────────────────────────────────────────────────────────────────────────── */

function PlaceholderBikeIcon({ className = "w-7 h-3.5" }: IconProps) {
  return <span className={className} />;
}

const ICON_MAP: Record<BodyType, (props: IconProps) => React.ReactElement> = {
  hatchback: HatchbackIcon,
  sedan: SedanIcon,
  suv: SuvIcon,
  "compact-suv": CompactSuvIcon,
  muv: MuvIcon,
  crossover: CrossoverIcon,
  electric: ElectricIcon,
  luxury: LuxuryIcon,
  scooter: PlaceholderBikeIcon,
  sports: PlaceholderBikeIcon,
  cruiser: PlaceholderBikeIcon,
  adventure: PlaceholderBikeIcon,
  commuter: PlaceholderBikeIcon,
};

interface VehicleTypeIconProps {
  bodyType: BodyType;
  vehicleType?: "car" | "bike";
  className?: string;
}

export default function VehicleTypeIcon({ bodyType, vehicleType, className }: VehicleTypeIconProps) {
  if (vehicleType === "bike") return <span />;
  const Icon = ICON_MAP[bodyType];
  return <Icon className={className} />;
}
