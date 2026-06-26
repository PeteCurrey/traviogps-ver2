"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Smartphone,
  Eye,
  Zap,
  Lock,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
} from "lucide-react";
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
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

const features = [
  {
    icon: Shield,
    title: "GPS + GLONASS Tracking",
    desc: "Dual-satellite positioning for pinpoint accuracy, indoors and out.",
  },
  {
    icon: Smartphone,
    title: "Driver ID Technology",
    desc: "Your phone becomes your key. Vehicle alerts if driven without your authorised device.",
  },
  {
    icon: Eye,
    title: "24/7 Secure Control Centre",
    desc: "Our team monitors your vehicle around the clock and liaises with police the moment a theft is detected.",
  },
  {
    icon: Zap,
    title: "Remote Immobilisation",
    desc: "Disable your engine from anywhere in the world via the Travio app.",
  },
  {
    icon: Lock,
    title: "Police Integrated Recovery",
    desc: "Travio works directly with UK police forces. S5 vehicles have a 94% recovery rate.",
  },
  {
    icon: AlertTriangle,
    title: "Anti-Tamper Alerts",
    desc: "Instant notification if anyone attempts to interfere with the device.",
  },
];

const comparison = [
  { feature: "GPS Tracking", s7: true, s5: true },
  { feature: "Driver ID", s7: false, s5: true },
  { feature: "Remote Immobilisation", s7: false, s5: true },
  { feature: "Police Integration", s7: false, s5: true },
  { feature: "Insurance Accepted Above £50k", s7: false, s5: true },
  { feature: "Anti-Jamming", s7: false, s5: true },
  { feature: "24/7 Monitoring", s7: true, s5: true },
  { feature: "Secure Control Centre Response", s7: false, s5: true },
];

const faqs = [
  {
    q: "What is Thatcham Category S5?",
    a: "Thatcham Category S5 is the highest level of vehicle security certification available in the UK. It includes GPS tracking, Driver ID technology, remote immobilisation, and 24/7 Secure Control Centre monitoring. Most specialist insurers require S5 for vehicles valued over £50,000.",
  },
  {
    q: "Will S5 reduce my insurance premium?",
    a: "Yes, typically by 15–25%. Leading UK insurers including Adrian Flux, Footman James, and Hagerty recognise Travio S5 and apply premium reductions accordingly. We issue a Thatcham certificate on installation that you provide to your insurer.",
  },
  {
    q: "How long does installation take?",
    a: "Most S5 installations take under 2 hours. A Thatcham-accredited Travio engineer comes to you — at home, work, or your dealership — usually within 48 hours of ordering.",
  },
  {
    q: "Can I transfer my tracker to a new vehicle?",
    a: "Yes. Transfers are available for a small fee. You'll need to book a transfer appointment with a Travio engineer. A new Thatcham certificate will be issued for the replacement vehicle.",
  },
  {
    q: "What happens if my vehicle is stolen?",
    a: "Contact our 24/7 Secure Control Centre immediately. Our team will locate your vehicle, provide real-time location updates to police, and if required, remotely immobilise the engine. S5 vehicles have a 94% recovery rate when reported promptly.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-[#262D3D] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#111625] transition-colors duration-200"
      >
        <span className="font-medium text-[#F5F5F5] pr-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-[#FF6B1A] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0" }}
      >
        <div className="px-6 pb-6 text-[#999999] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
          {a}
        </div>
      </div>
    </div>
  );
}

