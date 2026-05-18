import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PolicyHeroForm from "@/components/home/policy-hero-form";
import PartnersScreen from "@/components/home/partners-screen";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { FormValues } from "@/lib/form-schema";

export default function PolicyPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const handleFormSubmit = (data: FormValues) => {
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
              <PolicyHeroForm onSubmit={handleFormSubmit} defaultValues={formData} />
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
