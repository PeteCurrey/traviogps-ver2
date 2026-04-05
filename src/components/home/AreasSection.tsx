import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const industries = [
  {
    name: "Construction",
    description: "Track plant, vehicles and equipment across multiple sites. Reduce theft and improve utilisation.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
    href: "/solutions/construction",
    fleets: "5,000+"
  },
  {
    name: "Logistics & Distribution",
    description: "Optimise delivery routes, reduce fuel costs and provide accurate ETAs to your customers.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    href: "/solutions/logistics",
    fleets: "4,200+"
  },
  {
    name: "Delivery & Courier",
    description: "Complete more deliveries per day with smarter scheduling and real-time driver updates.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
    href: "/solutions/delivery",
    fleets: "3,800+"
  },
  {
    name: "Field Service",
    description: "Get engineers to jobs faster, improve first-time fix rates and keep customers informed.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
    href: "/solutions/field-service",
    fleets: "6,100+"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function AreasSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-secondary/80" />

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Industry Solutions</p>
          <h2 className="font-bold text-display-3 md:text-display-2 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Built for <span className="text-accent">Your</span> Industry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Whatever industry you're in, our fleet management solutions help you reduce costs, improve efficiency and stay compliant.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {industries.map((industry) => (
            <motion.div key={industry.name} variants={itemVariants}>
              <Link
                href={industry.href}
                className="group block relative aspect-[16/9] overflow-hidden rounded-lg"
              >
                <motion.img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                    {industry.fleets} Fleets
                  </span>
                  <h3 className="font-bold text-2xl md:text-3xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {industry.name}
                  </h3>
                  <p className="text-sm text-foreground/70 max-w-md mb-4 group-hover:text-foreground/90 transition-colors duration-300">
                    {industry.description}
                  </p>
                  <motion.span 
                    className="inline-flex items-center text-sm font-medium text-accent"
                    whileHover={{ x: 5 }}
                  >
                    Explore solutions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
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
