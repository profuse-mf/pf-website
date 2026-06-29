import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import HeroForm from "@/components/home/hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import type { FormValues } from "@/lib/form-schema";
import { createApplication, captureUtmParams, getStoredUtm } from "@/lib/application-api";
import {
  GitCompareArrows,
  RefreshCw,
  BarChart3,
  FileSearch,
  Headphones,
  Lock,
  Car,
  CheckCircle2,
  Bike,
  ShieldCheck,
  Wrench,
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
  "Zero Depreciation Cover",
  "Roadside Assistance",
  "Engine Protection Cover",
  "Consumables Cover",
  "Return to Invoice Cover",
  "Personal Accident Cover",
  "Key Replacement Cover",
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Home() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "PolicyFatafat – Compare Car & Bike Insurance Online";
    captureUtmParams();
  }, []);

  const utmDefaults = useMemo<FormValues | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const reg = params.get("utm_reg")?.trim().toUpperCase() ?? "";
    const mobile = params.get("utm_mobile")?.trim() ?? "";
    if (!reg && !mobile) return null;
    return {
      insuranceType: "car",
      registrationNumber: reg,
      mobileNumber: mobile,
      email: "",
      pinCode: "",
      policyExpiryDate: "",
      registrationYear: "",
      carModel: "",
      carVariant: "",
      previousYearClaim: undefined,
    };
  }, []);

  const handleFormSubmit = (data: FormValues) => {
    const utm = getStoredUtm();
    createApplication({
      vehicle_type: data.insuranceType === "car" ? "Car" : "Bike",
      reg_no: data.registrationNumber || null,
      pincode: data.pinCode || null,
      reg_year: data.registrationYear ? parseInt(data.registrationYear) : null,
      model: data.carModel || null,
      brand: null,
      mobile_no: data.mobileNumber || null,
      expiry_date: data.policyExpiryDate || null,
      email: data.email || null,
      utm_source:  utm.utm_source,
      utm_medium:  utm.utm_medium,
      utm_partner: utm.utm_partner,
      utm_channel: utm.utm_channel,
    });
    sessionStorage.setItem("offersData", JSON.stringify({
      vehicleType: data.insuranceType,
      registrationNumber: data.registrationNumber,
      model: data.carModel ?? "",
    }));
    navigate("/offers");
    scrollToTop();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex flex-col">

        {/* ── Hero form ─────────────────────────────────── */}
        <HeroForm onSubmit={handleFormSubmit} defaultValues={utmDefaults} />

        {/* ── H1 + intro ────────────────────────────────── */}
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

        {/* ── Why Choose — cards ────────────────────────── */}
        <section className="bg-muted/40 border-t">
          <div className="container mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-10 text-center">
              Why Choose Policy Fatafat?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl border p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-snug">{title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bike Insurance ────────────────────────────── */}
        <section className="bg-white border-t">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Bike className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Bike Insurance (Two Wheeler Insurance)
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              Two wheeler insurance helps protect your bike or scooter against financial losses
              arising from accidents, theft, natural calamities, and third-party liabilities.
              Policy Fatafat allows you to compare different bike insurance plans and choose
              coverage that suits your requirements.
            </p>

            {/* Benefits of Bike Insurance */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
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
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground">What Are Two Wheeler Insurance Add-Ons?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Add-ons are optional coverages that can enhance your bike insurance policy.
                Common add-ons include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ADDONS.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 bg-amber-50 rounded-lg border border-amber-100 px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-sm text-foreground font-medium">{a}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mb-8">
                Availability of add-ons may vary by insurer and policy type.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="font-bold text-base px-12" onClick={scrollToTop}>
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
