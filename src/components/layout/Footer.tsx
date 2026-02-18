import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Shield, Lock } from "lucide-react";

const footerNavigation = {
  services: [
    { name: "Monthly Bookkeeping", href: "/services#monthly" },
    { name: "Catch-up Bookkeeping", href: "/services#catchup" },
    { name: "Payroll Coordination", href: "/services#payroll" },
    { name: "Financial Reports", href: "/services#reports" },
  ],
  company: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Get Started", href: "/intake" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const location = useLocation();

  const handleLinkClick = (href: string) => {
    if (location.pathname === href || location.pathname + location.hash === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-10 md:py-12">
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 pb-8 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
            <Shield className="w-5 h-5" />
            <span>Bank-level Security</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
            <Lock className="w-5 h-5" />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
            <Shield className="w-5 h-5" />
            <span>SOC 2 Compliant Tools</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-display font-bold text-lg">Q</span>
              </div>
              <span className="font-display font-bold text-xl">QuantBooks</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6 max-w-xs">
              Bookkeeping made simple. Insights made automatic. We handle your books so you can focus on growing your business.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:mhashir.services@gmail.com"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                mhashir.services@gmail.com
              </a>
              <a
                href="tel:+14034210064"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (403) 421-0064
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Hawkdale Gate, NW<br />Calgary, AB</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} QuantBooks. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            QuantBooks provides bookkeeping services only. We do not provide tax advice, legal advice, or accounting services requiring a CPA license.
          </p>
        </div>
      </div>
    </footer>
  );
}
