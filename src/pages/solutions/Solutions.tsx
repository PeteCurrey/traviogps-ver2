import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HardHat, Truck, Package, Wrench, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: HardHat,
    title: "Construction & Plant",
    description: "Track vehicles, plant equipment, and tools across multiple sites. Reduce theft, automate timesheets, and control fuel costs.",
    href: "/solutions/construction",
    highlights: ["Site-to-site tracking", "Plant & asset tracking", "Theft prevention", "Timesheet automation"],
  },
  {
    icon: Truck,
    title: "Logistics & Haulage",
    description: "Optimise routes, track deliveries in real time, and give customers accurate ETAs — all from one platform.",
    href: "/solutions/logistics",
    highlights: ["Route optimisation", "Trailer tracking", "Compliance management", "Fuel analytics"],
  },
  {
    icon: Package,
    title: "Delivery & Last Mile",
    description: "Sequence multi-drop routes automatically, send live ETAs to customers, and capture proof of every delivery.",
    href: "/solutions/delivery",
    highlights: ["Multi-drop routing", "Proof of delivery", "Customer ETA updates", "Driver app"],
  },
  {
    icon: Wrench,
    title: "Field Service",
    description: "Dispatch the nearest engineer, track jobs from start to finish, and automate timesheets for accurate billing.",
    href: "/solutions/field-service",
    highlights: ["Smart scheduling", "Job management", "Mobile app", "Service analytics"],
  },
];

const Solutions = () => {
  return (
    <PageWrapper>
      <section className="relative pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Industry Solutions</p>
            <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Fleet Tracking for <span className="text-accent">Every Industry</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Whether you manage construction plant, delivery vans, or field engineers — Travio has a solution built for your industry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.title}
                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <industry.icon className="h-10 w-10 text-accent mb-5" />
                <h2 className="font-bold text-xl text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {industry.title}
                </h2>
                <p className="text-muted-foreground mb-5">{industry.description}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {industry.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="ghost" className="text-accent hover:text-accent/80 p-0 h-auto group-hover:gap-3 transition-all">
                  <Link to={industry.href} className="flex items-center gap-2">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent/5">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Not Sure Which Solution Fits?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Talk to our team and we'll recommend the right setup for your business.
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

export default Solutions;
