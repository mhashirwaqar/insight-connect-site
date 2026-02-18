import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, X, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tiers = [
  {
    name: "Starter",
    price: "$175",
    description: "For simple businesses with straightforward bookkeeping needs.",
    idealFor: "Solo operators, freelancers, simple service businesses",
    features: [
      { name: "Monthly bookkeeping", included: true },
      { name: "Up to 100 transactions/month", included: true },
      { name: "1 bank account + 1 credit card", included: true },
      { name: "Monthly P&L statement", included: true },
      { name: "Monthly balance sheet", included: true },
      { name: "Email support", included: true },
      { name: "Financial clarity report", included: false },
      { name: "Payroll coordination", included: false },
      { name: "Dedicated bookkeeper", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$350",
    description: "For growing businesses that need more insight and support.",
    idealFor: "Small teams, e-commerce, service businesses with employees",
    features: [
      { name: "Monthly bookkeeping", included: true },
      { name: "Up to 300 transactions/month", included: true },
      { name: "Up to 3 bank accounts + 3 credit cards", included: true },
      { name: "Monthly P&L statement", included: true },
      { name: "Monthly balance sheet", included: true },
      { name: "Priority email + chat support", included: true },
      { name: "Financial clarity report", included: true },
      { name: "Payroll coordination", included: true },
      { name: "Dedicated bookkeeper", included: false },
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Pro",
    price: "$599",
    description: "For complex operations that need personalized attention.",
    idealFor: "Multi-location, inventory, higher transaction volumes",
    features: [
      { name: "Monthly bookkeeping", included: true },
      { name: "Up to 1,000 transactions/month", included: true },
      { name: "Unlimited bank accounts + credit cards", included: true },
      { name: "Monthly P&L statement", included: true },
      { name: "Monthly balance sheet", included: true },
      { name: "Priority email, chat + phone support", included: true },
      { name: "Financial clarity report", included: true },
      { name: "Payroll coordination", included: true },
      { name: "Dedicated bookkeeper", included: true },
    ],
    cta: "Get Started",
    popular: false,
  },
];

const addons = [
  {
    name: "Catch-up Bookkeeping",
    description: "Get your books current from months or years behind",
    pricing: "Starting at $500/month of backlog",
    note: "Price varies based on transaction volume and complexity",
  },
  {
    name: "Cleanup Projects",
    description: "Fix messy books, correct errors, and optimize your chart of accounts",
    pricing: "Starting at $750",
    note: "One-time fee based on scope",
  },
  {
    name: "Additional Transactions",
    description: "Need more than your plan includes?",
    pricing: "$1.50/transaction over limit",
    note: "Billed at end of month",
  },
];

export default function Pricing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Choose the plan that fits your business. No hidden fees, no surprises.
              Need something custom? We can do that too.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`card-elevated p-8 relative ${
                  tier.popular ? "ring-2 ring-accent" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-display font-bold">{tier.name}</h2>
                  <div className="mt-4">
                    <span className="text-4xl font-display font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <div className="mb-6 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    <strong>Ideal for:</strong> {tier.idealFor}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/30 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.popular ? "cta" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  <Link to="/intake">{tier.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding bg-muted">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Add-ons</h2>
            <p className="text-lg text-muted-foreground">
              Need something extra? These can be added to any plan.
            </p>
          </div>
          <div className="space-y-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="card-elevated p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-display font-semibold text-lg">
                    {addon.name}
                  </h3>
                  <p className="text-muted-foreground">{addon.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {addon.note}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-bold text-lg">{addon.pricing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="card-elevated max-w-3xl mx-auto p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Need a custom solution?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every business is different. If our standard plans don't fit your needs,
              let's talk. We'll create a custom package that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="/intake">
                  Request a Custom Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Pricing FAQ
          </h2>
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-2">Are there any setup fees?</h3>
              <p className="text-muted-foreground">
                No setup fees for standard plans. Catch-up and cleanup projects are quoted separately.
              </p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-2">What if I exceed my transaction limit?</h3>
              <p className="text-muted-foreground">
                We'll notify you when you're approaching your limit. Additional transactions are billed at $1.50 each, or you can upgrade to a higher plan.
              </p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-2">Can I change plans?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade at any time. Changes take effect on your next billing cycle.
              </p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-2">Is there a contract?</h3>
              <p className="text-muted-foreground">
                No long-term contracts. All plans are month-to-month and you can cancel anytime with 30 days notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
