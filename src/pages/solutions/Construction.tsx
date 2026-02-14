import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HardHat, MapPin, Shield, Clock, FileCheck, Fuel, Users, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import constructionHero from "@/assets/solution-construction-hero.webp";

const features = [
  { icon: MapPin, title: "Site-to-Site Tracking", description: "Monitor vehicle movements between construction sites. Know which assets are where at all times." },
  { icon: HardHat, title: "Plant & Asset Tracking", description: "Track high-value plant equipment, generators, and tools — even when they're off-road." },
  { icon: Shield, title: "Theft Prevention", description: "Instant alerts when equipment moves outside designated sites or during out-of-hours periods." },
  { icon: Clock, title: "Timesheet Automation", description: "Automatically log arrival and departure times at sites for accurate payroll and billing." },
  { icon: FileCheck, title: "Digital Vehicle Checks", description: "Drivers complete daily walk-around checks on their phone with photo evidence for compliance." },
  { icon: Fuel, title: "Fuel Monitoring", description: "Track fuel usage across your fleet of tippers, vans, and plant to control spiralling costs." },
  { icon: Users, title: "Subcontractor Visibility", description: "See where subcontractor vehicles are and verify time on site without relying on self-reporting." },
  { icon: BarChart3, title: "Utilisation Reports", description: "Understand which vehicles and equipment are being used — and which are sitting idle costing money." },
];

const benefits = [
  { stat: "30%", label: "Reduction in fuel costs" },
  { stat: "2hrs", label: "Saved per day on admin" },
  { stat: "100%", label: "Site attendance visibility" },
  { stat: "24/7", label: "Theft & movement alerts" },
];

const Construction = () => {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Construction & Plant</p>
              <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Fleet Tracking Built for <span className="text-accent">Construction</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                Track vehicles, plant equipment, and tools across multiple sites. Reduce theft, automate timesheets, and cut fuel waste with Travio.
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={constructionHero} alt="Construction fleet vehicles on a busy site at golden hour" className="w-full h-auto object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/50 bg-card/50">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.stat}</p>
                <p className="text-sm text-muted-foreground">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Purpose-Built</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Why Construction Companies <span className="text-accent">Choose Travio</span>
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

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">FAQ</p>
              <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Common <span className="text-accent">Questions</span>
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="q1" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Can you track plant equipment that doesn't have a battery?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Yes — we offer battery-powered GPS trackers with up to 5 years of battery life, perfect for unpowered assets like generators, containers, and tool trailers.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How does out-of-hours theft alerting work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">You set geofences around your sites and define working hours. If any tracked asset moves outside those boundaries or times, you receive an instant push notification and email alert.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Can subcontractor vehicles be tracked too?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Absolutely. You can add subcontractor vehicles to your account with their own tracking devices, giving you verified time-on-site data without relying on self-reporting.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How long does installation take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Most vehicle trackers are installed in under 30 minutes. For plant equipment, our battery-powered devices are simply attached with heavy-duty magnets or bolts — no wiring needed.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5" className="border border-border/50 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-foreground font-semibold text-left" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Do you offer contracts or is it pay monthly?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">We offer flexible monthly rolling plans with no long-term contracts. You can scale up or down as your fleet changes across projects.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent/5">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to Take Control of Your Construction Fleet?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join hundreds of construction firms using Travio to reduce costs and improve site operations.
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

export default Construction;
