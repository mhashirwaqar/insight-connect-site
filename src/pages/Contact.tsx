import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const revenueRanges = [
  { value: "under-10k", label: "Under $10,000/month" },
  { value: "10k-25k", label: "$10,000 - $25,000/month" },
  { value: "25k-50k", label: "$25,000 - $50,000/month" },
  { value: "50k-100k", label: "$50,000 - $100,000/month" },
  { value: "100k-250k", label: "$100,000 - $250,000/month" },
  { value: "over-250k", label: "Over $250,000/month" },
];

const bookkeepingTools = [
  { value: "quickbooks", label: "QuickBooks Online" },
  { value: "xero", label: "Xero" },
  { value: "wave", label: "Wave" },
  { value: "freshbooks", label: "FreshBooks" },
  { value: "spreadsheets", label: "Spreadsheets" },
  { value: "none", label: "No software yet" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    revenueRange: "",
    bookkeepingTool: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        business_name: formData.businessName,
        revenue_range: formData.revenueRange,
        bookkeeping_tool: formData.bookkeepingTool,
        message: formData.message,
        source: "contact_form",
      });

      if (error) throw error;

      // Call edge function to send email notification
      await supabase.functions.invoke("notify-lead", {
        body: {
          leadType: "contact",
          name: formData.name,
          email: formData.email,
          businessName: formData.businessName,
        },
      });

      setIsSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="section-container max-w-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Message received!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thanks for reaching out. We'll get back to you within 1 business day.
            </p>
            <Button asChild variant="default" size="lg">
              <a href="/">Return Home</a>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get in touch
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Have questions? Ready to get started? Drop us a message or book a call directly.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      required
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      placeholder="Your Business LLC"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="revenueRange">Monthly Revenue Range</Label>
                    <Select
                      value={formData.revenueRange}
                      onValueChange={(value) =>
                        setFormData({ ...formData, revenueRange: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        {revenueRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookkeepingTool">Current Bookkeeping Tool</Label>
                    <Select
                      value={formData.bookkeepingTool}
                      onValueChange={(value) =>
                        setFormData({ ...formData, bookkeepingTool: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tool" />
                      </SelectTrigger>
                      <SelectContent>
                        {bookkeepingTools.map((tool) => (
                          <SelectItem key={tool.value} value={tool.value}>
                            {tool.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your bookkeeping needs..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="card-elevated p-6">
                <h3 className="font-display font-semibold mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:mhaashir.services@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    mhaashir.services@gmail.com
                  </a>
                  <a
                    href="tel:+14034210064"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +1 (403) 421-0064
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Hawkdale Gate, NW
                      <br />
                      Calgary, AB
                    </span>
                  </div>
                </div>
              </div>

              {/* Book a Call */}
              <div className="card-elevated p-6">
                <h3 className="font-display font-semibold mb-4">
                  Prefer to talk?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Book a free 15-minute consultation to discuss your bookkeeping needs.
                </p>
                {/* Calendly Placeholder */}
                <div className="bg-muted rounded-lg p-8 text-center border-2 border-dashed border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Calendly embed placeholder
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href="https://calendly.com/mhashir-services/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Scheduler
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
