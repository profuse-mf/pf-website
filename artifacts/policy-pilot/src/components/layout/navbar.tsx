import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How it Works" },
  { href: "/faq",          label: "FAQ" },
  { href: "/blog",         label: "Blog" },
  { href: "/partners",     label: "Our Partners" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary text-xl tracking-tight font-bold shrink-0">
          <Shield className="w-5 h-5 fill-primary/20" />
          PolicyFatafat
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Get Quote CTA */}
        <Link href="/" className="hidden lg:block shrink-0">
          <Button size="sm" className="font-bold text-base px-5">
            Get Quote
          </Button>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-background px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-1.5 transition-colors hover:text-primary ${
                location === href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link href="/" onClick={() => setOpen(false)}>
            <Button className="w-full font-bold text-base mt-2">
              Get Quote
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