export function S5ProtectionPage() {
  const featuresRef = useScrollReveal();
  const comparisonRef = useScrollReveal();
  const insuranceRef = useScrollReveal();
  const pricingRef = useScrollReveal();
  const faqRef = useScrollReveal();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[40vh] lg:min-h-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/40 to-transparent lg:via-transparent" />
        </div>
        {/* Content */}
        <div className="flex items-center bg-[#0B0F19] px-8 md:px-12 lg:px-16 py-24 lg:py-32">
          <div>
            <p className="overline mb-5">THATCHAM CATEGORY S5</p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              The ultimate protection for your{" "}
              <span className="text-[#FF6B1A]">supercar.</span>
            </h1>
            <p className="text-[#999999] leading-relaxed mb-10 max-w-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Category S5 is the highest Thatcham security certification available.
              Required by most insurers for vehicles over £50,000, it combines GPS
              tracking, Driver ID technology, remote immobilisation, and 24/7 Secure
              Control Centre monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote?plan=s5" className="btn-gold">Get S5 Protection</Link>
              <Link href="#whats-included" className="btn-ghost">See What&apos;s Included</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="whats-included" className="section-padding bg-[#0B0F19]" ref={featuresRef}>
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline mb-4">COMPLETE COVERAGE</p>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Everything S5 includes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="glass-card p-8" data-reveal>
                <feat.icon className="h-8 w-8 text-[#FF6B1A] mb-5" />
                <h3 className="text-xl mb-3" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                  {feat.title}
                </h3>
                <p className="text-[#555555] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding bg-[#111625]" ref={comparisonRef}>
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline mb-4">S7 VS S5</p>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Why choose S5?
            </h2>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>Feature</th>
                  <th className="py-4 px-6 text-center">
                    <div className="text-[#999999] font-bold" style={{ fontFamily: "Syne, sans-serif" }}>S7 Essential</div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="bg-[#FF6B1A] text-[#0B0F19] text-xs font-bold py-1.5 px-4 rounded-full mb-2 inline-block" style={{ fontFamily: "DM Sans, sans-serif" }}>RECOMMENDED FOR SUPERCARS</div>
                    <div className="text-[#FF6B1A] font-bold" style={{ fontFamily: "Syne, sans-serif" }}>S5 Premium</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-[#0B0F19]/50" : ""}>
                    <td className="py-4 px-6 text-[#999999] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.s7 ? (
                        <Check className="h-5 w-5 text-[#FF6B1A] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-[#262D3D] mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-[#FF6B1A] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="section-padding bg-[#0B0F19]" ref={insuranceRef}>
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-reveal>
              <p className="overline mb-4">INSURANCE BENEFITS</p>
              <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                S5 and your <span className="text-[#FF6B1A]">insurance</span>
              </h2>
              <p className="text-[#999999] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Leading UK specialist insurers including Adrian Flux, Footman James, and Hagerty now require Thatcham S5 for vehicles valued over £50,000. Installing Travio S5 protection also typically reduces your annual premium by 15–25%.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6" data-reveal>
              {[
                { val: "15–25%", label: "Premium reduction" },
                { val: "£50k+", label: "Vehicles typically requiring S5" },
                { val: "94%", label: "Recovery rate with S5" },
              ].map((s) => (
                <div key={s.val} className="bg-[#111625] border border-[#262D3D] rounded-2xl p-6 text-center">
                  <div className="text-2xl md:text-3xl text-[#FF6B1A] mb-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>{s.val}</div>
                  <div className="text-[#555555] text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-[#111625]" ref={pricingRef}>
        <div className="container-premium max-w-2xl">
          <div className="text-center mb-12" data-reveal>
            <p className="overline mb-4">TRANSPARENT PRICING</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S5 Premium Protection</h2>
          </div>
          <div className="bg-[#0B0F19] border-2 border-[#FF6B1A] rounded-2xl p-10" data-reveal>
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8 pb-8 border-b border-[#262D3D]">
              <div>
                <div className="text-[#555555] text-sm mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>One-off hardware cost</div>
                <div className="text-5xl text-[#FF6B1A]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>£349</div>
                <div className="text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>inc. VAT & installation</div>
              </div>
              <div className="md:ml-8">
                <div className="text-[#555555] text-sm mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Annual subscription</div>
                <div className="text-2xl text-[#F5F5F5]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>£149 / year</div>
                <div className="text-[#555555] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>or £14.99 / month</div>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "GPS + GLONASS dual-satellite tracking",
                "Driver ID technology included",
                "Remote immobilisation via app",
                "24/7 Secure Control Centre monitoring",
                "Police-integrated recovery (94% success)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#FF6B1A] flex-shrink-0 mt-0.5" />
                  <span className="text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/get-quote?plan=s5" className="btn-gold w-full justify-center text-base py-4">
              Get S5 Protection
            </Link>
            <p className="text-center text-[#555555] text-sm mt-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Nationwide engineer installation included. Certificate issued on completion.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#0B0F19]" ref={faqRef}>
        <div className="container-premium max-w-3xl">
          <div className="text-center mb-12" data-reveal>
            <p className="overline mb-4">COMMON QUESTIONS</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S5 FAQ</h2>
          </div>
          <div className="space-y-3" data-reveal>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
