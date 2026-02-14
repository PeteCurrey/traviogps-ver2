import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Bell, Zap, BarChart3 } from "lucide-react";

const features = [
  { icon: Eye, text: "See every vehicle and job in one place" },
  { icon: Bell, text: "Get alerts for delays, maintenance or route deviations" },
  { icon: Zap, text: "Make fast decisions that keep teams on schedule" },
  { icon: BarChart3, text: "Access reports and insights instantly" },
];

export function AboutSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <motion.img
                src="https://assets.ramtracking.com/_assets/uploads/pages/8e3986-fleet-manager-with-vans.jpg"
                alt="Fleet manager monitoring vehicles"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-lg"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-sm uppercase tracking-[0.3em] text-accent mb-4"
            >
              Why Travio
            </motion.p>
            <h2 className="font-bold text-display-3 md:text-display-2 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Manage Your Fleet with <span className="text-accent">Confidence</span>
            </h2>
            <motion.div 
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feature.icon className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                to="/about"
                className="group inline-flex items-center text-sm font-medium text-accent link-underline"
              >
                Learn How Fleet Tracking Works
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
