import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you use PolicyFatafat, we may collect the following information: vehicle registration
              number, mobile number, pin code, policy expiry date, vehicle registration year and
              model, and the insurance type selected (car or bike). This information is used solely to
              help match you with appropriate insurance partners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information you provide is used to display relevant insurance partner options and to
              redirect you to the selected insurer's website. We do not sell, rent, or share your
              personal information with third parties for marketing purposes without your explicit
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Data Sharing with Insurance Partners</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you click on an insurance partner, you will be redirected to their website. Please
              note that the partner's own privacy policy will govern the data you provide on their
              platform. We encourage you to review each partner's privacy policy before completing
              your purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Cookies and Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              PolicyFatafat may use cookies and similar tracking technologies to improve your
              experience, analyse traffic, and understand how visitors use our platform. You can
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your information from
              unauthorised access, disclosure, alteration, or destruction. All data is transmitted
              over secure HTTPS connections.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or request deletion of your personal data. To
              exercise any of these rights, please contact us at{" "}
              <a href="mailto:support@policyfatafat.in" className="text-primary hover:underline">
                support@policyfatafat.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by updating the date at the top of this page. Continued use of PolicyFatafat
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:support@policyfatafat.in" className="text-primary hover:underline">
                support@policyfatafat.in
              </a>{" "}
              or write to us at: PolicyFatafat, powered by Profuse Services, India.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
