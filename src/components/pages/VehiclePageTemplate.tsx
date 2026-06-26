"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Check, ChevronDown, Star } from "lucide-react";
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

interface Threat {
  title: string;
  desc: string;
}

interface Testimonial {
  quote: string;
  name: string;
  vehicle: string;
}

interface Faq {
  q: string;
  a: string;
}

interface VehiclePageTemplateProps {
  overline: string;
  heroImage: string;
  h1Line1: string;
  h1Line2: string;
  h1Gold: string;
  heroCopy: string;
  threats: Threat[];
  testimonial: Testimonial;
  faqs: Faq[];
  uniqueFeature?: { title: string; desc: string };
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#262D3D] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#111625] transition-colors duration-200"
      >
        <span
          className="font-medium text-[#F5F5F5] pr-4"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
        >
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-[#FF6B1A] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0" }}
      >
        <div
          className="px-6 pb-6 text-[#999999] leading-relaxed"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {a}
        </div>
      </div>
    </div>
  );
}

export function VehiclePageTemplate({
  overline,
  heroImage,
  h1Line1,
  h1Line2,
  h1Gold,
  heroCopy,
  threats,
  testimonial,
  faqs,
  uniqueFeature,
}: VehiclePageTemplateProps) {
  const threatRef = useScrollReveal();
  const pricingRef = useScrollReveal();
  const testimonialRef = useScrollReveal();
  const faqRef = useScrollReveal();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-[#0B0F19]/20" />
        <div className="relative z-10 container-premium pb-20 pt-32">
          <p className="overline mb-5">{overline}</p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl mb-6 max-w-3xl leading-tight"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
          >
            {h1Line1}
            <br />
            {h1Line2}
            <br />
            <span className="text-[#FF6B1A]">{h1Gold}</span>
          </h1>
          <p
            className="text-[#999999] max-w-xl leading-relaxed mb-10"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {heroCopy}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/get-quote" className="btn-gold">
              Get Protected
            </Link>
            <Link href="/pricing" className="btn-ghost">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Threats */}
      <section
        className="section-padding bg-[#0B0F19]"
        ref={threatRef}
      >
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline text-[#FF4444] mb-4">THE RISK IS REAL</p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
            >
              Why your vehicle needs Travio
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {threats.map((threat) => (
              <div
                key={threat.title}
                className="bg-[#111625] border border-[#FF4444]/20 rounded-2xl p-8"
                data-reveal
              >
                <AlertTriangle className="h-7 w-7 text-[#FF4444] mb-4" />
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
                >
                  {threat.title}
                </h3>
                <p
                  className="text-[#555555] leading-relaxed"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {threat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique feature (optional) */}
      {uniqueFeature && (
        <section className="py-16 bg-[#111625]">
          <div className="container-premium">
            <div className="bg-[#0B0F19] border border-[#FF6B1A]/30 rounded-2xl p-10 max-w-2xl mx-auto text-center">
              <p className="overline mb-4">UNIQUE FEATURE</p>
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
              >
                {uniqueFeature.title}
              </h3>
              <p
                className="text-[#999999] leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {uniqueFeature.desc}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Recommended protection */}
      <section className="section-padding bg-[#111625]" ref={pricingRef}>
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline mb-4">RECOMMENDED PROTECTION</p>
            <h2
              className="text-4xl"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
            >
              Choose your level
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* S7 */}
            <div
              className="bg-[#0B0F19] border border-[#262D3D] rounded-2xl p-8"
              data-reveal
            >
              <p className="overline text-[#555555] mb-3">S7 ESSENTIAL</p>
              <div
                className="text-3xl text-[#F5F5F5] mb-1"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                £199
              </div>
              <div
                className="text-[#555555] text-sm mb-6"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                + £9.99/month
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "GPS tracking",
                  "24/7 monitoring",
                  "Motion alerts",
                  "App control",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FF6B1A]" />
                    <span
                      className="text-[#999999] text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/get-quote?plan=s7" className="btn-ghost w-full justify-center">
                Get S7
              </Link>
            </div>

            {/* S5 recommended */}
            <div
              className="bg-[#0B0F19] border-2 border-[#FF6B1A] rounded-2xl p-8 relative"
              data-reveal
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B1A] text-[#0B0F19] text-xs font-bold py-1 px-4 rounded-full whitespace-nowrap"
                style={{ fontFamily: "DM Sans, sans-serif" }}>
                RECOMMENDED
              </div>
              <p className="overline mb-3">S5 PREMIUM</p>
              <div
                className="text-3xl text-[#FF6B1A] mb-1"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                £349
              </div>
              <div
                className="text-[#555555] text-sm mb-6"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                + £14.99/month
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in S7",
                  "Driver ID technology",
                  "Remote immobilisation",
                  "Police-integrated recovery",
                  "Anti-jamming protection",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#FF6B1A]" />
                    <span
                      className="text-[#F5F5F5] text-sm"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/get-quote?plan=s5" className="btn-gold w-full justify-center">
                Get S5
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-[#0B0F19]" ref={testimonialRef}>
        <div className="container-premium max-w-2xl" data-reveal>
          <div className="bg-[#111625] border border-[#262D3D] rounded-2xl p-10 relative">
            <div
              className="absolute top-6 right-8 text-6xl leading-none select-none text-[#FF6B1A] opacity-20"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              &ldquo;
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FF6B1A] text-[#FF6B1A]" />
              ))}
            </div>
            <p
              className="text-[#F5F5F5] italic text-lg leading-relaxed mb-6"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div
              className="text-[#FF6B1A] font-bold"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
            >
              {testimonial.name}
            </div>
            <div
              className="text-[#555555] text-sm"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {testimonial.vehicle}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#111625]" ref={faqRef}>
        <div className="container-premium max-w-3xl">
          <div className="text-center mb-12" data-reveal>
            <p className="overline mb-4">COMMON QUESTIONS</p>
            <h2
              className="text-4xl"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
            >
              FAQ
            </h2>
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
