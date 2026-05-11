import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Car, Bike, ShieldCheck, Zap, Users, CheckCircle2, ChevronDown } from "lucide-react";
import { FormValues, formSchema } from "@/pages/home";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import VehicleSelector from "@/components/home/vehicle-selector";

interface HeroFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues: FormValues | null;
}

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
    },
  });

  const watchType = form.watch("insuranceType");
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 flex-1 flex items-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              India's Smartest Insurance Aggregator
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Find the right motor insurance in <span className="text-primary">under 2 minutes.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare 6+ top insurers, get unbiased recommendations, and save up to 80% on your premium. Like a sharp-suited advisor in your pocket.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>10,000+ Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Instant Policy</span>
              </div>
            </div>
          </div>

          <div className="bg-card border shadow-xl rounded-2xl p-6 lg:p-8 relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Your Vehicle Details</h3>
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
                                onClick={() => field.onChange("car")}
                              >
                                <Car className="w-5 h-5" />
                                Car
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className={`h-14 border-2 flex items-center justify-center gap-2 ${field.value === "bike" ? "border-primary bg-primary/5 text-primary" : ""}`}
                                onClick={() => field.onChange("bike")}
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
                          <FormLabel>Registration Number</FormLabel>
                          <FormControl>
                            <Input placeholder="MH12AB1234" {...field} className="uppercase" />
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
                          <FormLabel>Pin Code</FormLabel>
                          <FormControl>
                            <Input placeholder="400001" maxLength={6} {...field} />
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
                          <FormLabel>Reg. Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-48 overflow-y-auto">
                              {Array.from({ length: 25 }).map((_, i) => {
                                const year = (new Date().getFullYear() - i).toString();
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
                          <FormLabel>{watchType === "car" ? "Car Brand & Model" : "Bike Brand & Model"}</FormLabel>
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
                                {field.value || (watchType === "car" ? "Select brand & model" : "Select brand & model")}
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
                            onChange={(val) => {
                              field.onChange(val);
                              setSelectorOpen(false);
                            }}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543210" maxLength={10} {...field} />
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
                          <FormLabel>Policy Expiry</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full text-lg h-14 font-semibold shadow-xl shadow-primary/20">
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
              <h4 className="font-bold text-lg">Unbiased Comparison</h4>
              <p className="text-sm text-muted-foreground">We compare across 6+ top insurers to find you the best coverage at the lowest price.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg">Instant Policy Issuance</h4>
              <p className="text-sm text-muted-foreground">No paperwork, no inspections in most cases. Get your policy document via email instantly.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg">Dedicated Claims Support</h4>
              <p className="text-sm text-muted-foreground">Our sharp-suited advisors stay with you even when things go wrong to help with claims.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
