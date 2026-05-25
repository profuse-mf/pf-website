import React, { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import HeroForm from "@/components/home/hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { FormValues } from "@/lib/form-schema";
import { createApplication, captureUtmParams, getStoredUtm } from "@/lib/application-api";

export type { FormValues };

export default function Home() {
  const [, navigate] = useLocation();

  useEffect(() => {
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
      pinCode: "",
      policyExpiryDate: "",
      registrationYear: "",
      carModel: "",
      carVariant: "",
      previousYearClaim: undefined,
    };
  }, []);

  const handleFormSubmit = (data: FormValues) => {
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
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
      email: null,
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
        <HeroForm onSubmit={handleFormSubmit} defaultValues={utmDefaults} />
      </main>
      <Footer />
    </div>
  );
}
