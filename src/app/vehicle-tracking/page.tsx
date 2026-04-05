"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Bell, BarChart3, Plug, Shield, Clock, Fuel, Route } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const icons = [MapPin, Bell, BarChart3, Plug, Shield, Clock, Fuel, Route];

export default function VehicleTrackingPage() {
  const { content: hero } = usePageContent("vehicle_tracking_hero");
  const { content: feat } = usePageContent("vehicle_tracking_features");
  const { content: steps } = usePageContent("vehicle_tracking_steps");
  const { content: cta } = usePageContent("vehicle_tracking_cta");

  const features = Array.from({ length: 8 }, (_, i) => ({
    icon: icons[i],
    title: String(feat[`feature${i + 1}Title`] ?? ""),
    description: String(feat[`feature${i + 1}Description`] ?? ""),
  }));

  const stepItems = Array.from({ length: 3 }, (_, i) => ({
    step: String(steps[`step${i + 1}Number`] ?? `0${i + 1}`),
    title: String(steps[`step${i + 1}Title`] ?? ""),
    description: String(steps[`step${i + 1}Description`] ?? ""),
  }));

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">{String(hero.label ?? "")}</p>
            <h1 className="font-bold text-display-2 md:text-display-1 text-foreground mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {String(hero.heading ?? "")} <span className="text-accent">{String(hero.headingAccent ?? "")}</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">{String(hero.description ?? "")}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link href="/get-quote">Get a Quote</Link></Button>
              <Button asChild variant="outline" size="lg"><Link href="/book-demo">Book a Demo</Link></Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-card/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">{String(feat.sectionLabel ?? "")}</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {String(feat.heading ?? "")} <span className="text-accent">{String(feat.headingAccent ?? "")}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
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
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">{String(steps.sectionLabel ?? "")}</p>
            <h2 className="font-bold text-display-3 text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {String(steps.heading ?? "")} <span className="text-accent">{String(steps.headingAccent ?? "")}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepItems.map((s, i) => (
              <motion.div key={s.step} className="text-center p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
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
          <h2 className="font-bold text-display-3 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{String(cta.heading ?? "")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{String(cta.description ?? "")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link href="/get-quote">{String(cta.primaryCta ?? "Get a Quote")}</Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="/pricing">{String(cta.secondaryCta ?? "View Pricing")}</Link></Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
