import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Bell, BarChart3, Plug, Shield, Clock, Fuel, Route } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const features = [
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description: "See exactly where every vehicle is, right now. Live map updates every 10 seconds with full route history.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified of speeding, idling, unauthorized use, and geofence breaches in real time.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Mileage, fuel usage, driver behavior, and trip history — all automatically generated.",
  },
  {
    icon: Plug,
    title: "Easy Installation",
    description: "OBD plug-and-play devices or hardwired trackers. Installed in minutes, no downtime.",
  },
  {
    icon: Shield,
    title: "Theft Recovery",
    description: "Protect your assets with 24/7 tracking and instant movement alerts when vehicles should be stationary.",
  },
  {
    icon: Clock,
    title: "Timesheet Automation",
    description: "Automatically record start/stop times, breaks, and on-site durations for accurate payroll.",
  },
  {
    icon: Fuel,
    title: "Fuel Monitoring",
    description: "Track fuel consumption patterns and identify wasteful driving habits to reduce costs.",
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Plan the most efficient routes and reduce unnecessary mileage across your fleet.",
  },
];

const steps = [
  { step: "01", title: "Choose Your Tracker", description: "Select from OBD plug-in, hardwired, or asset trackers to suit your fleet." },
  { step: "02", title: "Quick Installation", description: "Self-install in minutes or book a free professional fitting." },
  { step: "03", title: "Start Tracking", description: "Log in to your dashboard and see your entire fleet in real time." },
];

const VehicleTracking = () => {
  return (
    <PageWrapper>
      <SEOHead title="GPS Vehicle Tracking | Real-Time Fleet Location | Travio" description="Track every vehicle in real time with Travio GPS tracking. Live map updates, instant alerts, geofencing, and detailed journey reports for UK fleets." />
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
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">GPS Vehicle Tracking</p>
            <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Know Where Every Vehicle Is, <span className="text-accent">Right Now</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              Real-time GPS tracking for cars, vans, trucks, and assets. Reduce costs, improve efficiency, and protect your fleet with Travio.
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

      {/* Features Grid */}
      <section className="section-padding bg-card/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Features</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Everything You Need to <span className="text-accent">Track Your Fleet</span>
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

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">How It Works</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Up and Running in <span className="text-accent">3 Simple Steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                className="text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <span className="text-5xl font-bold text-accent/20 block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.step}</span>
                <h3 className="font-semibold text-lg text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent/5">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to Track Your Fleet?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of businesses saving time and money with Travio GPS tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/get-quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default VehicleTracking;
