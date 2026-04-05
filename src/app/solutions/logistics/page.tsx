"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck, Route, Clock, BarChart3, Bell, Fuel, FileCheck, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  { icon: Route, title: "Route Optimisation", description: "Plan the most efficient routes to reduce mileage, fuel costs, and driver hours." },
  { icon: MapPin, title: "Live Fleet Map", description: "See every vehicle in real time. Drag and drop jobs to the nearest driver instantly." },
  { icon: Clock, title: "ETA Accuracy", description: "Give customers precise arrival times based on real-time location and traffic data." },
  { icon: Bell, title: "Proof of Delivery", description: "Capture digital signatures, photos, and timestamps for every drop-off." },
  { icon: Truck, title: "Trailer Tracking", description: "Track trailers and containers independently — know where every asset is, hitched or unhitched." },
  { icon: Fuel, title: "Fuel Analytics", description: "Monitor consumption by vehicle, route, and driver to identify and eliminate waste." },
  { icon: FileCheck, title: "Compliance Management", description: "Digital tachograph downloads, driver hours monitoring, and vehicle check records." },
  { icon: BarChart3, title: "Performance Dashboards", description: "Fleet utilisation, on-time delivery rates, and cost-per-mile analytics at a glance." },
];

const benefits = [
  { stat: "15%", label: "Fewer miles driven" },
  { stat: "98%", label: "On-time delivery rate" },
  { stat: "£1,200", label: "Avg. monthly fuel saving" },
  { stat: "50%", label: "Less admin time" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can you track trailers separately from the cab?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — each trailer has its own GPS device so you always know where it is, whether hitched to a cab or parked at a depot. You can see cab and trailer pairings on the live map." } },
    { "@type": "Question", "name": "How does Travio help with driver hours compliance?", "acceptedAnswer": { "@type": "Answer", "text": "Travio automatically downloads digital tachograph data and alerts you when drivers are approaching their limits, helping you stay compliant with UK and EU driving regulations." } },
    { "@type": "Question", "name": "What fuel savings can I realistically expect?", "acceptedAnswer": { "@type": "Answer", "text": "Most logistics customers see 10–15% fuel savings through route optimisation, reduced idling alerts, and driver behaviour coaching. For a 20-vehicle fleet, that typically translates to over £1,000 per month." } },
    { "@type": "Question", "name": "Does Travio integrate with our TMS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Travio offers API integrations with popular transport management systems, allowing you to sync jobs, routes, and delivery confirmations without double-handling data." } },
    { "@type": "Question", "name": "How quickly can we get up and running?", "acceptedAnswer": { "@type": "Answer", "text": "Most fleets are fully live within a week. Vehicle installation takes under 30 minutes per unit, and our team handles the full setup including user training and system configuration." } },
  ]
};

export default function LogisticsPage() {
  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Logistics & Haulage</p>
              <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Smarter Logistics, <span className="text-accent">Lower Costs</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl leading-relaxed">
                Optimise routes, track deliveries in real time, and give your customers accurate ETAs — all from one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  <Link href="/get-quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-semibold">
                  <Link href="/book-demo">Book a Demo</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-glow"
            >
              <img src="/assets/solution-logistics-hero.webp" alt="Logistics fleet" className="w-full h-auto object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50 bg-card/50">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold text-accent mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.stat}</p>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Built for Logistics</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Everything Your Fleet <span className="text-accent">Needs to Deliver</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 shadow-sm"
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
      <section className="section-padding bg-card/30">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">FAQ</p>
              <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Logistics <span className="text-accent">Questions</span>
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqJsonLd.mainEntity.map((item, idx) => (
                <AccordionItem key={idx} value={`q${idx}`} className="border border-border/50 rounded-xl px-6 bg-card shadow-sm">
                  <AccordionTrigger className="text-foreground font-semibold text-left py-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {item.acceptedAnswer.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent/5">
        <div className="container-premium text-center">
          <h2 className="font-bold text-display-3 text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Streamline Your Logistics Operations
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg leading-relaxed">
            See how Travio helps logistics companies move faster and spend less.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <Link href="/get-quote">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link href="/book-demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
