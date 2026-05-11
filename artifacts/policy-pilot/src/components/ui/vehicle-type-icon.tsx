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

function HatchbackIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 26 L4 19 L13 9 L28 6 L44 6 L54 15 L60 19 L60 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M15 18 L21 10 L41 10 L49 18 Z" fill="currentColor" opacity="0.35"/>
      <circle cx="14" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="50" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function SedanIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 72 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 26 L3 19 L9 19 L17 9 L30 6 L46 6 L52 13 L57 19 L68 19 L68 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M19 18 L24 10 L44 10 L50 18 Z" fill="currentColor" opacity="0.35"/>
      <circle cx="14" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="58" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function SuvIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 26 L3 10 L9 4 L57 4 L63 10 L63 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 11 L15 6 L51 6 L55 11 Z" fill="currentColor" opacity="0.35"/>
      <circle cx="14" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="52" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function CompactSuvIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 62 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 26 L4 12 L11 6 L51 6 L58 12 L58 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 12 L17 8 L45 8 L49 12 Z" fill="currentColor" opacity="0.35"/>
      <circle cx="15" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="47" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function MuvIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 72 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 26 L2 9 L6 4 L66 4 L70 9 L70 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="8" y="6" width="14" height="6" rx="1" fill="currentColor" opacity="0.35"/>
      <rect x="25" y="6" width="18" height="6" rx="1" fill="currentColor" opacity="0.35"/>
      <rect x="46" y="6" width="14" height="6" rx="1" fill="currentColor" opacity="0.35"/>
      <circle cx="15" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="57" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function CrossoverIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 26 L3 14 L10 6 L30 4 L46 4 L56 12 L62 18 L62 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 16 L18 8 L42 8 L52 16 Z" fill="currentColor" opacity="0.35"/>
      <circle cx="14" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="52" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function ElectricIcon({ className = "w-8 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 66 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 26 L3 11 L9 5 L57 5 L63 11 L63 26 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 12 L15 7 L51 7 L55 12 Z" fill="currentColor" opacity="0.35"/>
      <circle cx="14" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="52" cy="26" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M34 10 L30 17 L34 17 L30 24 L38 15 L34 15 Z" fill="currentColor" opacity="0.7"/>
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

function ScooterIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6 L16 14 L10 14 L8 20 L14 20 L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 6 L30 8 L36 14 L36 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 14 L36 14" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="38" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function SportsIcon({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 56 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 22 L8 18 L16 10 L28 8 L40 10 L48 18 L48 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 18 L48 18" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="42" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
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
      <circle cx="50" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
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
      <circle cx="38" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="20" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
}

function Commuter({ className = "w-6 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22 L10 14 L16 8 L26 6 L34 8 L38 14 L38 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 16 L38 16" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="34" cy="24" r="5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
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
  luxury: SedanIcon,
  scooter: ScooterIcon,
  sports: SportsIcon,
  cruiser: CruiserIcon,
  adventure: AdventureIcon,
  commuter: Commuter,
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
