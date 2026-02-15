import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, Shield, Wifi, HardDrive, Eye, AlertTriangle, Camera, Cloud } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const features = [
  { icon: Video, title: "HD Video Recording", description: "Crystal-clear 1080p front and rear recording with night vision capability." },
  { icon: Wifi, title: "Connected & Live", description: "Stream live footage from any vehicle directly to your desktop or mobile device." },
  { icon: Shield, title: "Incident Protection", description: "Automatic incident detection with G-force triggers and instant footage upload." },
  { icon: HardDrive, title: "Cloud Storage", description: "All footage securely stored in the cloud. No SD cards, no manual downloads." },
  { icon: Eye, title: "Driver Monitoring", description: "AI-powered driver distraction and fatigue detection keeps your team safe." },
  { icon: AlertTriangle, title: "Event Alerts", description: "Instant notifications for harsh braking, speeding, and collision events." },
  { icon: Camera, title: "Dual-Facing Cameras", description: "Road-facing and driver-facing cameras for complete evidence coverage." },
  { icon: Cloud, title: "Remote Access", description: "Review and download footage remotely. No need to visit the vehicle." },
];

const DashCams = () => {
  return (
    <PageWrapper>
      <SEOHead title="Fleet Dash Cams | HD Connected Cameras | Travio" description="Protect your fleet with Travio connected dash cams. HD recording, live streaming, automatic incident detection, and AI driver coaching for UK businesses." />
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
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Connected Dash Cams</p>
            <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              See the Road Through <span className="text-accent">Your Fleet's Eyes</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              HD connected dash cams with live streaming, cloud storage, and AI driver safety alerts. Protect your drivers and your business.
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
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Features</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              More Than Just a <span className="text-accent">Dash Cam</span>
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
            Protect Your Fleet Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Get connected dash cams fitted across your fleet with zero upfront costs on selected plans.
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

export default DashCams;
