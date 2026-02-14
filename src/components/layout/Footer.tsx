import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { DalesAndPeaksLogo } from "./DalesAndPeaksLogo";
const footerLinks = {
  sales: [{
    label: "Properties for Sale",
    href: "/sales"
  }, {
    label: "Sell Your Home",
    href: "/sell"
  }, {
    label: "Request a Valuation",
    href: "/valuation"
  }, {
    label: "New Homes",
    href: "/new-homes"
  }],
  lettings: [{
    label: "Properties to Rent",
    href: "/lettings"
  }, {
    label: "Landlord Services",
    href: "/landlords"
  }, {
    label: "Tenant Information",
    href: "/tenants"
  }, {
    label: "Property Management",
    href: "/property-management"
  }],
  areas: [{
    label: "Peak District",
    href: "/areas/peak-district"
  }, {
    label: "Sheffield",
    href: "/areas/sheffield"
  }, {
    label: "Chesterfield",
    href: "/areas/chesterfield"
  }, {
    label: "Nottingham",
    href: "/areas/nottingham"
  }],
  company: [{
    label: "About Us",
    href: "/about"
  }, {
    label: "Our Team",
    href: "/about/team"
  }, {
    label: "News & Insights",
    href: "/blog"
  }, {
    label: "Contact",
    href: "/contact"
  }]
};
const socialLinks = [{
  icon: Facebook,
  href: "https://facebook.com/dalesandpeaks",
  label: "Facebook"
}, {
  icon: Instagram,
  href: "https://instagram.com/dalesandpeaks",
  label: "Instagram"
}, {
  icon: Twitter,
  href: "https://twitter.com/dalesandpeaks",
  label: "Twitter"
}, {
  icon: Linkedin,
  href: "https://linkedin.com/company/dalesandpeaks",
  label: "LinkedIn"
}];
export function Footer() {
  return <footer className="bg-charcoal border-t border-border/30">
      {/* Main footer content */}
      <div className="container-premium py-12 md:section-padding">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8">
          {/* Brand column - full width on mobile */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <DalesAndPeaksLogo size="sm" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">Telling your home's story. A family owned estate agency serving the Peak District, Sheffield, Chesterfield and Nottingham.</p>
            <div className="space-y-3">
              <a href="tel:01246567540" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>01246 567 540</span>
              </a>
              <a href="mailto:info@dalesandpeaks.co.uk" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@dalesandpeaks.co.uk</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>131 Chatsworth Road, Chesterfield, Derbyshire S40 1AB</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Sales</h4>
            <ul className="space-y-2.5">
              {footerLinks.sales.map(link => <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Lettings</h4>
            <ul className="space-y-2.5">
              {footerLinks.lettings.map(link => <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Areas</h4>
            <ul className="space-y-2.5">
              {footerLinks.areas.map(link => <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30">
        <div className="container-premium py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Dales & Peaks. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3">
            {socialLinks.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-9 md:h-9 rounded-sm bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors" aria-label={social.label}>
                <social.icon className="h-4 w-4" />
              </a>)}
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}