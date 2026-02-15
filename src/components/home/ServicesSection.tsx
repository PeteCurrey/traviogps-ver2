import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarCheck, Headphones, TrendingDown, ShieldCheck, ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const icons = [CalendarCheck, Headphones, TrendingDown, ShieldCheck];
const hrefs = ["/fleet-management", "/contact", "/vehicle-tracking", "/fleet-management"];
const ctas = ["Learn More", "Get in Touch", "See How", "Learn More"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ServicesSection() {
  const { content } = usePageContent("home_services");

  const services = [
    { icon: icons[0], title: String(content.service1Title), description: String(content.service1Description), href: hrefs[0], cta: ctas[0] },
    { icon: icons[1], title: String(content.service2Title), description: String(content.service2Description), href: hrefs[1], cta: ctas[1] },
    { icon: icons[2], title: String(content.service3Title), description: String(content.service3Description), href: hrefs[2], cta: ctas[2] },
    { icon: icons[3], title: String(content.service4Title), description: String(content.service4Description), href: hrefs[3], cta: ctas[3] },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">{String(content.sectionLabel)}</p>
          <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {String(content.heading)} <span className="text-accent">{String(content.headingAccent)}</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Link
                to={service.href}
                className="group block p-6 bg-card rounded-lg border border-border h-full relative overflow-hidden hover:border-accent/30 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-accent/5"
                  initial={{ scaleY: 0, originY: 1 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="h-5 w-5 text-accent" />
                  </motion.div>
                  <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-accent">
                    {service.cta}
                    <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
