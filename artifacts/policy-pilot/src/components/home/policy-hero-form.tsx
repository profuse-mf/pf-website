import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car, Bike, ShieldCheck, Zap, Users, CheckCircle2, Star } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const instantSchema = z.object({
  vehicleType: z.enum(["car", "bike"]),
  registrationNumber: z.string().min(4, "Registration number is required"),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  email: z.string().email("Must be a valid email address"),
});

type InstantValues = z.infer<typeof instantSchema>;

interface PolicyHeroFormProps {
  onSubmit: (data: InstantValues) => void;
  defaultValues?: Partial<InstantValues> | null;
}

const COVERAGE_ITEMS = [
  {
    img: "/coverage/accidents.png",
    label: "Accidents",
    description: "Covers damages caused by accidents and collisions.",
  },
  {
    img: "/coverage/theft.png",
    label: "Theft",
    description: "Protection against vehicle theft or loss.",
  },
  {
    img: "/coverage/fire.png",
    label: "Fire",
    description: "Covers damages caused due to accidental fire.",
  },
  {
    img: "/coverage/natural.png",
    label: "Natural Disasters",
    description: "Protection from floods, cyclones, and other natural calamities.",
  },
  {
    img: "/coverage/personal.png",
    label: "Personal Accident",
    description: "Financial support for accident-related injuries or loss.",
  },
  {
    img: "/coverage/thirdparty.png",
    label: "Third-Party Losses",
    description: "Covers damages caused to others or their property.",
  },
];

const AVATAR_COLORS = ["bg-primary", "bg-indigo-400", "bg-pink-400", "bg-amber-400"];
const AVATAR_INITIALS = ["R", "P", "A", "M"];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 inline-block" xmlns="http://www.w3.org/2000/svg">
      <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function PolicyHeroForm({ onSubmit, defaultValues }: PolicyHeroFormProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [wantsWhatsApp, setWantsWhatsApp] = useState(true);
  const [termsError, setTermsError] = useState(false);

  const form = useForm<InstantValues>({
    resolver: zodResolver(instantSchema),
    defaultValues: defaultValues || {
      vehicleType: "car",
      registrationNumber: "",
      mobileNumber: "",
      email: "",
    },
  });

  return (
    <div className="flex-1 flex flex-col">

      {/* ── HERO ── */}
      <section className="bg-white px-4 pt-10 lg:pt-16 pb-0">
        <div className="container mx-auto max-w-6xl">

          {/* Top row: headline + trust widget */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight max-w-lg">
              Find the right <span className="text-foreground">Motor Insurance</span> in<br />
              under <span className="text-primary">2 minutes.</span>
            </h1>

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
            <div className="relative rounded-2xl overflow-hidden order-2 lg:order-1 mb-4 lg:mb-0 h-56 lg:h-full">
              <img
                src="/hero-insurance.png"
                alt="Happy customer with car"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Form + trust pills */}
            <div className="flex flex-col gap-4 order-1 lg:order-2">
              <div className="bg-white border shadow-lg rounded-2xl p-5 lg:p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <h3 className="text-lg mb-1">Your Vehicle Details</h3>

                    <FormField control={form.control} name="vehicleType" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-12 border-2 flex items-center justify-center gap-2 ${field.value === "car" ? "border-primary bg-primary/5 text-primary" : ""}`}
                              onClick={() => field.onChange("car")}
                            >
                              <Car className="w-4 h-4" /> Car
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-12 border-2 flex items-center justify-center gap-2 ${field.value === "bike" ? "border-primary bg-primary/5 text-primary" : ""}`}
                              onClick={() => field.onChange("bike")}
                            >
                              <Bike className="w-4 h-4" /> Bike
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="MH12AB1234" {...field} className="uppercase h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" maxLength={10} {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email ID</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* Consent checkboxes */}
                    <div className="space-y-2.5 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={e => { setAgreedToTerms(e.target.checked); if (e.target.checked) setTermsError(false); }}
                          className="mt-0.5 w-[18px] h-[18px] shrink-0 rounded accent-[#e8622a]"
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
                          className="mt-0.5 w-[18px] h-[18px] shrink-0 rounded accent-[#e8622a]"
                        />
                        <span className="text-sm text-foreground leading-snug flex items-center gap-1.5 flex-wrap">
                          I want to receive updates on <WhatsAppIcon /><strong className="font-semibold">WhatsApp</strong>
                        </span>
                      </label>
                      {termsError && (
                        <p className="text-xs text-red-500">Please agree to the terms and conditions to proceed.</p>
                      )}
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full text-base h-12 font-semibold shadow-lg shadow-primary/20"
                      onClick={() => {
                        if (!agreedToTerms) { setTermsError(true); return; }
                        setTermsError(false);
                        form.handleSubmit(onSubmit)();
                      }}
                    >
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {COVERAGE_ITEMS.map(({ img, label, description }) => (
              <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full rounded-xl overflow-hidden bg-slate-50 mb-3" style={{ height: "120px" }}>
                  <img src={img} alt={label} className="w-full object-cover object-center" style={{ height: "130%", marginTop: "-10%" }} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground type-notes leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
