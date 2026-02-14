import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileCheck, Fuel, ClipboardList, Smartphone, TrendingUp, Wrench } from "lucide-react";

const features = [
  { icon: LayoutDashboard, title: "Central Dashboard", description: "One platform to manage your entire fleet — vehicles, drivers, jobs, and costs." },
  { icon: Users, title: "Driver Management", description: "Monitor driver behavior, licence checks, and performance scores in one place." },
  { icon: FileCheck, title: "Vehicle Checks", description: "Digital walk-around checks with photo evidence. Stay compliant effortlessly." },
  { icon: Fuel, title: "Fuel Management", description: "Track fuel purchases, monitor consumption, and identify cost-saving opportunities." },
  { icon: ClipboardList, title: "Job Management", description: "Assign, track, and complete jobs from dispatch to delivery with real-time updates." },
  { icon: Smartphone, title: "Driver App", description: "Give drivers everything they need — navigation, job details, and vehicle checks on mobile." },
  { icon: TrendingUp, title: "Fleet Analytics", description: "Actionable insights on utilization, costs, and performance to optimize operations." },
  { icon: Wrench, title: "Maintenance Alerts", description: "Schedule services, track MOTs, and get reminders before issues become problems." },
];

const FleetManagement = () => {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Fleet Management</p>
            <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Complete Control of <span className="text-accent">Your Fleet</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              From vehicle checks to job dispatch, manage every aspect of your fleet operations from a single powerful platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/get-quote">Get a Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/book-demo">Book a Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-card/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Platform Features</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              One Platform, <span className="text-accent">Total Visibility</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <feature.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent/5">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Take Control of Your Fleet
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            See how Travio fleet management can streamline your operations and reduce costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/get-quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/book-demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default FleetManagement;
