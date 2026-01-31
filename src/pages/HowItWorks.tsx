import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Link2,
  FileCheck,
  Clock,
  Bot,
  User,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Free Consultation",
    duration: "15-30 minutes",
    description:
      "We start with a quick call to understand your business. We'll discuss your current bookkeeping situation, pain points, and goals. By the end, you'll know exactly what you need and what it'll cost.",
    details: [
      "Learn about your business and industry",
      "Review your current bookkeeping setup",
      "Identify what services you need",
      "Provide a clear pricing estimate",
      "Answer all your questions",
    ],
  },
  {
    number: "02",
    icon: Link2,
    title: "Setup & Access",
    duration: "1-3 business days",
    description:
      "Once you're ready to start, we'll set up secure access to your accounts. This is a one-time setup that typically takes just a few days.",
    details: [
      "Secure read-only access to your accounting software",
      "Bank feed connections (encrypted and secure)",
      "Document sharing setup",
      "Chart of accounts review and optimization",
      "Opening balances verification",
    ],
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Monthly Close & Report",
    duration: "By the 15th of each month",
    description:
      "Every month, we close your books and deliver clear financial statements plus insights. You'll always know where your business stands.",
    details: [
      "Transaction categorization and reconciliation",
      "Bank and credit card reconciliation",
      "Financial statements delivery (P&L, Balance Sheet)",
      "Financial clarity report with insights (Growth & Pro)",
      "Quick check-in if we have questions",
    ],
  },
];

const timeline = [
  { day: "Day 1-3", activity: "Onboarding and account access setup" },
  { day: "Day 4-7", activity: "Initial review and opening balance verification" },
  { day: "Day 8-15", activity: "First month close (may vary for new clients)" },
  { day: "Ongoing", activity: "Monthly close by the 15th of each month" },
];

const automatedVsHuman = {
  automated: [
    "Bank feed imports",
    "Recurring transaction rules",
    "Document scanning and OCR",
    "Standard categorizations",
    "Report generation",
  ],
  human: [
    "Complex transaction review",
    "Vendor and customer reconciliation",
    "Unusual expense investigation",
    "Financial analysis and insights",
    "Client communication and questions",
  ],
};

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              How it works
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Getting clean books shouldn't be complicated. Here's our simple 3-step process to get you set up and running smoothly.
            </p>
            <Button asChild variant="cta" size="lg">
              <Link to="/intake">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-display font-bold text-primary/10">
                        {step.number}
                      </span>
                      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-secondary-foreground" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-2">
                      {step.title}
                    </h2>
                    <p className="text-sm text-accent font-semibold mb-4">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {step.duration}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="card-elevated p-6">
                    <h3 className="font-display font-semibold mb-4">What happens:</h3>
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/4 -bottom-12 w-px h-24 bg-gradient-to-b from-border to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Timeline expectations
            </h2>
            <p className="text-lg text-muted-foreground">
              Here's what to expect when you start with QuickLedger
            </p>
          </div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="card-elevated p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="sm:w-32 flex-shrink-0">
                  <span className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    {item.day}
                  </span>
                </div>
                <p className="text-foreground">{item.activity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automated vs Human */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              The best of both worlds
            </h2>
            <p className="text-lg text-muted-foreground">
              We use smart automation where it makes sense, with human expertise where it matters.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-elevated p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold">
                  What we automate
                </h3>
              </div>
              <ul className="space-y-3">
                {automatedVsHuman.automated.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground italic">
                Automation saves time and reduces errors on routine tasks.
              </p>
            </div>
            <div className="card-elevated p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-semibold">
                  What humans review
                </h3>
              </div>
              <ul className="space-y-3">
                {automatedVsHuman.human.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground italic">
                Human expertise catches what automation can't.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book your free consultation and let's discuss how we can help simplify your bookkeeping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="cta" size="xl">
              <Link to="/intake">
                Book a Free Consult
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-secondary" size="xl">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
