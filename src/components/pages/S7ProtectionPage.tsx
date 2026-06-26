"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Eye, Bell, Smartphone, ChevronDown } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

const features = [
  { icon: MapPin, title: "GPS Tracking", desc: "Real-time location, globally. Know where your vehicle is at all times." },
  { icon: Eye, title: "24/7 Monitoring", desc: "Secure Control Centre responds immediately to theft detection." },
  { icon: Bell, title: "Motion Alerts", desc: "Instant push notification if your vehicle moves unexpectedly." },
  { icon: Smartphone, title: "App Control", desc: "Live view, trip history, geofencing and alerts all from one app." },
];

export function S7ProtectionPage() {
  const featuresRef = useScrollReveal();
  const pricingRef = useScrollReveal();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
        <div className="relative z-10 container-premium py-32">
          <p className="overline mb-5">THATCHAM CATEGORY S7</p>
          <h1 className="text-5xl md:text-6xl mb-6 max-w-2xl leading-tight"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Essential protection.
            <span className="text-[#FF6B1A] block">Total peace of mind.</span>
          </h1>
          <p className="text-[#999999] max-w-xl leading-relaxed mb-10" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Thatcham S7 is our entry-level tier — insurance-approved GPS tracking with 24/7 monitoring.
            Perfect for cars, motorcycles, caravans, and classic vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/get-quote?plan=s7" className="btn-gold">Get S7 Protection</Link>
            <Link href="#features" className="btn-ghost">See Features</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding bg-[#0B0F19]" ref={featuresRef}>
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline mb-4">WHAT YOU GET</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S7 Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="glass-card p-8 text-center" data-reveal>
                <div className="w-14 h-14 rounded-full bg-[#1E2533] border border-[#FF6B1A]/30 flex items-center justify-center mx-auto mb-5">
                  <feat.icon className="h-6 w-6 text-[#FF6B1A]" />
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{feat.title}</h3>
                <p className="text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-[#111625]" ref={pricingRef}>
        <div className="container-premium max-w-xl">
          <div className="text-center mb-12" data-reveal>
            <p className="overline mb-4">TRANSPARENT PRICING</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S7 Essential</h2>
          </div>
          <div className="bg-[#0B0F19] border border-[#262D3D] rounded-2xl p-10" data-reveal>
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8 pb-8 border-b border-[#262D3D]">
              <div>
                <div className="text-[#555555] text-sm mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>One-off hardware cost</div>
                <div className="text-5xl text-[#FF6B1A]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>£199</div>
                <div className="text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>inc. VAT & installation</div>
              </div>
              <div className="md:ml-8">
                <div className="text-[#555555] text-sm mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Annual subscription</div>
                <div className="text-2xl text-[#F5F5F5]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>£99 / year</div>
                <div className="text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>or £9.99 / month</div>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              {["Real-time GPS tracking","24/7 Secure Control Centre","Geofencing & motion alerts","Trip history & app access","UK-wide engineer installation"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[#FF6B1A] text-lg">✓</span>
                  <span className="text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/get-quote?plan=s7" className="btn-gold w-full justify-center text-base py-4">Get S7 Protection</Link>
          </div>
        </div>
      </section>

      {/* Upgrade prompt */}
      <section className="section-padding bg-[#0B0F19]">
        <div className="container-premium max-w-2xl text-center">
          <div className="bg-[#111625] border border-[#FF6B1A]/30 rounded-2xl p-10">
            <p className="overline mb-4">UPGRADE</p>
            <h2 className="text-3xl mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Is your vehicle worth over £50,000?
            </h2>
            <p className="text-[#999999] mb-8" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Most specialist insurers require Thatcham S5 for high-value vehicles. S5 also adds Driver ID technology, remote immobilisation, and priority police recovery.
            </p>
            <Link href="/products/s5-protection" className="btn-gold">View S5 Protection</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
