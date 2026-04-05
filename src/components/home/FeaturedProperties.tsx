import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Video, FileCheck, Briefcase, ArrowRight } from "lucide-react";

const products = [
  {
    icon: Truck,
    title: "Vehicle Tracking",
    description: "Real-time GPS tracking for your entire fleet. Know where every vehicle is, reduce fuel costs, and improve productivity.",
    href: "/vehicle-tracking",
    cta: "Learn More"
  },
  {
    icon: Video,
    title: "Connected Dash Cams",
    description: "HD connected cameras that integrate with your tracking data. Protect your drivers and reduce insurance costs.",
    href: "/dash-cams",
    cta: "Learn More"
  },
  {
    icon: FileCheck,
    title: "Driver Checks",
    description: "Digital vehicle walk-around checks and DVLA licence verification. Stay compliant and reduce admin.",
    href: "/fleet-management",
    cta: "Learn More"
  },
  {
    icon: Briefcase,
    title: "Job Management",
    description: "Schedule, dispatch, and track jobs from one platform. Complete more jobs per day with smarter planning.",
    href: "/fleet-management",
    cta: "Learn More"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function FeaturedProperties() {
  return (
    <section className="section-padding bg-background">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Our Products</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Everything You Need to <span className="text-accent">Run Your Fleet</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/get-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div key={product.title} variants={cardVariants}>
              <Link
                href={product.href}
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
                    whileHover={{ scale: 1.1 }}
                  >
                    <product.icon className="h-6 w-6 text-accent" />
                  </motion.div>
                  <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-accent">
                    {product.cta}
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
