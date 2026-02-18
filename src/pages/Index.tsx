import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: BookOpen,
    title: "Monthly Bookkeeping",
    description:
      "We categorize, reconcile, and close your books every month—so you always know where you stand.",
  },
  {
    icon: Clock,
    title: "Catch-up Bookkeeping",
    description:
      "Behind on your books? We'll get you current fast, with clear documentation every step of the way.",
  },
  {
    icon: TrendingUp,
    title: "Financial Clarity Reports",
    description:
      "Easy-to-read monthly reports with AI-powered insights that help you make smarter decisions.",
  },
];

const steps = [
  {
    step: "01",
    title: "Free Consultation",
    description:
      "We'll learn about your business, understand your needs, and see if we're the right fit.",
  },
  {
    step: "02",
    title: "Quick Setup",
    description:
      "Connect your accounts, share access to your books, and we handle the rest.",
  },
  {
    step: "03",
    title: "Monthly Close & Report",
    description:
      "Every month you get clean books and a clear report showing your business health.",
  },
];

const testimonials = [
  {
    quote:
      "QuantBooks saved me hours every month. Now I actually understand my numbers.",
    author: "Sarah Chen",
    role: "Founder, Bloom Design Co.",
  },
  {
    quote:
      "Finally, a bookkeeping service that speaks my language—not accountant jargon.",
    author: "Marcus Johnson",
    role: "Owner, MJ Construction",
  },
  {
    quote:
      "The monthly reports are game-changers. I can see exactly where my money goes.",
    author: "Emily Rodriguez",
    role: "CEO, Fresh Eats Catering",
  },
];

const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer:
      "We work with small businesses across many industries—from e-commerce and service businesses to contractors and consultants. If you have revenue under $5M and need clean books, we can help.",
  },
  {
    question: "Do you handle taxes?",
    answer:
      "We prepare your books so your tax preparer has everything they need, but we don't file taxes ourselves. We're happy to coordinate with your CPA or recommend one.",
  },
  {
    question: "What accounting software do you use?",
    answer:
      "We work with QuickBooks Online, Xero, and Wave. If you're using something else, we'll help you migrate to one of these platforms.",
  },
  {
    question: "How quickly can you catch up my books?",
    answer:
      "Most catch-up projects take 2-4 weeks depending on complexity. We'll give you a clear timeline during your free consultation.",
  },
];

const pricingTiers = [
  { name: "Starter", price: "$175", label: "For simple businesses" },
  { name: "Growth", price: "$350", label: "Most popular" },
  { name: "Pro", price: "$599", label: "For complex operations" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary/30 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="section-container section-padding relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-up opacity-0">
              Bookkeeping made simple.
              <br />
              <span className="text-accent">Insights made automatic.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-up opacity-0 stagger-1">
              Stop drowning in receipts and spreadsheets. We handle your books monthly, so you can focus on what you do best—running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 stagger-2">
              <Button asChild variant="cta" size="xl">
                <Link to="/intake">
                  Book a Free Consult
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-secondary" size="xl">
                <Link to="/pricing">Get a Quote</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60 animate-fade-up opacity-0 stagger-3">
              No credit card required · Free consultation · Cancel anytime
            </p>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-primary-foreground/40" />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-muted py-12 border-y border-border">
        <div className="section-container">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by many SMEs across Canada
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything you need for clean books
            </h2>
            <p className="text-lg text-muted-foreground">
              From monthly maintenance to catching up on years of backlog, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-elevated-hover p-8 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground">
              Getting started is easy. Here's what to expect.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-display font-bold text-primary/10 absolute -top-4 left-0">
                  {step.step}
                </div>
                <div className="pt-12">
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="default" size="lg">
              <Link to="/how-it-works">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Plans that grow with your business. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`card-elevated p-6 text-center ${
                  index === 1 ? "ring-2 ring-accent" : ""
                }`}
              >
                {index === 1 && (
                  <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-display font-semibold">{tier.name}</h3>
                <div className="my-4">
                  <span className="text-3xl font-display font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground">{tier.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="cta" size="lg">
              <Link to="/pricing">
                See Full Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Frequently asked questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to simplify your bookkeeping?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Book a free 15-minute consultation and see how we can help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="cta" size="xl">
              <Link to="/intake">
                Book a Free Consult
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-secondary" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
