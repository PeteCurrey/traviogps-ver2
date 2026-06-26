"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { TravioLogo } from "./TravioLogo";

const protectionDropdown = [
  { label: "Thatcham S5", desc: "Premium protection", href: "/products/s5-protection" },
  { label: "Thatcham S7", desc: "Essential protection", href: "/products/s7-protection" },
  { label: "Remote Immobilisation", desc: "Stop your vehicle anywhere", href: "/products/remote-immobilisation" },
  { label: "24/7 Monitoring", desc: "Always watching", href: "/app" },
];

const vehiclesDropdown = [
  { label: "Supercars & Sports Cars", href: "/vehicles/supercars" },
  { label: "Luxury SUVs", href: "/vehicles/luxury-suvs" },
  { label: "Motorhomes & Caravans", href: "/vehicles/motorhomes-caravans" },
  { label: "Motorcycles", href: "/vehicles/motorcycles" },
];

const leftNavLinks = [
  { label: "Protection", href: "/products/s5-protection", dropdown: protectionDropdown },
  { label: "Vehicles", href: "/vehicles/supercars", dropdown: vehiclesDropdown },
  { label: "How It Works", href: "/how-it-works" },
];

const rightNavLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface DropdownItem {
  label: string;
  desc?: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

function NavItem({ link, closeAll }: { link: NavLink; closeAll: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!link.dropdown) {
    return (
      <Link
        href={link.href}
        className="px-3 py-2 text-sm font-medium text-[#999999] hover:text-[#F5F5F5] transition-colors duration-200"
        onClick={closeAll}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#999999] hover:text-[#F5F5F5] transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        {link.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open ? "rotate-180" : ""
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 z-50 min-w-[220px]">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl shadow-2xl py-2 overflow-hidden">
            {link.dropdown.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-5 py-3 hover:bg-[#1A1A1A] transition-colors duration-150 group"
                onClick={() => { setOpen(false); closeAll(); }}
              >
                <div className="text-sm font-medium text-[#F5F5F5] group-hover:text-[#C9A84C] transition-colors">
                  {item.label}
                </div>
                {item.desc && (
                  <div className="text-xs text-[#555555] mt-0.5">{item.desc}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeAll = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]"
            : "bg-transparent"
        )}
      >
        <nav className="container-premium">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F5F5]"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Left nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1">
              {leftNavLinks.map((link) => (
                <NavItem key={link.label} link={link} closeAll={closeAll} />
              ))}
            </div>

            {/* Logo — centre */}
            <Link href="/" className="flex items-center justify-center lg:flex-none">
              <TravioLogo size="md" />
            </Link>

            {/* Right nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
              {rightNavLinks.map((link) => (
                <NavItem key={link.label} link={link} closeAll={closeAll} />
              ))}
              <Link
                href="/get-quote"
                className="ml-4 btn-gold text-sm py-2.5 px-5"
              >
                <Shield className="h-3.5 w-3.5" />
                Get Protected
              </Link>
            </div>

            {/* Mobile spacer */}
            <div className="lg:hidden w-10" />
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-[#111111] border-r border-[#2A2A2A] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <TravioLogo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#999999] hover:text-[#F5F5F5]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-6 space-y-1">
              <div className="overline mb-4 pb-2 border-b border-[#2A2A2A]">Protection</div>
              {protectionDropdown.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2.5 text-[#F5F5F5] hover:text-[#C9A84C] transition-colors"
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              ))}

              <div className="overline mb-4 pb-2 border-b border-[#2A2A2A] pt-6">Vehicles</div>
              {vehiclesDropdown.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2.5 text-[#F5F5F5] hover:text-[#C9A84C] transition-colors"
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-6 space-y-2">
                {[{ label: "How It Works", href: "/how-it-works" }, ...rightNavLinks].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-2.5 text-[#999999] hover:text-[#F5F5F5] transition-colors"
                    onClick={closeAll}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-6 border-t border-[#2A2A2A]">
              <Link href="/get-quote" className="btn-gold w-full justify-center" onClick={closeAll}>
                <Shield className="h-4 w-4" />
                Get Protected
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
