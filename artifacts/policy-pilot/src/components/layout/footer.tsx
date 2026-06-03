import { Link } from "wouter";
import { MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111] text-gray-400">
      <div className="container mx-auto max-w-6xl px-4 py-10 grid sm:grid-cols-2 gap-8">

        <div className="space-y-3 text-sm">
          <p className="text-white font-semibold text-base">Policy Fatafat</p>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" />
            <address className="not-italic leading-relaxed text-gray-400">
              5th Floor, 175, Spring Board, 91,<br />
              Bannerghatta Road, JP Nagar 4th Phase,<br />
              Dollar Layout, Phase 4, J. P. Nagar,<br />
              Bengaluru, Karnataka – 560078
            </address>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 shrink-0 text-gray-500" />
            <a
              href="mailto:support@policyfatafat.com"
              className="hover:text-white transition-colors"
            >
              support@policyfatafat.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-gray-500" />
            <span>9 AM – 6 PM (Mon–Sat)</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:items-end sm:text-right">
          <nav className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
            <Link href="/how-it-works" className="hover:text-white transition-colors" data-testid="link-how-it-works">
              How It Works
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors" data-testid="link-faq">
              FAQ
            </Link>
            <Link href="/partners" className="hover:text-white transition-colors" data-testid="link-our-partners">
              Our Partners
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">
              Terms
            </Link>
          </nav>
          <p className="text-gray-600 text-xs">Made with love in India 🇮🇳</p>
          <p className="text-gray-600 text-xs">
            Powered by{" "}
            <a
              href="https://profuseservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              data-testid="link-profuse-services"
            >
              Profuse Services
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
