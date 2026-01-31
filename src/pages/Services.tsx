import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    id: "monthly",
    icon: BookOpen,
    title: "Monthly Bookkeeping",
    description:
      "Consistent, reliable bookkeeping every month so you always know where your business stands financially.",
    deliverables: [
      "Transaction categorization and reconciliation",
      "Bank and credit card account reconciliation",
      "Accounts payable and receivable tracking",
      "Monthly financial statements (P&L, Balance Sheet)",
      "General ledger maintenance",
    ],
    whatWeNeed: [
      "Read-only access to your accounting software",
      "Bank and credit card statement access",
      "Invoice and receipt documentation",
      "15-30 minutes monthly for questions",
    ],
    pricing: "Starting at $349/month",
  },
  {
    id: "catchup",
    icon: Clock,
    title: "Catch-up Bookkeeping",
    description:
      "Behind on your books? We'll bring you current—whether it's months or years of backlog.",
    deliverables: [
      "Historical transaction categorization",
      "Bank reconciliation for all past periods",
      "Chart of accounts cleanup and optimization",
      "Opening balance corrections",
      "Complete financial statements for all catch-up periods",
    ],
    whatWeNeed: [
      "All bank and credit card statements for the period",
      "Any existing bookkeeping records or exports",
      "Business registration and entity documents",
      "Tax returns from previous years (if available)",
    ],
    pricing: "Custom quote based on months behind",
  },
  {
    id: "payroll",
    icon: DollarSign,
    title: "Payroll Coordination",
    description:
      "We coordinate with your payroll provider to ensure your books stay accurate and compliant.",
    deliverables: [
      "Payroll journal entry recording",
      "Payroll liability tracking",
      "Quarterly payroll reconciliation",
      "Coordination with your payroll provider",
      "Employee classification guidance",
    ],
    whatWeNeed: [
      "Access to payroll reports",
      "Employee count and pay frequency",
      "Current payroll provider details",
      "Benefits and deduction information",
    ],
    pricing: "Add-on: $75-150/month",
    note: "Note: We do not file payroll taxes or act as a payroll service. We coordinate and record transactions only.",
  },
  {
    id: "reports",
    icon: FileText,
    title: "Monthly Financial Clarity Report",
    description:
      "Go beyond basic financial statements with AI-powered insights that help you understand your numbers.",
    deliverables: [
      "Executive summary in plain English",
      "Cash flow analysis and projections",
      "Expense trend identification",
      "Revenue growth tracking",
      "Key performance indicators for your industry",
      "Actionable recommendations",
    ],
    whatWeNeed: [
      "Monthly bookkeeping (included or separate)",
      "Business goals and KPIs you want to track",
      "Any specific questions about your finances",
    ],
    pricing: "Included with Growth and Pro plans",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Services built for busy business owners
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              From monthly maintenance to getting caught up, we offer flexible bookkeeping solutions that fit your needs.
            </p>
            <Button asChild variant="cta" size="lg">
              <Link to="/intake">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className={`grid md:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-secondary-foreground" />
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold mb-6">
                      {service.pricing}
                    </div>
                    {service.note && (
                      <p className="text-sm text-muted-foreground italic">
                        {service.note}
                      </p>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div className="card-elevated p-6">
                      <h3 className="font-display font-semibold mb-4">
                        What You Get
                      </h3>
                      <ul className="space-y-3">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-elevated p-6">
                      <h3 className="font-display font-semibold mb-4">
                        What We Need From You
                      </h3>
                      <ul className="space-y-3">
                        {service.whatWeNeed.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {index < services.length - 1 && (
                  <div className="border-b border-border mt-16" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a free consultation and we'll help you figure out exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="cta" size="lg">
              <Link to="/intake">
                Book a Free Consult
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
