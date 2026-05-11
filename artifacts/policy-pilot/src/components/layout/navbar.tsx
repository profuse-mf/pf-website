import React from "react";
import { Link, useLocation } from "wouter";
import { Shield, Lock } from "lucide-react";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/partners", label: "Our Partners" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-primary text-xl tracking-tight type-headline shrink-0">
          <Shield className="w-5 h-5 fill-primary/20" />
          PolicyPilot
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-sm type-notes transition-colors
                ${location === link.href
                  ? "text-primary bg-primary/8 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: secure badge */}
        <div className="flex items-center gap-1.5 text-xs type-notes text-muted-foreground shrink-0 bg-muted px-3 py-1.5 rounded-full border">
          <Lock className="w-3 h-3 text-primary" />
          <span>100% Secure</span>
        </div>
      </div>
    </header>
  );
}
