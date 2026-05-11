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
  hatchback: "text-blue-600",
  sedan: "text-purple-600",
  suv: "text-green-700",
  "compact-suv": "text-teal-600",
  muv: "text-orange-600",
  crossover: "text-indigo-600",
  electric: "text-emerald-600",
  luxury: "text-amber-700",
  scooter: "text-pink-600",
  sports: "text-red-600",
  cruiser: "text-amber-700",
  adventure: "text-orange-700",
  commuter: "text-slate-600",
};

interface IconProps {
  className?: string;
}

/*
  All car icons are flat filled silhouettes — fill="currentColor", no stroke, no fills with opacity.
  The path traces the full car outline (roof shape is the key differentiator) and integrates
  wheel arch cutouts as concave arcs at the bottom. Front of car faces RIGHT.

  Wheel arch arcs use SVG arc: A 6 6 0 0 0 <end-x>,20
    sweep=0 → counter-clockwise → curves UPWARD into the body (correct concave cutout).
  
  Rear wheel arch  : centre x=13, edges x=7  and x=19
  Front wheel arch : centre x=43, edges x=37 and x=49
*/

function HatchbackIcon({ className = "w-8 h-4" }: IconProps) {
  // Compact body, steeply sloped rear window (2-box). Distinct from crossover by steeper rear.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,16 L8,14 L14,4 L42,4 L50,12 L54,16 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
    </svg>
  );
}

function SedanIcon({ className = "w-9 h-4" }: IconProps) {
  // 3-box: the horizontal trunk lid (2,16)→(8,16) before the C-pillar makes it a sedan.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,16 L8,16 L11,12 L17,4 L43,4 L52,12 L54,16 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
    </svg>
  );
}

function SuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Tall, boxy, near-vertical sides. Roof at y=2 — clearly the tallest body type.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,15 L5,2 L51,2 L54,15 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
    </svg>
  );
}

function CompactSuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Slightly lower roof (y=4) than full SUV, with a gentle rear slope.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,15 L6,4 L50,4 L54,15 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
    </svg>
  );
}

function MuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Van / MPV: extreme height (y=1), very short hood, near-vertical windscreen & rear.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,15 L4,1 L52,1 L54,15 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
      {/* B-pillar & C-pillar as recessed white lines to show multi-row cabin */}
      <line x1="20" y1="1" x2="20" y2="15" stroke="white" strokeWidth="1.5"/>
      <line x1="36" y1="1" x2="36" y2="15" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

function CrossoverIcon({ className = "w-8 h-4" }: IconProps) {
  // Raised-hatchback crossover: taller stance (y=3) than hatchback, same sloped rear style.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,15 L7,12 L14,3 L42,3 L50,12 L54,15 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
    </svg>
  );
}

function ElectricIcon({ className = "w-8 h-4" }: IconProps) {
  // Aerodynamic crossover silhouette + white lightning bolt marking it as EV.
  return (
    <svg viewBox="0 0 56 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,15 L7,12 L14,3 L42,3 L50,12 L54,15 L54,20
           L49,20 A6,6,0,0,0 37,20
           L19,20 A6,6,0,0,0 7,20
           L2,20 Z"
      />
      {/* Lightning bolt centred inside the body */}
      <path fill="white" d="M26,6 L23,13 L27,13 L24,19 L33,11 L29,11 Z" />
    </svg>
  );
}

function LuxuryIcon({ className = "w-10 h-4" }: IconProps) {
  // Very long wheelbase sedan, notably lower roofline (y=6). Wider viewBox to show length.
  return (
    <svg viewBox="0 0 72 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M2,20 L2,16 L8,16 L12,12 L18,6 L56,6 L64,12 L68,16 L70,20
           L65,20 A6,6,0,0,0 53,20
           L27,20 A6,6,0,0,0 15,20
           L2,20 Z"
      />
    </svg>
  );
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
  scooter: () => <span />,
  sports: () => <span />,
  cruiser: () => <span />,
  adventure: () => <span />,
  commuter: () => <span />,
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
