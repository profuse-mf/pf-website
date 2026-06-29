import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  SlidersHorizontal,
  BadgeCheck,
  ExternalLink,
  FileCheck,
  ArrowRight,
  Info,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter Your Vehicle Details",
    description:
      "Provide basic information about your car or bike, such as the registration number and policy details, to get started.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Compare Insurance Plans",
    description:
      "View motor insurance plans from our partner insurance providers. Compare coverage options, premiums, and benefits to find a plan that suits your requirements.",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Choose a Plan",
    description:
      "Select the insurance plan that best matches your needs and budget.",
  },
  {
    number: "04",
    icon: ExternalLink,
    title: "Complete Your Purchase",
    description:
      "Once you choose a plan, you will be redirected to the respective insurance partner's website to complete the application and purchase process securely.",
  },
  {
    number: "05",
    icon: FileCheck,
    title: "Get Your Policy",
    description:
      "After successful completion of the purchase on the insurer's website, your policy will be issued by the insurance provider as per their terms and conditions.",
  },
];

export default function HowItWorksPage() {
  useEffect(() => { document.title = "How It Works | PolicyFatafat"; }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="container mx-auto max-w-4xl px-4 pt-16 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            How It Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Getting the right motor insurance is simple with Policy Fatafat.
            Follow these five easy steps to compare and purchase your policy.
          </p>
        </section>

        {/* ── Steps ── */}
        <section className="container mx-auto max-w-4xl px-4 pb-12">
          <div className="flex flex-col gap-5">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col sm:flex-row gap-5 rounded-2xl border bg-white p-7 shadow-sm"
                >
                  {/* Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute left-[2.6rem] top-full h-5 w-px bg-border z-10" />
                  )}

                  {/* Step number */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {step.number}
                    </div>
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground mb-2">{step.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Disclaimer note ── */}
        <section className="container mx-auto max-w-4xl px-4 pb-12">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              Policy Fatafat is an insurance aggregator that helps users compare motor insurance
              plans offered by partner insurance companies. Policy issuance is subject to the
              insurer's underwriting guidelines and policy terms.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container mx-auto max-w-4xl px-4 pb-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Ready to find the right plan?
          </h2>
          <p className="text-muted-foreground mb-6">
            Compare motor insurance plans from our partner insurers in minutes.
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2 px-8 font-semibold">
              Get Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}
