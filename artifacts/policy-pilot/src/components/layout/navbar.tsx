import React from "react";
import { Link } from "wouter";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary text-xl tracking-tight type-headline">
          <Shield className="w-6 h-6 fill-primary/20" />
          PolicyPilot
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground type-notes hidden sm:flex">
          <span>100% Secure</span>
        </div>
      </div>
    </header>
  );
}
