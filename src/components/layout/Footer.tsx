import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { TravioLogo } from "./TravioLogo";

const footerLinks = {
  products: [
    { label: "S5 Protection", href: "/products/s5-protection" },
    { label: "S7 Protection", href: "/products/s7-protection" },
    { label: "Remote Immobilisation", href: "/products/remote-immobilisation" },
    { label: "App Features", href: "/app" },
  ],
  vehicles: [
    { label: "Supercars", href: "/vehicles/supercars" },
    { label: "Luxury SUVs", href: "/vehicles/luxury-suvs" },
    { label: "Motorhomes & Caravans", href: "/vehicles/motorhomes-caravans" },
    { label: "Motorcycles", href: "/vehicles/motorcycles" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Book Installation", href: "/book-installation" },
    { label: "Help Centre", href: "/contact" },
    { label: "FAQ", href: "/pricing#faq" },
    { label: "Blog", href: "/blog" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/travio", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/travio", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/travio", label: "X / Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-[#262D3D]">
      <div className="container-premium py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <TravioLogo size="md" />
            </Link>
            <p className="text-[#555555] text-sm leading-relaxed mb-8 max-w-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Travio protects what you&apos;ve worked for. Premium GPS tracking, Thatcham-certified, installed at your door.
            </p>
            <div className="space-y-3">
              <a href="tel:03300600499" className="flex items-center gap-3 text-sm text-[#999999] hover:text-[#FF6B1A] transition-colors duration-200">
                <Phone className="h-4 w-4 text-[#FF6B1A]" />
                <span>0330 060 0499</span>
              </a>
              <a href="mailto:info@travio.co.uk" className="flex items-center gap-3 text-sm text-[#999999] hover:text-[#FF6B1A] transition-colors duration-200">
                <Mail className="h-4 w-4 text-[#FF6B1A]" />
                <span>info@travio.co.uk</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-[#555555]">
                <MapPin className="h-4 w-4 text-[#FF6B1A] mt-0.5 flex-shrink-0" />
                <span>Nelson House, George Mann Road, Leeds LS10 1DJ</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-syne font-700 text-sm text-[#F5F5F5] mb-5 tracking-wide uppercase" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-[#FF6B1A] transition-colors duration-200" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicles */}
          <div>
            <h4 className="font-syne text-sm text-[#F5F5F5] mb-5 tracking-wide uppercase" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Vehicles
            </h4>
            <ul className="space-y-3">
              {footerLinks.vehicles.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-[#FF6B1A] transition-colors duration-200" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-syne text-sm text-[#F5F5F5] mb-5 tracking-wide uppercase" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-[#FF6B1A] transition-colors duration-200" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-syne text-sm text-[#F5F5F5] mb-5 tracking-wide uppercase" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-[#FF6B1A] transition-colors duration-200" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#262D3D]">
        <div className="container-premium py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-[#555555]" style={{ fontFamily: "DM Sans, sans-serif" }}>
            © {new Date().getFullYear()} Travio. All rights reserved. Registered in England & Wales.
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1E2533] flex items-center justify-center text-[#555555] hover:text-[#FF6B1A] hover:bg-[#262D3D] transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs text-[#555555]">
            <Link href="/privacy" className="hover:text-[#FF6B1A] transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FF6B1A] transition-colors duration-200">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
