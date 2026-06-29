import { useEffect } from "react";
import { useMeta } from "@/lib/use-meta";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const SECTIONS = [
  {
    title: "Introduction",
    content: "Welcome to Policy Fatafat. By accessing and using this website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our website and services.",
  },
  {
    title: "About Policy Fatafat",
    content: "Policy Fatafat is an insurance aggregator platform that enables users to compare motor insurance products offered by partner insurance companies. We do not underwrite, issue, or service insurance policies. Insurance policies are issued directly by the respective insurance provider.",
  },
  {
    title: "User Eligibility",
    content: null,
    bullets: [
      "You are at least 18 years of age.",
      "The information provided by you is accurate and complete.",
      "You are legally capable of entering into binding agreements.",
    ],
    intro: "By using this website, you confirm that:",
  },
  {
    title: "Information Accuracy",
    content: "Users are responsible for providing accurate vehicle and personal details. Incorrect or incomplete information may affect the insurance quote, policy issuance, or claim settlement process.",
  },
  {
    title: "Insurance Quotes and Comparisons",
    content: null,
    bullets: [
      "Insurance quotes displayed on the website are provided by partner insurers.",
      "Premiums, coverage, benefits, and policy terms are determined solely by the respective insurance company.",
      "Policy Fatafat does not guarantee the availability, accuracy, or suitability of any insurance product.",
    ],
  },
  {
    title: "Third-Party Websites",
    content: "When you select an insurance plan, you may be redirected to the website of a partner insurer or authorized insurance service provider. Policy Fatafat is not responsible for the content, services, privacy practices, or transactions conducted on third-party websites.",
  },
  {
    title: "Policy Purchase and Issuance",
    content: null,
    bullets: [
      "Policy purchases are completed directly with the respective insurance company or its authorized representative.",
      "Policy issuance is subject to the insurer's underwriting guidelines, verification process, and terms and conditions.",
      "Policy Fatafat does not guarantee policy approval or issuance.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: null,
    intro: "Policy Fatafat shall not be liable for any direct, indirect, incidental, or consequential loss arising from:",
    bullets: [
      "Use of the website.",
      "Reliance on information provided by insurers.",
      "Delays, errors, or interruptions in service.",
      "Policy issuance, claims, or settlement decisions made by insurance companies.",
    ],
  },
  {
    title: "Intellectual Property",
    content: "All website content, including text, graphics, logos, designs, and trademarks, is the property of Policy Fatafat or its licensors and may not be reproduced without prior written permission.",
  },
  {
    title: "Privacy",
    content: "Use of this website is also governed by our Privacy Policy. By using our services, you consent to the collection and use of information in accordance with our Privacy Policy.",
  },
  {
    title: "Modifications",
    content: "Policy Fatafat reserves the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.",
  },
  {
    title: "Governing Law",
    content: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the jurisdiction of the competent courts in India.",
  },
  {
    title: "Contact Us",
    content: "For any questions regarding these Terms & Conditions, please contact us through the contact details provided on the website.",
  },
];

export default function TermsPage() {
  useMeta(
    "Terms & Conditions | Policy Fatafat",
    "Read the terms and conditions governing the use of Policy Fatafat's motor insurance comparison platform and related services."
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: June 2026</p>

        <div className="space-y-8">
          {SECTIONS.map((sec, i) => (
            <section key={sec.title} className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-3">
                {i + 1}. {sec.title}
              </h2>
              {"intro" in sec && sec.intro && (
                <p className="text-muted-foreground leading-relaxed mb-3">{sec.intro}</p>
              )}
              {sec.content && (
                <p className="text-muted-foreground leading-relaxed">{sec.content}</p>
              )}
              {"bullets" in sec && sec.bullets && (
                <ul className="space-y-2 mt-1">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="text-muted-foreground leading-relaxed text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
