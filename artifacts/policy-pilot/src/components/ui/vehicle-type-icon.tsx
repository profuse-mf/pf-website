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
   CAR ICONS  –  professional side-profile silhouettes with smooth bezier curves
   All car icons: viewBox proportioned 2:1, body filled at low opacity + stroke,
   glass area filled at higher opacity, wheels white-filled with hub centre dot.
   Car nose points to the RIGHT.
───────────────────────────────────────────────────────────────────────────── */

function HatchbackIcon({ className = "w-8 h-4" }: IconProps) {
  // Compact 2-box: steep C-pillar, tall cabin, short overhang
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,26 C4,24 5,21 8,19 L16,11 C19,8 26,6 36,5.5 C46,5 54,6.5 58,9 C61,11 63,15 63,19 L63,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M16,11 C19,8 26,6 36,5.5 C46,5 54,6.5 58,9 C61,11 62,15 62,19 L9,19 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      <circle cx="14" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="14" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="52" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function SedanIcon({ className = "w-9 h-4" }: IconProps) {
  // 3-box with visible trunk notch: long hood, horizontal trunk lid, C-pillar
  return (
    <svg viewBox="0 0 72 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,26 C4,24 5,22 7,21 L10,21 L19,12 C22,9 29,7 40,6.5 C52,6 61,7 66,9.5 C69,11 70,15 70,20 L70,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M19,12 C22,9 29,7 40,6.5 C52,6 61,7 66,9.5 C69,11 69.5,15 69.5,20 L12,20 L10,21 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      <circle cx="15" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="58" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="58" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function SuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Tall boxy profile, near-vertical pillars, high ground clearance
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,25 C4,23 5,20 7,18 L8,7 C8,5 11,3.5 15,3.5 L51,3.5 C55,3.5 58,5.5 60,8.5 L62,14 L63,19 L63,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M8,7 C8,5 11,4 15,4 L51,4 C55,4 58,6 59.5,9 L61.5,14 L62,19 L7,19 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      <circle cx="16" cy="25" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="16" cy="25" r="2" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="52" cy="25" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="25" r="2" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function CompactSuvIcon({ className = "w-8 h-4" }: IconProps) {
  // Slightly shorter and more rounded than full SUV
  return (
    <svg viewBox="0 0 62 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,25 C4,23 5,20 7,18 L10,9 C11,7 14.5,5 18.5,4.5 L44,4.5 C48,4.5 51,6.5 54,10 L57,16 L58,21 L58,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M10,9 C11,7 14.5,5.5 18.5,5 L44,5 C48,5 51,7 53.5,10 L56.5,16 L56.5,19 L7,19 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      <circle cx="15" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="47" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="47" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function MuvIcon({ className = "w-9 h-4" }: IconProps) {
  // Tall van-body MPV with three visible window panes
  return (
    <svg viewBox="0 0 72 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,25 L4,8 C4,5.5 6.5,4 10,4 L62,4 C65.5,4 68,6 68,9 L68,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <rect x="9"  y="6.5" width="13" height="10" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
      <rect x="25" y="6.5" width="16" height="10" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
      <rect x="45" y="6.5" width="14" height="10" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
      <circle cx="15" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="57" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="57" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function CrossoverIcon({ className = "w-8 h-4" }: IconProps) {
  // SUV stance with sloping fastback roofline toward the rear
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,25 C4,23 5,20 7,18 L10,10 C11,7.5 14,5.5 19,5 L37,4 C48,4 57,7 62,14 L63,20 L63,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M10,10 C11,7.5 14,5.5 19,5.5 L37,4.5 C48,4.5 57,7.5 61.5,14 L62,19 L7,19 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      <circle cx="15" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="52" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function ElectricIcon({ className = "w-8 h-4" }: IconProps) {
  // Modern sedan profile with lightning bolt in glass area
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,26 C4,24 5,22 7,21 L10,21 L19,11 C22,8.5 29,7 39,6.5 C51,6 61,7 65,10 C66,12 66,16 66,21 L66,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M19,11 C22,8.5 29,7 39,6.5 C51,6 61,7 65,10 C65.5,12 65.5,15 65.5,21 L12,21 L10,21 Z"
        fill="currentColor" fillOpacity="0.38"
      />
      <path d="M33,9 L30,16 L34,16 L31,23 L39,14 L35,14 Z" fill="white" fillOpacity="0.9"/>
      <circle cx="15" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="55" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="55" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function LuxuryIcon({ className = "w-10 h-4" }: IconProps) {
  // Long-wheelbase, low-slung sedan: very long hood, elegant proportions
  return (
    <svg viewBox="0 0 80 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4,26 C4,24 5,22 7,21 L10,21 L21,12 C24,9.5 32,7.5 44,7 C57,6.5 67,7.5 72,10.5 C75,12.5 76,16 76,21 L76,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
      <path
        d="M21,12 C24,9.5 32,7.5 44,7 C57,6.5 67,7.5 72,10.5 C75,12.5 75.5,16 75.5,21 L14,21 L10,21 Z"
        fill="currentColor" fillOpacity="0.4"
      />
      <circle cx="16" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="16" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="65" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="65" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function ElectricBikeIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6 L16 14 L10 14 L8 20 L14 20 L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 6 L30 8 L36 14 L36 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 14 L36 14" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="38" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 7 L22 11 L25 11 L23 16 L28 10 L25 10 Z" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BIKE ICONS  –  clean line-based side-profile silhouettes
───────────────────────────────────────────────────────────────────────────── */

function ScooterIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6 L16 14 L10 14 L8 20 L14 20 L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 6 L30 8 L36 14 L36 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 14 L36 14" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="38" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="38" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function SportsIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 56 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 22 L8 18 L16 10 L28 8 L40 10 L48 18 L48 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 18 L48 18" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="42" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="42" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <path d="M26 8 L28 4 L30 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CruiserIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 22 L8 16 L18 10 L30 8 L44 10 L56 18 L56 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 18 L56 18" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="50" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="50" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <path d="M26 9 L26 4 L36 4 L36 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function AdventureIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 52 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22 L10 16 L16 6 L28 4 L36 8 L42 16 L42 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18 L42 18" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="38" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="38" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <rect x="20" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

function CommuterIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22 L10 14 L16 8 L26 6 L34 8 L38 14 L38 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 16 L38 16" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="34" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="34" cy="24" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <path d="M22 6 L22 2 L28 2 L28 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
  scooter: ScooterIcon,
  sports: SportsIcon,
  cruiser: CruiserIcon,
  adventure: AdventureIcon,
  commuter: CommuterIcon,
};

interface VehicleTypeIconProps {
  bodyType: BodyType;
  vehicleType?: "car" | "bike";
  className?: string;
}

export default function VehicleTypeIcon({ bodyType, vehicleType, className }: VehicleTypeIconProps) {
  const Icon =
    bodyType === "electric" && vehicleType === "bike"
      ? ElectricBikeIcon
      : ICON_MAP[bodyType];
  return <Icon className={className} />;
}
