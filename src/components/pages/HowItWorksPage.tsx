"use client";

import { useEffect, useRef } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Wrench, Smartphone, ShieldAlert } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    icon: ShieldCheck,
    title: "1. Choose Your Protection",
    desc: "Select between our Thatcham S5 Premium or S7 Essential tracker based on your vehicle value and insurance requirements. Not sure? Use our AI Risk tool to get a recommendation."
  },
  {
    icon: Wrench,
    title: "2. Covert Installation",
    desc: "A Thatcham-accredited engineer will visit you at home, work, or your dealership. Installation takes 1-2 hours and the device is covertly hidden deep within your vehicle."
  },
  {
    icon: Smartphone,
    title: "3. Complete Control",
    desc: "Download the Travio app to see your vehicle in real-time, set geofences, and manage Driver ID tags. You have full control from anywhere in the world."
  },
  {
    icon: ShieldAlert,
    title: "4. 24/7 Monitoring",
    desc: "If your vehicle is moved without authorization, our Secure Control Centre is instantly alerted. We contact you and liaise directly with the police for rapid recovery."
  }
];

export function HowItWorksPage() {
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

  return (
    <PageWrapper>
      <section className="bg-[#0A0A0A] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#2A2A2A]">
        <div className="container-premium text-center">
          <p className="overline mb-4">THE PROCESS</p>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Simple. Seamless. <span className="text-[#C9A84C]">Certain.</span>
          </h1>
          <p className="text-[#999999] max-w-2xl mx-auto leading-relaxed text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
            From ordering to 24/7 protection in under 48 hours. Here is how Travio secures your most valuable assets.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#111111]" ref={ref}>
        <div className="container-premium max-w-4xl">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-[#0A0A0A] p-8 rounded-3xl border border-[#2A2A2A]" data-reveal>
                <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0 border border-[#C9A84C]/20">
                  <step.icon className="h-8 w-8 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{step.title}</h3>
                  <p className="text-[#999999] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center" data-reveal>
            <Link href="/get-quote" className="btn-gold">Get Protected Today</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
