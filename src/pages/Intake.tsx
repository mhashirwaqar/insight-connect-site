import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Loader2, ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sendEmailNotification } from "@/lib/emailjs";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Business Info" },
  { id: 2, name: "Accounting Setup" },
  { id: 3, name: "Services & Notes" },
];

const industries = [
  { value: "ecommerce", label: "E-commerce / Retail" },
  { value: "services", label: "Professional Services" },
  { value: "construction", label: "Construction / Trades" },
  { value: "restaurant", label: "Restaurant / Food Service" },
  { value: "healthcare", label: "Healthcare" },
  { value: "technology", label: "Technology / SaaS" },
  { value: "realestate", label: "Real Estate" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "other", label: "Other" },
];

const entityTypes = [
  { value: "sole-proprietor", label: "Sole Proprietorship" },
  { value: "llc", label: "LLC" },
  { value: "s-corp", label: "S-Corporation" },
  { value: "c-corp", label: "C-Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "other", label: "Other" },
];

const accountingPlatforms = [
  { value: "quickbooks", label: "QuickBooks Online" },
  { value: "xero", label: "Xero" },
  { value: "wave", label: "Wave" },
  { value: "freshbooks", label: "FreshBooks" },
  { value: "spreadsheets", label: "Spreadsheets / Manual" },
  { value: "none", label: "No software yet" },
  { value: "other", label: "Other" },
];

const transactionVolumes = [
  { value: "under-50", label: "Under 50 transactions/month" },
  { value: "50-100", label: "50-100 transactions/month" },
  { value: "100-300", label: "100-300 transactions/month" },
  { value: "300-500", label: "300-500 transactions/month" },
  { value: "500-1000", label: "500-1,000 transactions/month" },
  { value: "over-1000", label: "Over 1,000 transactions/month" },
];

const servicesOptions = [
  { value: "monthly", label: "Monthly Bookkeeping" },
  { value: "catchup", label: "Catch-up Bookkeeping" },
  { value: "cleanup", label: "Books Cleanup" },
  { value: "payroll", label: "Payroll Coordination" },
  { value: "reports", label: "Financial Clarity Reports" },
  { value: "consult", label: "Free Consultation Only" },
];

export default function Intake() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    // Step 1 - Business Info
    legalName: "",
    dba: "",
    industry: "",
    entityType: "",
    stateProvince: "",
    country: "USA",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    // Step 2 - Accounting Setup
    accountingPlatform: "",
    bankAccounts: "",
    creditCards: "",
    merchantAccounts: "",
    transactionVolume: "",
    // Step 3 - Services & Notes
    servicesNeeded: [] as string[],
    notes: "",
  });

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5)); // Max 5 files
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Upload files if any
      const fileUrls: string[] = [];
      for (const file of uploadedFiles) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("intake-files")
          .upload(fileName, file);

        if (error) {
          console.error("File upload error:", error);
        } else if (data) {
          fileUrls.push(data.path);
        }
      }

      // Save intake form
      const { error } = await supabase.from("intakes").insert({
        legal_name: formData.legalName,
        dba: formData.dba || null,
        industry: formData.industry,
        entity_type: formData.entityType,
        state_province: formData.stateProvince,
        country: formData.country,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone || null,
        accounting_platform: formData.accountingPlatform,
        bank_accounts: formData.bankAccounts,
        credit_cards: formData.creditCards || null,
        merchant_accounts: formData.merchantAccounts || null,
        transaction_volume: formData.transactionVolume,
        services_needed: formData.servicesNeeded,
        notes: formData.notes || null,
        file_urls: fileUrls.length > 0 ? fileUrls : null,
      });

      if (error) throw error;

      // Send email notification via EmailJS
      await sendEmailNotification({
        from_name: formData.contactName,
        from_email: formData.contactEmail,
        business_name: formData.legalName,
        message: `New intake form submission.\nIndustry: ${formData.industry}\nEntity: ${formData.entityType}\nPlatform: ${formData.accountingPlatform}\nServices: ${formData.servicesNeeded.join(", ")}\nNotes: ${formData.notes || "None"}`,
        form_type: "Client Intake Form",
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Intake form submitted successfully!");
    } catch (error) {
      console.error("Error submitting intake:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.legalName &&
        formData.industry &&
        formData.entityType &&
        formData.stateProvince &&
        formData.contactName &&
        formData.contactEmail
      );
    }
    if (currentStep === 2) {
      return (
        formData.accountingPlatform &&
        formData.bankAccounts &&
        formData.transactionVolume
      );
    }
    return formData.servicesNeeded.length > 0;
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
              You're all set!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thanks for completing your intake form. We'll review your information and reach out within 1 business day to schedule your free consultation.
            </p>
            <div className="card-elevated p-6 mb-8">
              <h2 className="font-display font-semibold mb-4">What happens next?</h2>
              <ol className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  We review your intake form and prepare for your consultation
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  We'll email you to schedule a convenient time to talk
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  During the call, we'll discuss your needs and create a plan
                </li>
              </ol>
            </div>
            <Button asChild variant="default" size="lg">
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Client Intake Form
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Tell us about your business so we can prepare for your free consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-muted py-6 border-b border-border">
        <div className="section-container max-w-3xl">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2",
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    step.id < currentStep
                      ? "bg-success text-success-foreground"
                      : step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </span>
                <span className="hidden sm:inline font-medium">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-2xl">
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold mb-6">
                Business Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Business Name *</Label>
                  <Input
                    id="legalName"
                    required
                    value={formData.legalName}
                    onChange={(e) =>
                      setFormData({ ...formData, legalName: e.target.value })
                    }
                    placeholder="Your Business LLC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dba">DBA / Trade Name (if different)</Label>
                  <Input
                    id="dba"
                    value={formData.dba}
                    onChange={(e) =>
                      setFormData({ ...formData, dba: e.target.value })
                    }
                    placeholder="Your Business"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, industry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entityType">Entity Type *</Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, entityType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map((entity) => (
                        <SelectItem key={entity.value} value={entity.value}>
                          {entity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stateProvince">State/Province *</Label>
                  <Input
                    id="stateProvince"
                    required
                    value={formData.stateProvince}
                    onChange={(e) =>
                      setFormData({ ...formData, stateProvince: e.target.value })
                    }
                    placeholder="California"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-8">
                <h3 className="font-display font-semibold mb-4">
                  Primary Contact
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name *</Label>
                    <Input
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData({ ...formData, contactName: e.target.value })
                      }
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, contactEmail: e.target.value })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="space-y-2 max-w-xs">
                    <Label htmlFor="contactPhone">Phone (optional)</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, contactPhone: e.target.value })
                      }
                      placeholder="+1 (403) 421-0064"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Accounting Setup */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold mb-6">
                Accounting Setup
              </h2>

              <div className="space-y-2">
                <Label htmlFor="accountingPlatform">Current Accounting Platform *</Label>
                <Select
                  value={formData.accountingPlatform}
                  onValueChange={(value) =>
                    setFormData({ ...formData, accountingPlatform: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountingPlatforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccounts">
                  Bank Accounts *
                  <span className="text-muted-foreground font-normal ml-2">
                    (list bank names and account types)
                  </span>
                </Label>
                <Textarea
                  id="bankAccounts"
                  required
                  rows={3}
                  value={formData.bankAccounts}
                  onChange={(e) =>
                    setFormData({ ...formData, bankAccounts: e.target.value })
                  }
                  placeholder="e.g., Chase Business Checking, Wells Fargo Savings"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditCards">
                  Credit Cards
                  <span className="text-muted-foreground font-normal ml-2">
                    (list cards used for business)
                  </span>
                </Label>
                <Textarea
                  id="creditCards"
                  rows={2}
                  value={formData.creditCards}
                  onChange={(e) =>
                    setFormData({ ...formData, creditCards: e.target.value })
                  }
                  placeholder="e.g., Amex Business Gold, Chase Ink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchantAccounts">
                  Merchant/Payment Accounts
                  <span className="text-muted-foreground font-normal ml-2">
                    (Stripe, Square, PayPal, etc.)
                  </span>
                </Label>
                <Textarea
                  id="merchantAccounts"
                  rows={2}
                  value={formData.merchantAccounts}
                  onChange={(e) =>
                    setFormData({ ...formData, merchantAccounts: e.target.value })
                  }
                  placeholder="e.g., Stripe, Square, PayPal Business"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionVolume">
                  Estimated Transaction Volume *
                </Label>
                <Select
                  value={formData.transactionVolume}
                  onValueChange={(value) =>
                    setFormData({ ...formData, transactionVolume: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionVolumes.map((volume) => (
                      <SelectItem key={volume.value} value={volume.value}>
                        {volume.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Services & Notes */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold mb-6">
                Services & Additional Info
              </h2>

              <div className="space-y-4">
                <Label>Services Needed *</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {servicesOptions.map((service) => (
                    <label
                      key={service.value}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                        formData.servicesNeeded.includes(service.value)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Checkbox
                        checked={formData.servicesNeeded.includes(service.value)}
                        onCheckedChange={() => handleServiceToggle(service.value)}
                      />
                      <span>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  Additional Notes
                  <span className="text-muted-foreground font-normal ml-2">
                    (anything else we should know?)
                  </span>
                </Label>
                <Textarea
                  id="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Tell us about any specific challenges, questions, or details about your situation..."
                />
              </div>

              <div className="space-y-4">
                <Label>
                  File Uploads (optional)
                  <span className="text-muted-foreground font-normal ml-2">
                    (receipts, exports, or other documents - max 5 files)
                  </span>
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.csv,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                variant="cta"
                onClick={nextStep}
                disabled={!isStepValid()}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="cta"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Intake Form"
                )}
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
