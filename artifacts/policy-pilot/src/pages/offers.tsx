import React from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PartnersScreen from "@/components/home/partners-screen";

export default function OffersPage() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);

  const vehicleType = (params.get("vehicleType") ?? "car") as "car" | "bike";
  const registrationNumber = params.get("reg") ?? "";
  const model = params.get("model") ?? "";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PartnersScreen
          vehicleType={vehicleType}
          registrationNumber={registrationNumber}
          model={model}
          onBack={() => navigate("/")}
        />
      </main>
      <Footer />
    </div>
  );
}
