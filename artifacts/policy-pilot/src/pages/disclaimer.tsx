import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Info } from "lucide-react";

const PARAGRAPHS = [
  "The information provided on Policy Fatafat is for general informational and comparison purposes only. Policy Fatafat acts as an insurance aggregator platform and facilitates users in comparing motor insurance products offered by various insurance companies.",
  "Policy Fatafat does not underwrite, issue, or service insurance policies. All insurance products, premiums, coverage details, benefits, exclusions, terms, and conditions displayed on this website are provided by the respective insurance companies and are subject to change without prior notice.",
  "While we strive to keep the information accurate and up to date, Policy Fatafat makes no representations or warranties, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of any information, products, services, or related content contained on the website.",
  "The final premium, policy issuance, coverage, and acceptance of any insurance proposal are solely at the discretion of the respective insurance company and subject to their underwriting guidelines, terms, and conditions.",
  "Policy Fatafat shall not be held responsible for any loss, damages, claims, or liabilities arising directly or indirectly from the use of this website, reliance on the information provided, or transactions completed with third-party insurance providers.",
  "Users are advised to carefully read the policy wording, terms, conditions, exclusions, and other relevant documents provided by the insurer before purchasing any insurance product.",
  "By accessing and using this website, you acknowledge and agree to this disclaimer and all applicable terms governing the use of the platform.",
  "For any queries regarding insurance products, policy issuance, claims, cancellations, or refunds, users should contact the respective insurance company directly or reach out to Policy Fatafat for assistance.",
];

export default function DisclaimerPage() {
  useEffect(() => { document.title = "Disclaimer | PolicyFatafat"; }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Disclaimer</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-10 ml-[52px]">Last updated: June 2026</p>

        <div className="space-y-4">
          {PARAGRAPHS.map((para, i) => (
            <div key={i} className="bg-white rounded-xl border p-5 shadow-sm">
              <p className="text-muted-foreground leading-relaxed text-sm">{para}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
