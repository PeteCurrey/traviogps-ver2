import { motion } from "framer-motion";
import { StatsCounter } from "@/components/ui/animated-counter";
import { Fuel, Building2, Heart, PiggyBank } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

export function StatsSection() {
  const { content } = usePageContent("home_stats");

  const stats = [
    { value: Number(content.stat1Value) || 15, prefix: String(content.stat1Prefix || ""), suffix: String(content.stat1Suffix), label: String(content.stat1Label), icon: <Fuel className="h-6 w-6" /> },
    { value: Number(content.stat2Value) || 22000, prefix: String(content.stat2Prefix || ""), suffix: String(content.stat2Suffix), label: String(content.stat2Label), icon: <Building2 className="h-6 w-6" /> },
    { value: Number(content.stat3Value) || 98, prefix: String(content.stat3Prefix || ""), suffix: String(content.stat3Suffix), label: String(content.stat3Label), icon: <Heart className="h-6 w-6" /> },
    { value: Number(content.stat4Value) || 200, prefix: String(content.stat4Prefix || "£"), suffix: String(content.stat4Suffix), label: String(content.stat4Label), icon: <PiggyBank className="h-6 w-6" /> },
  ];

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
            {String(content.sectionLabel)}
          </p>
          <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {String(content.sectionHeading)}
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
