import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const SECTIONS = [
  {
    title: "About Us",
    content: "Policy Fatafat is an online insurance aggregation and facilitation platform operated by Profuse Services, helping users compare, explore, and purchase insurance products digitally through partnered insurers and intermediaries.",
  },
  {
    title: "Information We Collect",
    subsections: [
      {
        label: "Personal Information",
        bullets: [
          "Full Name", "Mobile Number", "Email Address", "Address and City",
          "Date of Birth", "Vehicle Details", "Insurance Requirements",
          "KYC-related details (if required)", "IP Address and Device Information",
        ],
      },
      {
        label: "Non-Personal Information",
        bullets: [
          "Browser Type", "Operating System", "Referral Source",
          "Website Usage Data", "Cookies and Analytics Data",
        ],
      },
    ],
  },
  {
    title: "How We Use Your Information",
    intro: "Your information may be used for the following purposes:",
    bullets: [
      "To provide insurance comparison and policy assistance services",
      "To generate insurance quotations",
      "To connect you with insurance providers and partners",
      "To improve website functionality and customer experience",
      "To send policy reminders, updates, offers, and service communications",
      "To verify identity and prevent fraudulent activities",
      "To comply with legal and regulatory obligations",
    ],
  },
  {
    title: "Information Sharing & Disclosure",
    intro: "We may share your information only with:",
    bullets: [
      "Insurance companies and insurance partners",
      "Third-party service providers assisting in operations",
      "Verification and KYC agencies",
      "Regulatory authorities where required by law",
      "Technology and analytics partners for platform improvement",
    ],
    footer: "We do not sell, rent, or trade your personal information to third parties for independent marketing purposes.",
  },
  {
    title: "Cookies & Tracking Technologies",
    intro: "Our website may use cookies, pixels, and similar tracking technologies to:",
    bullets: [
      "Enhance user experience",
      "Understand website traffic and behavior",
      "Personalize content and advertisements",
      "Improve platform performance",
    ],
    footer: "Users may disable cookies through browser settings; however, some website features may not function properly.",
  },
  {
    title: "Data Security",
    content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, misuse, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your information, no digital platform can guarantee absolute security.",
  },
  {
    title: "Third-Party Links",
    content: "Our platform may contain links to third-party websites or insurance partner portals. We are not responsible for the privacy practices, policies, or content of such external websites. Users are encouraged to review the respective privacy policies of third-party platforms before sharing information.",
  },
  {
    title: "User Consent",
    intro: "By using Policy Fatafat and submitting your information, you consent to:",
    bullets: [
      "Collection and processing of your information",
      "Receiving calls, SMS, WhatsApp messages, and emails related to insurance services",
      "Communication from our authorized representatives and partners",
    ],
  },
  {
    title: "Data Retention",
    intro: "We retain user information only for as long as necessary to:",
    bullets: [
      "Provide services",
      "Fulfill legal obligations",
      "Resolve disputes",
      "Enforce agreements and compliance requirements",
    ],
  },
  {
    title: "Your Rights",
    intro: "You may request to:",
    bullets: [
      "Access your personal information",
      "Correct inaccurate data",
      "Withdraw consent where applicable",
      "Request deletion of information subject to legal obligations",
    ],
    footer: "For such requests, users may contact us using the details provided below.",
  },
  {
    title: "Children's Privacy",
    content: "Our services are intended for individuals above 18 years of age. We do not knowingly collect personal information from minors.",
  },
  {
    title: "Changes to This Privacy Policy",
    content: "We reserve the right to modify or update this Privacy Policy at any time without prior notice. Updated versions will be posted on this page with the revised effective date.",
  },
  {
    title: "Contact Us",
    contactBlock: true,
  },
];

export default function PrivacyPage() {
  useEffect(() => { document.title = "Privacy Policy | PolicyFatafat"; }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">

        <h1 className="text-4xl font-extrabold tracking-tight mb-1">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Policy Fatafat</p>
        <p className="text-muted-foreground text-sm mb-8">Effective Date: June 1, 2026</p>

        {/* Intro block */}
        <div className="bg-white rounded-xl border p-5 shadow-sm mb-6 text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>Welcome to Policy Fatafat.</p>
          <p>
            Policy Fatafat ("Company", "we", "our", "us") is committed to protecting and
            respecting your privacy. This Privacy Policy explains how we collect, use, store,
            share, and safeguard your information when you visit our website and use our
            insurance-related services.
          </p>
          <p>By accessing or using our platform, you agree to the terms outlined in this Privacy Policy.</p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {SECTIONS.map((sec, i) => (
            <section key={sec.title} className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">{i + 1}. {sec.title}</h2>

              {"intro" in sec && sec.intro && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{sec.intro}</p>
              )}

              {"content" in sec && sec.content && (
                <p className="text-muted-foreground text-sm leading-relaxed">{sec.content}</p>
              )}

              {"bullets" in sec && sec.bullets && (
                <ul className="space-y-2">
                  {(sec.bullets as string[]).map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-[7px]" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {"subsections" in sec && sec.subsections && (
                <div className="space-y-5">
                  {sec.subsections.map((sub) => (
                    <div key={sub.label}>
                      <p className="text-sm font-semibold text-foreground mb-2">{sub.label}</p>
                      <ul className="space-y-1.5">
                        {sub.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-[7px]" />
                            <span className="text-muted-foreground text-sm">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {"footer" in sec && sec.footer && (
                <p className="text-muted-foreground text-sm leading-relaxed mt-3 pt-3 border-t">{sec.footer}</p>
              )}

              {"contactBlock" in sec && sec.contactBlock && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>For questions, concerns, or requests regarding this Privacy Policy, please contact:</p>
                  <div className="mt-3 space-y-1">
                    <p className="font-semibold text-foreground">Policy Fatafat</p>
                    <p>Website: <a href="https://www.policyfatafat.com" className="text-primary hover:underline">www.policyfatafat.com</a></p>
                    <p>Email: <a href="mailto:support@policyfatafat.com" className="text-primary hover:underline">support@policyfatafat.com</a></p>
                    <p>Company: Profuse Services</p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Disclaimer note */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-semibold">Disclaimer: </span>
            Policy Fatafat is an insurance aggregation and facilitation platform and does not
            underwrite insurance policies directly. Insurance products are offered by respective
            insurance companies subject to their terms, conditions, and approvals.
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
