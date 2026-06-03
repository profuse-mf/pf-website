import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Bike, ShieldCheck, Zap, Users, CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";
import { FormValues, formSchema } from "@/lib/form-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import VehicleSelector from "@/components/home/vehicle-selector";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 inline-block" xmlns="http://www.w3.org/2000/svg">
      <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const MONTHS: [string, string][] = [
  ["01","Jan"],["02","Feb"],["03","Mar"],["04","Apr"],
  ["05","May"],["06","Jun"],["07","Jul"],["08","Aug"],
  ["09","Sep"],["10","Oct"],["11","Nov"],["12","Dec"],
];

function DateDropdowns({ value, onChange, startYear }: { value: string; onChange: (v: string) => void; startYear?: string }) {
  const parts = value ? value.split("-") : ["", "", ""];
  const [year, setYear] = useState(parts[0] ?? "");
  const [month, setMonth] = useState(parts[1] ?? "");
  const [day, setDay] = useState(parts[2] ?? "");

  const emit = (y: string, m: string, d: string) => {
    if (y && m && d) onChange(`${y}-${m}-${d}`);
    else onChange("");
  };

  const currentYear = new Date().getFullYear();
  const fromYear = startYear ? parseInt(startYear) : currentYear;
  const toYear = currentYear + 7;
  const yearCount = Math.max(1, toYear - fromYear + 1);
  const years = Array.from({ length: yearCount }, (_, i) => String(fromYear + i));

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select value={day} onValueChange={(v) => { setDay(v); emit(year, month, v); }}>
        <SelectTrigger><SelectValue placeholder="Day" /></SelectTrigger>
        <SelectContent>{DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={month} onValueChange={(v) => { setMonth(v); emit(year, v, day); }}>
        <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
        <SelectContent>{MONTHS.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={year} onValueChange={(v) => { setYear(v); emit(v, month, day); }}>
        <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
        <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}

interface HeroFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues: FormValues | null;
}

const CURRENT_YEAR = new Date().getFullYear();

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

  const isOldVehicle = watchYear
    ? CURRENT_YEAR - parseInt(watchYear) > 1
    : false;

  const [selectorOpen, setSelectorOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [wantsWhatsApp, setWantsWhatsApp] = useState(true);
  const [termsError, setTermsError] = useState(false);

  const handleFormSubmit = form.handleSubmit((data) => {
    if (!agreedToTerms) { setTermsError(true); return; }
    setTermsError(false);
    onSubmit(data);
  });

  const modelDisplayValue = watchModel
    ? watchVariant
      ? `${watchModel} · ${watchVariant}`
      : watchModel
    : "";

  return (
    <div className="flex-1 flex flex-col">
      <section className="relative pt-4 pb-8 lg:pt-20 lg:pb-32 px-4 flex-1 flex items-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Hero text — shown below form on mobile, left column on desktop */}
          <div className="space-y-4 lg:space-y-6 max-w-xl order-2 lg:order-1">
            <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              India's Smartest Insurance Aggregator
            </div>
            <h1 className="text-2xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              Find the right motor insurance in <span className="text-primary">under 2 minutes.</span>
            </h1>
            <p className="hidden lg:block text-lg text-muted-foreground type-body">
              Compare 6+ top insurers, get unbiased recommendations, and save up to 80% on your premium. Like a sharp-suited advisor in your pocket.
            </p>

            <div className="flex flex-wrap gap-3 lg:gap-4 lg:pt-4">
              <div className="flex items-center gap-1.5 text-xs lg:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                <span>10,000+ Insured</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs lg:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs lg:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                <span>Instant Policy</span>
              </div>
            </div>
          </div>

          {/* Form — always first on mobile */}
          <div className="bg-card border shadow-xl rounded-2xl p-5 lg:p-8 relative order-1 lg:order-2">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl mb-4">Your Vehicle Details</h3>
                    <FormField
                      control={form.control}
                      name="insuranceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-4">
                              <Button
                                type="button"
                                variant="outline"
                                className={`h-14 border-2 flex items-center justify-center gap-2 ${field.value === "car" ? "border-primary bg-primary/5 text-primary" : ""}`}
                                onClick={() => {
                                  field.onChange("car");
                                  form.setValue("carModel", "");
                                  form.setValue("carVariant", "");
                                }}
                              >
                                <Car className="w-5 h-5" />
                                Car
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className={`h-14 border-2 flex items-center justify-center gap-2 ${field.value === "bike" ? "border-primary bg-primary/5 text-primary" : ""}`}
                                onClick={() => {
                                  field.onChange("bike");
                                  form.setValue("carModel", "");
                                  form.setValue("carVariant", "");
                                }}
                              >
                                <Bike className="w-5 h-5" />
                                Bike
                              </Button>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Number <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MH12AB1234"
                              {...field}
                              className="uppercase"
                              maxLength={13}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
                                field.onChange(cleaned);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pin Code <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="400001"
                              maxLength={6}
                              inputMode="numeric"
                              {...field}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
                                field.onChange(digits);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="registrationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reg. Year <span className="text-red-500">*</span></FormLabel>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
                              const isOld = CURRENT_YEAR - parseInt(val) > 1;
                              if (!isOld) form.setValue("previousYearClaim", undefined);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
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
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="carModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{watchType === "car" ? "Car Brand & Model" : "Bike Brand & Model"} <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <button
                              type="button"
                              data-testid="button-open-vehicle-selector"
                              onClick={() => setSelectorOpen(true)}
                              className={`
                                flex items-center justify-between w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background
                                hover:border-primary transition-colors text-left
                                ${!field.value ? "text-muted-foreground" : "text-foreground"}
                              `}
                            >
                              <span className="truncate">
                                {modelDisplayValue || (watchType === "car" ? "Select brand & model" : "Select brand & model")}
                              </span>
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
                            onChange={(val) => {
                              field.onChange(val);
                            }}
                            onVariantChange={(v) => {
                              form.setValue("carVariant", v, { shouldValidate: true });
                            }}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  <AnimatePresence>
                    {isOldVehicle && (
                      <motion.div
                        key="claim-question"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <FormField
                          control={form.control}
                          name="previousYearClaim"
                          render={({ field }) => (
                            <FormItem>
                              <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                                  <FormLabel className="text-sm font-semibold m-0">
                                    Have you made a claim in your current policy?
                                  </FormLabel>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => field.onChange("yes")}
                                    className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all
                                      ${field.value === "yes"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-card text-foreground hover:border-primary/50"
                                      }`}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => field.onChange("no")}
                                    className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all
                                      ${field.value === "no"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-card text-foreground hover:border-primary/50"
                                      }`}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="9876543210"
                              maxLength={10}
                              inputMode="numeric"
                              {...field}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                field.onChange(digits);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="policyExpiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Policy Expiry <span className="text-muted-foreground text-xs font-normal">(Optional)</span></FormLabel>
                          <DateDropdowns value={field.value ?? ""} onChange={field.onChange} startYear={watchYear || undefined} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email ID <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            inputMode="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Consent checkboxes */}
                <div className="space-y-2.5">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={e => { setAgreedToTerms(e.target.checked); if (e.target.checked) setTermsError(false); }}
                      className="mt-0.5 w-[18px] h-[18px] shrink-0 rounded accent-[#1b5fb8]"
                    />
                    <span className="text-sm text-foreground leading-snug">
                      I agree to the{" "}
                      <a href="/terms" className="underline font-semibold" target="_blank" rel="noopener noreferrer">
                        terms and conditions
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={wantsWhatsApp}
                      onChange={e => setWantsWhatsApp(e.target.checked)}
                      className="mt-0.5 w-[18px] h-[18px] shrink-0 rounded accent-[#1b5fb8]"
                    />
                    <span className="text-sm text-foreground leading-snug flex items-center gap-1.5 flex-wrap">
                      I want to receive updates on <WhatsAppIcon /><strong className="font-semibold">WhatsApp</strong>
                    </span>
                  </label>
                  {termsError && (
                    <p className="text-xs text-red-500">Please agree to the terms and conditions to proceed.</p>
                  )}
                </div>

                <Button type="button" size="lg" className="w-full text-lg h-14 font-semibold shadow-xl shadow-primary/20"
                  onClick={() => { if (!agreedToTerms) { setTermsError(true); return; } setTermsError(false); handleFormSubmit(); }}
                >
                  View Insurance Plans
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg">Unbiased Comparison</h4>
              <p className="text-sm text-muted-foreground type-notes">We compare across 6+ top insurers to find you the best coverage at the lowest price.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg">Instant Policy Issuance</h4>
              <p className="text-sm text-muted-foreground type-notes">No paperwork, no inspections in most cases. Get your policy document via email instantly.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg">Dedicated Claims Support</h4>
              <p className="text-sm text-muted-foreground type-notes">Our sharp-suited advisors stay with you even when things go wrong to help with claims.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
