import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Key, Calculator, Users, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Sell Your Home",
    description: "Expert guidance and premium marketing to achieve the best price for your property",
    href: "/sell",
    cta: "Get Started"
  },
  {
    icon: Key,
    title: "Let Your Property",
    description: "Comprehensive landlord services from tenant finding to full property management",
    href: "/landlords",
    cta: "Learn More"
  },
  {
    icon: Calculator,
    title: "Instant Valuation",
    description: "Discover your property's worth with our expert valuation service",
    href: "/valuation",
    cta: "Get Valuation"
  },
  {
    icon: Users,
    title: "Our Approach",
    description: "We tell your home's story with passion, expertise, and market-leading results",
    href: "/about",
    cta: "Meet the Team"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-accent mb-3"
          >
            Our Services
          </motion.p>
          <h2 className="font-serif text-display-3 text-foreground">
            How we can <span className="italic-accent">help</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
            >
              <Link
                to={service.href}
                className="group block p-6 bg-card rounded-sm border border-border h-full relative overflow-hidden"
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-accent/5"
                  initial={{ scaleY: 0, originY: 1 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="h-5 w-5 text-accent" />
                  </motion.div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {service.description}
                  </p>
                  <motion.span 
                    className="inline-flex items-center text-sm font-medium text-accent"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.cta}
                    <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
