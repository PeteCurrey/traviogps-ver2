import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface ServiceCard {
  category: string;
  title: string;
  titleAccent: string;
  image: string;
  href: string;
  ctas?: { label: string; href: string }[];
  singleCta?: { label: string; href: string };
}

const serviceCards: ServiceCard[] = [
  {
    category: "Sales & Lettings",
    title: "Find",
    titleAccent: "your Property",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    href: "/sales",
    singleCta: { label: "Learn More", href: "/sales" }
  },
  {
    category: "Homes & Land",
    title: "Buy or Sell",
    titleAccent: "your Property",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    href: "/sales",
    ctas: [
      { label: "Sell", href: "/sell" },
      { label: "Buy", href: "/sales" }
    ]
  },
  {
    category: "Valuations",
    title: "Discover",
    titleAccent: "your Home's Value",
    image: "https://ggfx-dalesandpeaks.s3.eu-west-2.amazonaws.com/x.prod/property/1115/images/YinTGGgENeIQ2WUY9Pxr8DkOPKw/Wn53RYR2c1d9iSAZJEAEK_jJs4U/Photo/%5B3%5D/1008x680/qzqUyi9_W0KZLsR2LMD5rQ.webp",
    href: "/valuation",
    singleCta: { label: "Learn More", href: "/valuation" }
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
        className="group relative block h-full overflow-hidden"
      >
        {/* Background image with zoom effect */}
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

        {/* Gradient overlay - darkens on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-background/10"
          animate={{ 
            background: isHovered 
              ? "linear-gradient(to top, hsl(160 20% 8% / 0.95) 0%, hsl(160 20% 8% / 0.6) 50%, hsl(160 20% 8% / 0.3) 100%)"
              : "linear-gradient(to top, hsl(160 20% 8% / 0.85) 0%, hsl(160 20% 8% / 0.3) 50%, hsl(160 20% 8% / 0.1) 100%)"
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          {/* Category label */}
          <motion.span 
            className="text-xs uppercase tracking-[0.25em] text-primary/70 mb-4"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {card.category}
          </motion.span>

          {/* Title */}
          <motion.h3 
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {card.title}
            <br />
            <span className="italic-accent">{card.titleAccent}</span>
          </motion.h3>

          {/* CTAs - appear on hover */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
          >
            {card.ctas ? (
              // Multiple CTAs (for Buy/Sell card)
              card.ctas.map((cta, ctaIndex) => (
                <Link
                  key={cta.label}
                  to={cta.href}
                  onClick={(e) => e.stopPropagation()}
                  className="px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {cta.label}
                </Link>
              ))
            ) : card.singleCta ? (
              // Single CTA
              <span className="px-8 py-3 text-sm uppercase tracking-[0.15em] font-medium border border-primary/40 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {card.singleCta.label}
              </span>
            ) : null}
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-px bg-accent"
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
      {/* Three column grid - stack on mobile */}
      <div className="h-[calc(100vh-280px)] md:h-[calc(100vh-320px)] lg:h-[calc(100vh-340px)] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8">
        {serviceCards.map((card, index) => (
          <ServiceCardItem key={card.title} card={card} index={index} />
        ))}
      </div>

      {/* Bottom section with tagline */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30">
        <div className="container-premium py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-2 md:mb-3">
              Telling Your Home's Story
            </p>
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground px-4">
              Explore our diverse range of properties throughout <span className="italic-accent">Derbyshire & The Peak District</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden md:flex absolute bottom-32 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
