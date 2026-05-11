import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import HeroForm from "@/components/home/hero-form";
import PartnersScreen from "@/components/home/partners-screen";
import Navbar from "@/components/layout/navbar";

export const formSchema = z.object({
  insuranceType: z.enum(["car", "bike"]),
  registrationNumber: z.string().min(4, "Registration number is required").toUpperCase(),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Must be a valid 6-digit pin code"),
  policyExpiryDate: z.string().min(1, "Expiry date is required"),
  registrationYear: z.string().min(4, "Year is required"),
  carModel: z.string().min(1, "Model is required"),
});

export type FormValues = z.infer<typeof formSchema>;

export default function Home() {
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
    </div>
  );
}
