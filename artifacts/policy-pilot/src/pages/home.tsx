import React from "react";
import { useLocation } from "wouter";
import HeroForm from "@/components/home/hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { FormValues } from "@/lib/form-schema";
import { createApplication } from "@/lib/application-api";

export type { FormValues };

export default function Home() {
  const [, navigate] = useLocation();

  const handleFormSubmit = (data: FormValues) => {
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
    });
    const params = new URLSearchParams({
      vehicleType: data.insuranceType,
      reg: data.registrationNumber,
      ...(data.carModel ? { model: data.carModel } : {}),
    });
    navigate(`/offers?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroForm onSubmit={handleFormSubmit} defaultValues={null} />
      </main>
      <Footer />
    </div>
  );
}
