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
   CAR ICONS  –  smooth bezier-curve side-profile silhouettes, nose right
───────────────────────────────────────────────────────────────────────────── */

function HatchbackIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,26 C4,24 5,21 8,19 L16,11 C19,8 26,6 36,5.5 C46,5 54,6.5 58,9 C61,11 63,15 63,19 L63,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M16,11 C19,8 26,6 36,5.5 C46,5 54,6.5 58,9 C61,11 62,15 62,19 L9,19 Z"
        fill="currentColor" fillOpacity="0.4"/>
      <circle cx="14" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="14" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="52" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function SedanIcon({ className = "w-9 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 72 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,26 C4,24 5,22 7,21 L10,21 L19,12 C22,9 29,7 40,6.5 C52,6 61,7 66,9.5 C69,11 70,15 70,20 L70,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M19,12 C22,9 29,7 40,6.5 C52,6 61,7 66,9.5 C69,11 69.5,15 69.5,20 L12,20 L10,21 Z"
        fill="currentColor" fillOpacity="0.4"/>
      <circle cx="15" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="58" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="58" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function SuvIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,25 C4,23 5,20 7,18 L8,7 C8,5 11,3.5 15,3.5 L51,3.5 C55,3.5 58,5.5 60,8.5 L62,14 L63,19 L63,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8,7 C8,5 11,4 15,4 L51,4 C55,4 58,6 59.5,9 L61.5,14 L62,19 L7,19 Z"
        fill="currentColor" fillOpacity="0.4"/>
      <circle cx="16" cy="25" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="16" cy="25" r="2" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="52" cy="25" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="25" r="2" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function CompactSuvIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 62 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,25 C4,23 5,20 7,18 L10,9 C11,7 14.5,5 18.5,4.5 L44,4.5 C48,4.5 51,6.5 54,10 L57,16 L58,21 L58,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10,9 C11,7 14.5,5.5 18.5,5 L44,5 C48,5 51,7 53.5,10 L56.5,16 L56.5,19 L7,19 Z"
        fill="currentColor" fillOpacity="0.4"/>
      <circle cx="15" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="47" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="47" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function MuvIcon({ className = "w-9 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 72 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,25 L4,8 C4,5.5 6.5,4 10,4 L62,4 C65.5,4 68,6 68,9 L68,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
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
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,25 C4,23 5,20 7,18 L10,10 C11,7.5 14,5.5 19,5 L37,4 C48,4 57,7 62,14 L63,20 L63,25 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10,10 C11,7.5 14,5.5 19,5.5 L37,4.5 C48,4.5 57,7.5 61.5,14 L62,19 L7,19 Z"
        fill="currentColor" fillOpacity="0.4"/>
      <circle cx="15" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="52" cy="25" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="25" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function ElectricIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,26 C4,24 5,22 7,21 L10,21 L19,11 C22,8.5 29,7 39,6.5 C51,6 61,7 65,10 C66,12 66,16 66,21 L66,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M19,11 C22,8.5 29,7 39,6.5 C51,6 61,7 65,10 C65.5,12 65.5,15 65.5,21 L12,21 L10,21 Z"
        fill="currentColor" fillOpacity="0.38"/>
      <path d="M33,9 L30,16 L34,16 L31,23 L39,14 L35,14 Z" fill="white" fillOpacity="0.9"/>
      <circle cx="15" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="15" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="55" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="55" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function LuxuryIcon({ className = "w-10 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 80 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,26 C4,24 5,22 7,21 L10,21 L21,12 C24,9.5 32,7.5 44,7 C57,6.5 67,7.5 72,10.5 C75,12.5 76,16 76,21 L76,26 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M21,12 C24,9.5 32,7.5 44,7 C57,6.5 67,7.5 72,10.5 C75,12.5 75.5,16 75.5,21 L14,21 L10,21 Z"
        fill="currentColor" fillOpacity="0.4"/>
      <circle cx="16" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="16" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="65" cy="26" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="65" cy="26" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BIKE ICONS  –  professional smooth-curve filled silhouettes, front wheel right
   All viewBox="0 0 56 28" (2:1) to match w-7 h-3.5 badge container.
   Body filled at 0.15 opacity + stroke; seat/tank at 0.4; wheels white + hub.
───────────────────────────────────────────────────────────────────────────── */

function CommuterIcon({ className = "w-7 h-3.5" }: IconProps) {
  // Naked standard bike: upright stance, clear tank hump, neutral proportions
  return (
    <svg viewBox="0 0 56 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body: from rear wheel over tank to front fork */}
      <path
        d="M11,22 C11,17 15,13 20,10 C24,8.5 30,7.5 36,7.5 C40,7 43,8.5 46,12 L47,18 L47,22 L38,24 L16,24 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Tank + seat area */}
      <path
        d="M20,10 L36,7.5 C40,7 43,8.5 44,11 L44,14 L20,14 Z"
        fill="currentColor" fillOpacity="0.42"
      />
      {/* Handlebars */}
      <line x1="40" y1="5.5" x2="49" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Front fork */}
      <line x1="45" y1="11" x2="47.5" y2="5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Rear wheel */}
      <circle cx="11" cy="22" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="11" cy="22" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      {/* Front wheel */}
      <circle cx="45" cy="22" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="45" cy="22" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function ScooterIcon({ className = "w-7 h-3.5" }: IconProps) {
  // Step-through scooter: rounded cowl, floorboard gap, front shield, small wheels
  return (
    <svg viewBox="0 0 50 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rear cowl (seat + tail section) */}
      <path
        d="M8,22 C8,18 10,13 14,10 C17,8.5 22,8 26,8 L26,21 C22,21 14,21 8,22 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Front shield / apron */}
      <path
        d="M26,8 C30,7.5 35,9 39,12 C42,15 43,19 43,22 L35,22 L26,22 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Seat */}
      <path
        d="M14,10 C17,8.5 22,8 26,8 L26,11.5 C22,11 17,10.5 14,13 Z"
        fill="currentColor" fillOpacity="0.42"
      />
      {/* Front panel highlight */}
      <path
        d="M28,9 C32,8.5 36,10 39,13 L37,14 C34,11 30,9.5 28,9 Z"
        fill="currentColor" fillOpacity="0.25"
      />
      {/* Handlebars */}
      <line x1="33" y1="7" x2="43" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Front fork */}
      <line x1="39" y1="11" x2="41" y2="7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Rear wheel (small) */}
      <circle cx="9" cy="22" r="5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="9" cy="22" r="1.6" fill="currentColor" fillOpacity="0.5"/>
      {/* Front wheel (small) */}
      <circle cx="41" cy="22" r="5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="41" cy="22" r="1.6" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function SportsIcon({ className = "w-7 h-3.5" }: IconProps) {
  // Full-fairing sportbike: low aggressive profile, enclosed body, windscreen
  return (
    <svg viewBox="0 0 56 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Full fairing body — smooth, enclosed shape */}
      <path
        d="M11,22 C11,18 14,14 19,12 L26,11 C30,10.5 34,10.5 38,11 C43,12 47,16 47,22 L38,24 C34,25 18,25 14,24 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Windscreen / nose fairing */}
      <path
        d="M38,11 C42,8.5 47,10.5 47,15 L44,14 Z"
        fill="currentColor" fillOpacity="0.38"
      />
      {/* Seat hump (rear, higher than tank) */}
      <path
        d="M19,12 L26,11 L26,14 L19,15 Z"
        fill="currentColor" fillOpacity="0.42"
      />
      {/* Low clip-on handlebars */}
      <line x1="37" y1="10" x2="46" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Front fork (steeply angled for sportbike) */}
      <line x1="44" y1="13" x2="46.5" y2="9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Rear wheel */}
      <circle cx="11" cy="22" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="11" cy="22" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      {/* Front wheel */}
      <circle cx="45" cy="22" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="45" cy="22" r="1.8" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function CruiserIcon({ className = "w-8 h-3.5" }: IconProps) {
  // Royal Enfield / Avenger style: long wheelbase, low flat seat, wide swept bars
  return (
    <svg viewBox="0 0 64 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body: long, low, flat profile */}
      <path
        d="M12,22 C12,18 15,15 20,13 L30,12 C36,11.5 44,11.5 48,12 C52,13 55,16 55,22 L46,24 L16,24 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Wide flat seat + tank */}
      <path
        d="M22,13 L44,12 C48,11.5 51,12.5 52,14.5 L52,17 L22,17 Z"
        fill="currentColor" fillOpacity="0.42"
      />
      {/* Wide swept-back handlebars (signature cruiser look) */}
      <line x1="44" y1="9" x2="57" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Front fork */}
      <line x1="52" y1="13" x2="55" y2="8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Rear wheel (large) */}
      <circle cx="12" cy="22" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="12" cy="22" r="2" fill="currentColor" fillOpacity="0.5"/>
      {/* Front wheel (large) */}
      <circle cx="52" cy="22" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="52" cy="22" r="2" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function AdventureIcon({ className = "w-7 h-3.5" }: IconProps) {
  // RE Himalayan / KTM Adventure: tall stance, large front wheel, upright, beak
  return (
    <svg viewBox="0 0 56 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tall body — significantly higher roofline */}
      <path
        d="M11,22 C11,16 14,11 19,8.5 L28,7 C32,6.5 36,7 40,9 C44,11 47.5,15 48,22 L38,24 L16,24 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* ADV beak / front fairing piece */}
      <path
        d="M38,9 C42,6.5 48,9 48,13.5 L44.5,12 Z"
        fill="currentColor" fillOpacity="0.38"
      />
      {/* High narrow seat */}
      <path
        d="M19,8.5 L28,7 L28,10.5 L19,12 Z"
        fill="currentColor" fillOpacity="0.42"
      />
      {/* High wide handlebars */}
      <line x1="38" y1="6" x2="50" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Upright front fork */}
      <line x1="45" y1="9.5" x2="48" y2="6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Rear wheel */}
      <circle cx="11" cy="22" r="5.5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="11" cy="22" r="1.8" fill="currentColor" fillOpacity="0.5"/>
      {/* Front wheel (larger, off-road ready) */}
      <circle cx="46" cy="22" r="6" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="46" cy="22" r="2" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function ElectricBikeIcon({ className = "w-7 h-3.5" }: IconProps) {
  // EV scooter (Ola S1 / Ather style): scooter silhouette + lightning bolt
  return (
    <svg viewBox="0 0 50 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rear cowl */}
      <path
        d="M8,22 C8,18 10,13 14,10 C17,8.5 22,8 26,8 L26,21 C22,21 14,21 8,22 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Front shield */}
      <path
        d="M26,8 C30,7.5 35,9 39,12 C42,15 43,19 43,22 L35,22 L26,22 Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      {/* Seat */}
      <path
        d="M14,10 C17,8.5 22,8 26,8 L26,11.5 C22,11 17,10.5 14,13 Z"
        fill="currentColor" fillOpacity="0.42"
      />
      {/* Lightning bolt on front panel */}
      <path d="M32,10 L30,15 L33,15 L31,21 L37,14 L34,14 Z" fill="currentColor" fillOpacity="0.8"/>
      {/* Handlebars */}
      <line x1="33" y1="7" x2="43" y2="7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Front fork */}
      <line x1="39" y1="11" x2="41" y2="7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Rear wheel */}
      <circle cx="9" cy="22" r="5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="9" cy="22" r="1.6" fill="currentColor" fillOpacity="0.5"/>
      {/* Front wheel */}
      <circle cx="41" cy="22" r="5" fill="white" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="41" cy="22" r="1.6" fill="currentColor" fillOpacity="0.5"/>
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
