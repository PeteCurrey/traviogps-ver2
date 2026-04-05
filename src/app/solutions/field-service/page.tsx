"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, MapPin, Clock, ClipboardList, Smartphone, Route, BarChart3, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  { icon: MapPin, title: "Engineer Location", description: "See where every engineer is in real time and dispatch the nearest available person to each job." },
  { icon: ClipboardList, title: "Job Management", description: "Create, assign, and track jobs from dispatch to completion with real-time status updates." },
  { icon: Clock, title: "Automated Timesheets", description: "Capture accurate arrival and departure times at each job for billing and payroll." },
  { icon: Smartphone, title: "Mobile App", description: "Engineers receive job details, navigate to sites, and submit reports — all from their phone." },
  { icon: Route, title: "Smart Scheduling", description: "Optimise daily schedules based on location, skillset, and job priority to maximise productivity." },
  { icon: Wrench, title: "First-Time Fix Rate", description: "Give engineers the right information upfront so they arrive prepared with the right parts." },
  { icon: Users, title: "Customer Updates", description: "Send automated appointment windows and ETA updates so customers aren't left waiting." },
  { icon: BarChart3, title: "Service Analytics", description: "Track jobs completed, response times, and engineer productivity across your team." },
];

const benefits = [
  { stat: "35%", label: "More jobs per day" },
  { stat: "20%", label: "Reduction in travel time" },
  { stat: "95%", label: "First-time fix rate" },
  { stat: "Zero", label: "Missed appointments" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does smart scheduling decide which engineer to send?", "acceptedAnswer": { "@type": "Answer", "text": "Travio considers each engineer's real-time location, skill set, availability, and current workload to recommend the best person for the job — minimising travel time and maximising first-time fix rates." } },
    { "@type": "Question", "name": "Can engineers use their own phones?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the Travio mobile app runs on both iOS and Android. Engineers can use their personal or company-issued devices to receive jobs, navigate, and submit reports." } },
    { "@type": "Question", "name": "How are automated timesheets calculated?", "acceptedAnswer": { "@type": "Answer", "text": "When an engineer arrives at and leaves a job site, Travio logs GPS-verified timestamps automatically. These are compiled into timesheets ready for payroll or client billing." } },
    { "@type": "Question", "name": "Do customers receive appointment notifications?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Customers get automated SMS or email updates with their appointment window and a live ETA link on the day, so they know exactly when the engineer will arrive." } },
    { "@type": "Question", "name": "Can I manage reactive and planned maintenance jobs?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Travio handles both emergency callouts and scheduled maintenance. You can prioritise urgent jobs and slot planned work around them for maximum efficiency." } },
  ]
};

export default function FieldServicePage() {
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
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Field Service</p>
              <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get the Right Engineer to the <span className="text-accent">Right Job, Faster</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl leading-relaxed">
                Dispatch smarter, track engineers in real time, and complete more jobs per day with Travio field service management.
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
              <img src="/assets/solution-field-service-hero.webp" alt="Field service team" className="w-full h-auto object-cover" />
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
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Field Service Tools</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Purpose-Built for <span className="text-accent">Service Teams</span>
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
                Service <span className="text-accent">Questions</span>
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
            Transform Your Field Operations
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg leading-relaxed">
            See how Travio helps field service companies complete more jobs and keep customers happy.
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
