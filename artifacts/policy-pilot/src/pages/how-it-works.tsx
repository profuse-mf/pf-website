import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  SlidersHorizontal,
  BadgeCheck,
  ShieldCheck,
  Zap,
  Lock,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter your vehicle details",
    description:
      "Tell us your registration number, year of manufacture, pin code, and mobile number. Select your car or bike brand, model, and exact variant — takes under 60 seconds.",
    detail: "Your data is encrypted in transit and never sold to third parties.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "We compare plans for you",
    description:
      "PolicyFatafat instantly fetches quotes from 6+ top IRDAI-approved insurers — Acko, HDFC ERGO, Bajaj Allianz, Policybazaar, Kotak, ICICI Lombard, and more.",
    detail: "All comparisons are unbiased. We don't favour any insurer.",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Pick your plan & buy instantly",
    description:
      "Choose the insurer and plan that fits your budget and needs. We redirect you directly to the insurer's secure checkout — no middlemen, no hidden charges.",
    detail: "Policy is issued instantly. Digital copy sent to your email/WhatsApp.",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Under 2 minutes",
    description: "From entering your details to viewing quotes — faster than a coffee run.",
  },
  {
    icon: ShieldCheck,
    title: "IRDAI-approved partners only",
    description: "Every insurer we work with is fully licensed and regulated by IRDAI.",
  },
  {
    icon: Lock,
    title: "Zero data selling",
    description: "We never sell or share your personal information with anyone.",
  },
  {
    icon: ThumbsUp,
    title: "Completely free to use",
    description: "PolicyFatafat is 100% free. Insurers pay us a small commission on policies.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto max-w-4xl px-4 pt-16 pb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Zap className="w-3.5 h-3.5" />
            Simple. Fast. Transparent.
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How PolicyFatafat works
          </h1>
          <p className="mt-4 text-lg text-muted-foreground type-body max-w-2xl">
            Finding the right motor insurance should take minutes, not hours. Here's exactly
            how we help you get the best quote — at no cost to you.
          </p>
        </section>

        {/* Steps */}
        <section className="container mx-auto max-w-4xl px-4 pb-16">
          <div className="flex flex-col gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col sm:flex-row gap-6 rounded-2xl border bg-card p-7 shadow-sm"
                >
                  {/* Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute left-[2.6rem] top-full h-6 w-px bg-border" />
                  )}

                  {/* Step number circle */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {step.number}
                    </div>
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-xl mb-2">{step.title}</h2>
                    <p className="text-muted-foreground leading-relaxed type-body">{step.description}</p>
                    <p className="mt-3 text-xs text-primary type-notes flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why PolicyFatafat */}
        <section className="bg-card border-y">
          <div className="container mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl tracking-tight mb-2">Why choose PolicyFatafat?</h2>
            <p className="text-muted-foreground type-body mb-10">
              We're built for the Indian vehicle owner — straightforward, unbiased, and completely free.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex gap-4 items-start rounded-xl border bg-background p-5"
                  >
                    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm">{b.title}</h3>
                      <p className="text-xs text-muted-foreground type-notes mt-1 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl tracking-tight mb-3">
            Ready to find the right plan?
          </h2>
          <p className="text-muted-foreground type-body mb-6">
            Compare quotes from 6+ insurers in under 2 minutes — completely free.
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2 px-8 rounded-xl font-semibold">
              Get free quotes <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
