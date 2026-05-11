import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "About motor insurance",
    faqs: [
      {
        q: "Is motor insurance mandatory in India?",
        a: "Yes. Under the Motor Vehicles Act 1988, at minimum a Third-Party (TP) insurance policy is mandatory for every vehicle on Indian roads. Driving without valid insurance can result in fines of ₹2,000 for first offence and ₹4,000 for subsequent offences, along with potential imprisonment.",
      },
      {
        q: "What is the difference between Third-Party and Comprehensive insurance?",
        a: "Third-Party (TP) insurance covers only damage or injury caused to a third party — another vehicle, person, or property. It does not cover any damage to your own vehicle.\n\nComprehensive insurance covers everything in a TP policy plus damage to your own vehicle from accidents, theft, fire, natural calamities, and more. It also usually includes a Personal Accident cover for the owner-driver.",
      },
      {
        q: "What is an Own Damage (OD) policy?",
        a: "An Own Damage policy is a standalone cover that protects only your vehicle against accidental damage, theft, fire, floods, and similar events. It must be bought alongside a Third-Party policy (they are separate). If you already have a valid TP policy, you can buy a standalone OD policy from a different insurer.",
      },
      {
        q: "What is a No Claim Bonus (NCB)?",
        a: "NCB is a discount applied to your Own Damage premium for every claim-free year. It starts at 20% after the first claim-free year and can go up to 50% after five consecutive claim-free years. NCB belongs to you (not the vehicle) — you carry it over when you switch insurers or buy a new car.",
      },
      {
        q: "What is IDV (Insured Declared Value)?",
        a: "IDV is the current market value of your vehicle — the maximum amount your insurer will pay if your vehicle is stolen or declared a total loss. IDV decreases every year as the vehicle depreciates. A higher IDV means a higher premium but better coverage; a lower IDV means a cheaper premium but less payout if the worst happens.",
      },
    ],
  },
  {
    title: "Using PolicyPilot",
    faqs: [
      {
        q: "Is PolicyPilot free to use?",
        a: "Yes, completely. PolicyPilot is a comparison platform — we are paid a commission by insurers on policies that are purchased through our platform. This cost is never passed on to you. The premium you see on the insurer's website is exactly what you pay.",
      },
      {
        q: "Does PolicyPilot sell insurance directly?",
        a: "No. PolicyPilot is an aggregator — we compare plans and redirect you to the insurer's official website or app to complete the purchase. Your contract is directly with the insurer, not with us. This means no middleman and no additional service charges.",
      },
      {
        q: "How accurate are the quotes shown?",
        a: "We surface quotes from our partner insurers based on the vehicle details you provide. Since the final premium depends on additional factors the insurer may ask for (add-ons, exact IDV chosen, NCB proof, etc.), the final price on the insurer's platform may vary slightly from the indicative quote.",
      },
      {
        q: "Which vehicles can I insure through PolicyPilot?",
        a: "Currently PolicyPilot supports private cars and two-wheelers (bikes and scooters) registered in India. We cover all major brands — Maruti Suzuki, Hyundai, Tata, Honda, Mahindra, Hero, Bajaj, TVS, Royal Enfield, and many more, including premium and electric vehicles.",
      },
      {
        q: "Is my personal information safe?",
        a: "Yes. We only collect the minimum information needed to fetch quotes (vehicle details and mobile number). We use industry-standard encryption in transit and at rest. We never sell or share your personal data with any third party other than the insurer you choose to proceed with. See our Privacy Policy for full details.",
      },
    ],
  },
  {
    title: "Buying & renewing a policy",
    faqs: [
      {
        q: "What documents do I need to buy motor insurance?",
        a: "For most online purchases you'll need: (1) Vehicle Registration Certificate (RC), (2) Previous insurance policy details if renewing, (3) PAN or Aadhaar for KYC, and (4) Vehicle inspection photos in some cases (for older vehicles). The exact requirements vary by insurer.",
      },
      {
        q: "Can I insure a vehicle with an expired policy?",
        a: "Yes, but the process is slightly different. If the policy has been expired for more than 90 days, the insurer may require a fresh vehicle inspection before issuing a new policy. You may also lose your accumulated No Claim Bonus if your previous policy had one. It's best to renew before expiry to avoid this.",
      },
      {
        q: "When should I renew my motor insurance?",
        a: "You can start the renewal process up to 60 days before your policy expires. Renewing early ensures there is no coverage gap. If your policy lapses, you lose your NCB and may need a vehicle inspection before re-insuring.",
      },
      {
        q: "What add-ons should I consider?",
        a: "Popular add-ons include: Zero Depreciation (nil dep) — your insurer pays the full cost of parts without depreciation deduction; Roadside Assistance (RSA) — help if you break down; Engine Protection — covers engine damage from waterlogging; Return to Invoice — pays full invoice value in case of total loss; and Consumables Cover — covers nuts, bolts, lubricants, etc. during repairs.",
      },
      {
        q: "How do I file a claim after an accident?",
        a: "Contact your insurer's helpline or use their app immediately after an accident. Do not move the vehicle until an inspection is arranged (for significant damage). Take photos of the damage and the third-party vehicle if applicable. Your insurer will guide you through the cashless or reimbursement claim process. PolicyPilot is a comparison platform and does not handle claims — your insurer is your point of contact.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto max-w-3xl px-4 pt-16 pb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <HelpCircle className="w-3.5 h-3.5" />
            Got questions? We've got answers.
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about motor insurance in India and how PolicyPilot works.
          </p>
        </section>

        {/* FAQ sections */}
        <section className="container mx-auto max-w-3xl px-4 pb-16 flex flex-col gap-10">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold mb-4 text-foreground">{section.title}</h2>
              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {section.faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${section.title}-${idx}`}
                    className="rounded-xl border bg-card px-5 shadow-sm data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 whitespace-pre-line">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>

        {/* Still have questions */}
        <section className="bg-card border-t">
          <div className="container mx-auto max-w-3xl px-4 py-14 text-center">
            <h2 className="text-xl font-extrabold tracking-tight mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              The fastest way to get an answer is to compare quotes and speak directly with your chosen insurer.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2 px-8 rounded-xl font-semibold">
                Compare insurance plans <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
