import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Truck, Video, Settings } from "lucide-react";

interface ServiceCard {
  category: string;
  title: string;
  titleAccent: string;
  image: string;
  href: string;
  icon: React.ElementType;
  singleCta: { label: string; href: string };
}

const serviceCards: ServiceCard[] = [
  {
    category: "GPS Tracking",
    title: "Vehicle",
    titleAccent: "Tracking",
    image: "https://assets.ramtracking.com/_assets/uploads/pages/691884-mixed-fleet-banner.jpg",
    href: "/vehicle-tracking",
    icon: Truck,
    singleCta: { label: "Learn More", href: "/vehicle-tracking" }
  },
  {
    category: "HD Video",
    title: "Connected",
    titleAccent: "Dash Cams",
    image: "https://assets.ramtracking.com/_assets/uploads/home/f9f7d0-new-banner.jpg",
    href: "/dash-cams",
    icon: Video,
    singleCta: { label: "Learn More", href: "/dash-cams" }
  },
  {
    category: "Complete Control",
    title: "Fleet",
    titleAccent: "Management",
    image: "https://assets.ramtracking.com/_assets/uploads/pages/8e3986-fleet-manager-with-vans.jpg",
    href: "/fleet-management",
    icon: Settings,
    singleCta: { label: "Learn More", href: "/fleet-management" }
  }
];

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={card.href}
        className="group relative block h-full overflow-hidden rounded-lg"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: isHovered 
              ? "linear-gradient(to top, hsl(220 25% 7% / 0.95) 0%, hsl(220 25% 7% / 0.6) 50%, hsl(220 25% 7% / 0.3) 100%)"
              : "linear-gradient(to top, hsl(220 25% 7% / 0.85) 0%, hsl(220 25% 7% / 0.3) 50%, hsl(220 25% 7% / 0.1) 100%)"
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <motion.div
            className="mb-4"
            animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <card.icon className="h-10 w-10 text-accent" />
          </motion.div>

          <motion.span 
            className="text-xs uppercase tracking-[0.25em] text-accent/70 mb-3"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {card.category}
          </motion.span>

          <motion.h3 
            className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {card.title}
            <br />
            <span className="text-accent">{card.titleAccent}</span>
          </motion.h3>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
          >
            <span className="px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium bg-accent text-accent-foreground rounded-lg group-hover:bg-accent/90 transition-all duration-300">
              {card.singleCta.label}
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background pt-20 lg:pt-[104px] pb-48 md:pb-56">
      <div className="h-[calc(100vh-280px)] md:h-[calc(100vh-320px)] lg:h-[calc(100vh-340px)] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8">
        {serviceCards.map((card, index) => (
          <ServiceCardItem key={card.title} card={card} index={index} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30">
        <div className="container-premium py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-2 md:mb-3">
              Powering Every Working Day
            </p>
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-foreground px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Fleet Management Solutions for <span className="text-accent">UK Businesses</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden md:flex absolute bottom-32 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
