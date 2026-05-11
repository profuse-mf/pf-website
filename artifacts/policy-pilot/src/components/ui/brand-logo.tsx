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

function extractDomain(logoUrl: string): string | null {
  const m = logoUrl.match(/logo\.clearbit\.com\/([^?#]+)/);
  return m ? m[1] : null;
}

function buildSources(logoUrl: string): string[] {
  const domain = extractDomain(logoUrl);
  if (!domain) return logoUrl ? [logoUrl] : [];

  return [
    // 1. Brandfetch CDN — high-quality curated brand logos, publicly accessible
    `https://cdn.brandfetch.io/${domain}/w/256/h/256`,
    // 2. Clearbit — well-curated global brands, widely cached
    `https://logo.clearbit.com/${domain}`,
    // 3. Google Favicons 256 px — universal fallback for any domain
    `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
  ];
}

export default function BrandLogo({
  logoUrl,
  name,
  className = "w-10 h-10",
  fallbackClassName = "",
}: BrandLogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = buildSources(logoUrl);

  if (srcIndex >= sources.length || !logoUrl) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs font-bold ${className} ${fallbackClassName}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      key={sources[srcIndex]}
      src={sources[srcIndex]}
      alt={`${name} logo`}
      className={`object-contain ${className}`}
      referrerPolicy="no-referrer"
      onError={() => setSrcIndex((i) => i + 1)}
    />
  );
}
