import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car, Bike, ShieldCheck, Zap, Users, CheckCircle2,
  ChevronDown, AlertCircle, Star, CloudLightning, Flame,
  CarFront, Key, UserRound, Scale,
} from "lucide-react";
import { FormValues, formSchema } from "@/lib/form-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import VehicleSelector from "@/components/home/vehicle-selector";

interface HeroFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues: FormValues | null;
}

const CURRENT_YEAR = new Date().getFullYear();

const COVERAGE_ITEMS = [
  {
    icon: CarFront,
    label: "Accidents",
    description: "Covers damages caused by accidents and collisions.",
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    icon: Key,
    label: "Theft",
    description: "Protection against vehicle theft or loss.",
    bg: "bg-slate-100",
    color: "text-slate-500",
  },
  {
    icon: Flame,
    label: "Fire",
    description: "Covers damages caused due to accidental fire.",
    bg: "bg-red-50",
    color: "text-red-400",
  },
  {
    icon: CloudLightning,
    label: "Natural Disasters",
    description: "Protection from floods, cyclones, and other natural calamities.",
    bg: "bg-blue-50",
    color: "text-blue-400",
  },
  {
    icon: UserRound,
    label: "Personal Accident",
    description: "Financial support for accident-related injuries or loss.",
    bg: "bg-purple-50",
    color: "text-purple-400",
  },
  {
    icon: Scale,
    label: "Third-Party Losses",
    description: "Covers damages caused to others or their property.",
    bg: "bg-teal-50",
    color: "text-teal-500",
  },
];

const AVATAR_COLORS = ["bg-primary", "bg-indigo-400", "bg-pink-400", "bg-amber-400"];
const AVATAR_INITIALS = ["R", "P", "A", "M"];

