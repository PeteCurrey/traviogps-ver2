import { motion } from "framer-motion";
import { StatsCounter } from "@/components/ui/animated-counter";
import { Fuel, Building2, Heart, PiggyBank } from "lucide-react";

const stats = [
  { value: 15, suffix: "%", label: "Average Fuel Savings", icon: <Fuel className="h-6 w-6" /> },
  { value: 22000, suffix: "+", label: "Business Fleets", icon: <Building2 className="h-6 w-6" /> },
  { value: 98, suffix: "%", label: "Customer Retention", icon: <Heart className="h-6 w-6" /> },
  { value: 200, prefix: "£", suffix: "M+", label: "Calculated Savings", icon: <PiggyBank className="h-6 w-6" /> },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-secondary/50 border-y border-border/30">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Proven Results
          </p>
          <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Trusted by UK Fleets
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatsCounter
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              delay={index}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
