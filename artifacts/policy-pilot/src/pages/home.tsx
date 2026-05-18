import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroForm from "@/components/home/hero-form";
import PartnersScreen from "@/components/home/partners-screen";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { FormValues } from "@/lib/form-schema";
import { createApplication } from "@/lib/application-api";

export type { FormValues };

export default function Home() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormValues | null>(null);

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
    setFormData(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <HeroForm onSubmit={handleFormSubmit} defaultValues={formData} />
            </motion.div>
          )}
          {step === 2 && formData && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <PartnersScreen formData={formData} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
