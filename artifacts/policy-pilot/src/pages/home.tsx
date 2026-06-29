import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import HeroForm from "@/components/home/hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import type { FormValues } from "@/lib/form-schema";
import { createApplication, captureUtmParams, getStoredUtm } from "@/lib/application-api";
import { useMeta } from "@/lib/use-meta";
import {
  GitCompareArrows, RefreshCw, BarChart3, FileSearch,
  Headphones, Lock, Car, CheckCircle2, Bike, ShieldCheck, Wrench, ListChecks,
  ChevronDown, ChevronUp,
} from "lucide-react";

export type { FormValues };

const WHY_CHOOSE = [
  { icon: GitCompareArrows, title: "Compare Multiple Insurers",   desc: "Side-by-side comparison of plans from top insurance companies in one place." },
  { icon: RefreshCw,        title: "Easy Purchase & Renewal",     desc: "Buy or renew your policy entirely online — no paperwork, no hassle." },
  { icon: BarChart3,        title: "Transparent Premiums",        desc: "See the full breakdown of your premium with no hidden charges." },
  { icon: FileSearch,       title: "Quick Policy Access",         desc: "Instant access to policy details, coverage options, and inclusions." },
  { icon: Headphones,       title: "End-to-End Support",          desc: "Guided assistance throughout the insurance selection process." },
  { icon: Lock,             title: "Secure & Hassle-Free",        desc: "Your data is protected. Our process is safe, simple, and reliable." },
  { icon: Car,              title: "Comprehensive & Third-Party", desc: "Options for both comprehensive and third-party vehicle insurance plans." },
];

const BIKE_BENEFITS = [
  "Financial protection against accidental damage.",
  "Coverage for theft and total loss.",
  "Third-party liability protection.",
  "Compliance with motor vehicle insurance requirements.",
  "Peace of mind while riding.",
];

const ADDONS = [
  "Zero Depreciation Cover", "Roadside Assistance", "Engine Protection Cover",
  "Consumables Cover", "Return to Invoice Cover", "Personal Accident Cover", "Key Replacement Cover",
];

const COMPARISON_ROWS = [
  { feature: "Third-party liability coverage", comp: "Yes",              tp: "Yes" },
  { feature: "Own vehicle damage coverage",    comp: "Yes",              tp: "No" },
  { feature: "Theft protection",               comp: "Yes",              tp: "No" },
  { feature: "Natural calamity coverage",      comp: "Yes",              tp: "No" },
  { feature: "Add-on options",                 comp: "Available",        tp: "Limited" },
  { feature: "Coverage scope",                 comp: "Wider protection", tp: "Basic protection" },
];

const BIKE_HOW_TO_SELECT = [
  "Coverage offered by the insurer.",
  "Premium amount and benefits included.",
  "Claim settlement support.",
  "Available add-on covers.",
  "Network garages and service support.",
  "Customer reviews and insurer reputation.",
  "Policy exclusions and terms.",
];

const CAR_HOW_TO_SELECT = [
  "Type of coverage required.",
  "Insured Declared Value (IDV).",
  "Premium affordability.",
  "Claim process and support.",
  "Add-on cover options.",
  "Network garage availability.",
  "Policy exclusions and deductibles.",
  "Customer service quality.",
];

const CAR_BENEFITS = [
  "Protection against accidental damages.",
  "Coverage against theft and total loss.",
  "Third-party liability coverage.",
  "Access to cashless repair networks (subject to insurer availability).",
  "Optional add-on covers for enhanced protection.",
];

const PARTNER_LOGOS = [
  { src: "/logos/acko.svg",        alt: "Acko Insurance" },
  { src: "/logos/zurichkotak.svg", alt: "Zurich Kotak General Insurance" },
  { src: "/logos/hdfc-ergo.png",   alt: "HDFC ERGO General Insurance" },
];

const FAQS = [
  {
    q: "What is Policy Fatafat?",
    a: "Policy Fatafat is an insurance aggregator that helps users compare and purchase bike and car insurance policies from multiple insurers.",
  },
  {
    q: "Does Policy Fatafat provide health insurance?",
    a: "No. Policy Fatafat currently focuses on bike insurance and car insurance products only.",
  },
  {
    q: "Can I compare multiple insurance plans?",
    a: "Yes. You can compare insurance plans from various insurers before making a purchase decision.",
  },
  {
    q: "What is the difference between comprehensive and third-party insurance?",
    a: "Comprehensive insurance provides broader coverage, including own vehicle damage and third-party liability, while third-party insurance covers only third-party liabilities.",
  },
  {
    q: "Can I renew my existing bike or car insurance policy?",
    a: "Yes. Policy Fatafat helps users compare available renewal options and purchase suitable coverage online.",
  },
  {
    q: "Are add-on covers available?",
    a: "Yes. Depending on the insurer and policy selected, various add-on covers may be available.",
  },
  {
    q: "How can I choose the right insurance policy?",
    a: "Compare coverage, premium, claim support, add-ons, insurer reputation, and policy benefits.",
  },
];

