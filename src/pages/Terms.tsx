import { Layout } from "@/components/layout";

export default function Terms() {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using QuantBooks's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">2. Services Provided</h2>
                <p className="text-muted-foreground mb-4">
                  QuantBooks provides bookkeeping services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Monthly bookkeeping and reconciliation</li>
                  <li>Catch-up bookkeeping services</li>
                  <li>Payroll coordination (not payroll filing)</li>
                  <li>Financial reporting and analysis</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  <strong>Important:</strong> We do not provide tax preparation, tax filing, tax advice, legal advice, or any services that require a CPA or attorney license.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">3. Client Responsibilities</h2>
                <p className="text-muted-foreground mb-4">As a client, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Grant necessary access to financial accounts and documents</li>
                  <li>Respond to our inquiries in a timely manner</li>
                  <li>Review deliverables and report any discrepancies</li>
                  <li>Pay for services according to the agreed terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">4. Fees and Payment</h2>
                <p className="text-muted-foreground">
                  Service fees are as quoted during your consultation and in your service agreement. Payment is due according to the terms specified in your agreement. We reserve the right to suspend services for non-payment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">5. Confidentiality</h2>
                <p className="text-muted-foreground">
                  We maintain strict confidentiality of all client financial information. We will not disclose your information to third parties except as required by law or with your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  QuantBooks shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the fees paid by you in the twelve months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">7. Termination</h2>
                <p className="text-muted-foreground">
                  Either party may terminate services with 30 days written notice. Upon termination, we will provide all completed work and assist with transition to another provider if requested.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">8. Disclaimer</h2>
                <p className="text-muted-foreground">
                  The information and services provided by QuantBooks are for general bookkeeping purposes only and should not be construed as tax, legal, or professional advice. Consult with a qualified professional for specific advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We will notify clients of material changes via email. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">10. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Email:</strong> mhashir.services@gmail.com<br />
                  <strong>Phone:</strong> +1 (403) 421-0064<br />
                  <strong>Address:</strong> Hawkdale Gate, NW, Calgary, AB
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
