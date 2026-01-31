import { Layout } from "@/components/layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  QuickLedger ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our bookkeeping services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We may collect information about you in various ways, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Personal information you provide (name, email, phone number, business name)</li>
                  <li>Financial data necessary for bookkeeping services</li>
                  <li>Usage data and analytics from your interactions with our website</li>
                  <li>Documents and files you upload to our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide and maintain our bookkeeping services</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send you service-related communications</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">5. Third-Party Services</h2>
                <p className="text-muted-foreground">
                  We may use third-party services (such as accounting software providers, payment processors, and analytics tools) that collect, monitor, and analyze information. These third parties have their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>The right to access your personal data</li>
                  <li>The right to rectify inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to restrict processing</li>
                  <li>The right to data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Email:</strong> hello@quickledger.example<br />
                  <strong>Phone:</strong> (555) 555-5555<br />
                  <strong>Address:</strong> 123 Business Lane, Suite 100, San Francisco, CA 94102
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
