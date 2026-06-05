import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PartnersScreen from "@/components/home/partners-screen";

interface OffersData {
  vehicleType: "car" | "bike";
  registrationNumber: string;
  model: string;
}

export default function OffersPage() {
  const [, navigate] = useLocation();
  const [data, setData] = useState<OffersData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("offersData");
    if (raw) {
      try {
        setData(JSON.parse(raw) as OffersData);
        sessionStorage.removeItem("offersData");
        // Meta Pixel — Lead (fires when user reaches offers page)
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "Lead");
        }
      } catch {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      {/* Trackier conversion pixel */}
      <iframe
        src="https://profuse.gotrackier.com/pixel?av=6a16a00de1b40618e60848ec"
        scrolling="no"
        frameBorder="0"
        width="1"
        height="1"
        style={{ display: "none" }}
        title="trackier-pixel"
      />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PartnersScreen
          vehicleType={data.vehicleType}
          registrationNumber={data.registrationNumber}
          model={data.model}
          onBack={() => navigate("/")}
        />
      </main>
      <Footer />
    </div>
  );
}
