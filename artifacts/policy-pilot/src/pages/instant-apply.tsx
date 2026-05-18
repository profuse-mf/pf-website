import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PolicyHeroForm from "@/components/home/policy-hero-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createApplication } from "@/lib/application-api";

type InstantValues = {
  vehicleType: "car" | "bike";
  registrationNumber: string;
  mobileNumber: string;
  email: string;
};

function ConfirmationScreen({ data, onBack }: { data: InstantValues; onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">You're all set!</h2>
          <p className="text-muted-foreground type-body">
            We've received your details for vehicle <strong className="text-foreground uppercase">{data.registrationNumber}</strong>.
            Our advisor will reach out to you at <strong className="text-foreground">{data.mobileNumber}</strong> shortly.
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3 text-left">
          <PhoneCall className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm type-notes text-muted-foreground">
            A confirmation will also be sent to <strong className="text-foreground">{data.email}</strong>.
          </p>
        </div>

        <Button variant="outline" onClick={onBack} className="w-full">
          Submit another request
        </Button>
      </motion.div>
    </div>
  );
}

export default function InstantApplyPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<InstantValues | null>(null);

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
              <ConfirmationScreen data={formData} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
