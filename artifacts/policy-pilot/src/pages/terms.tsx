import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using PolicyPilot ("the Platform"), you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use the Platform.
              PolicyPilot is operated by Profuse Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Nature of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              PolicyPilot is an insurance aggregator and comparison platform. We do not sell
              insurance directly. We connect you with licensed insurance providers and redirect you
              to their platforms to complete your purchase. All insurance contracts are entered into
              directly between you and the respective insurance partner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for providing accurate and truthful information on the Platform.
              Providing false, misleading, or incomplete information may result in inaccurate
              insurance recommendations and could void any insurance policy subsequently purchased.
              PolicyPilot is not responsible for consequences arising from incorrect information
              provided by users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Third-Party Insurance Partners</h2>
            <p className="text-muted-foreground leading-relaxed">
              PolicyPilot lists insurance partners for informational and comparison purposes only.
              We do not endorse any specific partner over another. Each partner's pricing, coverage
              terms, and conditions are set by them independently. PolicyPilot is not a party to any
              insurance contract between you and a partner. Any disputes regarding insurance policies
              must be resolved directly with the relevant insurance provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, PolicyPilot and Profuse Services shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages arising
              from your use of the Platform, including but not limited to: reliance on information
              displayed, actions taken by insurance partners, or any insurance claim outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on PolicyPilot, including text, graphics, logos, and software, is the
              property of Profuse Services and is protected by applicable intellectual property laws.
              You may not reproduce, distribute, or create derivative works without prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Modifications to the Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              PolicyPilot reserves the right to modify, suspend, or discontinue any part of the
              Platform at any time without notice. We may also update these Terms of Service
              periodically. Continued use of the Platform after changes constitutes acceptance of
              the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes arising under these terms shall be subject to the exclusive jurisdiction
              of the courts located in India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any questions regarding these Terms of Service, please contact us at{" "}
              <a href="mailto:support@policypilot.in" className="text-primary hover:underline">
                support@policypilot.in
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
