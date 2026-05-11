import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111] text-gray-400 py-5 px-4">
      <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm type-micro">
        <Link href="/how-it-works" className="hover:text-white transition-colors" data-testid="link-how-it-works">
          How It Works
        </Link>
        <span className="text-gray-600">·</span>
        <Link href="/faq" className="hover:text-white transition-colors" data-testid="link-faq">
          FAQ
        </Link>
        <span className="text-gray-600">·</span>
        <Link href="/partners" className="hover:text-white transition-colors" data-testid="link-our-partners">
          Our Partners
        </Link>
        <span className="text-gray-600">·</span>
        <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">
          Privacy
        </Link>
        <span className="text-gray-600">·</span>
        <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">
          Terms
        </Link>
        <span className="text-gray-600">·</span>
        <span>Made with love in India 🇮🇳</span>
        <span className="text-gray-600">·</span>
        <span>
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
        </span>
      </div>
    </footer>
  );
}
