import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DalesAndPeaksLogo } from "./DalesAndPeaksLogo";

const leftNavLinks = [
  { 
    label: "Vehicle Tracking", 
    href: "/vehicle-tracking",
    submenu: [
      { label: "GPS Trackers", href: "/vehicle-tracking" },
      { label: "OBD Trackers", href: "/vehicle-tracking" },
      { label: "Asset Trackers", href: "/vehicle-tracking" },
    ]
  },
  { 
    label: "Fleet Management", 
    href: "/fleet-management",
    submenu: [
      { label: "Driver App", href: "/fleet-management" },
      { label: "Vehicle Checks", href: "/fleet-management" },
      { label: "Mileage Reports", href: "/fleet-management" },
    ]
  },
];

const rightNavLinks = [
  { 
    label: "Dash Cams", 
    href: "/dash-cams",
    submenu: [
      { label: "Connected Dash Cams", href: "/dash-cams" },
      { label: "HD Cameras", href: "/dash-cams" },
    ]
  },
  { 
    label: "Solutions", 
    href: "/solutions",
    submenu: [
      { label: "Construction", href: "/solutions/construction" },
      { label: "Logistics", href: "/solutions/logistics" },
      { label: "Delivery", href: "/solutions/delivery" },
      { label: "Field Service", href: "/solutions/field-service" },
    ]
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const allNavLinks = [...leftNavLinks, ...rightNavLinks];

interface NavLinkItemProps {
  link: {
    label: string;
    href: string;
    submenu?: { label: string; href: string }[];
  };
  activeSubmenu: string | null;
  setActiveSubmenu: (label: string | null) => void;
  pathname: string;
}

function NavLinkItem({ link, activeSubmenu, setActiveSubmenu, pathname }: NavLinkItemProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => link.submenu && setActiveSubmenu(link.label)}
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      <Link
        to={link.href}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1",
          pathname === link.href
            ? "text-accent"
            : "text-foreground/80 hover:text-accent"
        )}
      >
        {link.label}
        {link.submenu && <ChevronDown className="h-3 w-3" />}
      </Link>

      <AnimatePresence>
        {link.submenu && activeSubmenu === link.label && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="bg-card border border-border rounded-lg shadow-elevated min-w-[200px] py-2">
              {link.submenu.map((sublink) => (
                <Link
                  key={sublink.label}
                  to={sublink.href}
                  className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-accent hover:bg-secondary/50 transition-colors"
                >
                  {sublink.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-charcoal border-b border-border/30">
        <div className="container-premium flex justify-between items-center py-2 text-sm">
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="tel:+441onal" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>0330 060 0499</span>
            </a>
            <a href="mailto:info@travio.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>info@travio.com</span>
            </a>
          </div>
          <div className="text-muted-foreground">
            Trusted by 22,000+ Businesses
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <motion.header
        className={cn(
          "fixed top-0 lg:top-[41px] left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft" 
            : "bg-background/80 backdrop-blur-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="container-premium">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Left Navigation */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-start">
              {leftNavLinks.map((link) => (
                <NavLinkItem
                  key={link.label}
                  link={link}
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  pathname={location.pathname}
                />
              ))}
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center justify-center lg:flex-none">
              <DalesAndPeaksLogo size="md" />
            </Link>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
              {rightNavLinks.map((link) => (
                <NavLinkItem
                  key={link.label}
                  link={link}
                  activeSubmenu={activeSubmenu}
                  setActiveSubmenu={setActiveSubmenu}
                  pathname={location.pathname}
                />
              ))}
              <Button asChild size="sm" className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/get-quote">Get a Quote</Link>
              </Button>
            </div>

            <div className="lg:hidden w-10" />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-card border-r border-border shadow-elevated"
            >
              <div className="flex flex-col h-full pt-6 pb-8 px-6">
                <div className="flex items-center justify-between mb-8">
                  <DalesAndPeaksLogo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-foreground"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto">
                  {allNavLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "block py-3 text-lg font-medium border-b border-border/50 transition-colors",
                          location.pathname === link.href
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                        )}
                      >
                        {link.label}
                      </Link>
                      {link.submenu && (
                        <div className="pl-4 py-2 space-y-2">
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.label}
                              to={sublink.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <div className="space-y-4 pt-6 border-t border-border/50">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link to="/get-quote">Get a Quote</Link>
                  </Button>
                  <div className="text-center space-y-2 text-sm text-muted-foreground">
                    <a href="tel:03300600499" className="block hover:text-accent transition-colors">
                      0330 060 0499
                    </a>
                    <a href="mailto:info@travio.com" className="block hover:text-accent transition-colors">
                    info@travio.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