function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

function SectionIcon({ icon: Icon, bg, color }: { icon: React.ElementType; bg: string; color: string }) {
  return (
    <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
  );
}

function GetQuoteCTA() {
  return (
    <div className="flex justify-center mt-8">
      <Button size="lg" className="font-bold text-base px-12" onClick={scrollToTop}>
        Get Quote
      </Button>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-muted/30 transition-colors gap-3"
      >
        <span className="font-semibold text-foreground text-sm leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-primary shrink-0" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-white border-t">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();

  useMeta(
    "Car Insurance Online || Bike Insurance Online || Motor Insurance Aggregator",
    "Compare car insurance and bike insurance online with Policy Fatafat. Explore motor insurance plans, compare premiums, and renew policies easily."
  );
  useEffect(() => { captureUtmParams(); }, []);

  const utmDefaults = useMemo<FormValues | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const reg = params.get("utm_reg")?.trim().toUpperCase() ?? "";
    const mobile = params.get("utm_mobile")?.trim() ?? "";
    if (!reg && !mobile) return null;
    return {
      insuranceType: "car", registrationNumber: reg, mobileNumber: mobile,
      email: "", pinCode: "", policyExpiryDate: "", registrationYear: "",
      carModel: "", carVariant: "", previousYearClaim: undefined,
    };
  }, []);

  const handleFormSubmit = (data: FormValues) => {
    const utm = getStoredUtm();
    createApplication({
      vehicle_type: data.insuranceType === "car" ? "Car" : "Bike",
      reg_no: data.registrationNumber || null,
      pincode: data.pinCode || null,
      reg_year: data.registrationYear ? parseInt(data.registrationYear) : null,
      model: data.carModel || null, brand: null,
      mobile_no: data.mobileNumber || null,
      expiry_date: data.policyExpiryDate || null,
      email: data.email || null,
      utm_source: utm.utm_source, utm_medium: utm.utm_medium,
      utm_partner: utm.utm_partner, utm_channel: utm.utm_channel,
    });
    sessionStorage.setItem("offersData", JSON.stringify({
      vehicleType: data.insuranceType,
      registrationNumber: data.registrationNumber,
      model: data.carModel ?? "",
    }));
    navigate("/offers");
    scrollToTop();
  };

  const lastIsOdd = WHY_CHOOSE.length % 3 !== 0;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex flex-col">

        {/* ── Hero form ──────────────────────────────────────────── */}
        <div id="hero-form">
          <HeroForm onSubmit={handleFormSubmit} defaultValues={utmDefaults} />
        </div>

        {/* ── H1 + intro ─────────────────────────────────────────── */}
        <section className="bg-white border-t">
          <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6">
              Compare &amp; Buy Bike and Car Insurance Online with Policy Fatafat
            </h1>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Policy Fatafat is a trusted insurance aggregator that helps customers compare and
              purchase bike and car insurance policies from multiple insurance providers in one
              place. Whether you're looking to renew your policy or buy insurance for a new
              vehicle, Policy Fatafat makes the process simple, transparent, and convenient.
            </p>
          </div>
        </section>

        {/* ── Why Choose — cards ─────────────────────────────────── */}
        <section className="bg-muted/40 border-t">
          <div className="container mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-10 text-center">
              Why Choose Policy Fatafat?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_CHOOSE.map(({ icon: Icon, title, desc }, i) => {
                const isLast = i === WHY_CHOOSE.length - 1;
                const centerLast = isLast && lastIsOdd ? "lg:col-start-2" : "";
                return (
                  <div key={title} className={`bg-white rounded-xl border p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow ${centerLast}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm leading-snug">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA below Why Choose */}
          <div className="flex justify-center pb-10">
            <a href="#hero-form" onClick={(e) => { e.preventDefault(); document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" }); }}>
              <Button size="lg" className="px-10 text-base font-semibold shadow-md">
                Get Quote
              </Button>
            </a>
          </div>
        </section>

        {/* ── Our Partners Rolling ───────────────────────────────── */}
        <section className="bg-white border-t border-b">
          <div className="container mx-auto max-w-5xl px-4 py-10">
            <h2 className="text-xl font-bold text-foreground text-center mb-7">Our Partners</h2>
            <div className="relative overflow-hidden">
              {/* left/right fade masks */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
                  <div
                    key={i}
                    className="w-40 h-24 bg-white rounded-2xl border shadow-sm flex items-center justify-center shrink-0 px-5 py-4"
                  >
                    <img src={p.src} alt={p.alt} className="max-h-14 max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bike + Car content ─────────────────────────────────── */}
        <section className="bg-white border-t">
          <div className="container mx-auto max-w-3xl px-4 py-12">

            {/* Bike Insurance intro */}
            <div className="flex items-center gap-3 mb-4">
              <SectionIcon icon={Bike} bg="bg-primary/10" color="text-primary" />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Bike Insurance (Two Wheeler Insurance)
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base mb-10">
              Two wheeler insurance helps protect your bike or scooter against financial losses
              arising from accidents, theft, natural calamities, and third-party liabilities.
              Policy Fatafat allows you to compare different bike insurance plans and choose
              coverage that suits your requirements.
            </p>

            {/* Benefits of Bike Insurance */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <SectionIcon icon={ShieldCheck} bg="bg-green-100" color="text-green-600" />
                <h3 className="text-xl font-bold text-foreground">Benefits of Bike Insurance</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BIKE_BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-2.5 bg-green-50 rounded-lg border border-green-100 px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <SectionIcon icon={Wrench} bg="bg-amber-100" color="text-amber-600" />
                <h3 className="text-xl font-bold text-foreground">What Are Two Wheeler Insurance Add-Ons?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Add-ons are optional coverages that can enhance your bike insurance policy. Common add-ons include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {ADDONS.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 bg-amber-50 rounded-lg border border-amber-100 px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-sm text-foreground font-medium">{a}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">
                Availability of add-ons may vary by insurer and policy type.
              </p>

              {/* CTA below Add-Ons */}
              <div className="flex justify-center mt-7">
                <a href="#hero-form" onClick={(e) => { e.preventDefault(); document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" }); }}>
                  <Button size="lg" className="px-10 text-base font-semibold shadow-md">
                    Get Quote
                  </Button>
                </a>
              </div>
            </div>

            {/* Bike comparison table */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-5">
                Difference Between Comprehensive and Third Party Two Wheeler Insurance
              </h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left px-4 py-3 font-semibold">Feature</th>
                      <th className="text-center px-4 py-3 font-semibold">Comprehensive Insurance</th>
                      <th className="text-center px-4 py-3 font-semibold">Third Party Insurance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                        <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{row.comp}</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{row.tp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to select bike */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <SectionIcon icon={ListChecks} bg="bg-blue-100" color="text-blue-600" />
                <h3 className="text-xl font-bold text-foreground">How To Select The Best Bike Insurance For Your Two Wheeler?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When comparing bike insurance plans, consider:
              </p>
              <ul className="space-y-3">
                {BIKE_HOW_TO_SELECT.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Car Insurance ── */}
            <div className="pt-6 border-t mb-10">
              <div className="flex items-center gap-3 mb-4">
                <SectionIcon icon={Car} bg="bg-primary/10" color="text-primary" />
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                  Car Insurance (Four Wheeler Insurance)
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">
                Car insurance helps provide financial protection against accidental damage, theft,
                natural disasters, and third-party liabilities. Policy Fatafat enables users to
                compare multiple car insurance options and select suitable coverage based on their needs.
              </p>

              {/* Benefits of Car Insurance */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <SectionIcon icon={ShieldCheck} bg="bg-green-100" color="text-green-600" />
                  <h3 className="text-xl font-bold text-foreground">Benefits of Car Insurance</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CAR_BENEFITS.map((b) => (
                    <div key={b} className="flex items-start gap-2.5 bg-green-50 rounded-lg border border-green-100 px-4 py-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to select car */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-5">
                  <SectionIcon icon={ListChecks} bg="bg-blue-100" color="text-blue-600" />
                  <h3 className="text-xl font-bold text-foreground">How To Select The Best Car Insurance For Your Four Wheeler?</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before purchasing or renewing car insurance, consider:
                </p>
                <ul className="space-y-3">
                  {CAR_HOW_TO_SELECT.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <GetQuoteCTA />
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="bg-muted/40 border-t">
          <div className="container mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
