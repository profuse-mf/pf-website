import React, { useEffect } from "react";
import { useLocation } from "wouter";
import PolicyHeroForm from "@/components/home/policy-hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { createApplication } from "@/lib/application-api";

type InstantValues = {
  vehicleType: "car" | "bike";
  registrationNumber: string;
  mobileNumber: string;
  email: string;
};

export default function InstantApplyPage() {
  useEffect(() => { document.title = "Instant Apply | PolicyFatafat"; }, []);
  const [, navigate] = useLocation();

  const handleFormSubmit = (data: InstantValues) => {
    createApplication({
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
    sessionStorage.setItem("offersData", JSON.stringify({
      vehicleType: data.vehicleType,
      registrationNumber: data.registrationNumber,
      model: "",
    }));
    navigate("/offers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PolicyHeroForm onSubmit={handleFormSubmit} defaultValues={null} />
      </main>
      <Footer />
    </div>
  );
}
