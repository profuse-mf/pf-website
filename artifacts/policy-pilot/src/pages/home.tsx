import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import HeroForm from "@/components/home/hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import type { FormValues } from "@/lib/form-schema";
import { createApplication, captureUtmParams, getStoredUtm } from "@/lib/application-api";
import { CheckCircle2 } from "lucide-react";

export type { FormValues };

const WHY_CHOOSE = [
  "Compare insurance plans from multiple insurers.",
  "Easy online policy purchase and renewal process.",
  "Transparent premium comparisons.",
  "Quick access to policy details and coverage options.",
  "Support throughout the insurance selection process.",
  "Secure and hassle-free experience.",
  "Options for both comprehensive and third-party vehicle insurance.",
];

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* Hero form */}
        <HeroForm onSubmit={handleFormSubmit} defaultValues={utmDefaults} />

        {/* H1 + intro description */}
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

        {/* Why Choose Policy Fatafat */}
        <section className="bg-muted/40 border-t">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 text-center">
              Why Choose Policy Fatafat?
            </h2>
            <ul className="space-y-4 mb-10">
              {WHY_CHOOSE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <Link href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button size="lg" className="font-bold text-base px-10">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
