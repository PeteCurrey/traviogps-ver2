"use client";

import { useEffect, useRef } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutPage() {
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
          <p className="overline mb-4">ABOUT TRAVIO</p>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Protecting what you've <span className="text-[#C9A84C]">worked for.</span>
          </h1>
          <p className="text-[#999999] max-w-2xl mx-auto leading-relaxed text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
            We believe that owning a premium vehicle should bring joy, not anxiety. Our mission is to provide the ultimate security for the UK's most desirable cars, motorhomes, and motorcycles.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#111111]" ref={ref}>
        <div className="container-premium max-w-4xl">
          <div className="space-y-12 text-[#999999] leading-relaxed text-lg" style={{ fontFamily: "DM Sans, sans-serif" }} data-reveal>
            <p>
              Travio was founded on a simple premise: vehicle security hasn't kept pace with vehicle theft. As organised crime gangs increasingly target high-value vehicles using sophisticated keyless entry cloning, traditional alarms and steering locks are no longer enough.
            </p>
            <p>
              We partner with Thatcham Research and UK Police forces to deliver cutting-edge GPS tracking solutions. Our category S5 and S7 devices use dual-satellite positioning, military-grade encryption, and ultra-low power technology to ensure your vehicle is always connected.
            </p>
            <p>
              But hardware is only half the story. Our 24/7 Secure Control Centre operates 365 days a year. If your vehicle is moved without authorization, our team is immediately alerted and will liaise directly with local police forces to secure its rapid recovery. In fact, our S5 systems boast a 94% recovery rate.
            </p>
            <div className="p-8 border-l-4 border-[#C9A84C] bg-[#0A0A0A] rounded-r-2xl mt-12">
              <p className="text-xl text-[#F5F5F5] font-medium italic" style={{ fontFamily: "Syne, sans-serif" }}>
                "We don't just sell trackers. We sell the peace of mind that comes from knowing your most valuable assets are under constant watch."
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
