"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AlertTriangle, Smartphone, Shield } from "lucide-react";
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

const steps = [
  {
    num: "01",
    icon: AlertTriangle,
    title: "Theft Detected",
    desc: "Travio's Secure Control Centre or you via the app detects unauthorised movement.",
  },
  {
    num: "02",
    icon: Smartphone,
    title: "One Tap",
    desc: "Hit immobilise in the Travio app.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Vehicle Stopped",
    desc: "Engine disabled. Our team coordinates with police for immediate recovery.",
  },
];

const featureCards = [
  {
    title: "Police Authorisation",
    desc: "Immobilisation is only activated in coordination with police to ensure safety.",
  },
  {
    title: "Anti-Drive-Away",
    desc: "Engine won't restart even if the ignition is bypassed.",
  },
  {
    title: "Geofence Trigger",
    desc: "Set it to immobilise automatically if your vehicle leaves a designated area.",
  },
];

export function RemoteImmobilisationPage() {
  const stepsRef = useScrollReveal();
  const featRef = useScrollReveal();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
        <div className="relative z-10 container-premium py-32">
          <p className="overline mb-5">REMOTE IMMOBILISATION</p>
          <h1 className="text-5xl md:text-6xl mb-6 max-w-2xl leading-tight"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Stop your vehicle.
            <span className="text-[#C9A84C] block">From anywhere.</span>
          </h1>
          <p className="text-[#999999] max-w-xl leading-relaxed mb-10" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Remote immobilisation lets you disable your engine via the Travio app — whether you&apos;re in the next room or on another continent.
          </p>
          <Link href="/get-quote?plan=s5" className="btn-gold">Get S5 with Immobilisation</Link>
        </div>
      </section>

      {/* How it works steps */}
      <section className="section-padding bg-[#0A0A0A]" ref={stepsRef}>
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline mb-4">HOW IT WORKS</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Three steps to safety</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px border-t border-dashed border-[#C9A84C]/30" />
            {steps.map((step) => (
              <div key={step.num} className="text-center" data-reveal>
                <div className="relative inline-flex items-center justify-center mb-6">
                  <span className="absolute text-[80px] leading-none select-none"
                    style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: "#C9A84C", opacity: 0.08 }}>
                    {step.num}
                  </span>
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#C9A84C]/50 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-[#C9A84C]" />
                  </div>
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{step.title}</h3>
                <p className="text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="section-padding bg-[#111111]" ref={featRef}>
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((card) => (
              <div key={card.title} className="glass-card p-8" data-reveal>
                <h3 className="text-xl mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{card.title}</h3>
                <p className="text-[#555555] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability callout */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="container-premium max-w-2xl text-center">
          <div className="bg-[#111111] border border-[#C9A84C]/30 rounded-2xl p-10">
            <p className="overline mb-4">AVAILABILITY</p>
            <h2 className="text-3xl mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Included in S5. Available on S7.
            </h2>
            <p className="text-[#999999] mb-8" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Remote immobilisation is included as standard in all Travio S5 packages, and available as an add-on for S7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/s5-protection" className="btn-gold">Get S5 Protection</Link>
              <Link href="/products/s7-protection" className="btn-ghost">View S7</Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
