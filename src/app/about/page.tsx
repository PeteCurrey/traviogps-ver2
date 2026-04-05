"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Target, Zap } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "10+", label: "Years in Fleet Tech" },
  { value: "5,000+", label: "Vehicles Tracked" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "24/7", label: "UK-Based Support" },
];

const values = [
  {
    icon: Shield,
    title: "Reliability",
    description: "Our platform is built for uptime. Your fleet never stops, and neither do we.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "A real UK-based team that knows your business and answers when you call.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously improve our technology to keep you ahead of the competition.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description: "Powerful features wrapped in an intuitive interface anyone on your team can use.",
  },
];

const timeline = [
  { year: "2014", title: "Founded in Sheffield", description: "Started with a mission to make fleet tracking accessible to businesses of all sizes." },
  { year: "2017", title: "1,000 Vehicles Tracked", description: "Expanded our platform with real-time alerts, driver behaviour scoring and route history." },
  { year: "2020", title: "Dash Cam Launch", description: "Introduced connected HD dash cams with cloud storage and AI incident detection." },
  { year: "2024", title: "5,000+ Vehicles", description: "Trusted by fleets across the UK, from sole traders to enterprise operations." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/fleet-hero-tracking.webp" alt="Travio fleet tracking technology" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">About Travio</p>
            <h1 className="font-serif text-display-3 md:text-display-2 lg:text-display-1 text-foreground mb-6">
              Smarter fleet management, <span className="italic-accent">simplified</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We build technology that helps businesses track, protect and optimise their vehicles — so you can focus on running your operation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-accent">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }} viewport={{ once: true }} className="text-center">
                <p className="font-serif text-display-3 text-accent-foreground mb-2">{stat.value}</p>
                <p className="text-accent-foreground/70 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Story</p>
              <h2 className="font-serif text-display-3 text-foreground mb-6">
                Built by fleet people, <span className="italic-accent">for</span> fleet people
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Travio was founded in Sheffield by a team who saw first-hand how difficult it was for businesses to keep track of their vehicles, drivers and costs. Existing solutions were either too expensive, too complicated, or both.
                </p>
                <p>
                  We set out to build something different — a platform that's powerful enough for enterprise fleets but simple enough for a sole trader with a single van. No long contracts, no hidden fees, just straightforward fleet intelligence.
                </p>
                <p>
                  Today we track thousands of vehicles across the UK, helping businesses reduce fuel costs, improve driver safety and stay compliant — all from a single dashboard.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img src="/assets/fleet-manager-about.webp" alt="Travio team at work" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Journey</p>
            <h2 className="font-serif text-display-3 text-foreground">
              How we <span className="italic-accent">got here</span>
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item, idx) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }} viewport={{ once: true }} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="font-serif text-lg text-accent font-bold">{item.year}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Our Values</p>
            <h2 className="font-serif text-display-3 text-foreground">
              What we <span className="italic-accent">stand</span> for
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {values.map((value) => (
              <motion.div key={value.title} variants={itemVariants} className="text-center p-8">
                <motion.div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6" whileHover={{ scale: 1.1, rotate: 5 }}>
                  <value.icon className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-serif text-display-3 text-accent-foreground mb-6">Ready to take control of your fleet?</h2>
            <p className="text-accent-foreground/70 mb-8 max-w-xl mx-auto">
              Join thousands of UK businesses already using Travio to track, protect and optimise their vehicles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link href="/get-quote">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                <Link href="/book-demo">Book a Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
