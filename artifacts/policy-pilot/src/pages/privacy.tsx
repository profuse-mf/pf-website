import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last Updated: June 1, 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">
          <p className="text-muted-foreground leading-relaxed">
            Welcome to PolicyFatafat ("PolicyFatafat", "we", "our", or "us").
          </p>
          <p className="text-muted-foreground leading-relaxed">
            At PolicyFatafat, we value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, process, store, disclose,
            and safeguard your information when you access or use our website, mobile applications,
            products, services, and related platforms.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using PolicyFatafat, you agree to the collection and use of information
            in accordance with this Privacy Policy.
          </p>

          <section>
            <h2 className="text-xl font-bold mb-3">1. Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              PolicyFatafat is an online platform that helps users discover, compare, understand,
              and connect with insurance products, financial products, lending solutions, and related
              services offered by insurance companies, financial institutions, banks, NBFCs, and
              other authorized service providers.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              PolicyFatafat may act as a technology platform, lead-generation platform, comparison
              platform, or marketing partner for financial service providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>

            <h3 className="text-base font-semibold mt-4 mb-2">A. Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              When you use our services, submit forms, request quotes, compare policies, or contact
              us, we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Mobile number</li>
              <li>Email address</li>
              <li>City and state</li>
              <li>PIN code</li>
              <li>Insurance preferences</li>
              <li>Vehicle information</li>
              <li>Health-related information (when relevant for insurance inquiries)</li>
              <li>Any other information voluntarily submitted by you</li>
            </ul>

            <h3 className="text-base font-semibold mt-4 mb-2">B. Technical Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We may automatically collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>IP address</li>
              <li>Device identifiers</li>
              <li>Browser type</li>
              <li>Device model</li>
              <li>Operating system</li>
              <li>Language preferences</li>
              <li>Screen resolution</li>
              <li>Referring URLs</li>
              <li>Clickstream data</li>
              <li>Website interaction data</li>
              <li>Session information</li>
            </ul>

            <h3 className="text-base font-semibold mt-4 mb-2">C. Location Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">We may collect:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Approximate location based on IP address</li>
              <li>City-level location information</li>
              <li>State and country information</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              We do not collect precise GPS location unless explicitly authorized by you.
            </p>

            <h3 className="text-base font-semibold mt-4 mb-2">D. Communication Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              When you communicate with us, we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Support requests</li>
              <li>Feedback</li>
              <li>Survey responses</li>
              <li>Email communications</li>
              <li>Chat interactions</li>
              <li>Customer service conversations</li>
            </ul>

            <h3 className="text-base font-semibold mt-4 mb-2">E. Marketing and Lead Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              When you submit a quote request, application inquiry, callback request, or lead form,
              we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Product preferences</li>
              <li>Coverage requirements</li>
              <li>Budget preferences</li>
              <li>Policy renewal details</li>
              <li>Vehicle registration details</li>
              <li>Insurance history</li>
              <li>Financial product interests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We may use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Providing requested services</li>
              <li>Generating insurance quotes</li>
              <li>Facilitating policy comparisons</li>
              <li>Connecting users with insurance providers</li>
              <li>Connecting users with financial institutions</li>
              <li>Processing inquiries and requests</li>
              <li>Customer support and issue resolution</li>
              <li>Fraud prevention and risk management</li>
              <li>Website analytics and performance monitoring</li>
              <li>Improving user experience</li>
              <li>Personalizing recommendations</li>
              <li>Marketing communications</li>
              <li>Product development</li>
              <li>Compliance with legal obligations</li>
              <li>Internal reporting and business operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Lead Sharing and Partner Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              PolicyFatafat may share user information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>Insurance companies</li>
              <li>Insurance brokers</li>
              <li>Insurance aggregators</li>
              <li>Banks</li>
              <li>NBFCs</li>
              <li>Financial service providers</li>
              <li>Lending partners</li>
              <li>Technology service providers</li>
              <li>CRM and customer support platforms</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Such sharing is performed only for purposes related to providing quotations, policy
              information, product recommendations, customer support, underwriting processes,
              application processing, and related services.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              By submitting your information through PolicyFatafat, you expressly consent to being
              contacted by our partners through:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
              <li>Phone calls</li>
              <li>SMS</li>
              <li>WhatsApp</li>
              <li>Email</li>
              <li>Push notifications</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              even if your number is registered under DND or NDNC registries, where legally
              permissible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We use cookies and similar technologies including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>Browser cookies</li>
              <li>Session cookies</li>
              <li>Persistent cookies</li>
              <li>Pixel tags</li>
              <li>Web beacons</li>
              <li>Analytics scripts</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-2">
              These technologies help us:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>Improve website performance</li>
              <li>Remember user preferences</li>
              <li>Measure campaign effectiveness</li>
              <li>Understand user behavior</li>
              <li>Deliver relevant advertisements</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You may disable cookies through your browser settings. However, some features of the
              website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Analytics and Advertising</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We may use third-party analytics and advertising services such as:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>Google Analytics</li>
              <li>Google Ads</li>
              <li>Google Tag Manager</li>
              <li>Meta Pixel</li>
              <li>Microsoft Clarity</li>
              <li>Firebase Analytics</li>
              <li>Other analytics and marketing platforms</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These services may collect information regarding your usage of the website to help us
              improve our services and marketing effectiveness.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We implement reasonable technical, administrative, and organizational safeguards to
              protect your information.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Security measures may include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>SSL encryption</li>
              <li>Secure server infrastructure</li>
              <li>Access controls</li>
              <li>Firewalls</li>
              <li>Monitoring systems</li>
              <li>Data minimization practices</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to protect your information, no internet transmission or storage
              system can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We retain personal information only for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
              <li>Provide services</li>
              <li>Fulfill legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
              <li>Maintain business records</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Retention periods may vary depending on the nature of the information and applicable
              legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Depending on applicable laws, you may have rights to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
              <li>Access your information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of information</li>
              <li>Withdraw consent</li>
              <li>Object to certain processing activities</li>
              <li>Request restriction of processing</li>
              <li>Request data portability</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise these rights, please contact us using the details provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Third-Party Websites</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Our website may contain links to third-party websites, insurance providers, financial
              institutions, or partner platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not control and are not responsible for the privacy practices, content, or
              security of third-party websites. Users should review the privacy policies of such
              websites independently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Our services are not intended for individuals under the age of 18 years.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not knowingly collect personal information from minors. If we become aware that
              personal information has been collected from a minor without appropriate consent, we
              will take reasonable steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Your information may be processed, stored, or transferred to servers located in India
              or other jurisdictions where our service providers operate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our services, you consent to such transfers where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">13. Compliance With Applicable Laws</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We aim to comply with applicable privacy and data protection laws, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Information Technology Act, 2000</li>
              <li>Information Technology Rules applicable in India</li>
              <li>Digital Personal Data Protection Act (DPDP Act), where applicable</li>
              <li>Other relevant regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">14. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We may update this Privacy Policy from time to time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Any modifications will be posted on this page along with the updated effective date.
              Continued use of our services after such updates constitutes acceptance of the revised
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">15. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              If you have any questions, concerns, requests, or complaints regarding this Privacy
              Policy or our data handling practices, please contact us:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>PolicyFatafat</strong>
              <br />
              Website:{" "}
              <a href="https://policyfatafat.com" className="text-primary hover:underline">
                https://policyfatafat.com
              </a>
              <br />
              Email:{" "}
              <a href="mailto:support@policyfatafat.com" className="text-primary hover:underline">
                support@policyfatafat.com
              </a>
              <br />
              Contact Page:{" "}
              <a href="https://policyfatafat.com/contact" className="text-primary hover:underline">
                https://policyfatafat.com/contact
              </a>
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              We will make reasonable efforts to respond to your inquiries within an appropriate
              timeframe.
            </p>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-bold mb-3">Consent</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using PolicyFatafat, submitting information through our forms,
              requesting quotes, comparing products, or interacting with our services, you
              acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
