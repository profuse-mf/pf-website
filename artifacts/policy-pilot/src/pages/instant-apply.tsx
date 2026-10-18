import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import PolicyHeroForm from "@/components/home/policy-hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { createApplication } from "@/lib/application-api";
import { ALL_PARTNERS, resolvePartnerUrl } from "@/data/partners";

const POLICYBAZAAR = ALL_PARTNERS.find((p) => p.id === "policybazaar")!;

type InstantValues = {
  vehicleType: "car" | "bike";
  registrationNumber: string;
  mobileNumber: string;
  email: string;
};

const MESSAGES = [
  "Fetching your details",
  "Verifying your details",
  "Redirecting you to the best insurance partner",
] as const;

const MESSAGE_INTERVAL_MS = 2200;

function getInstantParams() {
  const params = new URLSearchParams(window.location.search);
  const utmChannel = params.get("utm_channel")?.trim() || null;
  const utmTerm = params.get("utm_term")?.trim() || null;
  return { params, utmChannel, utmTerm, hasInstantParams: Boolean(utmChannel || utmTerm) };
}

export default function InstantApplyPage() {
  const [, navigate] = useLocation();
  const { hasInstantParams } = useMemo(() => getInstantParams(), []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    document.title = "Instant Apply | PolicyFatafat";
  }, []);

  // Round-robin status messages while waiting for the API (instant mode only)
  useEffect(() => {
    if (!hasInstantParams) return;
    const id = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [hasInstantParams]);

  // Auto-submit to pp-api when utm_channel / utm_term are present
  useEffect(() => {
    if (!hasInstantParams) return;

    let cancelled = false;

    async function run() {
      const { params, utmChannel, utmTerm } = getInstantParams();
      const utmSource = params.get("utm_source") || "WA_PB";
      const fallbackUrl = resolvePartnerUrl(
        POLICYBAZAAR,
        utmChannel || "organic",
        utmSource
      );

      const result = await createApplication({
        vehicle_type: "Car",
        reg_no: utmChannel,
        pincode: null,
        reg_year: null,
        model: null,
        brand: null,
        mobile_no: utmTerm,
        expiry_date: null,
        email: "noreply@policyfatafat.com",
        utm_source: utmSource,
        utm_medium: params.get("utm_medium") || "WA_Red",
        utm_partner: params.get("utm_partner") || "dummy",
        utm_channel: utmChannel,
      });

      if (cancelled) return;

      window.location.href = result.redirect_url || fallbackUrl;
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [hasInstantParams]);

  const handleFormSubmit = async (data: InstantValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await createApplication({
        vehicle_type: data.vehicleType === "car" ? "Car" : "Bike",
        reg_no: data.registrationNumber || null,
        pincode: null,
        reg_year: null,
        model: null,
        brand: null,
        mobile_no: data.mobileNumber || null,
        expiry_date: null,
        email: data.email || null,
        utm_source: null,
        utm_medium: null,
        utm_partner: null,
        utm_channel: null,
      });

      if (result.redirect_url) {
        window.location.href = result.redirect_url;
        return;
      }

      sessionStorage.setItem("offersData", JSON.stringify({
        vehicleType: data.vehicleType,
        registrationNumber: data.registrationNumber,
        model: "",
      }));
      navigate("/offers");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback: original form when both utm_channel and utm_term are missing
  if (!hasInstantParams) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-muted/30">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PolicyHeroForm
            onSubmit={handleFormSubmit}
            defaultValues={null}
            isSubmitting={isSubmitting}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#f4f7fb] px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-lg font-semibold text-foreground tracking-tight transition-opacity duration-300">
          {MESSAGES[messageIndex]}…
        </p>
      </div>
    </div>
  );
}
