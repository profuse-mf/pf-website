import { Link } from "wouter";
import { MapPin, Mail, Clock, Shield, Lock, CheckCircle } from "lucide-react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1117] text-gray-400">

      <div className="container mx-auto max-w-6xl px-4 pt-12 pb-8 grid lg:grid-cols-3 gap-10">

        {/* ── Column 1: Brand ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">PolicyFatafat</p>
              <p className="text-primary text-[10px] font-semibold uppercase tracking-widest leading-none">
                India's Insurance Aggregator 🇮🇳
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            PolicyFatafat is operated by{" "}
            <a
              href="https://profuseservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-300 font-semibold transition-colors"
            >
              Profuse Services
            </a>
            . We connect users with licensed insurance providers and intermediaries across India.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { icon: Lock,          label: "SSL Secured" },
              { icon: Shield,        label: "IRDAI Partners" },
              { icon: CheckCircle,   label: "DPDPA 2023" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                <Icon className="w-3 h-3 text-primary" />
                {label}
              </span>
            ))}
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2.5 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-primary" />
              Follow Us
            </p>
            <div className="flex gap-2">
              {[
                { icon: FacebookIcon,  href: "#", label: "Facebook" },
                { icon: InstagramIcon, href: "#", label: "Instagram" },
                { icon: YoutubeIcon,   href: "#", label: "YouTube" },
                { icon: LinkedInIcon,  href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Column 2: Quick Links ── */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-primary" />
            Quick Links
          </p>
          <ul className="space-y-2.5">
            {[
              { label: "How It Works",  to: "/how-it-works",  testid: "link-how-it-works" },
              { label: "FAQ",           to: "/faq",           testid: "link-faq" },
              { label: "Our Partners",  to: "/partners",      testid: "link-our-partners" },
              { label: "Privacy Policy",to: "/privacy",       testid: "link-privacy" },
              { label: "Terms & Conditions", to: "/terms",    testid: "link-terms" },
            ].map(({ label, to, testid }) => (
              <li key={to} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <Link href={to} data-testid={testid} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Contact ── */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-primary" />
            Contact Us
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="text-white font-semibold mb-0.5">Registered Address</p>
                <address className="not-italic text-gray-400 leading-relaxed">
                  Profuse Services Pvt. Ltd.<br />
                  5th Floor, 175, Spring Board, 91,<br />
                  Bannerghatta Road, JP Nagar 4th Phase,<br />
                  Dollar Layout, Phase 4, J. P. Nagar,<br />
                  Bengaluru, Karnataka – 560078
                </address>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 shrink-0 text-primary" />
              <a href="mailto:support@policyfatafat.com" className="text-gray-400 hover:text-white transition-colors">
                support@policyfatafat.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 shrink-0 text-primary" />
              <span className="text-gray-400">Hours: 9 AM – 6 PM (Mon–Sat)</span>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
            <p className="text-[11px] text-amber-300/80 leading-relaxed">
              <span className="font-semibold text-amber-300">Disclaimer: </span>
              PolicyFatafat is not an insurance company and does not issue, underwrite, or service insurance policies. We operate as a digital facilitation platform that connects users with licensed insurance providers and/or registered insurance intermediaries. All policy issuance, underwriting, premium determination, servicing, and claims are handled solely by the respective licensed provider or intermediary, subject to their terms and applicable regulations.
            </p>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} PolicyFatafat · Operated by Profuse Services Pvt. Ltd.</span>
          <span>Made with love in India 🇮🇳</span>
        </div>
      </div>

    </footer>
  );
}
