import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="section-container" aria-label="Global">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">Q</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              QuickLedger
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+15555555555"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(555) 555-5555</span>
            </a>
            <Button asChild variant="cta" size="default">
              <Link to="/intake">Book a Free Consult</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <a
                  href="tel:+15555555555"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  <span>(555) 555-5555</span>
                </a>
                <div className="px-4">
                  <Button asChild variant="cta" className="w-full">
                    <Link to="/intake" onClick={() => setMobileMenuOpen(false)}>
                      Book a Free Consult
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