export default function HeroForm({ onSubmit, defaultValues }: HeroFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      insuranceType: "car",
      registrationNumber: "",
      mobileNumber: "",
      pinCode: "",
      policyExpiryDate: "",
      registrationYear: "",
      carModel: "",
      carVariant: "",
      previousYearClaim: undefined,
    },
  });

  const watchType = form.watch("insuranceType");
  const watchYear = form.watch("registrationYear");
  const watchModel = form.watch("carModel");
  const watchVariant = form.watch("carVariant");

  const isOldVehicle = watchYear ? CURRENT_YEAR - parseInt(watchYear) > 1 : false;
  const [selectorOpen, setSelectorOpen] = useState(false);

  const modelDisplayValue = watchModel
    ? watchVariant ? `${watchModel} · ${watchVariant}` : watchModel
    : "";

  return (
    <div className="flex-1 flex flex-col">

      {/* ── HERO ── */}
      <section className="bg-white px-4 pt-6 lg:pt-10 pb-0">
        <div className="container mx-auto max-w-6xl">

          {/* Top row: headline + trust widget */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight max-w-lg">
              Find the right <span className="text-foreground">Motor Insurance</span> in<br />
              under <span className="text-primary">2 minutes.</span>
            </h1>

            {/* Trust badge — desktop only */}
            <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {AVATAR_COLORS.map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} text-white text-xs font-bold flex items-center justify-center ring-2 ring-white`}>
                      {AVATAR_INITIALS[i]}
                    </div>
                  ))}
                </div>
                <span className="text-xl font-bold text-foreground">+</span>
              </div>
              <p className="text-xs text-muted-foreground type-notes text-right">
                Trusted by <strong className="text-foreground">10,000+</strong> Insured Customers
              </p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Main grid: photo | form */}
          <div className="grid lg:grid-cols-2 gap-5 items-stretch">

            {/* Hero photo */}
            <div className="relative rounded-2xl overflow-hidden bg-primary min-h-[240px] lg:min-h-0 order-2 lg:order-1">
              <img
                src="/hero-man.png"
                alt="Happy customer with car"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              {/* Subtle blue overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Form + trust pills */}
            <div className="flex flex-col gap-4 order-1 lg:order-2">
              <div className="bg-white border shadow-lg rounded-2xl p-5 lg:p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg mb-3">Your Vehicle Details</h3>
                        <FormField
                          control={form.control}
                          name="insuranceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="grid grid-cols-2 gap-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className={`h-12 border-2 flex items-center justify-center gap-2 ${field.value === "car" ? "border-primary bg-primary/5 text-primary" : ""}`}
                                    onClick={() => { field.onChange("car"); form.setValue("carModel", ""); form.setValue("carVariant", ""); }}
                                  >
                                    <Car className="w-4 h-4" /> Car
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className={`h-12 border-2 flex items-center justify-center gap-2 ${field.value === "bike" ? "border-primary bg-primary/5 text-primary" : ""}`}
                                    onClick={() => { field.onChange("bike"); form.setValue("carModel", ""); form.setValue("carVariant", ""); }}
                                  >
                                    <Bike className="w-4 h-4" /> Bike
                                  </Button>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Number</FormLabel>
                            <FormControl><Input placeholder="MH12AB1234" {...field} className="uppercase" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="pinCode" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pin Code</FormLabel>
                            <FormControl><Input placeholder="400001" maxLength={6} {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField control={form.control} name="registrationYear" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reg. Year</FormLabel>
                            <Select onValueChange={(val) => { field.onChange(val); if (CURRENT_YEAR - parseInt(val) <= 1) form.setValue("previousYearClaim", undefined); }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-48 overflow-y-auto">
                                {Array.from({ length: 25 }).map((_, i) => {
                                  const year = (CURRENT_YEAR - i).toString();
                                  return <SelectItem key={year} value={year}>{year}</SelectItem>;
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="carModel" render={({ field }) => (
                          <FormItem>
                            <FormLabel>{watchType === "car" ? "Car Brand & Model" : "Bike Brand & Model"}</FormLabel>
                            <FormControl>
                              <button
                                type="button"
                                data-testid="button-open-vehicle-selector"
                                onClick={() => setSelectorOpen(true)}
                                className={`flex items-center justify-between w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background hover:border-primary transition-colors text-left ${!field.value ? "text-muted-foreground" : "text-foreground"}`}
                              >
                                <span className="truncate">{modelDisplayValue || "Select brand & model"}</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                              </button>
                            </FormControl>
                            <FormMessage />
                            <VehicleSelector
                              open={selectorOpen}
                              onOpenChange={setSelectorOpen}
                              vehicleType={watchType}
                              value={field.value}
                              variant={watchVariant ?? ""}
                              onChange={(val) => field.onChange(val)}
                              onVariantChange={(v) => form.setValue("carVariant", v, { shouldValidate: true })}
                            />
                          </FormItem>
                        )} />
                      </div>

                      <AnimatePresence>
                        {isOldVehicle && (
                          <motion.div key="claim-question" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
                            <FormField control={form.control} name="previousYearClaim" render={({ field }) => (
                              <FormItem>
                                <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
                                  <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                                    <FormLabel className="text-sm font-semibold m-0">Have you made a claim in your current policy?</FormLabel>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <button type="button" onClick={() => field.onChange("yes")} className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${field.value === "yes" ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"}`}>Yes</button>
                                    <button type="button" onClick={() => field.onChange("no")} className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${field.value === "no" ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"}`}>No</button>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl><Input placeholder="9876543210" maxLength={10} {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="policyExpiryDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Policy Expiry</FormLabel>
                            <FormControl><Input type="date" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full text-base h-12 font-semibold shadow-lg shadow-primary/20">
                      View Insurance Plans
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Trust pills bar */}
              <div className="bg-muted/60 border rounded-xl px-4 py-3 flex items-center justify-around gap-2">
                {[
                  { icon: CheckCircle2, label: "Zero Hidden Fees" },
                  { icon: Zap, label: "Instant Policy" },
                  { icon: ShieldCheck, label: "24x7 Claims Support" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs type-notes text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative overflow-hidden mt-0 py-16">
        {/* Sunburst background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-slate-100" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 8deg, rgba(27,95,184,0.08) 8deg, rgba(27,95,184,0.08) 9deg)",
          }}
        />

        <div className="relative container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: ShieldCheck, title: "Unbiased Comparison", desc: "We compare across 6+ top insurers to find you the best coverage at the lowest price." },
              { icon: Zap, title: "Instant Policy Issuance", desc: "No paperwork, no inspections in most cases. Get your policy document via email instantly." },
              { icon: Users, title: "Dedicated Claims Support", desc: "Our sharp-suited advisors stay with you even when things go wrong to help with claims." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="space-y-4">
                <div className="w-16 h-16 bg-white border-2 border-primary/20 text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground type-notes leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S COVERED ── */}
      <section className="bg-white py-16 border-t">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl lg:text-3xl text-center text-primary mb-10">
            What's Covered in PolicyPilot Car Insurance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {COVERAGE_ITEMS.map(({ icon: Icon, label, description, bg, color }) => (
              <div key={label} className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{label}</h3>
                  <p className="text-xs text-muted-foreground type-notes leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
