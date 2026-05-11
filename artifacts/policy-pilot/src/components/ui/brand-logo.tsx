import { useState } from "react";

interface BrandLogoProps {
  logoUrl: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BrandLogo({ logoUrl, name, className = "w-10 h-10", fallbackClassName = "" }: BrandLogoProps) {
  const [error, setError] = useState(false);

  if (!logoUrl || error) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs font-bold ${className} ${fallbackClassName}`}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      className={`object-contain rounded-lg ${className}`}
      onError={() => setError(true)}
    />
  );
}
