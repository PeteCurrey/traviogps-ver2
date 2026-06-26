"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Info, Shield, HelpCircle, ChevronDown } from "lucide-react";
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

const faqs = [
  { q: "Is installation really included?", a: "Yes. Our pricing includes full, covert installation by a Thatcham-accredited engineer anywhere in the mainland UK." },
  { q: "Can I pay monthly?", a: "Yes, you can choose to pay your subscription monthly or annually. Paying annually saves you up to two months' cost." },
  { q: "Will this reduce my insurance?", a: "Typically, yes. Most insurers offer 15-25% discounts for vehicles fitted with a Thatcham S5 or S7 tracker. We provide your official certificate instantly upon installation completion." },
  { q: "Can I transfer the tracker?", a: "Yes, if you sell your car, we can transfer the device to your new vehicle. There is a standard £99 de/re-installation fee." }
];

export function PricingPage() {
  const heroRef = useScrollReveal();
  const pricingRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const [annual, setAnnual] = useState(true);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-[#0B0F19] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#262D3D]" ref={heroRef}>
        <div className="container-premium text-center" data-reveal>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Honest pricing.<br />
            <span className="text-[#FF6B1A]">No surprises.</span>
          </h1>
          <p className="text-[#999999] max-w-2xl mx-auto leading-relaxed text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
            One-off hardware cost. Simple annual or monthly subscription. Nationwide engineer installation is always included.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-[#111625]" ref={pricingRef}>
        <div className="container-premium">
          {/* Toggle */}
          <div className="flex justify-center mb-14" data-reveal>
            <div className="bg-[#0B0F19] p-1.5 rounded-full inline-flex border border-[#262D3D] relative">
              <div 
                className="absolute top-1.5 bottom-1.5 rounded-full bg-[#1E2533] transition-all duration-300 ease-in-out border border-[#FF6B1A]/30"
                style={{ left: annual ? "108px" : "6px", width: annual ? "110px" : "102px" }}
              />
              <button 
                onClick={() => setAnnual(false)} 
                className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors ${!annual ? "text-[#F5F5F5]" : "text-[#555555]"}`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Monthly
              </button>
              <button 
                onClick={() => setAnnual(true)} 
                className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${annual ? "text-[#FF6B1A]" : "text-[#555555]"}`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Annually <span className="text-[10px] bg-[#FF6B1A]/10 text-[#FF6B1A] px-2 py-0.5 rounded-full border border-[#FF6B1A]/20">SAVE 15%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* S7 */}
            <div className="bg-[#0B0F19] border border-[#262D3D] rounded-2xl p-8 lg:p-10 flex flex-col" data-reveal>
              <div className="mb-8">
                <h2 className="text-3xl mb-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S7 Essential</h2>
                <div className="text-[#999999] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>For vehicles under £50,000</div>
              </div>
              <div className="mb-8 border-b border-[#262D3D] pb-8">
                <div className="text-[#555555] text-xs uppercase tracking-widest mb-2 font-semibold">Hardware + Install</div>
                <div className="text-5xl text-[#FF6B1A] mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>£199</div>
                
                <div className="text-[#555555] text-xs uppercase tracking-widest mb-2 font-semibold mt-6">Subscription</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl text-[#F5F5F5]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                    £{annual ? "99" : "9.99"}
                  </div>
                  <div className="text-[#999999] mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    / {annual ? "year" : "month"}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {["Real-time GPS tracking", "24/7 Secure Control Centre", "Geofencing & alerts", "Trip history", "App access", "UK-wide engineer installation", "Thatcham S7 certified"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#FF6B1A] shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F5] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/get-quote?plan=s7" className="btn-ghost w-full justify-center py-4 text-base">
                Get S7 Protection
              </Link>
            </div>

            {/* S5 */}
            <div className="bg-[#0B0F19] border-2 border-[#FF6B1A] rounded-2xl p-8 lg:p-10 relative flex flex-col shadow-[0_0_40px_rgba(201,168,76,0.1)]" data-reveal>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B1A] text-[#0B0F19] text-xs font-bold py-1 px-4 rounded-full" style={{ fontFamily: "DM Sans, sans-serif" }}>
                RECOMMENDED
              </div>
              <div className="mb-8">
                <h2 className="text-3xl mb-2 text-[#FF6B1A]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S5 Premium</h2>
                <div className="text-[#999999] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Required by insurers for vehicles £50k+</div>
              </div>
              <div className="mb-8 border-b border-[#262D3D] pb-8">
                <div className="text-[#555555] text-xs uppercase tracking-widest mb-2 font-semibold">Hardware + Install</div>
                <div className="text-5xl text-[#FF6B1A] mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>£349</div>
                
                <div className="text-[#555555] text-xs uppercase tracking-widest mb-2 font-semibold mt-6">Subscription</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl text-[#F5F5F5]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                    £{annual ? "149" : "14.99"}
                  </div>
                  <div className="text-[#999999] mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    / {annual ? "year" : "month"}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#FF6B1A] shrink-0 mt-0.5" />
                  <span className="text-[#F5F5F5] font-semibold text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Everything in S7 Essential</span>
                </li>
                {["Driver ID tags", "Remote immobilisation", "Police-integrated recovery", "Advanced anti-jamming"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#FF6B1A] shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F5] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/get-quote?plan=s5" className="btn-gold w-full justify-center py-4 text-base">
                Get S5 Protection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#0B0F19]" ref={faqRef}>
        <div className="container-premium max-w-3xl">
          <div className="text-center mb-12" data-reveal>
            <p className="overline mb-4">GOT QUESTIONS?</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Pricing FAQ</h2>
          </div>
          <div className="space-y-3" data-reveal>
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#262D3D] rounded-2xl overflow-hidden bg-[#111625]">
                <div className="p-6">
                  <h3 className="font-medium text-[#F5F5F5] mb-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                    {faq.q}
                  </h3>
                  <div className="text-[#999999] leading-relaxed text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
