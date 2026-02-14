import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { DalesAndPeaksLogo } from "./DalesAndPeaksLogo";

const footerLinks = {
  products: [
    { label: "Vehicle Tracking", href: "/vehicle-tracking" },
    { label: "Connected Dash Cams", href: "/dash-cams" },
    { label: "Fleet Management", href: "/fleet-management" },
    { label: "Pricing", href: "/pricing" },
  ],
  solutions: [
    { label: "Construction", href: "/solutions/construction" },
    { label: "Logistics", href: "/solutions/logistics" },
    { label: "Delivery", href: "/solutions/delivery" },
    { label: "Field Service", href: "/solutions/field-service" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Book a Demo", href: "/book-demo" },
    { label: "Get a Quote", href: "/get-quote" },
    { label: "Resources", href: "/resources" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about/team" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/ramtracking", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/ramtracking", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/ramtracking", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-border/30">
      <div className="container-premium py-12 md:section-padding">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <DalesAndPeaksLogo size="sm" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Powering every working day since 2004. GPS vehicle tracking and fleet management solutions trusted by 22,000+ UK businesses.
            </p>
            <div className="space-y-3">
              <a href="tel:03300600499" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span>0330 060 0499</span>
              </a>
              <a href="mailto:info@ramtracking.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@ramtracking.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Nelson House, George Mann Road, Leeds LS10 1DJ</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Solutions</h4>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container-premium py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} RAM Tracking. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3">
            {socialLinks.map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary transition-colors" aria-label={social.label}>
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
